import {useEffect} from 'react';

export default function useMobileViewport(){
 useEffect(()=>{
  let frame=0;
  const update=()=>{
   cancelAnimationFrame(frame);
   frame=requestAnimationFrame(()=>{
    if(!matchMedia('(max-width:640px)').matches)return;
    const height=Math.round(window.visualViewport?.height||window.innerHeight);
    if(window.visualViewport?.scale&&Math.abs(window.visualViewport.scale-1)>.01)return;
    const root=document.documentElement;
    if(root.style.getPropertyValue('--mobile-visible-height')===`${height}px`)return;
    const scrollers=[...document.querySelectorAll('.kasvu-mobile-paged')].map(node=>({node,position:node.scrollTop/node.clientHeight}));
    root.style.setProperty('--mobile-visible-height',`${height}px`);
    scrollers.forEach(({node,position})=>{node.scrollTop=position*node.clientHeight});
   });
  };
  update();window.addEventListener('resize',update);window.visualViewport?.addEventListener('resize',update);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',update);window.visualViewport?.removeEventListener('resize',update)};
 },[]);
}
