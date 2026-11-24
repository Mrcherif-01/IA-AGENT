import React from 'react';
export const h=React.createElement;
export const mem={};
export const ls={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):(k in mem?mem[k]:d)}catch(e){return k in mem?mem[k]:d}},set(k,v){mem[k]=v;try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
export const money=n=>n.toLocaleString('en-US')+' DT';
export const today=new Date().toISOString().slice(0,10);
export const sha=async t=>{try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(t));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){return btoa(unescape(encodeURIComponent(t)))}};
export const P=(d,k)=>h('path',{d,key:k});
export const Ico=(kids,style)=>h('svg',{className:'i',viewBox:'0 0 24 24','aria-hidden':'true',style},kids);
export const Use=(id,fill,style)=>h('svg',{className:'i',viewBox:'0 0 24 24','aria-hidden':'true',style:{...(fill?{fill:'currentColor',stroke:'none'}:{}),...style}},h('use',{href:'#'+id}));
export const Raw=(tag,props,html)=>h(tag,{...props,dangerouslySetInnerHTML:{__html:html}});
export const HEART='M20.8 5.6a5.4 5.4 0 0 0-7.6 0L12 6.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 22l8.8-8.8a5.4 5.4 0 0 0 0-7.6z';

