import React, { useEffect, useRef, useState } from 'react';
const pages=['P1.svg','P2.svg','P3.svg','P4.svg'];
const stages=[0,.6,...pages.map((_,index)=>index+1.6)];
const pageProgress=(position,index)=>Math.min(1,Math.max(0,position-(index+.6)));
const artworkMarks={"How Might I": [{"x1": "619", "y1": "186", "x2": "923", "y2": "186", "stroke": "#E9E034", "stroke-width": "8"}, {"x1": "543", "y1": "138", "x2": "915", "y2": "138", "stroke": "#757C2E", "stroke-width": "8"}]};
const artworkDimensions={"How Might I": [1119, 294], "P1": [1106, 772], "P2": [1230, 772], "P3": [1230, 673], "P4": [1230, 692]};

function ProductVideos({scrollPosition}){
 const container=useRef(null);
 useEffect(()=>{
  const videos=[...container.current.querySelectorAll('video')];
  videos.forEach(video=>{video.pause();video.muted=true});
  if(Math.abs(scrollPosition-2.6)>.003)return;
  const timer=setTimeout(()=>videos.forEach(video=>{video.currentTime=0;video.play().catch(()=>{})}),150);
  return()=>{clearTimeout(timer);videos.forEach(video=>{video.pause();video.muted=true})};
 },[scrollPosition]);
 return <div ref={container} className="goldenroot-ui-video-layout">
  <img src="/UI&UX/GoldenRoot/P2.svg" alt="GoldenRoot UI product and storage details"/>
  <video className="goldenroot-ui-video-left" src={`/UI&UX/GoldenRoot/${encodeURIComponent('动画一.mp4')}`} muted loop playsInline preload="metadata" aria-label="GoldenRoot product animation"/>
  <div className="goldenroot-ui-video-top"><video src={`/UI&UX/GoldenRoot/${encodeURIComponent('动画八：单独储存仓.mp4')}`} muted loop playsInline preload="metadata" aria-label="GoldenRoot separate storage compartment animation"/></div>
 </div>;
}

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
 return <div className={question?'goldenroot-ui-question-art':'genelec-marked-content'} style={question?{aspectRatio:`${width}/${height}`}:{width:`min(96.09375vw,calc((100dvh - 150px)*${width}/${height}))`,aspectRatio:`${width}/${height}`}}>
  <img className="genelec-mark-background" src={`/UI&UX/GoldenRoot/${asset}-Background.svg`} alt=""/>
  <svg className="genelec-marker" viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true">
   {artworkMarks[name].map((mark,index)=><line key={index} x1={mark.x1} x2={mark.x2} y1={mark.y1} y2={mark.y2} stroke={mark.stroke} strokeWidth={mark['stroke-width']} strokeOpacity={mark['stroke-opacity']||1} pathLength="1" strokeDasharray="1" strokeDashoffset={1-amount} visibility={amount===0?'hidden':'visible'}/>)}
  </svg>
  <img className="genelec-mark-foreground" src={`/UI&UX/GoldenRoot/${asset}-Foreground.svg`} alt={`ayy ${name}`}/>
 </div>;
}

export default function GoldenRootUIIntro({onClose}){
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
 return <section className="kasvu-intro-backdrop" role="dialog" aria-modal="false" aria-label="GoldenRoot UI introduction">
  <div className="goldenroot-ui-first-page-background" style={{transform:`translateY(${-100*progress}%)`,visibility:progress>=1?'hidden':'visible'}}><img className="goldenroot-ui-project-background" src="/UI&UX/GoldenRoot/Background.svg" alt="" aria-hidden="true"/></div>
  <div ref={scrollArea} className="kasvu-project-scroll" onScroll={e=>setScrollPosition(Math.max(0,e.currentTarget.scrollTop/e.currentTarget.clientHeight))}>
   <div className="goldenroot-ui-scroll-track"><div className="kasvu-scroll-stage">
    <div className="kasvu-intro-window goldenroot-ui-intro-window" style={{left:"50%",top:`${50-17.31*progress-100*firstPageProgress}%`,transform:"translate(-50%,-50%)"}}>
     <img className="kasvu-intro-image" src="/UI&UX/GoldenRoot/Intro.svg" alt="GoldenRoot UI project introduction"/>
    </div>
    <div className="kasvu-how-might" style={{top:`${105-49.71*progress-110*firstPageProgress}%`,opacity:progress}}>
     <AnimatedArtwork name="How Might I" scrollPosition={scrollPosition} stage={.6} question/>
    </div>
    {pages.map((file,index)=>{
     const entering=pageProgress(scrollPosition,index),leaving=pageProgress(scrollPosition,index+1);
     return <div key={file} className={`goldenroot-ui-project-page${index===pages.length-1?' goldenroot-ui-final-page':''}`} style={{top:[1,2,3].includes(index)?`calc(${150-100*entering-110*leaving}% + 20px)`:`${150-100*entering-110*leaving}%`,visibility:entering===0?'hidden':'visible'}}>
      {index===1?<ProductVideos scrollPosition={scrollPosition}/>:artworkMarks[`P${index+1}`]?<AnimatedArtwork name={`P${index+1}`} scrollPosition={scrollPosition} stage={index+1.6}/>:<img style={{width:`min(96.09375vw,calc((100dvh - 150px)*${artworkDimensions[`P${index+1}`][0]}/${artworkDimensions[`P${index+1}`][1]}))`}} src={`/UI&UX/GoldenRoot/${file}${file==='P4.svg'?'?v=2':''}`} alt={`GoldenRoot UI P${index+1}`} draggable="false"/>}
     </div>;
    })}
   </div></div>
  </div>
 </section>;
}
