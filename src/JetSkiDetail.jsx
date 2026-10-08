import React, {useEffect,useRef,useState} from 'react';

const jetSkiPages=[{file:'P1.svg',width:1230,height:552},{file:'P2.svg',width:1280,height:720},{file:'P3.svg',width:1230,height:668}];
export default function JetSkiDetail({background,folder='Life-saving Jet Ski',title='Life-saving Jet Ski',pages=jetSkiPages,fillLastPage=false,fillAllPages=false,showIntro=true}){
 const scrollArea=useRef(null);
 const [position,setPosition]=useState(0);
 useEffect(()=>{
  const stages=[0,...pages.map((_,index)=>index+1)];
  const element=scrollArea.current;
  let frame=0,release=0,locked=false;
  const wheel=event=>{
   event.preventDefault();
   if(locked||Math.abs(event.deltaY)<2)return;
   const current=element.scrollTop/element.clientHeight;
   const target=event.deltaY>0?stages.find(value=>value>current+.02):[...stages].reverse().find(value=>value<current-.02);
   if(target===undefined)return;
   locked=true;
   const start=element.scrollTop,end=target*element.clientHeight,began=performance.now();
   const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:800;
   const step=now=>{
    const t=duration?Math.min(1,(now-began)/duration):1;
    const eased=t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
    element.scrollTop=start+(end-start)*eased;
    if(t<1)frame=requestAnimationFrame(step);
    else release=setTimeout(()=>{locked=false},250);
   };
   frame=requestAnimationFrame(step);
  };
  element.addEventListener('wheel',wheel,{passive:false});
  return()=>{element.removeEventListener('wheel',wheel);cancelAnimationFrame(frame);clearTimeout(release)};
 },[pages]);
 const photographColors=Array(6).fill('#000');
 const photograph=folder==='Photograph';
 return <div className="spaceship-detail-scene" style={photograph?{background:photographColors[Math.max(0,Math.min(5,Math.floor(position)-1))]}:undefined}>
  <div ref={scrollArea} className="kasvu-project-scroll" onScroll={event=>setPosition(event.currentTarget.scrollTop/event.currentTarget.clientHeight)}>
   <div className="jet-ski-scroll-track" style={{height:`${(pages.length+1)*100}dvh`}}><div className="kasvu-scroll-stage">
    <div className="jet-ski-cover" style={{transform:`translateY(${-100*Math.min(1,position)}%)`,visibility:position>=1?'hidden':'visible'}}>
     <img className="spaceship-detail-background" src={background} alt={`${title} project background`}/>
     {showIntro&&<img className="spaceship-detail-intro" src={`/OTHER/${encodeURIComponent(folder)}/Intro.svg`} alt={`${title} introduction`}/>}
    </div>
    {pages.map((page,index)=>{
     const entering=Math.min(1,Math.max(0,position-index));
     const leaving=Math.min(1,Math.max(0,position-index-1));
     return <div className={`jet-ski-page${fillAllPages||(fillLastPage&&index===pages.length-1)?' other-full-page':''}${photograph?' photograph-page':''}`} key={page.file} style={{top:folder==='Life-saving Jet Ski'&&index===2?`calc(${150-100*entering-110*leaving}% + 20px)`:`${150-100*entering-110*leaving}%`,visibility:entering===0?'hidden':'visible',background:photograph?photographColors[index]:undefined}}>
      <img src={`/OTHER/${encodeURIComponent(folder)}/${page.file}${photograph?'?v=black-background-1':''}`} alt={`${title} P${index+1}`} style={{width:`min(96.09375vw,calc((100dvh - 150px)*${page.width}/${page.height}))`,transform:photograph&&index===pages.length-1?'translateY(15px)':undefined}}/>
     </div>;
    })}
   </div></div>
  </div>
 </div>;
}
