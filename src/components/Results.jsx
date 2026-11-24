import React,{useState,useRef,useEffect,useId} from 'react';
import {h,P,Ico,Use,Raw,ls,money,today,sha,HEART} from '../lib';
import {CITIES,KINDS,ITEMS,DEAL,SKY,SNAP} from '../data';
import {Art,Heart} from './Art';
export default function Results({ap,favs,fav,onBook,fo0}){
 const [sort,setSort]=useState('rec'),[max,setMax]=useState(5000),[fo,setFo]=useState(!!fo0);
 const parts=ap.q.toLowerCase().split(',').map(x=>x.trim()).filter(Boolean);
 let list=ITEMS.filter(i=>(ap.kind==='All'||i.kind===ap.kind)&&(!parts.length||parts.some(p=>(i.city+' '+i.country).toLowerCase().includes(p)))&&i.price<=max&&(!fo||favs.includes(i.id)));
 if(sort==='lo')list=[...list].sort((a,b)=>a.price-b.price);if(sort==='hi')list=[...list].sort((a,b)=>b.price-a.price);if(sort==='az')list=[...list].sort((a,b)=>a.city.localeCompare(b.city));
 return h('div',{className:'page wrap'},
  h('h2',null,fo0?'Saved':(ap.kind==='All'?'All offers':ap.kind)+(ap.q?' for '+ap.q:'')),
  h('p',{className:'sub'},list.length+(list.length===1?' result':' results')+' · prices per person'),
  h('div',{className:'bar'},
   h('label',null,'Sort by',h('select',{value:sort,onChange:e=>setSort(e.target.value)},[['rec','Recommended'],['lo','Price: low to high'],['hi','Price: high to low'],['az','Destination A–Z']].map(([v,t])=>h('option',{key:v,value:v},t)))),
   h('label',null,'Max price '+money(max),h('input',{type:'range',min:500,max:5000,step:50,value:max,onChange:e=>setMax(+e.target.value)})),
   h('label',null,h('input',{type:'checkbox',checked:fo,onChange:e=>setFo(e.target.checked)}),'Saved only')),
  list.length?list.map(i=>h('article',{className:'res',key:i.id},
   h('div',{className:'pic'},h(Art,{c:i.c}),h(Heart,{on:favs.includes(i.id),label:'Save '+i.title,onClick:()=>fav(i.id)})),
   h('div',null,h('h3',null,i.title),h('p',null,i.city+', '+i.country),h('p',null,i.desc)),
   h('div',{className:'r'},h('span',null,'From'),h('b',null,money(i.price)),h('button',{className:'btn',onClick:()=>onBook(i)},'Book now')))):
  h('p',null,'No offers match. Try another destination, raise the max price or clear “Saved only”.'));
}

