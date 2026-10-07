import React,{useEffect,useRef} from 'react';
import KasvuMobileMarkedArt from './KasvuMobileMarkedArt.jsx';
import marks from './kasvuMobileMarks.json';
const asset=file=>`/PRODUCT/Mobile/01%20KasvuNest/${encodeURIComponent(file)}.svg`;
const icon=file=>`/PRODUCT/Mobile/Components/${encodeURIComponent(file)}.svg`;
const video=file=>`/PRODUCT/01%20KasvuNest/Video/${encodeURIComponent(file)}`;
export default function KasvuNestMobileDetail({onNavigate,onMenu,onPrevious,onNext}){
 const page=useRef(null);
 useEffect(()=>{
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting)entry.target.classList.add('is-visible');
   entry.target.querySelectorAll('video').forEach(media=>{if(entry.isIntersecting)media.play().catch(()=>{});else media.pause()});
  }),{root:page.current,threshold:.12});
  page.current.querySelectorAll('.kasvu-mobile-reveal').forEach(element=>observer.observe(element));
  const videos=[...page.current.querySelectorAll('video')];
  return()=>{observer.disconnect();videos.forEach(media=>{media.pause();media.muted=true})};
 },[]);
 const image=(file,full=false)=><section className={`kasvu-mobile-reveal kasvu-mobile-art${full?' full-width':''}`}>{marks[file]?<KasvuMobileMarkedArt name={file} alt={`KasvuNest ${file}`}/>:<img src={asset(file)} alt={`KasvuNest ${file}`} loading="lazy"/>}</section>;
 return <section className="kasvu-mobile-detail" role="dialog" aria-modal="false" aria-label="KasvuNest mobile project">
  <header className="product-mobile-header"><button onClick={onMenu} aria-label="Open navigation"><img src={icon('Hamburger Navigation')} alt=""/></button><button onClick={()=>onNavigate('Product')} aria-label="Go to home"><img src={icon('Home')} alt=""/></button><button className="product-mobile-about" onClick={()=>onNavigate('About Me')} aria-label="About Me"><img src={icon('About Me')} alt=""/></button></header>
  <div className="product-mobile-banner"><div><img src={icon('Scrolling Banner')} alt="Build My Design Stamp"/><img src={icon('Scrolling Banner')} alt="" aria-hidden="true"/></div></div>
  <div ref={page} className="kasvu-mobile-scroll">
   <section className="kasvu-mobile-intro"><img src={asset('Intro')} alt="KasvuNest 2025–2026 project introduction"/></section>
   <div className="kasvu-mobile-research">{image('How Might I')}{image('Nordic Home')}{image('Hydroponic Plants')}</div>
   <section className="kasvu-mobile-reveal kasvu-mobile-flexible"><KasvuMobileMarkedArt name="Flexible" alt="Flexible: versatile in form, supports different plants and adapts to Nordic homes"/>{['01-1.mp4','02-1.mp4','03-1.mp4'].map((file,index)=><video key={file} style={{top:`${[93,314,536][index]/721*100}%`}} src={video(file)} muted loop playsInline preload="metadata" aria-label={`Flexible demonstration ${index+1}`}/>)}</section>
   <section className="kasvu-mobile-reveal kasvu-mobile-composition"><img src={asset('What makes up my product')} alt="What makes up my product?"/><video src={video('Made Up.mp4')} muted loop playsInline preload="metadata" aria-label="Product composition demonstration"/></section>
   <section className="kasvu-mobile-reveal kasvu-mobile-ideation"><img src={asset('Ideation')} alt="How many possibilities does my product have?"/><video src={video('Possibilities.mp4')} muted loop playsInline preload="metadata" aria-label="KasvuNest possibilities"/></section>
   {image('P1',true)}{image('P2')}{image('P3')}
  </div>
  <button className="kasvu-intro-nav kasvu-intro-previous spaceship-back" onClick={onPrevious} aria-label="Previous product project"><img src="