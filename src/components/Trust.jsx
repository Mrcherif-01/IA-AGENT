import React,{useState,useRef,useEffect,useId} from 'react';
import {h,P,Ico,Use,Raw,ls,money,today,sha,HEART} from '../lib';
import {CITIES,KINDS,ITEMS,DEAL,SKY,SNAP} from '../data';
export default function Trust(){
 const it=[[Ico([h('circle',{key:1,cx:12,cy:9,r:6}),P('m9 9 2 2 4-4M8 14l-2 8 6-3 6 3-2-8','b')]),'Best Prices','Guaranteed'],
  [Ico([P('M4 14v-2a8 8 0 0 1 16 0v2','a'),h('rect',{key:2,x:2,y:13,width:4,height:6,rx:1.5}),h('rect',{key:3,x:18,y:13,width:4,height:6,rx:1.5}),P('M20 19c0 2-2 3-5 3','d')]),'24/7 Support','Always with you'],
  [Ico([P('M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5z','a'),P('m8.5 12 2.5 2.5 4.5-5','b')]),'Secure Booking','Your data is safe'],
  [Use('plane',false),'Trusted Partners','Airlines, hotels and more']];
 return h('section',{className:'trust',id:'about'},h('div',{className:'wrap'},it.map(([ic,t,d])=>h('div',{key:t},ic,h('p',{style:{margin:0}},h('b',null,t),h('span',null,d))))));
}

