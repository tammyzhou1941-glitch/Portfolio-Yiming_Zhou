import React, { useEffect, useRef, useState } from 'react';
const pages=['P1-Centered.svg?v=cd648a5ff703','P2-Centered.svg?v=6b7618820878','P3-Centered.svg?v=4779b95ebcb3','P4-Centered.svg?v=fe01fc3db29f','P5-Centered.svg?v=9f0ce68759c3','P6.svg'];
const stages=[0,.6,...pages.map((_,index)=>index+1.6)];
const pageProgress=(position,index)=>Math.min(1,Math.max(0,position-(index+.6)));
const artworkMarks={"How Might I": [{"x1": "420", "y1": "142", "x2": "977", "y2": "142", "stroke": "#D1D1D1", "stroke-width": "10"}, {"x1": "307", "y1": "190", "x2": "798", "y2": "190", "stroke": "#FFF990", "stroke-width": "10"}]};

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
 const width=question?1119:1280,height=question?294:832;
 const asset=encodeURIComponent(name);
 return <div className={question?'paperrend-question-art':'genelec-marked-content'} style={question?{aspectRatio:`${width}/${height}`}:{width:'max(100%,calc(100dvh*1280/832))',aspectRatio:'1280/832'}}>
  <img className="genelec-mark-background" src={`/PRODUCT/03%20PaperRend/${asset}-Background.svg`} alt=""/>
  <svg className="genelec-marker" viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true">
   {artworkMarks[name].map((mark,index)=><line key={index} x1={mark.x1} x2={mark.x2} y1={mark.y1} y2={mark.y2} stroke={mark.stroke} strokeWidth={mark['stroke-width']} pathLength="1" strokeDasharray="1" strokeDashoffset={1-amount} visibility={amount===0?'hidden':'visible'}/>)}
  </svg>
  <img className="genelec-mark-foreground" src={`/PRODUCT/03%20PaperRend/${asset}-Foreground.svg`} alt={`PaperRend ${name}`}/>
 </div>;
}

export default function PaperRendIntro({onPrevious,onNext}){
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
 return <section className="kasvu-intro-backdrop" role="dialog" aria-modal="false" aria-label="PaperRend introduction">
  <div ref={scrollArea} className="kasvu-project-scroll" onScroll={e=>setScrollPosition(Math.max(0,e.currentTarget.scrollTop/e.currentTarget.clientHeight))}>
   <div className="paperrend-scroll-track"><div className="kasvu-scroll-stage">
    <div className="kasvu-intro-window paperrend-intro-window" style={{top:`${50-17.31*progress-100*firstPageProgress}%`}}>
     <img className="kasvu-intro-image" src="/PRODUCT/03%20PaperRend/Intro.svg" alt="PaperRend project introduction"/>
    </div>
    <div className="kasvu-how-might" style={{top:`${105-49.71*progress-110*firstPageProgress}%`,opacity:progress}}>
     <AnimatedArtwork name="How Might I" scrollPosition={scrollPosition} stage={.6} question/>
    </div>
    {pages.map((file,index)=>{
     const entering=pageProgress(scrollPosition,index),leaving=pageProgress(scrollPosition,index+1);
     return <div key={file} className="genelec-project-page" style={{top:`${150-100*entering-110*leaving}%`,visibility:entering===0?'hidden':'visible'}}>
      {artworkMarks[`P${index+1}`]?<AnimatedArtwork name={`P${index+1}`} scrollPosition={scrollPosition} stage={index+1.6}/>:<img src={`/PRODUCT/03%20PaperRend/${file}`} alt={`PaperRend P${index+1}`} draggable="false"/>}
      {index===2&&<div className="paperrend-p3-left-complete"><img src="/PRODUCT/03%20PaperRend/P3-Left-Complete.svg" alt="PaperRend full product rendering"/></div>}
     </div>;
    })}
   </div></div>
  </div>
  <button ref={closeButton} className="kasvu-intro-nav kasvu-intro-previous" aria-label="Previous product project" onClick={onPrevious}><img src="/Components/Last.svg" alt=""/></button>
  <button className="kasvu-intro-nav kasvu-intro-next" aria-label="Next product project" onClick={onNext}><img src="/Components/Next.svg" alt=""/></button>
 </section>;
}
