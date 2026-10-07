import React, { useEffect, useRef, useState } from 'react';
const pages=['P1-NoText.svg','P2.svg','P3-NoText.svg','P4-NoText.svg','P5.svg','P6.svg','P7.svg'];
const stages=[0,.6,...pages.map((_,index)=>index+1.6)];
const pageProgress=(position,index)=>Math.min(1,Math.max(0,position-(index+.6)));
const artworkMarks={"How Might We": [{"x1": "507", "y1": "115", "x2": "728", "y2": "115", "stroke": "#D1D1D1", "stroke-width": "10"}, {"x1": "457", "y1": "214", "x2": "662", "y2": "214", "stroke": "#61DE28", "stroke-width": "10"}], "P1": [{"x1": "48", "y1": "101", "x2": "227", "y2": "101", "stroke": "#61DE28", "stroke-width": "10"}, {"x1": "355", "y1": "101", "x2": "464", "y2": "101", "stroke": "#61DE28", "stroke-width": "10"}], "P3": [{"x1": "48", "y1": "86", "x2": "184", "y2": "86", "stroke": "#61DE28", "stroke-width": "10"}, {"x1": "640", "y1": "86", "x2": "914", "y2": "86", "stroke": "#61DE28", "stroke-width": "10"}], "P4": [{"x1": "48", "y1": "110", "x2": "133", "y2": "110", "stroke": "#61DE28", "stroke-width": "10"}], "P5": [{"x1": "25", "y1": "40", "x2": "91", "y2": "40", "stroke": "#61DE28", "stroke-width": "10"}, {"x1": "25", "y1": "438", "x2": "91", "y2": "438", "stroke": "#61DE28", "stroke-width": "10"}, {"x1": "651", "y1": "40", "x2": "717", "y2": "40", "stroke": "#61DE28", "stroke-width": "10"}, {"x1": "651", "y1": "438", "x2": "717", "y2": "438", "stroke": "#61DE28", "stroke-width": "10"}], "P6": [{"x1": "22.5", "y1": "46.0", "x2": "127.5", "y2": "46.0", "stroke": "#61DE28", "stroke-width": "10"}]};
const artworkDimensions={"How Might We": [1119, 294], "Intro": [679, 241], "P1": [1280, 832], "P2": [1280, 832], "P3": [1280, 832], "P4": [1280, 832], "P5": [1230, 772], "P6": [1280, 769], "P7": [1280, 832]};

function AnimatedArtwork({name,scrollPosition,stage,question=false}){
 const [amount,setAmount]=useState(0);
 useEffect(()=>{
  setAmount(0);
  if(Math.abs(scrollPosition-stage)>.003)return;
  let frame=0;
  const timer=setTimeout(()=>{
   const began=performance.now();
   const draw=now=>{
    const t=window.matchMedia('(prefers-reduced-motion: reduce)').matches?1:Math.min(1,(now-began)/700);
    setAmount(t*t*(3-2*t));
    if(t<1)frame=requestAnimationFrame(draw);
   };
   frame=requestAnimationFrame(draw);
  },150);
  return()=>{clearTimeout(timer);cancelAnimationFrame(frame)};
 },[scrollPosition,stage]);
 const [width,height]=artworkDimensions[name];
 const fitted=['P5','P6'].includes(name);
 const asset=encodeURIComponent(name);
 return <div className={question?'altafuse-question-art':'genelec-marked-content'} style={question?{aspectRatio:`${width}/${height}`}:{width:fitted?`min(96.09375vw,calc((100dvh - 150px)*${width}/${height}))`:`max(100%,calc(100dvh*${width}/${height}))`,aspectRatio:`${width}/${height}`}}>
  <img className="genelec-mark-background" src={`/PRODUCT/04%20Altafuse/${asset}-Background.svg`} alt=""/>
  <svg className="genelec-marker" viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true">
   {artworkMarks[name].map((mark,index)=><line key={index} x1={mark.x1} x2={mark.x2} y1={mark.y1} y2={mark.y2} stroke={mark.stroke} strokeWidth={mark['stroke-width']} pathLength="1" strokeDasharray="1" strokeDashoffset={1-amount} visibility={amount===0?'hidden':'visible'}/>)}
  </svg>
  <img className="genelec-mark-foreground" src={`/PRODUCT/04%20Altafuse/${asset}-Foreground.svg`} alt={`Altafuse ${name}`}/>
 </div>;
}

