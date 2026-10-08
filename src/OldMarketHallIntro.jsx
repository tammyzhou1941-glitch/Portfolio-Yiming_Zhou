import React, { useEffect, useRef, useState } from 'react';
const pages=["P1.svg", "P2.svg", "P3.svg", "P4.svg", "P5.svg", "P6.svg", "P7.svg", "P8.svg", "P9-Layout.svg", "P10.svg", "P11.svg"];
const stages=[0,.6,...pages.map((_,index)=>index+1.6)];
const pageProgress=(position,index)=>Math.min(1,Math.max(0,position-(index+.6)));
const artworkMarks={"How Might I": [{"x1": "229", "y1": "186", "x2": "688", "y2": "186", "stroke": "#8E230B", "stroke-width": "8"}, {"x1": "754", "y1": "186", "x2": "884", "y2": "186", "stroke": "#8E230B", "stroke-width": "8"}, {"x1": "878", "y1": "138", "x2": "1042", "y2": "138", "stroke": "#8E230B", "stroke-width": "8"}]};
const artworkDimensions={"How Might I": [1119, 294], "P1": [1280, 832], "P2": [1280, 832], "P3": [1280, 832], "P4": [1259, 702], "P5": [1255, 747], "P6": [1230, 772], "P7": [1095, 650], "P8": [1230, 631], "P9": [1189, 643], "P10": [1188, 661], "P11": [1280, 832]};

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
 const asset=encodeURIComponent(name);
 return <div className={question?'old-market-question-art':'genelec-marked-content'} style={question?{aspectRatio:`${width}/${height}`}:{width:`min(96.09375vw,calc((100dvh - 150px)*${width}/${height}))`,aspectRatio:`${width}/${height}`}}>
  <img className="genelec-mark-background" src={`/UI&UX/Old%20Market%20Hall/${asset}-Background.svg`} alt=""/>
  <svg className="genelec-marker" viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true">
   {artworkMarks[name].map((mark,index)=><line key={index} x1={mark.x1} x2={mark.x2} y1={mark.y1} y2={mark.y2} stroke={mark.stroke} strokeWidth={mark['stroke-width']} strokeOpacity={mark['stroke-opacity']||1} pathLength="1" strokeDasharray="1" strokeDashoffset={1-amount} visibility={amount===0?'hidden':'visible'}/>)}
  </svg>
  <img className="genelec-mark-foreground" src={`/UI&UX/Old%20Market%20Hall/${asset}-Foreground.svg`} alt={`ayy ${name}`}/>
 </div>;
}

export default function OldMarketHallIntro({onClose}){
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
 return <section className="kasvu-intro-backdrop" role="dialog" aria-modal="false" aria-label="Old Market Hall introduction">
  <div className="old-market-first-page-background" style={{transform:`translateY(${-100*progress}%)`,visibility:progress>=1?'hidden':'visible'}}><img className="old-market-project-background" src="/UI&UX/Old%20Market%20Hall/Background.svg" alt="" aria-hidden="true"/></div>
  <div ref={scrollArea} className="kasvu-project-scroll" onScroll={e=>setScrollPosition(Math.max(0,e.currentTarget.scrollTop/e.currentTarget.clientHeight))}>
   <div className="old-market-scroll-track"><div className="kasvu-scroll-stage">
    <div className="kasvu-intro-window old-market-intro-window" style={{left:"50%",top:`${50-17.31*progress-100*firstPageProgress}%`,transform:"translate(-50%,-50%)"}}>
     <img className="kasvu-intro-image" src="/UI&UX/Old%20Market%20Hall/Intro.svg" alt="Old Market Hall project introduction"/>
    </div>
    <div className="kasvu-how-might" style={{top:`${105-49.71*progress-110*firstPageProgress}%`,opacity:progress}}>
     <AnimatedArtwork name="How Might I" scrollPosition={scrollPosition} stage={.6} question/>
    </div>
    {pages.map((file,index)=>{
     const entering=pageProgress(scrollPosition,index),leaving=pageProgress(scrollPosition,index+1);
     return <div key={file} className={`old-market-project-page${index===pages.length-1?' old-market-final-page':''}`} style={{top:index<10?`calc(${150-100*entering-110*leaving}% + 35px)`:`${150-100*entering-110*leaving}%`,visibility:entering===0?'hidden':'visible'}}>
      {artworkMarks[`P${index+1}`]?<AnimatedArtwork name={`P${index+1}`} scrollPosition={scrollPosition} stage={index+1.6}/>:<img style={{width:`min(96.09375vw,calc((100dvh - 150px)*${artworkDimensions[`P${index+1}`][0]}/${artworkDimensions[`P${index+1}`][1]}))`}} src={`/UI&UX/Old%20Market%20Hall/${file}`} alt={`Old Market Hall P${index+1}`} draggable="false"/>}
     </div>;
    })}
   </div></div>
  </div>
 </section>;
}
