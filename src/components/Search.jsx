import React,{useState,useRef,useEffect,useId} from 'react';
import {h,P,Ico,Use,Raw,ls,money,today,sha,HEART} from '../lib';
import {CITIES,KINDS,ITEMS,DEAL,SKY,SNAP} from '../data';
export default function Search({s,set,inputRef,onSearch}){
 const tabs=[['Packages',Ico([h('circle',{key:1,cx:12,cy:12,r:9}),P('M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18','b')])],['Flights',Use('plane',true)],['Hotels',Ico(P('M3 20V6M3 14h18v6M21 14v-2a3 3 0 0 0-3-3h-7v5'))]];
 const ph={Hotels:'Hotel, city or country',Flights:'Flying to…',Packages:'Destination, city or country'}[s.tab];
 const submit=e=>{e.preventDefault();if(s.date&&s.date<today)return set({msg:'Pick a travel date from today onwards.'});set({msg:''});onSearch(s.dest.trim(),s.tab)};
 const field=(icon,label,ctl)=>h('div',{className:'field'},icon,h('div',{style:{width:'100%'}},label,ctl));
 return h('div',{className:'search',id:'search'},
  h('div',{className:'tabs',role:'tablist','aria-label':'Search type'},tabs.map(([t,ic])=>h('button',{key:t,role:'tab','aria-selected':s.tab===t,onClick:()=>set({tab:t})},ic,t))),
  h('form',{className:'panel',noValidate:true,onSubmit:submit},
   field(Use('pin',true,{width:24,height:24}),h('label',{htmlFor:'dest'},'Where to ?'),h('input',{id:'dest',ref:inputRef,list:'places',placeholder:ph,autoComplete:'off',value:s.dest,onChange:e=>set({dest:e.target.value})})),
   field(Ico([h('rect',{key:1,x:3,y:5,width:18,height:16,rx:2}),P('M3 10h18M8 3v4M16 3v4','b')],{width:24,height:24}),h('label',{htmlFor:'dt'},'Travel dates'),h('input',{id:'dt',type:'date',min:today,value:s.date,onChange:e=>set({date:e.target.value})})),
   field(Ico([h('circle',{key:1,cx:12,cy:8,r:4,fill:'currentColor'}),P('M4 21c0-4 4-6 8-6s8 2 8 6z','b')],{width:24,height:24}),h('label',{htmlFor:'tr'},'Travelers'),h('select',{id:'tr',value:s.trav,onChange:e=>set({trav:e.target.value})},['1 Traveler','2 Travelers','3 Travelers','4 Travelers','5+ Travelers'].map(o=>h('option',{key:o},o)))),
   h('button',{className:'go',type:'submit'},Ico([h('circle',{key:1,cx:11,cy:11,r:7}),P('m21 21-4.3-4.3','b')]),'Search')),
  h('datalist',{id:'places'},CITIES.map(c=>h('option',{key:c.c,value:c.c+', '+c.k}))),
  h('div',{className:'msg',role:'status','aria-live':'polite'},s.msg));
}

