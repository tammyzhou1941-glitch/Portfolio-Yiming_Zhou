import React,{useEffect,useRef,useState} from 'react';
import versions from './kasvuMobileVersions.json';
function FlexibleGroup({index,progress,active}){
 const video=useRef(null);
 const visible=progress>=.999&&active;
 useEffect(()=>{const media=video.current;if(visible)media.play().catch(()=>{});else media.pause();return()=>media.pause()},[visible]);
 const label=`Flexible-Label-${index+1}`;
 return <div className="kasvu-flexible-group" style={{transform:`translateY(${(1-progress)*100}dvh)`,opacity:progress===0?0:1}}>
  <div className="kasvu-flexible-video-frame"><video ref={video} src={`/PRODUCT/Mobile/01%20KasvuNest/Video/0${index+1}-1-Cropped.mp4`} muted loop playsInline preload="metadata" aria-label={['Versatile in form','Supports different types of plants','Adaptable to Nordic home environments'][index]}/></div>
  <img className="kasvu-flexible-label" style={{width:`${[123,218,264][index]/331*100}%`}} src={`/PRODUCT/Mobile/01%20KasvuNest/${label}.svg?v=${versions[label+'.svg']}`} alt={['Versatile in form','Supports different types of plants','Adaptable to Nordic home environments'][index]}/>
 </div>;
}
export default function KasvuMobileFlexible({position}){
 const active=Math.abs(position-3)<.003;
 const [elapsed,setElapsed]=useState(0);
 useEffect(()=>{
  setElapsed(0);if(!active)return;
  let frame=0;const began=performance.now();
  const step=now=>{const time=window.matchMedia('(prefers-reduced-motion: reduce)').matches?1050:now-began;setElapsed(time);if(time<1050)frame=requestAnimationFrame(step)};
  frame=requestAnimationFrame(step);return()=>cancelAnimationFrame(frame);
 },[active]);
 return <section className="kasvu-flexible-track kasvu-flexible-automatic"><div className="kasvu-flexible-stage"><div className="kasvu-flexible-stack">
  <div className="kasvu-flexible-heading"><img src={`/PRODUCT/Mobile/01%20KasvuNest/Flexible-Title-Foreground.svg?v=${versions['Flexible-Title-Foreground.svg']}`} alt="Flexible"/></div>
  {[0,1,2].map(index=>{const t=Math.min(1,Math.max(0,(elapsed-index*200)/650));return <FlexibleGroup key={index} index={index} active={active} progress={1-Math.pow(1-t,3)}/>})}
 </div></div></section>;
}
