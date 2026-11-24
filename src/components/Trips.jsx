import React,{useState,useRef,useEffect,useId} from 'react';
import {h,P,Ico,Use,Raw,ls,money,today,sha,HEART} from '../lib';
import {CITIES,KINDS,ITEMS,DEAL,SKY,SNAP} from '../data';
export default function Trips({trips,setTrips,user}){
 const [ask,setAsk]=useState(null),mine=trips.filter(t=>t.user===user.email);
 const cancel=r=>{const n=trips.filter(t=>t.ref!==r);setTrips(n);ls.set('tt_trips',n);setAsk(null)};
 return h('div',{className:'page wrap'},h('h2',null,'My trips'),mine.length?mine.map(t=>h('article',{className:'res',key:t.ref,style:{gridTemplateColumns:'1fr auto'}},
  h('div',null,h('h3',null,t.title),h('p',null,t.date+' · '+t.n+(t.n>1?' travelers':' traveler')+' · '+money(t.total)),h('p',null,'Ref '+t.ref)),
  ask===t.ref?h('div',null,h('button',{className:'btn',onClick:()=>cancel(t.ref)},'Confirm cancel'),' ',h('button',{className:'btn ghost',onClick:()=>setAsk(null)},'Keep')):h('button',{className:'btn ghost',onClick:()=>setAsk(t.ref)},'Cancel booking'))):h('p',null,'No trips yet. Search above and book your first one.'));
}

