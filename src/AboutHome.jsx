import React, { useRef, useState } from 'react';

const cards = [
 {file:'Card_Left.svg', back:'Card_Left_Back.svg', profile:true, label:'About Me ? Yiming Zhou', left:76, top:115, width:308},
 {file:'Thinking Mode_Front_Interactive.svg', back:'Thinking Mode_Back.svg', label:'Thinking Mode', left:489, top:171, width:308},
 {file:'Making Mode_Front_Interactive.svg', back:'Making Mode_Back.svg', label:'Making Mode', left:903, top:171, width:308},
];

export default function AboutHome(){
 const [flipped,setFlipped]=useState({});
 const profileFlipped=Object.values(flipped).some(Boolean);
 const canvas=useRef(null);
 const reveal=()=>{setFlipped(Object.fromEntries(cards.filter(card=>!card.profile).map(card=>[card.file,true])));canvas.current?.focus({preventScroll:true});};
 const returnToFront=file=>{setFlipped(current=>({...current,[file]:false}));canvas.current?.focus({preventScroll:true});};
 return <section ref={canvas} tabIndex={-1} className="about-uploaded-canvas" aria-label="About Yiming Zhou">
  {cards.map(card=><div key={card.file} className={`about-uploaded-card ${card.profile?'about-profile-card':'about-flip-card'} ${flipped[card.file]?'is-flipped':''}`} style={{left:`${card.left/1280*100}%`,top:`${card.top/832*100}%`,width:`${card.width/1280*100}%`}}>
   {card.profile?<img className="about-card-image" src={`/ABOUT%20ME/${encodeURIComponent(profileFlipped?card.back:card.file)}`} alt={card.label} draggable="false"/>:<div className="about-card-rotator">
    <div className="about-card-front" aria-hidden={!!flipped[card.file]} inert={!!flipped[card.file]}>
     <img className="about-card-image" src={`/ABOUT%20ME/${encodeURIComponent(card.file)}`} alt={`${card.label} front`} draggable="false"/>
     <button className="about-know-more" aria-label={`To know more about ${card.label}`} onClick={reveal}><img src="/ABOUT%20ME/To%20Know%20More.svg" alt="To know more"/></button>
    </div>
    <button className="about-card-back about-card-back-button" aria-label={`Flip ${card.label} back to front`} aria-hidden={!flipped[card.file]} inert={!flipped[card.file]} onClick={()=>returnToFront(card.file)}><img className="about-card-image" src={`/ABOUT%20ME/${encodeURIComponent(card.back)}`} alt={`${card.label} back`} draggable="false"/></button>
   </div>}
  </div>)}
 </section>;
}
