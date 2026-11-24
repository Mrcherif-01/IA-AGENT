import React,{useState,useRef,useEffect,useId} from 'react';
import {h,P,Ico,Use,Raw,ls,money,today,sha,HEART} from '../lib';
import {CITIES,KINDS,ITEMS,DEAL,SKY,SNAP} from '../data';
const LIMIT=8,MAXIN=200;
const SITE=CITIES.map(c=>{const g=k=>ITEMS.find(x=>x.city===c.c&&x.kind===k).price;return `${c.c} (${c.k}): package ${g('Packages')}, flights ${g('Flights')}, hotel ${g('Hotels')}`}).join('; ');
const SYS='You are the TravelTunisia website assistant. Answer ONLY about this site (search, booking, saved offers, account, My trips) and the destinations it sells. For anything else reply exactly: I can only help with TravelTunisia. Maximum 45 words, plain text, no markdown. Prices are DT per person: '+SITE+'. Booking is a demo: no real payment or email is sent.';
const TRAVEL=/travel|trip|flight|hotel|package|book|price|cost|cheap|offer|deal|destin|sign|account|password|save|favou?rite|cancel|refund|pay|date|traveler|support|contact|visa|luggage|baggage|stay|night|city|tunisia|help/i;
function localAnswer(q,search,go){
 const t=q.toLowerCase(),city=CITIES.find(c=>t.includes(c.c.toLowerCase())||t.includes(c.k.toLowerCase()));
 if(/^(hi|hello|hey|salam|bonjour)\b/.test(t))return {t:'Hi! I can help you find offers, book, or manage your trips. What do you need?'};
 if(city){const g=k=>money(ITEMS.find(x=>x.city===city.c&&x.kind===k).price);
  return {t:`${city.c}: package ${g('Packages')}, flights ${g('Flights')}, hotel ${g('Hotels')} (per person).`,acts:[['Show '+city.c+' offers',()=>search(city.c,'All')]]}}
 if(/cheap|lowest|budget|best price/.test(t)){const m=[...ITEMS].sort((a,b)=>a.price-b.price)[0];return {t:`The lowest price right now is ${m.title} at ${money(m.price)} per person.`,acts:[['Show '+m.city+' offers',()=>search(m.city,'All')]]}}
 if(/cancel|refund/.test(t))return {t:'Open My trips from the account menu and press Cancel booking.',acts:[['Open My trips',()=>go('trips')]]};
 if(/book|reserve/.test(t))return {t:'Pick an offer and press Book now. Sign in, enter the traveler details and confirm. The trip then appears in My trips.',acts:[['Browse packages',()=>go('Packages')]]};
 if(/sign|login|log in|account|password|register/.test(t))return {t:'Use Sign In at the top right to create an account or log in. Accounts are stored only in this browser.'};
 if(/save|favou?rite|heart/.test(t))return {t:'Tap the heart on any offer to save it. Saved offers are in the account menu.',acts:[['Open Saved',()=>go('saved')]]};
 if(/pay|payment|card/.test(t))return {t:'This site is a demo: no real payment is taken.'};
 if(/contact|support|phone|email/.test(t))return {t:'Support is available 24/7: hello@traveltunisia.example or +216 00 000 000.'};
 if(/destination|where|places|countries/.test(t))return {t:'We offer Istanbul, Dubai, Paris, Rome, Barcelona and Cairo.'};
 return null;
}
export default function Chat({search,go}){
 const [open,setOpen]=useState(false),[msgs,setMsgs]=useState([{r:'b',t:'Hi! Ask me about offers, booking, saved items or your trips.'}]),[v,setV]=useState(''),[busy,setBusy]=useState(false),[ai,setAi]=useState(true);
 const day=()=>new Date().toISOString().slice(0,10),quota=()=>{const q=ls.get('tt_ai',{});return q.d===day()?q.n:0};
 const [used,setUsed]=useState(quota),cache=useRef({}),last=useRef(0),end=useRef(null),msgsRef=useRef(msgs);msgsRef.current=msgs;
 useEffect(()=>{end.current&&end.current.scrollIntoView({block:'end'})},[msgs,open,busy]);
 const add=m=>setMsgs(o=>[...o,m].slice(-30));
 const send=async txt=>{
  const q=(txt===undefined?v:txt).trim().slice(0,MAXIN);if(!q||busy)return;
  if(Date.now()-last.current<2000)return;last.current=Date.now();
  setV('');add({r:'u',t:q});
  const loc=localAnswer(q,search,go);if(loc)return add({r:'b',...loc});
  if(!TRAVEL.test(q))return add({r:'b',t:'I can only help with TravelTunisia: offers, booking, saved items and your trips.'});
  const key=q.toLowerCase();if(cache.current[key])return add({r:'b',t:cache.current[key]});
  if(!ai||quota()>=LIMIT)return add({r:'b',t:'Smart answers are used up for today. The quick buttons and your questions about prices, booking, trips and saved offers still work.'});
  setBusy(true);
  const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),20000);
  try{
   const s=window.claude&&await window.claude.use('sample');
   if(!s){setAi(false);return add({r:'b',t:'Smart answers are not available here. Quick answers still work.'})}
   const n=quota()+1;ls.set('tt_ai',{d:day(),n});setUsed(n);
   const hist=msgsRef.current.slice(-4).filter(m=>!m.acts).map(m=>(m.r==='u'?'User: ':'Assistant: ')+m.t.slice(0,160)).join('\n');
   const r=await s(SYS+'\n\n'+(hist?hist+'\n':'')+'User: '+q,{modelTier:'quick',cache:false,signal:ctl.signal});
   const a=(r.text||'').trim().slice(0,500)||'Sorry, I have no answer for that.';
   cache.current[key]=a;add({r:'b',t:a});
  }catch(e){
   const c=e&&e.code;
   if(c==='not_granted'){setAi(false);add({r:'b',t:'Smart answers are turned off. Quick answers still work.'})}
   else if(c==='rate_limited')add({r:'b',t:'Too many requests. Please wait a moment.'});
   else add({r:'b',t:'I couldn’t answer that. Try again or use the quick buttons.'});
  }finally{clearTimeout(timer);setBusy(false)}
 };
 const chips=msgs.length<=1&&h('div',{className:'cc'},['Cheapest offer','How to book','Cancel a trip','Saved offers'].map(c=>h('button',{key:c,onClick:()=>send(c)},c)));
 return h(React.Fragment,null,
  open&&h('div',{className:'chat',role:'dialog','aria-label':'Travel assistant',onKeyDown:e=>e.key==='Escape'&&setOpen(false)},
   h('div',{className:'ch'},h('b',null,'TravelTunisia assistant'),h('button',{'aria-label':'Close chat',onClick:()=>setOpen(false)},'✕')),
   h('div',{className:'cl','aria-live':'polite'},msgs.map((m,i)=>h('div',{key:i,className:'m '+m.r},m.t,m.acts&&h('div',{className:'ca'},m.acts.map(([l,f])=>h('button',{key:l,onClick:()=>{f();setOpen(false)}},l))))),busy&&h('div',{className:'m b'},'Typing…'),chips,h('div',{ref:end})),
   h('form',{className:'cf',onSubmit:e=>{e.preventDefault();send()}},h('input',{value:v,maxLength:MAXIN,placeholder:'Ask a question…','aria-label':'Message',autoFocus:true,onChange:e=>setV(e.target.value)}),h('button',{className:'btn',disabled:busy||!v.trim()},'Send')),
   h('div',{className:'cn'},ai?`Smart answers left today: ${Math.max(0,LIMIT-used)}`:'Quick answers only')),
  h('button',{className:'fab','aria-label':open?'Close chat':'Open chat',onClick:()=>setOpen(!open)},open?'✕':Ico(P('M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z'),{width:28,height:28})));
}
