import React,{useState} from 'react';
const asset=file=>`/ABOUT%20ME/Mobile/Components/${encodeURIComponent(file)}.svg`;
export default function AboutMobileHome({onNavigate,onMenu}){
 const [flipped,setFlipped]=useState(false);
 const banner=asset('Scrolling Banner');
 return <section className="about-mobile-home" aria-label="About Yiming Zhou">
  <header className="product-mobile-header"><button onClick={onMenu} aria-label="Open navigation"><img src={asset('Hamburger Navigation')} alt=""/></button><button onClick={()=>onNavigate('Product')} aria-label="Go to home"><img src={asset('Home')} alt=""/></button><button className="product-mobile-about" aria-label="About Me selected" onClick={()=>setFlipped(false)}><img src={asset('About Me')} alt=""/></button></header>
  <div className="product-mobile-banner"><div><img src={banner} alt="Hi! This is Yiming"/><img src={banner} alt="" aria-hidden="true"/></div></div>
  <button className={`about-mobile-card${flipped?' is-flipped':''}`} aria-label={flipped?'Show About Me card front':'Flip About Me card to skills'} aria-pressed={flipped} onClick={()=>setFlipped(value=>!value)}>
   <span className="about-mobile-card-turn"><img className="about-mobile-card-front" src={asset('Making Mode')} alt="About Yiming Zhou, profile and personal strengths" aria-hidden={flipped}/><img className="about-mobile-card-back" src={asset('Making Mode_Back_Clean')} alt="Yiming Zhou introduction, soft skills and hard skills" aria-hidden={!flipped}/></span>
  </button>
 </section>;
}
