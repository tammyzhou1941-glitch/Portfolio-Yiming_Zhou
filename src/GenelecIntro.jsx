import React, { useEffect, useRef, useState } from 'react';

const pages=['P1-TextAdjusted.svg?v=c097111af6d1','P2-TextAdjusted.svg?v=9fe43c2c0aed','P3.svg','P4.svg','P5.svg?v=50a206817c24','P6.svg','P7.svg?v=1fd78165e3f9','P8.svg'];
const stages=[0,.6,...pages.map((_,index)=>index+1.6)];
const pageProgress=(position,index)=>Math.min(1,Math.max(0,position-(index+.6)));

function P4VideoPage({scrollPosition}){
 const videoRef=useRef(null);
 const [needsPlay,setNeedsPlay]=useState(false);
 useEffect(()=>{
  const video=videoRef.current;
  video.pause();
  video.muted=true;
  setNeedsPlay(false);
  if(Math.abs(scrollPosition-4.6)>.003)return;
  let cancelled=false;
  const timer=setTimeout(()=>{video.currentTime=0;video.muted=false;video.volume=1;video.play().catch(()=>{if(!cancelled)setNeedsPlay(true)})},150);
  return()=>{cancelled=true;clearTimeout(timer);video.pause();video.muted=true};
 },[scrollPosition]);
 return <div className="genelec-marked-content" style={{width:'max(100%,calc(100dvh*1280/832))',aspectRatio:'1280/832',transform:'translate(-50%,calc(-50% + 15px)) scale(0.678699)'}}>
  <img src="/PRODUCT/02%20Genelec/P4.svg" alt="Genelec SONA P4"/>
  <div className="genelec-p4-video"><video ref={videoRef} data-playback-viewport="parent" src="/PRODUCT/02%20Genelec/37d5e7ca302db383475f9ffe3d33fb06.mp4" loop playsInline preload="auto" aria-label="Genelec SONA P4 demonstration"/>{needsPlay&&<button className="genelec-p4-play" onClick={()=>{const video=videoRef.current;video.muted=false;video.volume=1;video.play().then(()=>setNeedsPlay(false)).catch(()=>setNeedsPlay(true))}}>点击有声播放</button>}</div>
 </div>;
}

function MarkedPage({number,scrollPosition,stage}){
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
 const height=number===6?833:832;
 const mark=number===6?{x1:868,x2:1201,y:686,color:'#61DE28',width:20}:{x1:301,x2:978,y:432,color:'#19714D',width:10};
 return <div className="genelec-marked-content" style={{width:`max(100%,calc(100dvh*1280/${height}))`,aspectRatio:`1280/${height}`}}>
  <img className="genelec-mark-background" src={`/PRODUCT/02%20Genelec/P${number}-Background.svg${number===6?'?v=e5fcf583c6d9':''}`} alt=""/>
  <svg className="genelec-marker" viewBox={`0 0 1280 ${height}`} fill="none" aria-hidden="true">
   <line x1={mark.x1} x2={mark.x2} y1={mark.y} y2={mark.y} stroke={mark.color} strokeWidth={mark.width} pathLength="1" strokeDasharray="1" strokeDashoffset={1-amount} visibility={amount===0?'hidden':'visible'}/>
  </svg>
  <img className="genelec-mark-foreground" src={`/PRODUCT/02%20Genelec/P${number}-Foreground.svg${number===6?'?v=82463fe74c4e':''}`} alt={`Genelec SONA P${number}`}/>
 </div>;
}

export default function GenelecIntro({onPrevious,onNext}){
 const scrollArea=useRef(null),closeButton=useRef(null);
 const [scrollPosition,setScrollPosition]=useState(0),[lineProgress,setLineProgress]=useState(0);
 const progress=Math.min(1,scrollPosition/.6);
 const firstPageProgress=pageProgress(scrollPosition,0);
 const settled=Math.abs(scrollPosition-.6)<.003;
 useEffect(()=>{
  setLineProgress(0);
  if(!settled)return;
  let frame=0;
  const timer=setTimeout(()=>{
   const began=performance.now();
   const draw=now=>{
    const t=window.matchMedia('(prefers-reduced-motion: reduce)').matches?1:Math.min(1,(now-began)/700);
    setLineProgress(t*t*(3-2*t));
    if(t<1)frame=requestAnimationFrame(draw);
   };
   frame=requestAnimationFrame(draw);
  },100);
  return()=>{clearTimeout(timer);cancelAnimationFrame(frame)};
 },[settled]);
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
 return <section className="kasvu-intro-backdrop" role="dialog" aria-modal="false" aria-label="Genelec SONA introduction">
  <div ref={scrollArea} className="kasvu-project-scroll" onScroll={e=>setScrollPosition(Math.max(0,e.currentTarget.scrollTop/e.currentTarget.clientHeight))}>
   <div className="genelec-scroll-track"><div className="kasvu-scroll-stage">
    <div className="kasvu-intro-window genelec-intro-window" style={{top:`${50-17.31*progress-100*firstPageProgress}%`}}>
     <img className="kasvu-intro-image" src="/PRODUCT/02%20Genelec/Intro.svg" alt="Genelec SONA project introduction"/>
    </div>
    <div className="kasvu-how-might" style={{top:`${105-49.71*progress-110*firstPageProgress}%`,opacity:progress}}>
     <img className="kasvu-how-base" src="/PRODUCT/02%20Genelec/How-Base.svg" alt="Genelec SONA design question"/>
     <svg className="kasvu-how-line" viewBox="0 0 1119 294" fill="none" aria-hidden="true">
      <line x1="441" y1="142" x2="1040" y2="142" stroke="#19714D" strokeWidth="10" pathLength="1" strokeDasharray="1" strokeDashoffset={1-lineProgress}/>
      <line x1="457" y1="190" x2="845" y2="190" stroke="#61DE28" strokeWidth="10" pathLength="1" strokeDasharray="1" strokeDashoffset={1-lineProgress}/>
     </svg>
    </div>
    {pages.map((file,index)=>{
     const entering=pageProgress(scrollPosition,index),leaving=pageProgress(scrollPosition,index+1);
     return <div key={file} className="genelec-project-page" style={{top:`${150-100*entering-110*leaving}%`,visibility:entering===0?'hidden':'visible'}}>
      {index===3?<P4VideoPage scrollPosition={scrollPosition}/>: [5,7].includes(index)?<MarkedPage number={index+1} scrollPosition={scrollPosition} stage={index+1.6}/>:<img src={`/PRODUCT/02%20Genelec/${file}`} alt={`Genelec SONA P${index+1}`} draggable="false"/>}
     </div>;
    })}
   </div></div>
  </div>
  <button ref={closeButton} className="kasvu-intro-nav kasvu-intro-previous" aria-label="Previous product project" onClick={onPrevious}><img src="/Components/Last.svg" alt=""/></button>
  <button className="kasvu-intro-nav kasvu-intro-next" aria-label="Next product project" onClick={onNext}><img src="/Components/Next.svg" alt=""/></button>
 </section>;
}
