import React, { useState, useEffect, useRef } from 'react';
import useSiteVideoAudio from './useSiteVideoAudio.js';
import useMobileFullscreen from './useMobileFullscreen.js';
import { createRoot } from 'react-dom/client';
import { X, ArrowUpRight, ArrowRight } from 'lucide-react';
import './style.css';
import AboutHome from './AboutHome.jsx';
import OtherHome from './OtherHome.jsx';
import NavigationOverlay from './NavigationOverlay.jsx';
import KasvuNestIntro from './KasvuNestIntro.jsx';
import GenelecIntro from './GenelecIntro.jsx';
import PaperRendIntro from './PaperRendIntro.jsx';
import AltafuseIntro from './AltafuseIntro.jsx';
import GoldenRootIntro from './GoldenRootIntro.jsx';
import PeachBlossomIntro from './PeachBlossomIntro.jsx';
import AyyIntro from './AyyIntro.jsx';
import GlucoraIntro from './GlucoraIntro.jsx';
import GoldenRootUIIntro from './GoldenRootUIIntro.jsx';
import OldMarketHallIntro from './OldMarketHallIntro.jsx';
import InterfaceMobileHome from './InterfaceMobileHome.jsx';
import InterfaceMobileProjectDetail from './InterfaceMobileProjectDetail.jsx';
import AboutMobileHome from './AboutMobileHome.jsx';
import KasvuNestMobileDetail from './KasvuNestMobileDetail.jsx';
import GenelecMobileDetail from './GenelecMobileDetail.jsx';
import PaperRendMobileDetail from './PaperRendMobileDetail.jsx';
import ProductMobileProjectDetail from './ProductMobileProjectDetail.jsx';
import ProductHome, { productStickers, stickerSource } from './ProductHome.jsx';

