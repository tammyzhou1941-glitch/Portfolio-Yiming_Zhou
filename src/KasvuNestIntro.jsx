import React, { useEffect, useRef, useState } from 'react';

function useSettledLine(isSettled){
 const [amount,setAmount]=useState(0);
 useEffect(()=>{
  setAmount(0);
  if(!isSettled)return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){setAmount(1);return;}
  let frame=0;
  const started=performance.now();
  const draw=now=>{
   const t=Math.min(1,(now-started)/700);
   setAmount(t*t*(3-2*t));
   if(t<1)frame=requestAnimationFrame(draw);
  };
  frame=requestAnimationFrame(draw);
  return()=>cancelAnimationFrame(frame);
 },[isSettled]);
 return amount;
}

export default function KasvuNestIntro({onPrevious,onNext}){
 const closeButton=useRef(null),scrollArea=useRef(null);
 const assemblyVideo=useRef(null);
 const [assemblyNeedsPlay,setAssemblyNeedsPlay]=useState(false);
 const lifestyleVideo=useRef(null);
 const [lifestyleNeedsPlay,setLifestyleNeedsPlay]=useState(false);
 const [scrollPosition,setScrollPosition]=useState(0);
 const progress=Math.min(1,scrollPosition/.6);
 const researchProgress=Math.min(1,Math.max(0,scrollPosition-.6));
 const requirementProgress=Math.min(1,Math.max(0,scrollPosition-1.6));
 const compositionProgress=Math.min(1,Math.max(0,scrollPosition-2.6));
 const possibilitiesProgress=Math.min(1,Math.max(0,scrollPosition-3.6));
 const p1Progress=Math.min(1,Math.max(0,scrollPosition-4.6));
 const p2Progress=Math.min(1,Math.max(0,scrollPosition-5.6));
 const p3Progress=Math.min(1,Math.max(0,scrollPosition-6.6));
 const requirementLines=useSettledLine(Math.abs(scrollPosition-2.6)<.003);
 const researchLines=useSettledLine(Math.abs(scrollPosition-1.6)<.003);
 const lineProgress=useSettledLine(Math.abs(scrollPosition-.6)<.003);
 const revealClip=(start,end,width,amount)=>`inset(0 ${100-(start+(end-start)*amount)/width*100}% 0 0)`;
 useEffect(()=>{
  const video=assemblyVideo.current;
  if(!video)return;
  let cancelled=false;
  video.pause();
  video.muted=true;
  setAssemblyNeedsPlay(false);
  if(Math.abs(scrollPosition-6.6)>.003)return;
  const timer=window.setTimeout(()=>{
   video.currentTime=0;
   video.muted=false;
   video.volume=1;
   video.play().catch(()=>{if(!cancelled)setAssemblyNeedsPlay(true)});
  },150);
  return()=>{cancelled=true;clearTimeout(timer);video.pause();video.muted=true};
 },[scrollPosition]);
 useEffect(()=>{
  const video=lifestyleVideo.current;
  if(!video)return;
  let cancelled=false;
  video.pause();
  video.muted=true;
  setLifestyleNeedsPlay(false);
  if(Math.abs(scrollPosition-7.6)>.003)return;
  const timer=window.setTimeout(()=>{
   video.currentTime=0;
   video.muted=false;
   video.volume=1;
   video.play().catch(()=>{if(!cancelled)setLifestyleNeedsPlay(true)});
  },150);
  return()=>{cancelled=true;clearTimeout(timer);video.pause();video.muted=true};
 },[scrollPosition]);
 useEffect(()=>{
  const element=scrollArea.current;
  let frame=0,release=0,locked=false;
  const wheel=e=>{
   e.preventDefault();
   if(locked||Math.abs(e.deltaY)<2)return;
   const stages=[0,.6,1.6,2.6,3.6,4.6,5.6,6.6,7.6];
   const current=element.scrollTop/element.clientHeight;
   const target=e.deltaY>0?stages.find(value=>value>current+.02):[...stages].reverse().find(value=>value<current-.02);
   if(target===undefined)return;
   // Stop audio immediately when a page transition starts.
   for(const video of [assemblyVideo.current,lifestyleVideo.current]){
    if(video){video.pause();video.muted=true;}
   }
   locked=true;
   const start=element.scrollTop,end=target*element.clientHeight;
   const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:800;
   const began=performance.now();
   const step=now=>{
    const t=duration?Math.min(1,(now-began)/duration):1;
    const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    element.scrollTop=start+(end-start)*eased;
    if(t<1)frame=requestAnimationFrame(step);
    else release=window.setTimeout(()=>{locked=false},250);
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
 return <section className="kasvu-intro-backdrop" role="dialog" aria-modal="false" aria-label="KasvuNest introduction">
  <div ref={scrollArea} className="kasvu-project-scroll" onScroll={e=>{const el=e.currentTarget;setScrollPosition(Math.max(0,el.scrollTop/el.clientHeight))}}>
   <div className="kasvu-scroll-track"><div className="kasvu-scroll-stage">
    <div className="kasvu-intro-window" style={{top:`${50-17.31*progress-100*researchProgress}%`}}><img className="kasvu-intro-image" src="/PRODUCT/01%20KasvuNest/Intro.svg" alt="KasvuNest project introduction"/></div>
    <div className="kasvu-how-might" style={{top:`${105-49.71*progress-110*researchProgress}%`,opacity:progress}}>
     <img className="kasvu-how-base" src="/PRODUCT/01%20KasvuNest/How-Base.svg" alt="How might I design a hydroponic plant-growing rack for Nordic home environments?"/>
     <img className="kasvu-how-line" src="/PRODUCT/01%20KasvuNest/How-Pink.svg" alt="" aria-hidden="true" style={{clipPath:revealClip(421.627,983.266,1119,lineProgress),visibility:lineProgress===0?'hidden':'visible'}}/>
     <img className="kasvu-how-line" src="/PRODUCT/01%20KasvuNest/How-Blue.svg" alt="" aria-hidden="true" style={{clipPath:revealClip(324.745,784.432,1119,lineProgress),visibility:lineProgress===0?'hidden':'visible'}}/>
    </div>
    <div className="kasvu-research" style={{top:`${150-100*researchProgress-110*requirementProgress}%`,visibility:researchProgress===0?'hidden':'visible'}}>
     <img className="kasvu-how-base" src="/PRODUCT/01%20KasvuNest/Research01-Base.svg" alt="KasvuNest Research 01"/>
     {['Pink','Blue'].map(color=><img key={color} className="kasvu-how-line" src={`/PRODUCT/01%20KasvuNest/Research01-${color}.svg`} alt="" aria-hidden="true" style={{clipPath:color==='Pink'?revealClip(640.556,800,1230,researchLines):revealClip(417.677,609,1230,researchLines),visibility:researchLines===0?'hidden':'visible'}}/>)}
    </div>
    <div className="kasvu-requirement" style={{top:`${150-100*requirementProgress-110*compositionProgress}%`,visibility:requirementProgress===0?'hidden':'visible'}}><img className="kasvu-how-base" src="/PRODUCT/01%20KasvuNest/Requirement-VideoBase.svg" alt="KasvuNest design requirements"/>
     {['Pink','Blue'].map(color=><img key={color} className="kasvu-how-line" src={`/PRODUCT/01%20KasvuNest/Requirement-${color}.svg`} alt="" aria-hidden="true" style={{clipPath:color==='Pink'?revealClip(509.047,727.5,1230,requirementLines):revealClip(537.928,751.0,1230,requirementLines),visibility:requirementLines===0?'hidden':'visible'}}/>)}
     {[{file:'01-1.mp4',x:13},{file:'02-1.mp4',x:418},{file:'03-1.mp4',x:823}].map(video=><div key={video.file} className={`kasvu-requirement-video${video.file==='02-1.mp4'?' kasvu-requirement-flexible':''}`} style={{left:`${video.x/1230*100}%`,top:`${387/774*100}%`,width:`${394/1230*100}%`,height:`${220/774*100}%`}}><video src={`/PRODUCT/01%20KasvuNest/Video/${video.file}`} autoPlay muted loop playsInline preload="auto" aria-label={`KasvuNest requirement demonstration ${video.file.slice(0,2)}`}/></div>)}
    </div>
    <div className="kasvu-composition" style={{top:`${150-100*compositionProgress-110*possibilitiesProgress}%`,visibility:compositionProgress===0?'hidden':'visible'}}>
     <img className="kasvu-how-base" src="/PRODUCT/01%20KasvuNest/Composition-Title.svg" alt="What makes up my product?"/>
     <div className="kasvu-made-up">
      <video src="/PRODUCT/01%20KasvuNest/Video/Made%20Up.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="KasvuNest Made Up product video"/>
     </div>
    </div>
    <div className="kasvu-possibilities" style={{top:`${150-100*possibilitiesProgress-110*p1Progress}%`,visibility:possibilitiesProgress===0?'hidden':'visible'}}>
     <video src="/PRODUCT/01%20KasvuNest/Video/Possibilities.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="KasvuNest Possibilities video"/>
    </div>
    <div className="kasvu-p1" style={{top:`${150-100*p1Progress-110*p2Progress}%`,visibility:p1Progress===0?'hidden':'visible'}}>
     <img className="kasvu-how-base" src="/PRODUCT/01%20KasvuNest/P1.svg" alt="KasvuNest P1"/>
    </div>
    <div className="kasvu-p2" style={{top:`${150-100*p2Progress-110*p3Progress}%`,visibility:p2Progress===0?'hidden':'visible'}}>
     <img className="kasvu-how-base" src="/PRODUCT/01%20KasvuNest/P2.svg" alt="KasvuNest P2"/>
     <video ref={assemblyVideo} className="kasvu-p2-assembly" src={`/PRODUCT/01%20KasvuNest/Video/${encodeURIComponent('组装过程（有人版）.mp4')}`} loop playsInline controls preload="auto" aria-label="KasvuNest assembly process with a person"/>
     {assemblyNeedsPlay&&<button className="kasvu-assembly-play" onClick={()=>{const video=assemblyVideo.current;video.muted=false;video.play().then(()=>setAssemblyNeedsPlay(false)).catch(()=>setAssemblyNeedsPlay(true))}}>点击有声播放</button>}
    </div>
    <div className="kasvu-p3" style={{top:`${150-100*p3Progress}%`,visibility:p3Progress===0?'hidden':'visible'}}>
     <div className="kasvu-p3-content">
      <img className="kasvu-how-base" src="/PRODUCT/01%20KasvuNest/P3-MaterialUpdated.svg?v=a19408591193" alt="KasvuNest P3"/>
      <video ref={lifestyleVideo} className="kasvu-p3-lifestyle" src={`/PRODUCT/01%20KasvuNest/Video/${encodeURIComponent('生活化场景.mp4')}`} loop playsInline controls preload="auto" aria-label="KasvuNest everyday living scene"/>
      {lifestyleNeedsPlay&&<button className="kasvu-lifestyle-play" onClick={()=>{const video=lifestyleVideo.current;video.muted=false;video.play().then(()=>setLifestyleNeedsPlay(false)).catch(()=>setLifestyleNeedsPlay(true))}}>点击有声播放</button>}
     </div>
    </div>
   </div></div>
  </div>
  <button ref={closeButton} className="kasvu-intro-nav kasvu-intro-previous" aria-label="Previous product project" onClick={onPrevious}><img src="/Components/Last.svg" alt="" aria-hidden="true"/></button>
  <button className="kasvu-intro-nav kasvu-intro-next" aria-label="Next product project" onClick={onNext}><img src="/Components/Next.svg" alt="" aria-hidden="true"/></button>
 </section>;
}
