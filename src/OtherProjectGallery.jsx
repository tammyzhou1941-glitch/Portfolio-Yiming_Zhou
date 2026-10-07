import React from 'react';

const projects={
 Chair:{folder:'RelaxChair',files:['Intro.svg','P1.svg','P2.svg'],background:'Background.svg'},
 Photography:{folder:'Photograph',files:['Group 4.svg','Group 5.svg','Group 6.svg','Group 7.svg','Group 8.svg','Group 9.svg','微信图片_20250101203849 1.svg']},
 Lamp:{folder:'Light',files:['Intro.svg','Group 10.svg','IMG_0504 2.svg']},
};
export default function OtherProjectGallery({project}){
 const {folder,files,background}=projects[project];
 const source=file=>`/OTHER/${folder}/${encodeURIComponent(file)}`;
 return <div className="spaceship-detail-scene"><div className="other-project-gallery">
  {files.map((file,index)=><section className="other-gallery-page" key={file}>
   {index===0&&background&&<img className="other-gallery-background" src={source(background)} alt=""/>}
   <img className="other-gallery-art" src={source(file)} alt={`${project} ${index===0?'introduction':`page ${index}`}`}/>
  </section>)}
 </div></div>;
}
