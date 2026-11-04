import {db} from './db.js';
import {createClient} from 'redis';
export const cache=createClient({url:process.env.REDIS_URL||'redis://localhost:6379'});
cache.on('error',e=>console.error(JSON.stringify({event:'redis',message:e.message})));
export async function football(path:string){
 if(!process.env.FOOTBALL_DATA_TOKEN) throw Object.assign(new Error('Configura FOOTBALL_DATA_TOKEN en .env para consultar datos reales.'),{status:503});
 const hit=await cache.get('fd:'+path);if(hit)return JSON.parse(hit);
 // Shared lock and spacing: <= 9 upstream requests/minute across replicas.
 const lock=await cache.set('fd:lock','1',{NX:true,PX:7500});
 if(!lock)throw Object.assign(new Error('Proveedor en pausa de cuota. Reintenta en 8 segundos.'),{status:429});
 const res=await fetch('https://api.football-data.org/v4'+path,{headers:{'X-Auth-Token':process.env.FOOTBALL_DATA_TOKEN},signal:AbortSignal.timeout(15000)});
 if(!res.ok)throw Object.assign(new Error(`football-data.org respondió ${res.status}; verifica token, plan y cuota.`),{status:502});
 const data=await res.json();await cache.set('fd:'+path,JSON.stringify(data),{EX:300});return data;
}
export async function syncLeague(code:string){
 if(!['PL','PD','SA','BL1','FL1'].includes(code))throw Object.assign(new Error('Liga 1 se administra mediante importación; no está cubierta por este proveedor.'),{status:400});
 const data=await football(`/competitions/${code}/matches`);
 await db.$transaction(async tx=>{
 await tx.$executeRaw`SELECT pg_advisory_xact_lock(7712)`;
 for(const m of data.matches){
 if(!m.homeTeam?.id||!m.awayTeam?.id)continue;
 for(const t of [m.homeTeam,m.awayTeam])await tx.team.upsert({where:{id:String(t.id)},create:{id:String(t.id),name:t.name,crest:t.crest,leagueCode:code},update:{name:t.name,crest:t.crest,leagueCode:code}});
 const value={leagueCode:code,home:dataTeam(m.homeTeam),away:dataTeam(m.awayTeam),kickoff:new Date(m.utcDate),status:m.status,homeScore:m.score.fullTime.home,awayScore:m.score.fullTime.away,source:'football-data.org'};
 await tx.match.upsert({where:{id:String(m.id)},create:{id:String(m.id),...value},update:value});
 }
 await tx.league.update({where:{code},data:{source:'football-data.org',season:String(data.matches[0]?.season?.startDate?.slice(0,4)||'Actual'),syncedAt:new Date()}});
 });
 return {count:data.matches.length};
}
function dataTeam(t:any){return {id:String(t.id),name:t.name,crest:t.crest};}
