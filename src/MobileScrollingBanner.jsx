import React from 'react';
export default function MobileScrollingBanner({text}){
 const phrase=<>{Array.from({length:3},(_,index)=><span className="mobile-banner-phrase" key={index}>{text}<span className="mobile-banner-separator" aria-hidden="true"> • </span></span>)}</>;
 return <div className="product-mobile-banner" aria-label={text}><div className="mobile-banner-track"><div className="mobile-banner-group">{phrase}</div><div className="mobile-banner-group" aria-hidden="true">{phrase}</div></div></div>;
}