export default function AltafuseIntro({onPrevious,onNext}){
 const scrollArea=useRef(null),closeButton=useRef(null);
 const [scrollPosition,setScrollPosition]=useState(0);
 const progress=Math.min(1,scrollPosition/.6);
 const firstPageProgress=pageProgress(scrollPosition,0);
 useEffect(()=>{
  const element=scrollArea.current;
  let frame=0,release=0,locked=false;
  const wheel=e=>{
   e.preventDefault();
   if(locked||Math.abs(e.deltaY)<2)return;
   const current=element.scrollTop/element.clientHeight;
   const target=e.deltaY>0?stages.find(value=>value>current+.02):[...stages].reverse().find(value=>value<current-.02);
   if(target===undefined)return;
   locked=true;
   const start=element.scrollTop,end=target*element.clientHeight,began=performance.now();
   const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:800;
   const step=now=>{
    const t=duration?Math.min(1,(now-began)/duration):1;
    const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    element.scrollTop=start+(end-start)*eased;
    if(t<1)frame=requestAnimationFrame(step);
    else release=setTimeout(()=>{locked=false},250);
   };
   frame=requestAnimationFrame(step);
  };
  element.addEventListener('wheel',wheel,{passive:false});
  return()=>{element.removeEventListener('wheel',wheel);cancelAnimationFrame(frame);clearTimeout(release)};
 },[]);
 useEffect(()=>{
  const previous=document.activeElement;
  closeButton.current?.focus();
  return()=>previous?.focus();
 },[]);
 return <section className="kasvu-intro-backdrop" role="dialog" aria-modal="false" aria-label="Altafuse introduction">
  <div ref={scrollArea} className="kasvu-project-scroll" onScroll={e=>setScrollPosition(Math.max(0,e.currentTarget.scrollTop/e.currentTarget.clientHeight))}>
   <div className="altafuse-scroll-track"><div className="kasvu-scroll-stage">
    <div className="kasvu-intro-window altafuse-intro-window" style={{top:`${50-17.31*progress-100*firstPageProgress}%`}}>
     <img className="kasvu-intro-image" src="/PRODUCT/04%20Altafuse/Intro.svg" alt="Altafuse project introduction"/>
    </div>
    <div className="kasvu-how-might" style={{top:`${105-49.71*progress-110*firstPageProgress}%`,opacity:progress}}>
     <AnimatedArtwork name="How Might We" scrollPosition={scrollPosition} stage={.6} question/>
    </div>
    {pages.map((file,index)=>{
     const entering=pageProgress(scrollPosition,index),leaving=pageProgress(scrollPosition,index+1);
     return <div key={file} className="genelec-project-page" style={{top:`${150-100*entering-110*leaving}%`,visibility:entering===0?'hidden':'visible'}}>
      {![0,2,3].includes(index)&&artworkMarks[`P${index+1}`]?<AnimatedArtwork name={`P${index+1}`} scrollPosition={scrollPosition} stage={index+1.6}/>:<img src={`/PRODUCT/04%20Altafuse/${file}`} alt={`Altafuse P${index+1}`} draggable="false"/>}
     </div>;
    })}
   </div></div>
  </div>
  <button ref={closeButton} className="kasvu-intro-nav kasvu-intro-previous" aria-label="Previous product project" onClick={onPrevious}><img src="/Components/Last.svg" alt=""/></button>
  <button className="kasvu-intro-nav kasvu-intro-next" aria-label="Next product project" onClick={onNext}><img src="/Components/Next.svg" alt=""/></button>
 </section>;
}
