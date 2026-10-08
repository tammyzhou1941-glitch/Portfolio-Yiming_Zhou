import React, { useEffect, useRef, useState } from 'react';
const pages=['P1.svg','P2.svg','P3.svg','P4-Centered.svg?v=1a2ef7ec0099','P5.svg','P6.svg','P7-Centered.svg?v=d5b9a666e4bc','P8-Centered.svg?v=880700bd4bd7'];
const stages=[0,.6,...pages.map((_,index)=>index+1.6)];
const pageProgress=(position,index)=>Math.min(1,Math.max(0,position-(index+.6)));
const artworkMarks={"How Might I": [{"x1": "405", "y1": "142", "x2": "756", "y2": "142", "stroke": "#D1D1D1", "stroke-width": "10"}, {"x1": "309", "y1": "190", "x2": "861", "y2": "190", "stroke": "#757C2E", "stroke-width": "10"}], "P3": [{"x1": "25", "y1": "38", "x2": "132", "y2": "38", "stroke": "#757C2E", "stroke-width": "10"}]};
const artworkDimensions={"How Might I": [1119, 294], "Intro": [606, 245], "P1": [1280, 833], "P2": [1106, 772], "P3": [1280, 720], "P4": [1280, 832], "P5": [1280, 833], "P6": [1280, 832], "P7": [1280, 833], "P8": [1280, 831]};

function P5Videos({scrollPosition}){
 const container=useRef(null);
 useEffect(()=>{
  const videos=[...container.current.querySelectorAll('video')];
  videos.forEach(video=>{video.pause();video.muted=true});
  if(Math.abs(scrollPosition-5.6)>.003)return;
  const timer=setTimeout(()=>videos.forEach(video=>{video.currentTime=0;video.play().catch(()=>{})}),150);
  return()=>{clearTimeout(timer);videos.forEach(video=>{video.pause();video.muted=true})};
 },[scrollPosition]);
 const videos=[
  {file:'动画一.mp4',x:0,y:0,width:607},
  {file:'动画二：显示面板.mp4',x:623,y:0,width:607},
  {file:'动画八：单独储存仓.mp4',x:0,y:394,width:607},
  {file:'动画四：收集仓细节.mp4',x:623,y:394,width:606},
 ];
 return <div ref={container} className="goldenroot-p5-videos">
  {videos.map(video=><div key={video.file} className={`goldenroot-p5-video-frame${video.file==='动画八：单独储存仓.mp4'?' goldenroot-storage-video':''}`} style={{left:`${video.x/1230*100}%`,top:`${video.y/772*100}%`,width:`${video.width/1230*100}%`,height:`${378/772*100}%`}}><video src={`/PRODUCT/05%20GoldenRoot/Video/${encodeURIComponent(video.file)}`} muted loop playsInline preload="metadata" aria-label={video.file.replace('.mp4','')}/></div>)}
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
 return <div className={question?'goldenroot-question-art':'genelec-marked-content'} style={question?{aspectRatio:`${width}/${height}`}:{width:name==='P3'?`min(100vw,calc((100dvh - 150px)*${width}/${height}))`:`max(100%,calc(100dvh*${width}/${height}))`,aspectRatio:`${width}/${height}`,top:name==='P3'?'calc(50% + 15px)':undefined}}>
  <img className="genelec-mark-background" src={`/PRODUCT/05%20GoldenRoot/${asset}-Background.svg`} alt=""/>
  <svg className="genelec-marker" viewBox={`0 0 ${width} ${height}`} fill="none" aria-hidden="true">
   {artworkMarks[name].map((mark,index)=><line key={index} x1={mark.x1} x2={mark.x2} y1={mark.y1} y2={mark.y2} stroke={mark.stroke} strokeWidth={mark['stroke-width']} pathLength="1" strokeDasharray="1" strokeDashoffset={1-amount} visibility={amount===0?'hidden':'visible'}/>)}
  </svg>
  <img className="genelec-mark-foreground" src={`/PRODUCT/05%20GoldenRoot/${asset}-Foreground.svg`} alt={`GoldenRoot ${name}`}/>
 </div>;
}

export default function GoldenRootIntro({onPrevious,onNext}){
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
 return <section className="kasvu-intro-backdrop" role="dialog" aria-modal="false" aria-label="GoldenRoot introduction">
  <div ref={scrollArea} className="kasvu-project-scroll" onScroll={e=>setScrollPosition(Math.max(0,e.currentTarget.scrollTop/e.currentTarget.clientHeight))}>
   <div className="goldenroot-scroll-track"><div className="kasvu-scroll-stage">
    <div className="kasvu-intro-window goldenroot-intro-window" style={{top:`${50-17.31*progress-100*firstPageProgress}%`}}>
     <img className="kasvu-intro-image" src="/PRODUCT/05%20GoldenRoot/Intro.svg" alt="GoldenRoot project introduction"/>
    </div>
    <div className="kasvu-how-might" style={{top:`${105-49.71*progress-110*firstPageProgress}%`,opacity:progress}}>
     <AnimatedArtwork name="How Might I" scrollPosition={scrollPosition} stage={.6} question/>
    </div>
    {pages.map((file,index)=>{
     const entering=pageProgress(scrollPosition,index),leaving=pageProgress(scrollPosition,index+1);
     return <div key={file} className="genelec-project-page" style={{top:`${150-100*entering-110*leaving}%`,visibility:entering===0?'hidden':'visible'}}>
      {index===4?<P5Videos scrollPosition={scrollPosition}/>:artworkMarks[`P${index+1}`]?<AnimatedArtwork name={`P${index+1}`} scrollPosition={scrollPosition} stage={index+1.6}/>:<img className={index===1?'goldenroot-p2':''} src={`/PRODUCT/05%20GoldenRoot/${file}`} alt={`GoldenRoot P${index+1}`} draggable="false"/>}
     </div>;
    })}
   </div></div>
  </div>
  <button ref={closeButton} className="kasvu-intro-nav kasvu-intro-previous" aria-label="Previous product project" onClick={onPrevious}><img src="/Components/Last.svg" alt=""/></button>
  <button className="kasvu-intro-nav kasvu-intro-next" aria-label="Next product project" onClick={onNext}><img src="/Components/Next.svg" alt=""/></button>
 </section>;
}
