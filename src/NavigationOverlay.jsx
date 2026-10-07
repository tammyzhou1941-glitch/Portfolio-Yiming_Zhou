import React, { useEffect, useRef, useState } from 'react';

const links = [
 {label:'Product Design',page:'Product',y:78},
 {label:'UI / UX Design',page:'UI | UX',y:172},
 {label:'Other Projects',page:'Other',y:266},
 {label:'About Me',page:'About Me',y:360},
 {label:'Contact',y:454},
];

export default function NavigationOverlay({onNavigate,onClose}){
 const panel=useRef(null), timer=useRef(null), closingRef=useRef(false);
 const [closing,setClosing]=useState(false);
 const dismiss=(afterClose)=>{
  if(closingRef.current)return;
  closingRef.current=true;
  setClosing(true);
  const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:450;
  timer.current=window.setTimeout(()=>{onClose();afterClose?.();},duration);
 };
 useEffect(()=>{
  const previous=document.activeElement;
  const items=panel.current.querySelectorAll('button,a');
  items[0]?.focus();
  const trap=e=>{
   if(e.key==='Escape'){e.preventDefault();dismiss();return;}
   if(e.key!=='Tab')return;
   if(e.shiftKey&&document.activeElement===items[0]){e.preventDefault();items[items.length-1].focus();}
   else if(!e.shiftKey&&document.activeElement===items[items.length-1]){e.preventDefault();items[0].focus();}
  };
  document.addEventListener('keydown',trap);
  return()=>{window.clearTimeout(timer.current);document.removeEventListener('keydown',trap);previous?.focus();};
 },[]);
 return <div className={`navigation-overlay ${closing?'is-closing':''}`} onClick={()=>dismiss()}>
  <button className="navigation-shade" onClick={()=>dismiss()} tabIndex={-1} aria-label="Close navigation"/>
  <section ref={panel} className="navigation-panel" role="dialog" aria-modal="true" aria-label="Navigation">
   <img className="navigation-art" src="/PRODUCT/Homepage/Navigation%20Overlay.svg" alt="" aria-hidden="true"/>
   <nav aria-label="Site sections">{links.map(link=>link.page?<button className="navigation-hit" key={link.label} aria-label={link.label} onClick={e=>{e.stopPropagation();dismiss(()=>onNavigate(link.page));}} style={{top:`${link.y/832*100}%`}}/>:<a className="navigation-hit" key={link.label} aria-label="Contact Yiming by email" href="mailto:tammyzhou1941@gmail.com" onClick={()=>dismiss()} style={{top:`${link.y/832*100}%`}}/>)}</nav>
   <button className="navigation-close-hit" aria-label="Close navigation" onClick={()=>dismiss()}/>
  </section>
 </div>;
}
