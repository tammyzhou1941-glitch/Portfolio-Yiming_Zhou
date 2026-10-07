import React from 'react';

const sketches = [
 {file:'Spaceship',alt:'Racing spaceship conceptual design',x:190,y:145,width:511,layer:2},
 {file:'Life-saving jet ski',alt:'Life-saving jet ski transport design',x:249,y:322,width:507,layer:3},
 {file:'Chair',alt:'Spherical Light Therapy Lounge Chair',x:194,y:520,width:426,layer:2},
 {file:'Photography',alt:'Travel photographs in a vertical filmstrip',x:646,y:85,width:218,layer:1},
 {file:'Lamp',alt:'Colorful pendant lamp photograph',x:860,y:546,width:169,layer:2},
];

export default function OtherHome(){
 return <section className="other-home" aria-label="Other design explorations"><div className="other-canvas">
  <img className="other-board" src="/OTHER/Homepage/Sketching%20Book%20Background.jpg?v=3b368e8f" alt="An open dot-grid sketchbook with gold binder clips"/>
  {sketches.map(sketch=><img className="other-sketch" key={sketch.file} src={`/OTHER/Homepage/Sketches/${encodeURIComponent(sketch.file)}.svg`} alt={sketch.alt} draggable="false" style={{left:`${sketch.x/1280*100}%`,top:`${sketch.y/832*100}%`,width:`${sketch.width/1280*100}%`,zIndex:sketch.layer}}/>)}
 </div></section>;
}
