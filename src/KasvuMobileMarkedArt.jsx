import React,{useEffect,useId,useRef,useState} from 'react';
import marks from './kasvuMobileMarks.json';
import versions from './kasvuMobileVersions.json';
export default function KasvuMobileMarkedArt({name,alt,settled=false}){
 const container=useRef(null),id=useId().replace(/:/g,'');
 const [amount,setAmount]=useState(0);
 useEffect(()=>{
  setAmount(0);
  if(!settled)return;
  let frame=0;
  const timer=setTimeout(()=>{
    const began=performance.now();
    const draw=now=>{const t=window.matchMedia('(prefers-reduced-motion: reduce)').matches?1:Math.min(1,(now-began)/700);setAmount(t*t*(3-2*t));if(t<1)frame=requestAnimationFrame(draw)};
    frame=requestAnimationFrame(draw);
  },150);
  return()=>{clearTimeout(timer);cancelAnimationFrame(frame)};
 },[settled]);
 const artwork=marks[name];
 return <div ref={container} className="kasvu-mobile-marked-art">
  <svg viewBox={artwork.viewBox} aria-hidden="true"><defs>{artwork.paths.map((path,index)=><clipPath key={index} id={`${id}-${index}`} clipPathUnits={path.revealBounds?'userSpaceOnUse':'objectBoundingBox'}>{path.revealBounds?<rect x={path.revealBounds.x} y="0" width={path.revealBounds.width*amount} height="1000"/>:<rect width={amount} height="1"/>}</clipPath>)}</defs>{artwork.paths.map((path,index)=><path key={index} d={path.d} fill={path.fill} clipPath={`url(#${id}-${index})`}/>)}</svg>
  <img src={`/PRODUCT/Mobile/01%20KasvuNest/${encodeURIComponent(name)}-Foreground.svg?v=${versions[name+'-Foreground.svg']}`} alt={alt}/>
 </div>;
}
