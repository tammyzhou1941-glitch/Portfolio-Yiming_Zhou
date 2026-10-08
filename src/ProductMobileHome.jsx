import MobileScrollingBanner from './MobileScrollingBanner.jsx';
import React, {useEffect,useRef,useState} from 'react';
import {productStickers} from './ProductHome.jsx';

const asset=file=>`/PRODUCT/Mobile/Components/${encodeURIComponent(file)}.svg`;
const stamps=[['KasvNest','KasvuNest'],['Genelec','G-Headphone'],['Paperend','Paperend'],['Altafuse','Altafuse'],['GlodenRoot','GoldenRoot'],['SM-Little Peach Blossom','SM-Little Peach Blossom']];
export default function ProductMobileHome({onOpen,onNavigate,onMenu}){
 const [activeStamp,setActiveStamp]=useState(null);
 const openTimer=useRef(null);
 useEffect(()=>()=>clearTimeout(openTimer.current),[]);
 const selectStamp=(file,project)=>{
  if(openTimer.current!==null)return;
  setActiveStamp(file);
  openTimer.current=setTimeout(()=>{
   openTimer.current=null;
   onOpen(productStickers.find(sticker=>sticker.file===project));
   setActiveStamp(null);
  },250);
 };
 return <section className="product-mobile-home" aria-label="Product designs on mobile">
  <div className="product-mobile-edge product-mobile-edge-top" aria-hidden="true"/>
  <div className="product-mobile-edge product-mobile-edge-bottom" aria-hidden="true"/>
  <header className="product-mobile-header">
   <button onClick={onMenu} aria-label="Open navigation"><img src={asset('Hamburger Navigation')} alt=""/></button>
   <button onClick={()=>onNavigate('Product')} aria-label="Go to home"><img src={asset('Home')} alt=""/></button>
   <button className="product-mobile-about" onClick={()=>onNavigate('About Me')} aria-label="About Me"><img src={asset('About Me')} alt=""/></button>
  </header>
  <MobileScrollingBanner text="Build My Design Stamp by Stamp"/>
  <div className="product-mobile-stamps">{stamps.map(([file,project],index)=><button className={`product-mobile-stamp stamp-${index}${activeStamp===file?' stamp-selected':''}`} key={file} aria-label={`Explore ${project}`} onClick={()=>selectStamp(file,project)}>
   <img src={`/PRODUCT/Mobile/Stamps/Black%20&%20White/${encodeURIComponent(file)}.svg`} alt=""/>
   <img className="product-mobile-stamp-color" src={`/PRODUCT/Mobile/Stamps/Colorful/${encodeURIComponent(file)}.svg`} alt="" aria-hidden="true"/>
  </button>)}</div>
  <nav className="product-mobile-navigation" aria-label="Mobile section navigation">
   <div className="product-mobile-pills"><button onClick={()=>onNavigate('Other')} aria-label="Other"><img src={asset('Other')} alt=""/></button><button onClick={()=>onNavigate('Product')} aria-current="page" aria-label="Product"><img src={asset('Product')} alt=""/></button><button onClick={()=>onNavigate('UI | UX')} aria-label="UI and UX"><img src={asset('UI _ UX')} alt=""/></button></div>
   <img className="product-mobile-indicator" src={asset('Page Indicator')} alt="Product section selected"/>
  </nav>
 </section>;
}
