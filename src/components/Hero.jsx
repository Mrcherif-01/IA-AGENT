import React,{useState,useRef,useEffect,useId} from 'react';
import {h,P,Ico,Use,Raw,ls,money,today,sha,HEART} from '../lib';
import {CITIES,KINDS,ITEMS,DEAL,SKY,SNAP} from '../data';
import Search from './Search';
export default function Hero({view,...p}){
 return h('section',{className:'hero'+(view.n==='home'?'':' slim')},
  Raw('svg',{className:'skyline',viewBox:'0 0 800 300',preserveAspectRatio:'xMaxYMax meet','aria-hidden':'true'},SKY),
  h('div',{className:'water'}),
  h('div',{className:'wrap'},h('div',{className:'tag'},'Istanbul',h('small',null,'Türkiye')),
   h('h1',null,'Discover the World'),h('p',null,'Your next adventure starts here.'),
   h('p',null,'Book flights, hotels and travel packages',h('br'),'at the best prices.'),h(Search,p)));
}

