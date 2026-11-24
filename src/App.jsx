import React,{useState,useRef,useEffect,useId} from 'react';
import {h,P,Ico,Use,Raw,ls,money,today,sha,HEART} from './lib';
import {CITIES,KINDS,ITEMS,DEAL,SKY,SNAP} from './data';
import Header from './components/Header';
import Hero from './components/Hero';
import Home from './components/Home';
import Results from './components/Results';
import Book from './components/Book';
import Trips from './components/Trips';
import Auth from './components/Auth';
import Chat from './components/Chat';
export default function App(){
 const [view,setView]=useState({n:'home'}),[ap,setAp]=useState({q:'',kind:'Packages'}),[s,setS]=useState({tab:'Packages',dest:'',date:'',trav:'1 Traveler',msg:''});
 const [user,setUser]=useState(()=>ls.get('tt_user',null)),[favs,setFavs]=useState(()=>ls.get('tt_favs',[])),[trips,setTrips]=useState(()=>ls.get('tt_trips',[])),[modal,setModal]=useState(null);
 const ref=useRef(null),set=p=>setS(o=>({...o,...p}));
 const show=v=>{setView(v);window.scrollTo({top:0})},scrollTo=id=>setTimeout(()=>{const e=document.getElementById(id);e&&e.scrollIntoView({behavior:'smooth'})},60);
 const search=(q,kind,nav)=>{setAp({q,kind});show({n:'results',nav:nav||kind})};
 const fav=id=>{const n=favs.includes(id)?favs.filter(x=>x!==id):[...favs,id];setFavs(n);ls.set('tt_favs',n)};
 const login=u=>{setUser(u);ls.set('tt_user',u);const t=modal&&modal.then;setModal(null);if(t)show({n:'book',item:t})};
 const out=()=>{setUser(null);ls.set('tt_user',null);show({n:'home'})};
 const book=it=>user?show({n:'book',item:it}):setModal({then:it});
 const saveTrip=b=>{const n=[b,...trips];setTrips(n);ls.set('tt_trips',n)};
 const go=n=>{
  if(n==='Home')show({n:'home'});
  else if(n==='Destinations'||n==='About'||n==='Contact'){show({n:'home'});scrollTo(n.toLowerCase())}
  else if(n==='Packages'||n==='Hotels'){set({tab:n,dest:''});search('',n)}
  else if(n==='saved'){setAp({q:'',kind:'All'});show({n:'results',fo:true,nav:''})}
  else if(n==='trips')user?show({n:'trips'}):setModal({});};
 let body;
 if(view.n==='home')body=h(Home,{favs,fav,onOpen:c=>{set({tab:'Packages',dest:c.c+', '+c.k});search(c.c,'Packages')},onAll:()=>search('','Packages'),onBook:book});
 else if(view.n==='results')body=h(Results,{key:JSON.stringify(ap)+view.fo,ap,favs,fav,onBook:book,fo0:view.fo});
 else if(view.n==='book')body=h(Book,{key:view.item.id,item:view.item,user,s,onSave:saveTrip,go});
 else body=user?h(Trips,{trips,setTrips,user}):null;
 return h(React.Fragment,null,h(Header,{user,view,go,onAuth:()=>setModal({}),onOut:out}),
  h('main',{id:'top'},h(Hero,{view,s,set,inputRef:ref,onSearch:search}),body),
  h('footer',{id:'contact'},h('div',{className:'wrap'},'© 2026 TravelTunisia · hello@traveltunisia.example · +216 00 000 000')),
  modal&&h(Auth,{onClose:()=>setModal(null),onLogin:login}),h(Chat,{search,go}));
}
