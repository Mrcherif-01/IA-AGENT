import React,{useState,useRef,useEffect,useId} from 'react';
import {h,P,Ico,Use,Raw,ls,money,today,sha,HEART} from '../lib';
import {CITIES,KINDS,ITEMS,DEAL,SKY,SNAP} from '../data';
export default function Header({user,view,go,onAuth,onOut}){
 const [open,setOpen]=useState(false),[menu,setMenu]=useState(false);
 const nav=['Home','Destinations','Packages','Hotels','About','Contact'];
 const on=view.n==='home'?'Home':view.n==='results'?view.nav:'';
 return h('header',null,h('div',{className:'wrap'},
  h('a',{className:'logo',href:'#top',onClick:e=>{e.preventDefault();go('Home')},'aria-label':'TravelTunisia home'},h('span',{className:'mark'},Use('plane',true,{width:26,height:26,color:'#fff'})),'Travel',h('b',null,'Tunisia')),
  h('nav',{className:open?'open':'','aria-label':'Main'},nav.map(n=>h('a',{key:n,href:'#',className:on===n?'on':'',onClick:e=>{e.preventDefault();setOpen(false);go(n)}},n))),
  h('button',{className:'signin',onClick:()=>user?setMenu(!menu):onAuth()},Ico([h('circle',{key:1,cx:12,cy:8,r:4,fill:'currentColor'}),P('M4 21c0-4 4-6 8-6s8 2 8 6','b')]),h('span',null,user?user.name.split(' ')[0]:'Sign In')),
  h('button',{className:'burger','aria-label':'Open menu','aria-expanded':open,onClick:()=>setOpen(!open)},Ico(P('M3 6h18M3 12h18M3 18h18'),{width:28,height:28})),
  menu&&user&&h('div',{className:'menu'},[['My trips','trips'],['Saved','saved']].map(([t,k])=>h('button',{key:k,onClick:()=>{setMenu(false);go(k)}},t)),h('button',{onClick:()=>{setMenu(false);onOut()}},'Sign out'))));
}

