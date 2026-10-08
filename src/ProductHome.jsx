import React from 'react';
import ProductMobileHome from './ProductMobileHome.jsx';

export const stickerSource = (variant, file) => `/PRODUCT/Homepage/Stickers/${variant}/${encodeURIComponent(file)}.svg`;

export const productStickers = [
 {number:'01',name:'Paperend',file:'Paperend',left:15.1,top:30.4,width:13.1,tilt:-3,scale:1.03},
 {number:'02',name:'G-Headphone',file:'G-Headphone',left:56.9,top:18,width:13.2},
 {number:'03',name:'GoldenRoot',file:'GoldenRoot',left:72.4,top:15.7,width:9.92,tilt:7},
 {number:'04',name:'Altafuse',file:'Altafuse',left:18.5,top:68.9,width:11.02},
 {number:'05',name:'KasvuNest',file:'KasvuNest',left:33.3,top:44.9,width:11.8,tilt:-5},
 {number:'06',name:'SM-Little Peach Blossom',file:'SM-Little Peach Blossom',left:53,top:53.5,width:12.2,tilt:7},
 {number:'07',name:'G-Speaker',file:'G-Speaker',left:70.1,top:65,width:12.27},
];

function ProductSticker({sticker,onOpen}){
 return <button className="product-sticker" style={{left:`${sticker.left}%`,top:`${sticker.top}%`,width:`${sticker.width}%`,'--sticker-tilt':`${sticker.tilt||0}deg`,'--sticker-scale':sticker.scale||1,filter:sticker.file==='Altafuse'?'none':undefined}} aria-label={`Explore ${sticker.name}`} onClick={()=>onOpen(sticker)}>
  <img className="sticker-monochrome" src={stickerSource('Black&White',sticker.file)} alt="" aria-hidden="true" draggable="false"/>
  <img className="sticker-color" src={stickerSource('Colorful',sticker.file)} alt="" aria-hidden="true" draggable="false"/>
 </button>;
}

export default function ProductHome({onOpen,onNavigate,onMenu}){
 return <><ProductMobileHome onOpen={onOpen} onNavigate={onNavigate} onMenu={onMenu}/><section className="product-reference" aria-label="Selected product designs">
  <img className="product-reference-image" src="/PRODUCT/Homepage/Laptop%20Background.jpg" alt="A silver laptop with an illuminated Apple logo against a soft white background"/>
  <img className="product-sticker-heading" src={stickerSource('Colorful','Click on the sticker')} alt="Click on the sticker" draggable="false"/>
  {productStickers.map(sticker=><ProductSticker key={sticker.number} sticker={sticker} onOpen={onOpen}/>)}
 </section></>;
}
