import React,{useState,useRef,useEffect,useId} from 'react';
import {h,P,Ico,Use,Raw,ls,money,today,sha,HEART} from '../lib';
import {CITIES,KINDS,ITEMS,DEAL,SKY,SNAP} from '../data';
export default function Book({item,user,s,onSave,go}){
 const [f,setF]=useState({name:user.name,email:user.email,date:s.date,n:item.deal?2:(parseInt(s.trav)||1)}),[er,setEr]=useState({}),[done,setDone]=useState(null);
 const set=p=>setF(o=>({...o,...p})),total=item.price*f.n;
 const submit=e=>{e.preventDefault();const x={};
  if(f.name.trim().length<2)x.name='Enter the traveler’s full name.';
  if(!/^\S+@\S+\.\S+$/.test(f.email))x.email='Enter a valid email address.';
  if(!f.date)x.date='Choose a travel date.';else if(f.date<today)x.date='The date can’t be in the past.';
  setEr(x);if(Object.keys(x).length)return;
  const b={ref:'TT-'+Math.random().toString(36).slice(2,8).toUpperCase(),user:user.email,title:item.title,city:item.city,kind:item.kind,date:f.date,n:f.n,total,name:f.name.trim(),at:Date.now()};
  onSave(b);setDone(b)};
 if(done)return h('div',{className:'page wrap'},h('div',{className:'ok'},h('h2',null,'Booking confirmed'),
  h('p',null,'Reference ',h('b',null,done.ref)),h('p',null,done.title+' · '+done.n+(done.n>1?' travelers':' traveler')+' · '+done.date),h('p',null,'Total paid: ',h('b',null,money(done.total))),
  h('p',{className:'sub'},'A confirmation was saved to My trips. (Demo: no email or payment is sent.)'),
  h('button',{className:'btn',onClick:()=>go('trips')},'View my trips'),' ',h('button',{className:'btn ghost',onClick:()=>go('Home')},'Back to home')));
 const fld=(k,l,ctl)=>h('div',null,h('label',{htmlFor:'f'+k},l),ctl,er[k]&&h('p',{className:'err',role:'alert'},er[k]));
 return h('div',{className:'page wrap'},h('h2',null,'Complete your booking'),h('div',{className:'bk'},
  h('form',{className:'fm',noValidate:true,onSubmit:submit},
   fld('name','Full name',h('input',{id:'fname',value:f.name,onChange:e=>set({name:e.target.value})})),
   fld('email','Email',h('input',{id:'femail',type:'email',value:f.email,onChange:e=>set({email:e.target.value})})),
   fld('date','Travel date',h('input',{id:'fdate',type:'date',min:today,value:f.date,onChange:e=>set({date:e.target.value})})),
   fld('n','Travelers',h('select',{id:'fn',value:f.n,onChange:e=>set({n:+e.target.value})},[1,2,3,4,5,6,7,8,9].map(n=>h('option',{key:n,value:n},n)))),
   h('p',null),h('button',{className:'btn',type:'submit'},'Confirm and pay '+money(total))),
  h('aside',{className:'sum'},h('h3',{style:{margin:'0 0 6px'}},item.title),h('p',{className:'sub',style:{margin:0}},item.city+', '+item.country+' · '+item.desc),
   h('div',{className:'row'},h('span',null,money(item.price)+' × '+f.n),h('span',null,money(total))),h('div',{className:'row tot'},h('span',null,'Total'),h('span',null,money(total))))));
}

