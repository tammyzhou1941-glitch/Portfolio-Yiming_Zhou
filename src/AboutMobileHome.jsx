import MobileScrollingBanner from './MobileScrollingBanner.jsx';
import React,{useState,useEffect,useRef} from 'react';
const asset=file=>`/ABOUT%20ME/Mobile/Components/${encodeURIComponent(file)}.svg`;
export default function AboutMobileHome({onNavigate,onMenu}){
 const [flipped,setFlipped]=useState(false);
 const [turning,setTurning]=useState(false);
 const turnTimer=useRef(null);
 useEffect(()=>()=>clearTimeout(turnTimer.current),[]);
 const flip=()=>{if(turning)return;setTurning(true);setFlipped(value=>!value);turnTimer.current=setTimeout(()=>setTurning(false),650)};
 const banner=asset('Scrolling Banner');
 return <section className="about-mobile-home" aria-label="About Yiming Zhou">
  <header className="product-mobile-header"><button onClick={onMenu} aria-label="Open navigation"><img src={asset('Hamburger Navigation')} alt=""/></button><button onClick={()=>onNavigate('Product')} aria-label="Go to home"><img src={asset('Home')} alt=""/></button><button className="product-mobile-about" aria-label="About Me selected" onClick={()=>setFlipped(false)}><img src={asset('About Me')} alt=""/></button></header>
  <MobileScrollingBanner text="Hi! This is Yiming"/>
  <button className={`about-mobile-card${flipped?' is-flipped':''}${turning?' is-turning':''}`} aria-label={flipped?'Show About Me card front':'Flip About Me card to skills'} aria-pressed={flipped} onClick={flip}>
   <span className="about-mobile-card-turn"><span className="about-mobile-card-front" aria-hidden={flipped}><img className="about-mobile-front-art" src="/ABOUT%20ME/Mobile/Components/Moblie%20About%20Me_Front.png" alt="About Yiming Zhou, profile and personal strengths"/><span className="about-mobile-more-clear" aria-hidden="true"/><img className="about-mobile-more-pulse" src="/ABOUT%20ME/Mobile/To%20Know%20More-Red-Pulse.svg" alt="" aria-hidden="true"/></span><img className="about-mobile-card-back" src="/ABOUT%20ME/Mobile/Components/Moblie%20About%20Me_Back.png" alt="Yiming Zhou introduction, soft skills and hard skills" aria-hidden={!flipped}/></span>
  </button>
 </section>;
}
