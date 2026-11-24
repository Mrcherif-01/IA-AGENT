import React,{useState,useRef,useEffect,useId} from 'react';
import {h,P,Ico,Use,Raw,ls,money,today,sha,HEART} from '../lib';
import {CITIES,KINDS,ITEMS,DEAL,SKY,SNAP} from '../data';
export default function Auth({onClose,onLogin}){
 const [m,setM]=useState('in'),[f,setF]=useState({name:'',email:'',pw:''}),[er,setEr]=useState(''),[busy,setBusy]=useState(false);
 const set=p=>setF(o=>({...o,...p}));
 const submit=async e=>{e.preventDefault();const em=f.email.trim().toLowerCase();
  if(m==='up'&&f.name.trim().length<2)return setEr('Enter your name.');
  if(!/^\S+@\S+\.\S+$/.test(em))return setEr('Enter a valid email address.');
  if(f.pw.length<6)return setEr('Password must be at least 6 characters.');
  setBusy(true);const acc=ls.get('tt_accounts',{}),hs=await sha(f.pw);setBusy(false);
  if(m==='up'){if(acc[em])return setEr('This email already has an account. Sign in instead.');acc[em]={name:f.name.trim(),hs};ls.set('tt_accounts',acc);onLogin({name:f.name.trim(),email:em})}
  else{if(!acc[em]||acc[em].hs!==hs)return setEr('Email or password is incorrect.');onLogin({name:acc[em].name,email:em})}};
 useEffect(()=>{const k=e=>e.key==='Escape'&&onClose();addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[]);
 const fl=(k,l,t,ac)=>h('div',null,h('label',{htmlFor:'a'+k},l),h('input',{id:'a'+k,type:t,autoComplete:ac,value:f[k],onChange:e=>{set({[k]:e.target.value});setEr('')}}));
 return h('div',{className:'modal',onMouseDown:e=>e.target===e.currentTarget&&onClose()},h('div',{className:'box',role:'dialog','aria-modal':'true','aria-label':'Account'},
  h('div',{className:'seg'},[['in','Sign in'],['up','Create account']].map(([k,t])=>h('button',{key:k,className:m===k?'on':'',onClick:()=>{setM(k);setEr('')}},t))),
  h('form',{className:'fm',noValidate:true,onSubmit:submit},m==='up'&&fl('name','Name','text','name'),fl('email','Email','email','email'),fl('pw','Password','password',m==='up'?'new-password':'current-password'),
   er&&h('p',{className:'err',role:'alert'},er),h('p',null),h('button',{className:'btn',type:'submit',disabled:busy,style:{width:'100%'}},m==='up'?'Create account':'Sign in'),
   h('p',{className:'sub',style:{fontSize:12}},'Demo accounts are stored only in this browser.'))));
}

