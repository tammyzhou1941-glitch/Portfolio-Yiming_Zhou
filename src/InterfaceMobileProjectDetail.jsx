import React,{useEffect,useRef,useState} from 'react';
import MobileScrollingBanner from './MobileScrollingBanner.jsx';
const projects={'ayy_':{folder:'01 ayy',title:'ayy',count:4,introRatio:332/311},Glucora:{folder:'02 Glucora',title:'Glucora',count:4,introRatio:332/235},GoldenRoot:{folder:'03 GoldenRoot',title:'GoldenRoot UI',count:3,introRatio:332/255},'Old Market Hall':{folder:'04 Old Market Hall',title:'Old Market Hall',count:7,introRatio:332/291,pages:['P1','P2','P3','P4','P5','P6','P6-1']}};
const source=(folder,name)=>`/UI&UX/Mobile/${encodeURIComponent(folder)}/${encodeURIComponent(name)}.svg`;
const icon=name=>`/PRODUCT/Mobile/Components/${encodeURIComponent(name)}.svg`;
function AyyFinalVideo({settled}){
 const video=useRef(null);
 useEffect(()=>{
  const media=video.current;media.pause();media.muted=true;
  if(!settled)return;
  const timer=setTimeout(()=>media.play().catch(()=>{}),150);
  return()=>{clearTimeout(timer);media.pause();media.muted=true};
 },[settled]);
 return <div className="genelec-mobile-art"><svg viewBox="0 0 375 814" preserveAspectRatio="xMidYMid meet" aria-label="ayy project demonstration">
  <rect width="375" height="814" fill="#F4F4F4"/>
  <foreignObject x="22" y="97" width="331" height="648"><div xmlns="http://www.w3.org/1999/xhtml" style={{width:'100%',height:'100%',borderRadius:59,overflow:'hidden'}}><video ref={video} src="/UI&UX/Mobile/01%20ayy/Video.mp4" muted loop playsInline preload="metadata" aria-label="ayy app demonstration" style={{display:'block',width:'100%',height:'100%',objectFit:'cover',objectPosition:'center'}}/></div></foreignObject>
 </svg></div>;
}
function GlucoraFinalVideo({settled,src='/UI&UX/Mobile/02%20Glucora/Video.mp4',label='Glucora app demonstration'}){
 const video=useRef(null);
 useEffect(()=>{
  const media=video.current;media.pause();media.muted=true;
  if(!settled)return;
  const timer=setTimeout(()=>media.play().catch(()=>{}),150);
  return()=>{clearTimeout(timer);media.pause();media.muted=true};
 },[settled]);
 return <video ref={video} src={src} muted loop playsInline preload="metadata" aria-label={label} style={{display:'block',width:'100%',height:'100%',objectFit:'contain',objectPosition:'center'}}/>;
}
function GoldenRootUIVideos({settled}){
 const ref=useRef(null);
 useEffect(()=>{
  const media=[...ref.current.querySelectorAll('video')];media.forEach(video=>{video.pause();video.muted=true});
  if(!settled)return;
  const timer=setTimeout(()=>media.forEach(video=>video.play().catch(()=>{})),150);
  return()=>{clearTimeout(timer);media.forEach(video=>{video.pause();video.muted=true})};
 },[settled]);
 const videos=[['动画一.mp4',87,221],['动画八：单独储存仓.mp4',319,223]];
 return <div ref={ref} className="genelec-mobile-art"><svg viewBox="0 0 375 814" preserveAspectRatio="xMidYMid meet" aria-label="GoldenRoot UI demonstrations"><image href={source('03 GoldenRoot','P2')} width="375" height="814"/>{videos.map(([file,y,height])=><foreignObject key={file} x="12" y={y} width="350" height={height}><div xmlns="http://www.w3.org/1999/xhtml" style={{width:'100%',height:'100%',overflow:'hidden'}}><video src={`/UI&UX/Mobile/03%20GoldenRoot/${encodeURIComponent(file)}`} muted loop playsInline preload="metadata" aria-label={file} style={{width:'100%',height:'100%',display:'block',objectFit:'cover',transform:y===319?'scale(1.06)':'none'}}/></div></foreignObject>)}</svg></div>;
}
function Artwork({name,settled,folder,title}){
 const asset=name=>source(folder,name);
 const ref=useRef(null),[markup,setMarkup]=useState('');
 useEffect(()=>{if((['01 ayy','02 Glucora'].includes(folder)&&name==='P4')||(folder==='03 GoldenRoot'&&['P2','P3'].includes(name)))return;const controller=new AbortController();fetch(asset(name),{signal:controller.signal}).then(response=>response.text()).then(setMarkup).catch(()=>{});return()=>controller.abort()},[name,folder]);
 useEffect(()=>{
  if(!markup)return;
  if(true)ref.current.querySelector('svg')?.setAttribute('preserveAspectRatio','xMidYMid meet');
  const marks=[...ref.current.querySelectorAll('[stroke="#532F7A"], [stroke="#0037FF"], [stroke="#00FFF7"], [stroke="#E9E034"], [stroke="#757C2E"], [stroke="#8E230B"]')];
  marks.forEach(mark=>{mark.setAttribute('pathLength','1');mark.style.strokeDasharray='1';mark.style.strokeDashoffset='1'});
  if(!settled)return;
  const animations=[];
  const timer=setTimeout(()=>marks.forEach(mark=>animations.push(mark.animate([{strokeDashoffset:'1'},{strokeDashoffset:'0'}],{duration:window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:700,easing:'ease-in-out',fill:'forwards'}))),150);
  return()=>{clearTimeout(timer);animations.forEach(animation=>animation.cancel())};
 },[markup,settled]);
 if(folder==='01 ayy'&&name==='P4')return <AyyFinalVideo settled={settled}/>;
 if(folder==='02 Glucora'&&name==='P4')return <GlucoraFinalVideo settled={settled}/>;
 if(folder==='03 GoldenRoot'&&name==='P2')return <GoldenRootUIVideos settled={settled}/>;
 if(folder==='03 GoldenRoot'&&name==='P3')return <GlucoraFinalVideo settled={settled} src="/UI&UX/Mobile/03%20GoldenRoot/UI%20video.mp4" label="GoldenRoot UI demonstration"/>;
 return <div ref={ref} className="genelec-mobile-art" style={name==='P3'&&['01 ayy','02 Glucora'].includes(folder)?{transform:'scale(.9)',transformOrigin:'center'}:undefined} role="img" aria-label={`${title} ${name}`} dangerouslySetInnerHTML={{__html:markup}}/>;
}
export default function InterfaceMobileProjectDetail({project,onNavigate,onMenu}){
 const {folder,title,count,introRatio,pages}=projects[project];
 const asset=name=>source(folder,name);
 const scroll=useRef(null),[position,setPosition]=useState(0),[introReady,setIntroReady]=useState(false);
 useEffect(()=>{
  const element=scroll.current;let frame=0,timer=0,locked=false;
  const wheel=event=>{
   event.preventDefault();if(locked||Math.abs(event.deltaY)<2)return;
   const target=Math.max(0,Math.min(count,Math.round(element.scrollTop/element.clientHeight)+(event.deltaY>0?1:-1)));
   const start=element.scrollTop,end=target*element.clientHeight;if(start===end)return;
   locked=true;element.style.scrollSnapType='none';const began=performance.now();
   const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:800;
   const step=now=>{const t=duration?Math.min(1,(now-began)/duration):1;const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;element.scrollTop=start+(end-start)*eased;if(t<1)frame=requestAnimationFrame(step);else timer=setTimeout(()=>{locked=false;element.style.scrollSnapType='y mandatory'},250)};
   frame=requestAnimationFrame(step);
  };
  element.addEventListener('wheel',wheel,{passive:false});return()=>{element.removeEventListener('wheel',wheel);cancelAnimationFrame(frame);clearTimeout(timer)};
 },[count]);
 return <section className="kasvu-mobile-detail interface-mobile-detail" role="dialog" aria-label={`${title} mobile project`}>
  {!((project==='Glucora'&&position>=3.5)||(project==='GoldenRoot'&&position>=2.5))&&<header className="product-mobile-header"><button onClick={onMenu} aria-label="Open navigation"><img src={icon('Hamburger Navigation')} alt=""/></button><button onClick={()=>onNavigate('UI | UX')} aria-label="Back to UI and UX home"><img src={icon('Home')} alt=""/></button><button className="product-mobile-about" onClick={()=>onNavigate('About Me')} aria-label="About Me"><img src={icon('About Me')} alt=""/></button></header>}
  {position<.01&&<MobileScrollingBanner text="Check My Folders"/>}
  <div ref={scroll} className="kasvu-mobile-scroll kasvu-mobile-paged" onScroll={event=>setPosition(event.currentTarget.scrollTop/event.currentTarget.clientHeight)}>
   <section className="kasvu-mobile-screen kasvu-mobile-cover interface-mobile-project-cover"><img className="interface-mobile-cover-background" src={asset('Background')} alt=""/><img style={{width:`min(88.8vw,calc((var(--mobile-visible-height, 100dvh) - 27.467vw - 28px)*${introRatio}))`}} className={introReady?'intro-ready':''} src={asset('Intro')} onLoad={event=>event.currentTarget.decode().catch(()=>{}).then(()=>setIntroReady(true))} alt={`${title} project introduction`}/></section>
   {Array.from({length:count},(_,index)=><section className={`kasvu-mobile-screen genelec-mobile-full-screen`} style={folder==='01 ayy'&&index===count-1?{background:'#F4F4F4'}:folder==='04 Old Market Hall'&&index<count-1?{background:'#F0EBE8'}:undefined} key={index}><Artwork folder={folder} title={title} name={pages?.[index]||`P${index+1}`} settled={Math.abs(position-index-1)<.003}/></section>)}
  </div>
 </section>;
}
