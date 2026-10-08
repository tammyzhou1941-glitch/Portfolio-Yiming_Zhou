import MobileScrollingBanner from './MobileScrollingBanner.jsx';
import React,{useEffect,useRef,useState} from 'react';
const icon=file=>`/PRODUCT/Mobile/Components/${encodeURIComponent(file)}.svg`;
const asset=file=>`/OTHER/Mobile/Components/${encodeURIComponent(file)}.svg`;
const projects=[['Spaceship','Spaceship'],['Life-saving jet ski','Life-saving Jet ski'],['Chair','Chair'],['Photography','Photography'],['Lamp','Group 28']];
export default function OtherMobileHome({onOpen,onNavigate,onMenu}){
 const [selected,setSelected]=useState(null);
 const timer=useRef(null);
 useEffect(()=>()=>clearTimeout(timer.current),[]);
 const select=project=>{
  if(timer.current!==null)return;
  setSelected(project);
  timer.current=setTimeout(()=>{timer.current=null;onOpen(project)},220);
 };
 return <section className="product-mobile-home other-mobile-home" aria-label="Other projects on mobile">
  <div className="product-mobile-edge product-mobile-edge-top" aria-hidden="true"/><div className="product-mobile-edge product-mobile-edge-bottom" aria-hidden="true"/>
  <header className="product-mobile-header"><button onClick={onMenu} aria-label="Open navigation"><img src={icon('Hamburger Navigation')} alt=""/></button><button onClick={()=>onNavigate('Product')} aria-label="Go to home"><img src={icon('Home')} alt=""/></button><button className="product-mobile-about" onClick={()=>onNavigate('About Me')} aria-label="About Me"><img src={icon('About Me')} alt=""/></button></header>
  <MobileScrollingBanner text="Welcome to My Sketching Book"/>
  <div className="other-mobile-projects">{projects.map(([project,file],index)=><button key={project} className={`other-mobile-project other-mobile-project-${index}${selected===project?' project-selected':''}`} onClick={()=>select(project)} aria-label={`Open ${project==='Lamp'?'Light':project}`}><img src={asset(file)} alt=""/></button>)}</div>
  <nav className="product-mobile-navigation" aria-label="Mobile section navigation"><div className="product-mobile-pills"><button onClick={()=>onNavigate('UI | UX')} aria-label="UI and UX"><img src={asset('UI _ UX')} alt=""/></button><button onClick={()=>onNavigate('Other')} aria-current="page" aria-label="Other"><img src={asset('Other')} alt=""/></button><button onClick={()=>onNavigate('Product')} aria-label="Product"><img src={asset('Product')} alt=""/></button></div><img className="product-mobile-indicator" src={asset('Page Indicator')} alt="Other section selected"/></nav>
 </section>;
}
