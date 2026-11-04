import {execFileSync} from 'node:child_process';
import {writeFile,mkdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const root='http://127.0.0.1:8080/api',suffix=Date.now(),records=[];let cookie='',admin='';
async function api(path,method='GET',body,session=cookie){const r=await fetch(root+path,{method,headers:{'Content-Type':'application/json',Cookie:session},body:body?JSON.stringify(body):undefined});const b=await r.json();assert.ok(r.ok,JSON.stringify(b));return {b,c:r.headers.get('set-cookie')?.split(';')[0]};}
const a=await api('/auth/login','POST',{email:'admin@lasjijas.local',password:process.env.DEMO_PASSWORD||'DemoLocal2026!'},'');admin=a.c;
const u=await api('/auth/register','POST',{name:'QA score '+suffix,email:`qa-score-${suffix}@example.test`,password:'IntegrationLocal2026!'},'');cookie=u.c;
const ids=[0,1,2].map(i=>'integration-score-'+suffix+'-'+i);
const teams=[{id:'qa-score-home-'+suffix,name:'QA Score Local'},{id:'qa-score-away-'+suffix,name:'QA Score Visitante'}];
await api('/admin/import','POST',{leagueCode:'PE1',sourceUrl:'https://example.org/educational-test-fixture',season:'QA',matches:ids.map((id,i)=>({id,home:teams[0],away:teams[1],kickoff:new Date(Date.now()+(i+3)*3600000).toISOString(),status:'TIMED',homeScore:null,awayScore:null}))},admin);
for(const id of ids)await api('/predictions/manual:'+id,'PUT',{home:2,away:1});
// Only QA fixture rows: move their clock backwards to exercise closure and evaluation.
const sql=ids.map((id,i)=>`UPDATE "Match" SET kickoff=NOW()-INTERVAL '${3-i} hours' WHERE id='manual:${id}'; UPDATE "Prediction" SET "updatedAt"=NOW()-INTERVAL '50 hours',"createdAt"=NOW()-INTERVAL '50 hours' WHERE "matchId"='manual:${id}';`).join('\n');
execFileSync('docker',['compose','exec','-T','db','psql','-U','lasjijas','-d','lasjijas','-v','ON_ERROR_STOP=1','-c',sql],{stdio:'pipe'});
for(const id of ids)await api('/admin/matches/manual:'+id+'/result','PUT',{homeScore:2,awayScore:1,reason:'QA official-result fixture'},admin);
let p=(await api('/predictions')).b;
assert.equal(p.reduce((n,p)=>n+p.points,0),20);records.push({test:'3 exact predictions + early + third streak =20',status:'PASS'});
assert.deepEqual(p.map(p=>p.points).sort((a,b)=>a-b),[6,6,8]);
const stamps=p.map(p=>p.updatedAt).sort();
await api('/admin/recalculate','POST',{},admin);
p=(await api('/predictions')).b;assert.equal(p.reduce((n,p)=>n+p.points,0),20);assert.deepEqual(p.map(p=>p.updatedAt).sort(),stamps);records.push({test:'Repeated evaluation neither duplicates bonus nor changes anticipation',status:'PASS'});
await api('/admin/matches/manual:'+ids[0]+'/result','PUT',{homeScore:0,awayScore:1,reason:'QA correction breaks opening streak'},admin);
p=(await api('/predictions')).b;assert.equal(p.reduce((n,p)=>n+p.points,0),13);records.push({test:'Correction rebuilds downstream streak and total=13',status:'PASS'});
const rank=(await api('/rankings')).b.find(x=>x.id===u.b.id);assert.equal(rank.points,13);assert.equal(rank.streak,2);records.push({test:'Ranking agrees with audited scores and corrected streak',status:'PASS'});
await mkdir('tests/results',{recursive:true});await writeFile('tests/results/scoring-integration.json',JSON.stringify({date:new Date().toISOString(),records},null,2));console.log(records);
