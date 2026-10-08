import React,{useEffect,useRef} from 'react';
const videos=[
 {file:'动画一.mp4',x:50,y:87,width:274},
 {file:'动画二：显示面板.mp4',x:50,y:268,width:274},
 {file:'动画八：单独储存仓.mp4',x:52,y:448,width:273},
 {file:'动画四：收集仓细节.mp4',x:50,y:628,width:273},
];
export default function GoldenRootMobileVideos({settled}){
 const ref=useRef(null);
 useEffect(()=>{
  const media=[...ref.current.querySelectorAll('video')];
  media.forEach(video=>{video.pause();video.muted=true});
  if(!settled)return;
  const timer=setTimeout(()=>media.forEach(video=>video.play().catch(()=>{})),150);
  return()=>{clearTimeout(timer);media.forEach(video=>{video.pause();video.muted=true})};
 },[settled]);
 return <div ref={ref} className="genelec-mobile-art"><svg viewBox="0 0 374 814" preserveAspectRatio="xMidYMid slice" aria-label="GoldenRoot product videos">
  <rect width="374" height="814" fill="white"/>
  {videos.map(({file,x,y,width})=><foreignObject key={file} x={x} y={y} width={width} height="170"><div xmlns="http://www.w3.org/1999/xhtml" style={{width:'100%',height:'100%',overflow:'hidden',background:'#fff'}}><video src={`/PRODUCT/Mobile/05%20GoldenRoot/${encodeURIComponent(file)}`} muted loop playsInline preload="metadata" aria-label={file.replace('.mp4','')} style={{display:'block',width:'100%',height:'100%',objectFit:'cover',objectPosition:'center',transform:`scale(${y===448?1.06:1.02})`,transformOrigin:'center'}}/></div></foreignObject>)}
 </svg></div>;
}
