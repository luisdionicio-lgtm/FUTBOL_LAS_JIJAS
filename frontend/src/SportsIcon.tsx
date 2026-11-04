import React,{useState} from 'react';
import {Shield,UserRound} from 'lucide-react';
type Entry={name:string;src:string;sourceUrl:string};
export type IconCatalog={clubs?:Record<string,Entry>;players?:Record<string,Entry>};
export function normalizeName(name:string){return name.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'');}
export function SportsIcon({name,kind='club',catalog={},src,size='small'}:{name:string;kind?:'club'|'league'|'player';catalog?:IconCatalog;src?:string;size?:'small'|'medium'|'large'}){
 const [failed,setFailed]=useState('');const item=kind==='club'?catalog.clubs?.[normalizeName(name)]:kind==='player'?catalog.players?.[normalizeName(name)]:undefined;
 const url=src||item?.src;const fallback=!url||failed===url;
 return <span className={`sports-icon sports-icon-${kind} sports-icon-${size} ${fallback?'sports-icon-fallback':''}`} title={fallback?name+' · imagen no disponible':name}>
 {fallback?<>{kind==='player'?<UserRound/>:<Shield/>}<span>{name.split(' ').map(x=>x[0]).slice(0,2).join('')}</span></>:<img src={url} alt={(kind==='player'?'Foto de ':kind==='league'?'Logo de ':'Escudo de ')+name} loading="lazy" onError={()=>setFailed(url)}/>}
 </span>;
}
