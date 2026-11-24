import React,{useState,useRef,useEffect,useId} from 'react';
import {h,P,Ico,Use,Raw,ls,money,today,sha,HEART} from '../lib';
import {CITIES,KINDS,ITEMS,DEAL,SKY,SNAP} from '../data';
import Trust from './Trust';
import {Art,Heart} from './Art';
export default function Home({favs,fav,onOpen,onAll,onBook}){
 const tr=useRef(null);
 const go=dir=>{const c=tr.current;c.scrollBy({left:dir*(c.querySelector('.dest').offsetWidth+22),behavior:'smooth'})};
 return h(React.Fragment,null,h(Trust),h('section',{className:'sec',id:'destinations'},h('div',{className:'wrap'},
  h('div',{className:'head'},h('h2',null,'Popular Destinations'),h('a',{href:'#',onClick:e=>{e.preventDefault();onAll()}},'View All ',Use('arr',false))),
  h('div',{className:'car'},
   h('button',{className:'arrow l','aria-label':'Previous destinations',onClick:()=>go(-1)},Ico(P('m15 5-7 7 7 7'))),
   h('div',{className:'track',ref:tr},CITIES.map(c=>h('article',{className:'dest',key:c.c},h('div',{className:'pic'},h(Art,{c}),
     h('button',{className:'open','aria-label':'See '+c.c+' packages',onClick:()=>onOpen(c)}),
     h(Heart,{on:favs.includes(c.c+'-Packages'),label:'Save '+c.c,onClick:()=>fav(c.c+'-Packages')}),
     h('div',{className:'cap'},Use('plane',true,{width:22,height:22}),h('div',null,h('b',null,c.c),h('span',null,c.k)))),
    h('div',{className:'price'},'From ',h('b',null,money(c.p)))))),
   h('button',{className:'arrow r','aria-label':'Next destinations',onClick:()=>go(1)},Ico(P('m9 5 7 7-7 7')))),
  h('div',{className:'deal',id:'deal'},
   h('div',null,h('span',{className:'badge'},'Special Deal'),h('h3',null,'Istanbul Getaway'),h('p',null,'8 Days / 7 Nights – Flight + Hotel + Tours')),
   h('div',{className:'snap','aria-hidden':'true'},Raw('svg',{viewBox:'0 0 200 170',preserveAspectRatio:'xMidYMax slice'},SNAP)),
   h('div',{className:'buy'},h('div',null,h('div',null,'From'),h('div',{className:'n'},'4,442',h('sup',null,'DT')),h('div',null,'for 2 people')),
    h('a',{className:'book',href:'#',onClick:e=>{e.preventDefault();onBook(DEAL)}},'Book Now ',Use('arr',false)))))));
}

