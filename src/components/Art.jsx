import React,{useState,useRef,useEffect,useId} from 'react';
import {h,P,Ico,Use,Raw,ls,money,today,sha,HEART} from '../lib';
import {CITIES,KINDS,ITEMS,DEAL,SKY,SNAP} from '../data';
export function Art({c}){const id='g'+useId().replace(/\W/g,'');
 return Raw('svg',{className:'art',viewBox:'0 0 200 150',preserveAspectRatio:'xMidYMax slice','aria-hidden':'true'},`<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c.a[0]}"/><stop offset="1" stop-color="${c.a[1]}"/></linearGradient></defs><rect width="200" height="150" fill="url(#${id})"/>${c.s}<rect y="130" width="200" height="20" fill="rgba(0,0,0,.25)"/>`);}
export const Heart=({on,label,onClick})=>h('button',{className:'heart','aria-pressed':on,'aria-label':label,onClick},Ico(P(HEART)));

