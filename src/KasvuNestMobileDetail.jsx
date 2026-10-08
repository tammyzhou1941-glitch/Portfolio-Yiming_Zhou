import MobileScrollingBanner from './MobileScrollingBanner.jsx';
import React,{useEffect,useRef,useState} from 'react';
import KasvuMobileMarkedArt from './KasvuMobileMarkedArt.jsx';
import versions from './kasvuMobileVersions.json';
import KasvuMobileFlexible from './KasvuMobileFlexible.jsx';
const asset=file=>`/PRODUCT/Mobile/01%20KasvuNest/${encodeURIComponent(file)}.svg?v=${versions[file+'.svg']}`;
const icon=file=>`/PRODUCT/Mobile/Components/${encodeURIComponent(file)}.svg`;
const videos={P2:[['01-1.mp4',22,181,331,185],['02-1.mp4',22,402,331,185],['03-1.mp4',22,623,331,185]],P3:[['Made Up.mp4',0,322,375,256]],P4:[['Possibilities.mp4',-2,316,375,270]],P6:[['组装过程（有人版）.mp4',18,328,340,213,true]],P7:[['生活化场景竖版.mp4',12,77,352,697,true]]};
const dimensions={P1:[372,813],P2:[375,813],P3:[375,814],P4:[373,814],P5:[373,814],P6:[375,814],P7:[375,814]};
function ProjectPage({name,settled}){
 const element=useRef(null),[ready,setReady]=useState(false);
 const [needsSound,setNeedsSound]=useState(false);
 useEffect(()=>{
  setReady(false);setNeedsSound(false);let cancelled=false;const media=[...element.current.querySelectorAll('video')];media.forEach(video=>{video.pause();video.muted=true});
  if(!settled)return;
  const timer=setTimeout(()=>{setReady(true);media.forEach(video=>{video.muted=name!=='P7';video.volume=1;video.play().catch(()=>{if(cancelled)return;if(name==='P7'){video.muted=true;setNeedsSound(true);video.play().catch(()=>{})}})})},150);
  return()=>{cancelled=true;clearTimeout(timer);media.forEach(video=>{video.pause();video.muted=true})};
 },[settled]);
 const [width,height]=dimensions[name];
 return <div ref={element} className="kasvu-mobile-page-art" style={{aspectRatio:`${width}/${height}`,transform:name==='P6'?'translateY(-15px) scale(1.21)':['P3','P4'].includes(name)?'scale(1.1)':undefined,transformOrigin:'center'}}>
  {['P1','P2'].includes(name)?<KasvuMobileMarkedArt name={name} alt={`KasvuNest ${name}`} settled={ready}/>:<img src={asset(name==='P7'?'P7-Corrected':name)} alt={`KasvuNest ${name}`}/>}
  {(videos[name]||[]).map(([file,x,y,w,h,controls])=><div key={file} className={`kasvu-mobile-video-frame${['P3','P4'].includes(name)?' video-enlarged':''}`} style={{left:`${x/width*100}%`,top:name==='P7'?`calc(${y/height*100}% + 15px)`:`${y/height*100}%`,width:`${w/width*100}%`,height:`${h/height*100}%`,...(name==='P7'?{left:'50%',top:'50%',transform:'translate(-50%,-50%) scale(1.1)',transformOrigin:'center'}:{})}}><video src={`/PRODUCT/Mobile/01%20KasvuNest/Video/${encodeURIComponent(file)}`} muted loop playsInline controls={Boolean(controls)} preload="metadata" aria-label={file.replace('.mp4','')}/></div>)}
  {name==='P7'&&needsSound&&<button className="kasvu-mobile-enable-sound" onClick={()=>{const video=element.current.querySelector('video');video.muted=false;video.volume=1;video.play().then(()=>setNeedsSound(false)).catch(()=>setNeedsSound(true))}}>开启声音</button>}
 </div>;
}
export default function KasvuNestMobileDetail({onNavigate,onMenu}){
 const page=useRef(null),[position,setPosition]=useState(0);
 const [introReady,setIntroReady]=useState(false);
 useEffect(()=>{
  const element=page.current;let frame=0,release=0,locked=false;
  const wheel=event=>{
   event.preventDefault();if(locked||Math.abs(event.deltaY)<2)return;
   const current=element.scrollTop/element.clientHeight,stages=[0,1,2,3,4,5,6,7,8];
   const target=event.deltaY>0?stages.find(value=>value>current+.02):stages.reverse().find(value=>value<current-.02);
   if(target===undefined)return;locked=true;
   const start=element.scrollTop,end=target*element.clientHeight,began=performance.now();
   const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:800;
   const step=now=>{const t=duration?Math.min(1,(now-began)/duration):1;const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;element.scrollTop=start+(end-start)*eased;if(t<1)frame=requestAnimationFrame(step);else release=setTimeout(()=>{locked=false},250)};
   element.style.scrollSnapType='none';frame=requestAnimationFrame(step);
  };
  const restore=()=>{if(!locked)element.style.scrollSnapType='y mandatory'};
  element.addEventListener('wheel',wheel,{passive:false});element.addEventListener('touchstart',restore,{passive:true});
  return()=>{element.removeEventListener('wheel',wheel);element.removeEventListener('touchstart',restore);cancelAnimationFrame(frame);clearTimeout(release)};
 },[]);
 return <section className="kasvu-mobile-detail" role="dialog" aria-modal="false" aria-label="KasvuNest mobile project">
  <header className="product-mobile-header"><button onClick={onMenu} aria-label="Open navigation"><img src={icon('Hamburger Navigation')} alt=""/></button><button onClick={()=>onNavigate('Product')} aria-label="Go to home"><img src={icon('Home')} alt=""/></button><button className="product-mobile-about" onClick={()=>onNavigate('About Me')} aria-label="About Me"><img src={icon('About Me')} alt=""/></button></header>
  {position<.01&&<MobileScrollingBanner text="Build My Design Stamp by Stamp"/>}
  <div ref={page} className="kasvu-mobile-scroll kasvu-mobile-paged" onScroll={event=>setPosition(event.currentTarget.scrollTop/event.currentTarget.clientHeight)}>
   <section className="kasvu-mobile-screen kasvu-mobile-cover"><img className={introReady?'intro-ready':''} src={asset('Intro')} onLoad={event=>{event.currentTarget.decode().catch(()=>{}).then(()=>setIntroReady(true))}} alt="KasvuNest 2025–2026 project introduction"/></section>
   <section className="kasvu-mobile-screen"><div className="kasvu-mobile-research-box"><KasvuMobileMarkedArt name="P1-Question" alt="How might I" settled={Math.abs(position-1)<.003}/></div></section>
   <section className="kasvu-mobile-screen"><div className="kasvu-mobile-research-pair"><KasvuMobileMarkedArt name="P1-Nordic" alt="Nordic Home" settled={Math.abs(position-2)<.003}/><KasvuMobileMarkedArt name="P1-Plants" alt="Hydroponic Plants" settled={Math.abs(position-2)<.003}/></div></section>
   <KasvuMobileFlexible position={position}/>
   {Object.keys(dimensions).filter(name=>!['P1','P2'].includes(name)).map((name,index)=><section className={`kasvu-mobile-screen ${name==='P5'?'kasvu-mobile-photo-screen':name==='P7'?'kasvu-mobile-p6-screen kasvu-mobile-p7-screen':name==='P6'?'kasvu-mobile-p6-screen':''}`} key={name}><ProjectPage name={name} settled={Math.abs(position-index-4)<.003}/></section>)}
  </div>
 </section>;
}
