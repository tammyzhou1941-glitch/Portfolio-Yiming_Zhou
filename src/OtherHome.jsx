import React, { useEffect, useState } from 'react';
import JetSkiDetail from './JetSkiDetail.jsx';
import OtherMobileHome from './OtherMobileHome.jsx';

const jetSkiBackground='/OTHER/Life-saving%20Jet%20Ski/Background.svg?v=601705c4b11c';
const otherProjectOrder=['Spaceship','Life-saving jet ski','Chair','Photography','Lamp'];
const chairPages=[{file:'P1.svg',width:1232,height:488},{file:'P2.svg',width:1280,height:832}];
const photographPages=[832,837,832,832,837,832].map((height,index)=>({file:`P${index+1}.svg`,width:index===5?1279:1280,height}));
const lightPages=[{file:'P1.svg',width:1280,height:832}];

const sketches = [
 {file:'Spaceship',alt:'Racing spaceship conceptual design',x:190,y:145,width:511,layer:2},
 {file:'Life-saving jet ski',alt:'Life-saving jet ski transport design',x:249,y:322,width:507,layer:3},
 {file:'Chair',alt:'Spherical Light Therapy Lounge Chair',x:194,y:520,width:426,layer:2},
 {file:'Photography',alt:'Travel photographs in a vertical filmstrip',x:646,y:85,width:218,layer:1},
 {file:'Lamp',alt:'Colorful pendant lamp photograph',x:860,y:546,width:169,layer:2},
];

export default function OtherHome({onNavigate,onMenu,onDetailChange}){
 const [openedProject,setOpenedProject]=useState(null);
 const [slideDirection,setSlideDirection]=useState(0);
 useEffect(()=>{onDetailChange(Boolean(openedProject));return()=>onDetailChange(false)},[Boolean(openedProject),onDetailChange]);
 const changeProject=direction=>{
  const index=otherProjectOrder.indexOf(openedProject);
  setSlideDirection(direction);
  setOpenedProject(otherProjectOrder[(index+direction+otherProjectOrder.length)%otherProjectOrder.length]);
 };
 useEffect(()=>{
  if(!openedProject)return;
  const previousOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  const close=event=>{if(event.key==='Escape')setOpenedProject(null)};
  window.addEventListener('keydown',close);
  return()=>{document.body.style.overflow=previousOverflow;window.removeEventListener('keydown',close)};
 },[openedProject]);
 return <section className="other-home" aria-label="Other design explorations">
 {!openedProject&&<OtherMobileHome onNavigate={onNavigate} onMenu={onMenu} onOpen={project=>{setSlideDirection(0);setOpenedProject(project)}}/>}
 <div className="other-canvas">
  <img className="other-board" src="/OTHER/Homepage/Sketching%20Book%20Background.jpg?v=3b368e8f" alt="An open dot-grid sketchbook with gold binder clips"/>
  {sketches.map(sketch=>{
   const style={left:`${sketch.x/1280*100}%`,top:`${sketch.y/832*100}%`,width:`${sketch.width/1280*100}%`,zIndex:sketch.layer};
   const image=<img src={`/OTHER/Homepage/Sketches/${encodeURIComponent(sketch.file)}.svg`} alt={sketch.alt} draggable="false"/>;
   return otherProjectOrder.includes(sketch.file)?<button className="other-sketch other-sketch-button" key={sketch.file} style={style} onClick={()=>{setSlideDirection(0);setOpenedProject(sketch.file)}} aria-label={`Open ${sketch.alt}`}>{image}</button>:<img className="other-sketch" key={sketch.file} src={`/OTHER/Homepage/Sketches/${encodeURIComponent(sketch.file)}.svg`} alt={sketch.alt} draggable="false" style={style}/>;
  })}
 </div>
 {openedProject&&<>
  <section key={openedProject} className={`spaceship-detail spaceship-detail-sequential ${['Life-saving jet ski','Chair'].includes(openedProject)?(openedProject==='Chair'?'chair-detail':'jet-ski-detail'):''} ${slideDirection===1?'other-slide-next':slideDirection===-1?'other-slide-last':''}`} role="dialog" aria-modal="false" aria-label={openedProject}>
   {openedProject==='Life-saving jet ski'?<JetSkiDetail background={jetSkiBackground}/>:openedProject==='Chair'?<JetSkiDetail background="/OTHER/RelaxChair/Background.svg" folder="RelaxChair" title="Chair" pages={chairPages} fillLastPage/>:openedProject==='Photography'?<JetSkiDetail background="/OTHER/Photograph/Background.svg" folder="Photograph" title="Photograph" pages={photographPages} showIntro={false} fillAllPages/>:openedProject==='Lamp'?<JetSkiDetail background="/OTHER/Light/Background.svg" folder="Light" title="Light" pages={lightPages} fillLastPage/>:<div className="spaceship-detail-scene">
    {(openedProject==='Spaceship'||jetSkiBackground)&&<img className="spaceship-detail-background" src={openedProject==='Spaceship'?'/OTHER/Spaceship/Background.svg?v=9f4baa0656ca':jetSkiBackground} alt={openedProject==='Spaceship'?'Racing spaceship flying above a planet':'Rescue jet ski on the sea'}/>}
    <img className="spaceship-detail-intro" src={openedProject==='Spaceship'?'/OTHER/Spaceship/Intro.svg':'/OTHER/Life-saving%20Jet%20Ski/Intro.svg'} alt={`${openedProject} project introduction`}/>
   </div>}
  </section>
  <button className="kasvu-intro-nav kasvu-intro-previous spaceship-back" onClick={()=>changeProject(-1)} aria-label="Previous Other project"><img src="/Components/Last.svg" alt=""/></button>
  <button className="kasvu-intro-nav kasvu-intro-next spaceship-back" onClick={()=>changeProject(1)} aria-label="Next Other project"><img src="/Components/Next.svg" alt=""/></button>
 </>}
 </section>;
}
