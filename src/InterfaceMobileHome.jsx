import React, {useEffect,useRef,useState} from 'react';
const icon=file=>`/PRODUCT/Mobile/Components/${encodeURIComponent(file)}.svg`;
const interfaceComponent=file=>`/UI&UX/Mobile/Components/${encodeURIComponent(file)}.svg?v=69a4940dadf0`;
export default function InterfaceMobileHome({projects,onOpen,onNavigate,onMenu}){
 const [selectedFolder,setSelectedFolder]=useState(null);
 const openTimer=useRef(null);
 useEffect(()=>()=>clearTimeout(openTimer.current),[]);
 const selectFolder=project=>{
  if(openTimer.current!==null)return;
  setSelectedFolder(project.name);
  openTimer.current=setTimeout(()=>{openTimer.current=null;onOpen(project)},220);
 };
 const banner='/UI&UX/Mobile/Components/Scrolling%20Banner.svg';
 return <section className="product-mobile-home interface-mobile-home" aria-label="UI and UX mobile projects">
  <div className="product-mobile-edge product-mobile-edge-top" aria-hidden="true"/><div className="product-mobile-edge product-mobile-edge-bottom" aria-hidden="true"/>
  <header className="product-mobile-header"><button onClick={onMenu} aria-label="Open navigation"><img src={icon('Hamburger Navigation')} alt=""/></button><button onClick={()=>onNavigate('Product')} aria-label="Go to home"><img src={icon('Home')} alt=""/></button><button className="product-mobile-about" onClick={()=>onNavigate('About Me')} aria-label="About Me"><img src={icon('About Me')} alt=""/></button></header>
  <div className="product-mobile-banner"><div><img src={banner} alt="Check My Folders"/><img src={banner} alt="" aria-hidden="true"/></div></div>
  <div className="interface-mobile-folders">{projects.map(project=><button className={selectedFolder===project.name?'folder-selected':''} key={project.name} onClick={()=>selectFolder(project)} aria-label={`Open ${project.name}`}><img src={`/UI&UX/Mobile/Components/${encodeURIComponent(project.folder)}`} alt={`${project.name} project folder and introduction`}/></button>)}</div>
  <nav className="product-mobile-navigation" aria-label="Mobile section navigation"><div className="product-mobile-pills interface-mobile-pills"><button onClick={()=>onNavigate('Product')} aria-label="Product"><img src={interfaceComponent('Product')} alt=""/></button><button aria-current="page" onClick={()=>onNavigate('UI | UX')} aria-label="UI and UX"><img src={interfaceComponent('UI _ UX')} alt=""/></button><button onClick={()=>onNavigate('Other')} aria-label="Other"><img src={interfaceComponent('Other')} alt=""/></button></div><img className="product-mobile-indicator" src={interfaceComponent('Page Indicator')} alt="UI and UX selected"/></nav>
 </section>;
}