const products = [
  {name:'Paperend',category:'Circular design',year:'2024',description:'An exploration of how everyday appliances can invite a more thoughtful relationship with materials.',position:[21.5,47.5],bounds:[14,34],number:'01'},
  {name:'In the loop',category:'Personal comfort',year:'2024',description:'A portable cooling concept that explores the balance between movement, comfort, and personal space.',position:[63.5,32.5],bounds:[14,30],number:'02'},
  {name:'One / Water',category:'Everyday rituals',year:'2023',description:'A water dispenser concept that turns a small daily ritual into a considered, tactile experience.',position:[77.5,38],bounds:[14,46],number:'03'},
  {name:'Morning, slowly',category:'Home appliances',year:'2023',description:'A coffee maker exploration centered on the simple pleasure of making something by hand.',position:[24,80],bounds:[12,23],number:'04'},
  {name:'Grow together',category:'Sustainable living',year:'2024',description:'An indoor growing system concept bringing small moments of nature into everyday living spaces.',position:[39.5,67],bounds:[14,43],number:'05'},
  {name:'A little breeze',category:'Personal objects',year:'2023',description:'A handheld fan concept exploring friendly proportions and intuitive everyday interaction.',position:[59.5,71.5],bounds:[16,36],number:'06'},
  {name:'Room to breathe',category:'Home & wellbeing',year:'2024',description:'An air-care concept exploring how functional objects can feel at home in the spaces we share.',position:[76,78],bounds:[13,27],number:'07'},
];
const productOrder=['KasvuNest','G-Headphone','Paperend','Altafuse','GoldenRoot','SM-Little Peach Blossom'];
const tabs=['Product','UI | UX','Other','About Me'];
const interfaceProjects = [
 {name:'ayy_', folder:'Folder-ayy.svg', intro:'ayy.svg', lines:['ayy_', 'Laundry Booking_UI'], color:'blue'},
 {name:'Glucora', folder:'Folder-Glucora.svg', intro:'Glucora-Introduction.svg', lines:['Glucora_', 'Blood Glucose', 'Manage_UI'], color:'blue'},
 {name:'GoldenRoot', folder:'Folder-GoldenRoot.svg', intro:'GoldRoot-Introduction.svg', lines:['GoldenRoot_', 'Composter_UI'], color:'blue'},
 {name:'Old Market Hall', folder:'Folder-Old Market Hall.svg', intro:'Old Market Hall-Introduction.svg', lines:['Old Market', 'Hall_Tourist', 'Service_UX'], color:'purple'},
];
const interfaceAssetFolders={'ayy_':'ayy','Glucora':'Glucora','GoldenRoot':'GoldenRoot','Old Market Hall':'Old Market Hall'};
const interfaceArtworkLoads=new Map();
function prepareInterfaceArtwork(project){
 const folder=interfaceAssetFolders[project.name];
 return Promise.all(['Background.svg','Intro.svg'].map(file=>{
  const src=`/UI&UX/${encodeURIComponent(folder)}/${file}`;
  if(!interfaceArtworkLoads.has(src)){
   const image=new Image();
   const ready=new Promise((resolve,reject)=>{
    image.onload=()=>image.decode().then(resolve,reject);
    image.onerror=()=>reject(new Error(`Unable to load ${src}`));
   });
   image.src=src;
   interfaceArtworkLoads.set(src,ready);
   ready.catch(()=>interfaceArtworkLoads.delete(src));
  }
  return interfaceArtworkLoads.get(src);
 }));
}
function InterfaceHome({onNavigate,onMenu,onDetailChange}){
 const [mobileViewport,setMobileViewport]=useState(()=>window.matchMedia('(max-width:640px)').matches);
 useEffect(()=>{const query=window.matchMedia('(max-width:640px)');const update=()=>setMobileViewport(query.matches);query.addEventListener('change',update);return()=>query.removeEventListener('change',update)},[]);
 const [opened,setOpened]=useState(null),[preview,setPreview]=useState(null);
 useEffect(()=>{onDetailChange(Boolean(opened));return()=>onDetailChange(false)},[Boolean(opened),onDetailChange]);
 const changeInterfaceProject=direction=>{
  if(!opened||opened.leavingDirection||opened.preparing)return;
  const index=interfaceProjects.findIndex(project=>project.name===opened.name);
  const next=interfaceProjects[(index+direction+interfaceProjects.length)%interfaceProjects.length];
  document.querySelectorAll('.interface-home video').forEach(video=>{video.pause();video.muted=true});
  setOpened({...opened,preparing:true,nextProject:{...next,slideDirection:direction}});
 };

 useEffect(()=>{interfaceProjects.forEach(project=>{prepareInterfaceArtwork(project).catch(()=>{})})},[]);
 useEffect(()=>{
  if(!opened?.preparing)return;
  let cancelled=false;
  prepareInterfaceArtwork(opened.nextProject).then(()=>{
   if(!cancelled)setOpened({...opened,preparing:false,leavingDirection:opened.nextProject.slideDirection});
  }).catch(()=>{if(!cancelled)setOpened({...opened,preparing:false,nextProject:undefined})});
  return()=>{cancelled=true};
 },[opened]);
 useEffect(()=>{
  if(!opened?.leavingDirection)return;
  const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:400;
  const timer=setTimeout(()=>setOpened(opened.nextProject),duration);
  return()=>clearTimeout(timer);
 },[opened]);
 useEffect(()=>{if(!opened)return;const previous=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{document.body.style.overflow=previous}},[opened]);
 useEffect(()=>{if(!opened)return;const close=e=>{if(e.key==='Escape')setOpened(null)};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close)},[opened]);
 return <section className="interface-home" aria-label="UI and UX projects">
  {!opened&&<InterfaceMobileHome projects={interfaceProjects} onOpen={setOpened} onNavigate={onNavigate} onMenu={onMenu}/>}
  <img className="interface-background-image" src="/UI&UX/Homepage/Laptop%20Screen%20Background.jpg" alt="A MacBook screen with an ocean wallpaper"/>
  <div className="folder-panel">{interfaceProjects.map((project,index)=><div className={`folder-preview-anchor ${preview===project.name?'preview-visible':''}`} key={project.name} onMouseEnter={()=>setPreview(project.name)} onMouseLeave={()=>setPreview(null)} onFocus={()=>setPreview(project.name)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setPreview(null)}} onKeyDown={e=>{if(e.key==='Escape'){setPreview(null);e.stopPropagation()}}}>
   <button className="desktop-project uploaded-folder-button" onClick={()=>{setPreview(null);setOpened(project)}} aria-label={`Open ${project.name}`} aria-describedby={preview===project.name?`folder-intro-${index}`:undefined}><img className="uploaded-folder" src={`/UI&UX/Homepage/Folders/${encodeURIComponent(project.folder)}`} alt="" aria-hidden="true" draggable="false"/></button>
   <div className="folder-introduction" id={`folder-intro-${index}`} role="tooltip" aria-hidden={preview!==project.name}><img src={`/UI&UX/Homepage/Intro/${encodeURIComponent(project.intro)}`} alt={`${project.name} project introduction`} draggable="false"/></div>
  </div>)}</div>
  {opened&&<div key={opened.name} className={`product-project-transition ${opened.slideDirection===1?'project-slide-next':opened.slideDirection===-1?'project-slide-last':''} ${opened.leavingDirection===1?'project-exit-next':opened.leavingDirection===-1?'project-exit-last':''}`}>{(mobileViewport&&['ayy_','Glucora','GoldenRoot','Old Market Hall'].includes(opened.name)?<InterfaceMobileProjectDetail project={opened.name} onNavigate={onNavigate} onMenu={onMenu}/>:opened.name==='ayy_'?<AyyIntro onClose={()=>setOpened(null)}/>:opened.name==='Glucora'?<GlucoraIntro onClose={()=>setOpened(null)}/>:opened.name==='GoldenRoot'?<GoldenRootUIIntro onClose={()=>setOpened(null)}/>:opened.name==='Old Market Hall'?<OldMarketHallIntro onClose={()=>setOpened(null)}/>:<div className="modal-backdrop" onClick={()=>setOpened(null)}><section className="interface-project-dialog" role="dialog" aria-modal="true" aria-label={opened.name} onClick={e=>e.stopPropagation()}><button autoFocus className="circle close-modal" aria-label="Close project" onClick={()=>setOpened(null)}><X size={20}/></button><img className="dialog-uploaded-folder" src={`/UI&UX/Homepage/Folders/${encodeURIComponent(opened.folder)}`} alt="" aria-hidden="true"/><h2>{opened.name}</h2><p>{opened.lines.slice(1).join(' ')}</p><p className="interface-project-note">Case study coming soon.</p></section></div>)}</div>}
 {opened&&<>
  <div className="interface-project-base" aria-hidden="true"/>
  <button className="kasvu-intro-nav kasvu-intro-previous product-modal-nav" aria-label="Previous UI and UX project" disabled={Boolean(opened.preparing||opened.leavingDirection)} onClick={()=>changeInterfaceProject(-1)}><img src="/Components/Last.svg" alt=""/></button>
  <button className="kasvu-intro-nav kasvu-intro-next product-modal-nav" aria-label="Next UI and UX project" disabled={Boolean(opened.preparing||opened.leavingDirection)} onClick={()=>changeInterfaceProject(1)}><img src="/Components/Next.svg" alt=""/></button>
 </>}
 </section>;
}
function App(){
 useMobileFullscreen();
 useSiteVideoAudio();
 const [mobileViewport,setMobileViewport]=useState(()=>window.matchMedia('(max-width:640px)').matches);
 useEffect(()=>{const query=window.matchMedia('(max-width:640px)');const update=()=>setMobileViewport(query.matches);query.addEventListener('change',update);return()=>query.removeEventListener('change',update)},[]);
 const homepageSwipe=useRef(null);
 const [tab,setTab]=useState('Product'),[menu,setMenu]=useState(false),[selected,setSelected]=useState(null);
 const [interfaceHomeVersion,setInterfaceHomeVersion]=useState(0);
 const [otherHomeVersion,setOtherHomeVersion]=useState(0);
 const [interfaceDetail,setInterfaceDetail]=useState(false);
 const [otherDetail,setOtherDetail]=useState(false);
 const [homepageDirection,setHomepageDirection]=useState(0);
 const startHomepageSwipe=event=>{
  homepageSwipe.current=null;
  if(window.innerWidth>640||selected||menu||document.querySelector('[role="dialog"]')||event.touches.length!==1)return;
  const touch=event.touches[0];
  homepageSwipe.current={x:touch.clientX,y:touch.clientY};
 };
 const endHomepageSwipe=event=>{
  const start=homepageSwipe.current;
  homepageSwipe.current=null;
  if(!start||!event.changedTouches.length)return;
  const touch=event.changedTouches[0],dx=touch.clientX-start.x,dy=touch.clientY-start.y;
  if(Math.abs(dx)<50||Math.abs(dx)<Math.abs(dy)*1.5)return;
  const order=['Other','Product','UI | UX'],index=order.indexOf(tab);
  if(index<0)return;
  navigate(order[(index+(dx<0?1:-1)+order.length)%order.length]);
 };
 const changeProduct=direction=>{
  if(selected.leavingDirection)return;
  const file=selected.file==='G-Speaker'?'G-Headphone':selected.file;
  const index=productOrder.indexOf(file);
  const nextFile=productOrder[(index+direction+productOrder.length)%productOrder.length];
  const sticker=productStickers.find(p=>p.file===nextFile);
  const nextProject={...products.find(p=>p.number===sticker.number),...sticker,slideDirection:direction};
  document.querySelectorAll('.product-project-transition video').forEach(video=>{video.pause();video.muted=true});
  setSelected({...selected,leavingDirection:direction,nextProject});
 };
 useEffect(()=>{
  if(!selected?.leavingDirection)return;
  const duration=window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:400;
  const timer=setTimeout(()=>setSelected(selected.nextProject),duration);
  return()=>clearTimeout(timer);
 },[selected]);
 const navigate=(next)=>{const order=['Other','Product','UI | UX'];const currentIndex=order.indexOf(tab),nextIndex=order.indexOf(next);setHomepageDirection(window.innerWidth<=640&&next!==tab&&currentIndex>=0&&nextIndex>=0?((nextIndex-currentIndex+order.length)%order.length===1?1:-1):0);if(next==='UI | UX')setInterfaceHomeVersion(version=>version+1);if(next==='Other')setOtherHomeVersion(version=>version+1);setTab(next);setMenu(false);setSelected(null);window.scrollTo({top:0,behavior:'smooth'});};
 useEffect(()=>{const close=e=>{if(e.key==='Escape'){setSelected(null)}};window.addEventListener('keydown',close);document.body.style.overflow=selected||menu?'hidden':'';return()=>{window.removeEventListener('keydown',close);document.body.style.overflow=''}},[selected,menu]);
 return <div data-kasvu-mobile={mobileViewport&&['KasvuNest','G-Headphone','G-Speaker','Paperend','Altafuse','GoldenRoot','SM-Little Peach Blossom'].includes(selected?.file)} data-mobile-home={(tab==='Product'&&!selected)||(tab==='UI | UX'&&!interfaceDetail)||(tab==='Other'&&!otherDetail)||tab==='About Me'} data-product-home={tab==='Product'&&!selected} className={tab==='About Me'?'app interface-mode about-mode':tab==='Other'?'app interface-mode other-mode':tab==='UI | UX'?'app interface-mode':'app interface-mode product-mode'}><header className="header"><div className="header-left"><button className="circle menu-button" aria-label="Open navigation" onClick={()=>setMenu(true)}><img className="uploaded-nav-icon" src="/Components/Hamburger%20Navigation.svg" alt="" aria-hidden="true"/></button><button className="circle home-button" aria-label="Go to home" onClick={()=>navigate(mobileViewport&&tab==='UI | UX'&&interfaceDetail?'UI | UX':'Product')}><img className="uploaded-nav-icon" src="/Components/Home.svg" alt="" aria-hidden="true"/></button><a className="wordmark" href="#" onClick={e=>{e.preventDefault();navigate('Product')}}>YZ<span>®</span></a></div><nav aria-label="Main navigation">{tabs.map(t=><button key={t} className={`nav-pill ${tab===t?'active':''}`} onClick={()=>navigate(t)}>{t}</button>)}</nav><button className="hello uploaded-about-button" aria-label="About Me" aria-current={tab==='About Me'?'page':undefined} onClick={()=>navigate('About Me')}><img className="uploaded-about-image" src={tab==='About Me'?'/Components/About%20Me-Selected.svg':'/Components/About%20Me.svg'} alt="" aria-hidden="true"/></button></header>
 <main key={tab} className={homepageDirection===1?'mobile-home-next':homepageDirection===-1?'mobile-home-last':''} onTouchStart={startHomepageSwipe} onTouchEnd={endHomepageSwipe} onTouchCancel={()=>{homepageSwipe.current=null}}>{tab==='Product'?<ProductHome onNavigate={navigate} onMenu={()=>setMenu(true)} onOpen={sticker=>setSelected({...products.find(p=>p.number===sticker.number),...sticker})}/>:tab==='UI | UX'?<InterfaceHome key={interfaceHomeVersion} onNavigate={navigate} onMenu={()=>setMenu(true)} onDetailChange={setInterfaceDetail}/>:tab==='Other'?<OtherHome key={otherHomeVersion} onNavigate={navigate} onMenu={()=>setMenu(true)} onDetailChange={setOtherDetail}/>:tab==='About Me'?<><AboutMobileHome onNavigate={navigate} onMenu={()=>setMenu(true)}/><AboutHome/></>:<section className="collection-page"><p className="eyebrow"><span className="red-dot"/>{tab==='Other'?'EXPERIMENTS & HAPPY ACCIDENTS':'EXPERIENCES THAT FEEL HUMAN'}</p><div className="collection-title"><h1>{tab==='Other'?<>Outside <span>the lines.</span></>:<>Less friction.<br/><span>More feeling.</span></>}</h1><p>{tab==='Other'?'A space for sketches, materials, and ideas that don’t fit in a box.':'Exploring the intersection of useful, intuitive, and delightful.'}</p></div><div className="coming-card"><span className="coming-number">{tab==='Other'?'03':'02'} / EXPLORATIONS</span><div className={tab==='Other'?'abstract-art':'ui-art'}>{tab==='Other'?<><i/><i/><i/></>:<><div className="mini-phone"><span>Good morning.</span><b>A little room<br/>to grow.</b><div className="plant">✳</div><span>YOUR DAILY MOMENT <ArrowRight size={14}/></span></div><div className="mini-card"><span>Small steps.</span><b>Big changes.</b><div>◔</div></div></>}</div><div className="coming-bottom"><h2>{tab==='Other'?'Ideas in the making.':'Thoughtful experiences, in progress.'}</h2><span>NEW WORK COMING SOON <span className="red-dot"/></span></div></div><p className="collection-footnote">While these take shape, have a look at my <button onClick={()=>navigate('Product')}>product work ↗</button></p></section>}</main>
 <footer><span>YIMING ZHOU <span className="footer-slash">/</span> INDUSTRIAL PRODUCT DESIGNER</span><span>MADE WITH INTENTION & A LITTLE PLAY <span className="footer-face">:)</span></span><span>© {new Date().getFullYear()}</span></footer>
 {menu&&<NavigationOverlay onNavigate={navigate} onClose={()=>setMenu(false)}/>}
 {selected&&<div key={selected.file} className={`product-project-transition ${selected.slideDirection===1?'project-slide-next':selected.slideDirection===-1?'project-slide-last':''} ${selected.leavingDirection===1?'project-exit-next':selected.leavingDirection===-1?'project-exit-last':''}`}>{(selected.file==='SM-Little Peach Blossom'?(mobileViewport?<ProductMobileProjectDetail project={selected.file} onNavigate={navigate} onMenu={()=>setMenu(true)}/>:<PeachBlossomIntro onPrevious={()=>changeProduct(-1)} onNext={()=>changeProduct(1)}/>):selected.file==='GoldenRoot'?(mobileViewport?<ProductMobileProjectDetail project={selected.file} onNavigate={navigate} onMenu={()=>setMenu(true)}/>:<GoldenRootIntro onPrevious={()=>changeProduct(-1)} onNext={()=>changeProduct(1)}/>):selected.file==='Altafuse'?(mobileViewport?<ProductMobileProjectDetail project={selected.file} onNavigate={navigate} onMenu={()=>setMenu(true)}/>:<AltafuseIntro onPrevious={()=>changeProduct(-1)} onNext={()=>changeProduct(1)}/>):selected.file==='Paperend'?(mobileViewport?<PaperRendMobileDetail onNavigate={navigate} onMenu={()=>setMenu(true)}/>:<PaperRendIntro onPrevious={()=>changeProduct(-1)} onNext={()=>changeProduct(1)}/>):['G-Headphone','G-Speaker'].includes(selected.file)?(mobileViewport?<GenelecMobileDetail onNavigate={navigate} onMenu={()=>setMenu(true)}/>:<GenelecIntro onPrevious={()=>changeProduct(-1)} onNext={()=>changeProduct(1)}/>):selected.file==='KasvuNest'?(mobileViewport?<KasvuNestMobileDetail onNavigate={navigate} onMenu={()=>setMenu(true)} onPrevious={()=>changeProduct(-1)} onNext={()=>changeProduct(1)}/>:<KasvuNestIntro onPrevious={()=>changeProduct(-1)} onNext={()=>changeProduct(1)}/>):<div className="modal-backdrop" onClick={()=>setSelected(null)}><section className="project-modal" role="dialog" aria-modal="true" aria-label={selected.name} onClick={e=>e.stopPropagation()}><button autoFocus className="circle close-modal" aria-label="Close project" onClick={()=>setSelected(null)}><X size={20}/></button><div className="modal-art sticker-modal-art"><img src={stickerSource('Colorful',selected.file)} alt={selected.name}/></div><div className="modal-content"><p className="eyebrow">{selected.number} / PRODUCT EXPLORATION</p><h2>{selected.name}</h2><div className="project-meta"><span>{selected.category}</span><span>{selected.year}</span></div><p>{selected.description}</p><p className="detail-note">Concept overview · Full case study coming soon.</p><button className="back-link" onClick={()=>changeProduct(1)}>Next project <ArrowRight size={18}/></button></div></section></div>)}</div>}
 {selected&&!['KasvuNest','G-Headphone','G-Speaker','Paperend','Altafuse','GoldenRoot','SM-Little Peach Blossom'].includes(selected.file)&&<>
  <button className="kasvu-intro-nav kasvu-intro-previous product-modal-nav" aria-label="Previous product project" onClick={()=>changeProduct(-1)}><img src="/Components/Last.svg" alt=""/></button>
  <button className="kasvu-intro-nav kasvu-intro-next product-modal-nav" aria-label="Next product project" onClick={()=>changeProduct(1)}><img src="/Components/Next.svg" alt=""/></button>
 </>}
 </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
