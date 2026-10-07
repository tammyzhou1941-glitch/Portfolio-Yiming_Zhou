import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

export default function KasvuNestIntro({onClose}){
 const closeButton=useRef(null);
 useEffect(()=>{
  const previous=document.activeElement;
  closeButton.current?.focus();
  return()=>previous?.focus();
 },[]);
 return <div className="modal-backdrop kasvu-intro-backdrop" onClick={onClose}>
  <section className="kasvu-intro-window" role="dialog" aria-modal="true" aria-label="KasvuNest introduction" onClick={e=>e.stopPropagation()} onKeyDown={e=>{if(e.key==='Tab'){e.preventDefault();closeButton.current?.focus()}}}>
   <button ref={closeButton} className="circle kasvu-intro-close" aria-label="Close KasvuNest introduction" onClick={onClose}><X size={20}/></button>
   <img className="kasvu-intro-image" src="/PRODUCT/01%20KasvuNest/Intro.svg" alt="KasvuNest project introduction"/>
  </section>
 </div>;
}
