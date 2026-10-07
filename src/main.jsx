import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { X, ArrowUpRight, ArrowRight } from 'lucide-react';
import './style.css';
import AboutHome from './AboutHome.jsx';
import OtherHome from './OtherHome.jsx';
import NavigationOverlay from './NavigationOverlay.jsx';
import KasvuNestIntro from './KasvuNestIntro.jsx';
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
const tabs=['Product','UI | UX','Other','About Me'];
const interfaceProjects = [
 {name:'ayy_', folder:'Folder-ayy.svg', intro:'ayy.svg', lines:['ayy_', 'Laundry Booking_UI'], color:'blue'},
 {name:'Glucora', folder:'Folder-Glucora.svg', intro:'Glucora-Introduction.svg', lines:['Glucora_', 'Blood Glucose', 'Manage_UI'], color:'blue'},
 {name:'GoldenRoot', folder:'Folder-GoldenRoot.svg', intro:'GoldRoot-Introduction.svg', lines:['GoldenRoot_', 'Composter_UI'], color:'blue'},
 {name:'Old Market Hall', folder:'Folder-Old Market Hall.svg', intro:'Old Market Hall-Introduction.svg', lines:['Old Market', 'Hall_Tourist', 'Service_UX'], color:'purple'},
];
function InterfaceHome(){
 const [opened,setOpened]=useState(null),[preview,setPreview]=useState(null);
 useEffect(()=>{if(!opened)return;const close=e=>{if(e.key==='Escape')setOpened(null)};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close)},[opened]);
 return <section className="interface-home" aria-label="UI and UX projects">
  <img className="interface-background-image" src="/UI&UX/Homepage/Laptop%20Screen%20Background.jpg" alt="A MacBook screen with an ocean wallpaper"/>
  <div className="folder-panel">{interfaceProjects.map((project,index)=><div className={`folder-preview-anchor ${preview===project.name?'preview-visible':''}`} key={project.name} onMouseEnter={()=>setPreview(project.name)} onMouseLeave={()=>setPreview(null)} onFocus={()=>setPreview(project.name)} onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setPreview(null)}} onKeyDown={e=>{if(e.key==='Escape'){setPreview(null);e.stopPropagation()}}}>
   <button className="desktop-project uploaded-folder-button" onClick={()=>{setPreview(null);setOpened(project)}} aria-label={`Open ${project.name}`} aria-describedby={preview===project.name?`folder-intro-${index}`:undefined}><img className="uploaded-folder" src={`/UI&UX/Homepage/Folders/${encodeURIComponent(project.folder)}`} alt="" aria-hidden="true" draggable="false"/></button>
   <div className="folder-introduction" id={`folder-intro-${index}`} role="tooltip" aria-hidden={preview!==project.name}><img src={`/UI&UX/Homepage/Intro/${encodeURIComponent(project.intro)}`} alt={`${project.name} project introduction`} draggable="false"/></div>
  </div>)}</div>
  {opened&&<div className="modal-backdrop" onClick={()=>setOpened(null)}><section className="interface-project-dialog" role="dialog" aria-modal="true" aria-label={opened.name} onClick={e=>e.stopPropagation()}><button autoFocus className="circle close-modal" aria-label="Close project" onClick={()=>setOpened(null)}><X size={20}/></button><img className="dialog-uploaded-folder" src={`/UI&UX/Homepage/Folders/${encodeURIComponent(opened.folder)}`} alt="" aria-hidden="true"/><h2>{opened.name}</h2><p>{opened.lines.slice(1).join(' ')}</p><p className="interface-project-note">Case study coming soon.</p></section></div>}
 </section>;
}
function App(){
 const [tab,setTab]=useState('Product'),[menu,setMenu]=useState(false),[selected,setSelected]=useState(null);
 const navigate=(next)=>{setTab(next);setMenu(false);setSelected(null);window.scrollTo({top:0,behavior:'smooth'});};
 useEffect(()=>{const close=e=>{if(e.key==='Escape'){setSelected(null)}};window.addEventListener('keydown',close);document.body.style.overflow=selected||menu?'hidden':'';return()=>{window.removeEventListener('keydown',close);document.body.style.overflow=''}},[selected,menu]);
 return <div className={tab==='About Me'?'app interface-mode about-mode':tab==='Other'?'app interface-mode other-mode':tab==='UI | UX'?'app interface-mode':'app interface-mode product-mode'}><header className="header"><div className="header-left"><button className="circle menu-button" aria-label="Open navigation" onClick={()=>setMenu(true)}><img className="uploaded-nav-icon" src="/Components/Hamburger%20Navigation.svg" alt="" aria-hidden="true"/></button><button className="circle home-button" aria-label="Go to home" onClick={()=>navigate('Product')}><img className="uploaded-nav-icon" src="/Components/Home.svg" alt="" aria-hidden="true"/></button><a className="wordmark" href="#" onClick={e=>{e.preventDefault();navigate('Product')}}>YZ<span>®</span></a></div><nav aria-label="Main navigation">{tabs.map(t=><button key={t} className={`nav-pill ${tab===t?'active':''}`} onClick={()=>navigate(t)}>{t}</button>)}</nav><button className="hello uploaded-about-button" aria-label="About Me" aria-current={tab==='About Me'?'page':undefined} onClick={()=>navigate('About Me')}><img className="uploaded-about-image" src={tab==='About Me'?'/Components/About%20Me-Selected.svg':'/Components/About%20Me.svg'} alt="" aria-hidden="true"/></button></header>
 <main>{tab==='Product'?<ProductHome onOpen={sticker=>setSelected({...products.find(p=>p.number===sticker.number),...sticker})}/>:tab==='UI | UX'?<InterfaceHome/>:tab==='Other'?<OtherHome/>:tab==='About Me'?<AboutHome/>:<section className="collection-page"><p className="eyebrow"><span className="red-dot"/>{tab==='Other'?'EXPERIMENTS & HAPPY ACCIDENTS':'EXPERIENCES THAT FEEL HUMAN'}</p><div className="collection-title"><h1>{tab==='Other'?<>Outside <span>the lines.</span></>:<>Less friction.<br/><span>More feeling.</span></>}</h1><p>{tab==='Other'?'A space for sketches, materials, and ideas that don’t fit in a box.':'Exploring the intersection of useful, intuitive, and delightful.'}</p></div><div className="coming-card"><span className="coming-number">{tab==='Other'?'03':'02'} / EXPLORATIONS</span><div className={tab==='Other'?'abstract-art':'ui-art'}>{tab==='Other'?<><i/><i/><i/></>:<><div className="mini-phone"><span>Good morning.</span><b>A little room<br/>to grow.</b><div className="plant">✳</div><span>YOUR DAILY MOMENT <ArrowRight size={14}/></span></div><div className="mini-card"><span>Small steps.</span><b>Big changes.</b><div>◔</div></div></>}</div><div className="coming-bottom"><h2>{tab==='Other'?'Ideas in the making.':'Thoughtful experiences, in progress.'}</h2><span>NEW WORK COMING SOON <span className="red-dot"/></span></div></div><p className="collection-footnote">While these take shape, have a look at my <button onClick={()=>navigate('Product')}>product work ↗</button></p></section>}</main>
 <footer><span>YIMING ZHOU <span className="footer-slash">/</span> INDUSTRIAL PRODUCT DESIGNER</span><span>MADE WITH INTENTION & A LITTLE PLAY <span className="footer-face">:)</span></span><span>© {new Date().getFullYear()}</span></footer>
 {menu&&<NavigationOverlay onNavigate={navigate} onClose={()=>setMenu(false)}/>}
 {selected&&(selected.file==='KasvuNest'?<KasvuNestIntro onClose={()=>setSelected(null)}/>:<div className="modal-backdrop" onClick={()=>setSelected(null)}><section className="project-modal" role="dialog" aria-modal="true" aria-label={selected.name} onClick={e=>e.stopPropagation()}><button autoFocus className="circle close-modal" aria-label="Close project" onClick={()=>setSelected(null)}><X size={20}/></button><div className="modal-art sticker-modal-art"><img src={stickerSource('Colorful',selected.file)} alt={selected.name}/></div><div className="modal-content"><p className="eyebrow">{selected.number} / PRODUCT EXPLORATION</p><h2>{selected.name}</h2><div className="project-meta"><span>{selected.category}</span><span>{selected.year}</span></div><p>{selected.description}</p><p className="detail-note">Concept overview · Full case study coming soon.</p><button className="back-link" onClick={()=>{const n=(productStickers.findIndex(p=>p.number===selected.number)+1)%productStickers.length;setSelected({...products[n],...productStickers[n]})}}>Next project <ArrowRight size={18}/></button></div></section></div>)}
 </div>;
}
createRoot(document.getElementById('root')).render(<App/>);
