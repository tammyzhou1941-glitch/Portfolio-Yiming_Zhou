import {useEffect} from 'react';

// One playback policy for all desktop and mobile project videos.
export default function useSiteVideoAudio(){
 useEffect(()=>{
  const entries=new Map();let frame=0,lastScroll=performance.now(),disposed=false;
  const stop=entry=>{
   entry.generation++;entry.active=false;entry.pending=false;entry.blocked=false;
   entry.video.pause();entry.video.muted=true;entry.button?.remove();entry.button=null;
  };
  const showSoundButton=entry=>{
   if(entry.button)return;
   const button=document.createElement('button');button.className='site-video-enable-sound';button.textContent='开启声音';
   button.setAttribute('aria-label',`开启声音：${entry.video.getAttribute('aria-label')||'视频'}`);
   button.onclick=()=>{entry.video.muted=false;entry.video.volume=1;entry.video.play().then(()=>{entry.blocked=false;button.remove();entry.button=null}).catch(()=>{entry.video.muted=true})};
   document.body.appendChild(button);entry.button=button;
  };
  const play=entry=>{
   const generation=entry.generation;entry.pending=true;entry.video.muted=false;entry.video.volume=1;
   entry.video.play().then(()=>{if(disposed||!entry.active){entry.video.pause();entry.video.muted=true;return}if(generation===entry.generation)entry.pending=false}).catch(()=>{
    if(disposed||!entry.active||generation!==entry.generation)return;
    entry.pending=false;entry.blocked=true;entry.video.muted=true;
    showSoundButton(entry);entry.video.play().catch(()=>{});
   });
  };
  const sync=()=>{
   document.querySelectorAll('video').forEach(video=>{
    if(!entries.has(video))entries.set(video,{video,generation:0,active:false,pending:false,blocked:false,button:null,rect:null,changed:performance.now()});
   });
   entries.forEach((entry,video)=>{if(!video.isConnected){stop(entry);entries.delete(video)}});
  };
  const observer=new MutationObserver(sync);observer.observe(document.getElementById('root'),{childList:true,subtree:true});sync();
  const onScroll=()=>{lastScroll=performance.now();entries.forEach(entry=>{if(entry.active)stop(entry)})};
  const tick=now=>{
   entries.forEach(entry=>{
    const {video}=entry,rect=video.getBoundingClientRect();
    const visibleWidth=Math.max(0,Math.min(rect.right,innerWidth)-Math.max(rect.left,0));
    const visibleHeight=Math.max(0,Math.min(rect.bottom,innerHeight)-Math.max(rect.top,0));
    const area=Math.min(rect.width,innerWidth)*Math.min(rect.height,innerHeight);
    const visible=!document.hidden&&getComputedStyle(video).visibility!=='hidden'&&area>0&&visibleWidth*visibleHeight/area>.8;
    const moved=!entry.rect||['left','top','width','height'].some(key=>Math.abs(rect[key]-entry.rect[key])>.25);
    if(moved)entry.changed=now;
    entry.rect=rect;
    const settled=visible&&now-entry.changed>150&&now-lastScroll>150;
    if(!settled){if(entry.active)stop(entry);else if(!video.paused){video.pause();video.muted=true}return}
    if(!entry.active){entry.active=true;play(entry)}
    else if(!entry.pending&&!entry.blocked&&(video.paused||video.muted))play(entry);
    if(entry.button){entry.button.style.left=`${Math.max(12,Math.min(innerWidth-120,rect.left+rect.width/2-55))}px`;entry.button.style.top=`${Math.max(12,Math.min(innerHeight-48,rect.bottom-52))}px`}
   });
   frame=requestAnimationFrame(tick);
  };
  document.addEventListener('scroll',onScroll,true);document.addEventListener('wheel',onScroll,{passive:true});document.addEventListener('touchmove',onScroll,{passive:true});document.addEventListener('visibilitychange',onScroll);
  frame=requestAnimationFrame(tick);
  return()=>{disposed=true;observer.disconnect();cancelAnimationFrame(frame);document.removeEventListener('scroll',onScroll,true);document.removeEventListener('wheel',onScroll);document.removeEventListener('touchmove',onScroll);document.removeEventListener('visibilitychange',onScroll);entries.forEach(stop)};
 },[]);
}
