import React,{useEffect,useRef,useState} from 'react';
import MobileScrollingBanner from './MobileScrollingBanner.jsx';
const projects={
 Spaceship:{folder:'01 Spaceship',introRatio:332/239,pages:['P1']},
 'Life-saving jet ski':{folder:'02 Life-saving Jet Ski',introRatio:333/221,pages:['P1']},
 Chair:{folder:'03 RelaxChair',introRatio:333/158,pages:['P1','P2']},
 Photography:{folder:'04 Photo',pages:['P1','P2','P3'],photos:true},
 Lamp:{folder:'05 Light',introRatio:333/175,background:'Background.png',pages:['P1'],photos:true},
};
const icon=name=>`/PRODUCT/Mobile/Components/${encodeURIComponent(name)}.svg`;
export default function OtherMobileDetail({project,onNavigate,onMenu}){
 const config=projects[project],asset=name=>`/OTHER/Mobile/${encodeURIComponent(config.folder)}/${encodeURIComponent(name.includes('.')?name:name+'.svg')}`;
 const scroll=useRef(null),[position,setPosition]=useState(0),[introReady,setIntroReady]=useState(false);
 const last=config.pages.length-(config.introRatio?0:1);
 useEffect(()=>{
  const element=scroll.current;let frame=0,timer=0,locked=false;
  const wheel=event=>{
   event.preventDefault();if(locked||Math.abs(event.deltaY)<2)return;
   const target=Math.max(0,Math.min(last,Math.round(element.scrollTop/element.clientHeight)+(event.deltaY>0?1:-1)));
   const start=element.scrollTop,end=target*element.clientHeight;if(start===end)return;
   locked=true;element.style.scrollSnapType='none';const began=performance.now();
   const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:800;
   const step=now=>{const t=duration?Math.min(1,(now-began)/duration):1;const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;element.scrollTop=start+(end-start)*eased;if(t<1)frame=requestAnimationFrame(step);else timer=setTimeout(()=>{locked=false;element.style.scrollSnapType='y mandatory'},250)};
   frame=requestAnimationFrame(step);
  };
  element.addEventListener('wheel',wheel,{passive:false});return()=>{element.removeEventListener('wheel',wheel);cancelAnimationFrame(frame);clearTimeout(timer)};
 },[last]);
 return <section className={`kasvu-mobile-detail other-mobile-detail${project==='Life-saving jet ski'?' other-mobile-jet-ski':''}`} role="dialog" aria-label={`${project} mobile project`}>
  <header className="product-mobile-header"><button onClick={onMenu} aria-label="Open navigation"><img src={icon('Hamburger Navigation')} alt=""/></button><button onClick={()=>onNavigate('Other')} aria-label="Back to Other home"><img src={icon('Home')} alt=""/></button><button className="product-mobile-about" onClick={()=>onNavigate('About Me')} aria-label="About Me"><img src={icon('About Me')} alt=""/></button></header>
  {position<.01&&<MobileScrollingBanner text="Welcome to My Sketching Book"/>}
  <div ref={scroll} className="kasvu-mobile-scroll kasvu-mobile-paged" onScroll={event=>setPosition(event.currentTarget.scrollTop/event.currentTarget.clientHeight)}>
   {config.introRatio&&<section className="kasvu-mobile-screen kasvu-mobile-cover interface-mobile-project-cover"><img className="interface-mobile-cover-background" src={asset(config.background||'Background')} alt=""/><img style={{width:`min(88.8vw,calc((100dvh - 27.467vw - 28px)*${config.introRatio}))`}} className={introReady?'intro-ready':''} src={asset('Intro')} onLoad={event=>event.currentTarget.decode().catch(()=>{}).then(()=>setIntroReady(true))} alt={`${project} introduction`}/></section>}
   {config.pages.map(name=><section className="kasvu-mobile-screen genelec-mobile-full-screen" key={name}><img className={`other-mobile-detail-art${config.photos||(project==='Life-saving jet ski'&&name==='P1')?' other-mobile-detail-photo':''}`} style={name==='P1'&&['Spaceship','Chair'].includes(project)?{transform:`scale(${project==='Chair'?.8:.9})`,transformOrigin:'center'}:undefined} src={asset(name)} alt={`${project} ${name}`}/></section>)}
  </div>
 </section>;
}
