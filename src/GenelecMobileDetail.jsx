import React,{useEffect,useRef,useState} from 'react';
import MobileScrollingBanner from './MobileScrollingBanner.jsx';
const asset=name=>`/PRODUCT/Mobile/02%20Genelec/${encodeURIComponent(name==='P10'?'P10-Adjusted':name)}.svg`;
const icon=name=>`/PRODUCT/Mobile/Components/${encodeURIComponent(name)}.svg`;
function Artwork({name,settled}){
 const ref=useRef(null),[markup,setMarkup]=useState('');
 useEffect(()=>{if(name==='P10')return;const controller=new AbortController();fetch(asset(name),{signal:controller.signal}).then(response=>response.text()).then(setMarkup).catch(()=>{});return()=>controller.abort()},[name]);
 useEffect(()=>{
  if(!markup)return;
  if(name!=='P5')ref.current.querySelector('svg')?.setAttribute('preserveAspectRatio','xMidYMid slice');
  const marks=[...ref.current.querySelectorAll('[stroke="#61DE28"]')];
  marks.forEach(mark=>{mark.style.clipPath='inset(0 100% 0 0)';mark.style.transformBox='fill-box'});
  if(!settled)return;
  const animations=[];
  const timer=setTimeout(()=>marks.forEach(mark=>animations.push(mark.animate([{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0% 0 0)'}],{duration:window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:700,easing:'ease-in-out',fill:'forwards'}))),150);
  return()=>{clearTimeout(timer);animations.forEach(animation=>animation.cancel())};
 },[markup,settled]);
 if(name==='P10')return <div className="genelec-mobile-art"><img className="genelec-mobile-final-image" src={asset(name)} alt="Genelec SONA final project images"/></div>;
 return <div ref={ref} className="genelec-mobile-art" role="img" aria-label={`Genelec SONA ${name}`} dangerouslySetInnerHTML={{__html:markup}}/>;
}
export default function GenelecMobileDetail({onNavigate,onMenu}){
 const scroll=useRef(null),[position,setPosition]=useState(0),[introReady,setIntroReady]=useState(false);
 useEffect(()=>{
  const element=scroll.current;let frame=0,timer=0,locked=false;
  const wheel=event=>{
   event.preventDefault();if(locked||Math.abs(event.deltaY)<2)return;
   const target=Math.max(0,Math.min(10,Math.round(element.scrollTop/element.clientHeight)+(event.deltaY>0?1:-1)));
   const start=element.scrollTop,end=target*element.clientHeight;if(start===end)return;
   locked=true;element.style.scrollSnapType='none';const began=performance.now();
   const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:800;
   const step=now=>{const t=duration?Math.min(1,(now-began)/duration):1;const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;element.scrollTop=start+(end-start)*eased;if(t<1)frame=requestAnimationFrame(step);else timer=setTimeout(()=>{locked=false;element.style.scrollSnapType='y mandatory'},250)};
   frame=requestAnimationFrame(step);
  };
  element.addEventListener('wheel',wheel,{passive:false});return()=>{element.removeEventListener('wheel',wheel);cancelAnimationFrame(frame);clearTimeout(timer)};
 },[]);
 return <section className="kasvu-mobile-detail genelec-mobile-detail" role="dialog" aria-label="Genelec SONA mobile project">
  <header className="product-mobile-header"><button onClick={onMenu} aria-label="Open navigation"><img src={icon('Hamburger Navigation')} alt=""/></button><button onClick={()=>onNavigate('Product')} aria-label="Go to home"><img src={icon('Home')} alt=""/></button><button className="product-mobile-about" onClick={()=>onNavigate('About Me')} aria-label="About Me"><img src={icon('About Me')} alt=""/></button></header>
  {position<.01&&<MobileScrollingBanner text="Build My Design Stamp by Stamp"/>}
  <div ref={scroll} className="kasvu-mobile-scroll kasvu-mobile-paged" onScroll={event=>setPosition(event.currentTarget.scrollTop/event.currentTarget.clientHeight)}>
   <section className="kasvu-mobile-screen kasvu-mobile-cover genelec-mobile-cover"><img className={introReady?'intro-ready':''} src={asset('Intro')} onLoad={event=>event.currentTarget.decode().catch(()=>{}).then(()=>setIntroReady(true))} alt="Genelec SONA project introduction"/></section>
   {Array.from({length:10},(_,index)=><section className={`kasvu-mobile-screen${index!==4?' genelec-mobile-full-screen':''}`} key={index}><Artwork name={`P${index+1}`} settled={Math.abs(position-index-1)<.003}/></section>)}
  </div>
 </section>;
}
