import {useEffect} from 'react';

export default function useMobileFullscreen(){
 useEffect(()=>{
  let attempted=false;
  const onClick=event=>{
   if(attempted||!event.isTrusted||!window.matchMedia('(max-width:640px)').matches)return;
   attempted=true;
   document.removeEventListener('click',onClick,true);
   const root=document.documentElement;
   if(document.fullscreenElement||document.webkitFullscreenElement)return;
   const request=root.requestFullscreen||root.webkitRequestFullscreen;
   if(!request)return;
   try{Promise.resolve(request.call(root)).catch(()=>{})}catch{}
  };
  document.addEventListener('click',onClick,true);
  return()=>document.removeEventListener('click',onClick,true);
 },[]);
}
