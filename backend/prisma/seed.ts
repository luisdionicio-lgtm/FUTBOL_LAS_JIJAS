import {score} from '../src/scoring.js';
import {readFile} from 'node:fs/promises';
import {db} from '../src/db.js';
import argon2 from 'argon2';
const leagues=[['PL','Premier League','Inglaterra'],['PD','LaLiga','España'],['SA','Serie A','Italia'],['BL1','Bundesliga','Alemania'],['FL1','Ligue 1','Francia'],['PE1','Liga 1','Perú']];
const pairs=[['Real Madrid','Barcelona'],['Arsenal','Manchester City'],['Inter','Juventus'],['Bayern München','Borussia Dortmund'],['Paris Saint-Germain','Marseille'],['Universitario','Alianza Lima']];
for(const [code,name,country] of leagues) await db.league.upsert({where:{code},update:{emblem:`/leagues/${code}.png`},create:{code,name,country,emblem:`/leagues/${code}.png`}});
if(process.env.DEMO_MODE==='true'){
 const password=await argon2.hash(process.env.DEMO_PASSWORD||'DemoLocal2026!');
 await db.user.upsert({where:{email:'demo@lasjijas.local'},update:{},create:{email:'demo@lasjijas.local',name:'Luis Dionicio',password}});
 await db.user.upsert({where:{email:'admin@lasjijas.local'},update:{},create:{email:'admin@lasjijas.local',name:'Administrador',password,role:'ADMIN'}});
 for(let i=0;i<6;i++){
 const code=['PD','PL','SA','BL1','FL1','PE1'][i];
 const crests=[['86','81'],['57','65'],['108','109'],['5','4'],['524','516'],['universitario','alianza']];
 const teams=pairs[i].map((name,j)=>({id:`demo-${code}-${j}`,name,crest:`/teams/${crests[i][j]}.png`}));
 for(const [j,t] of teams.entries()){
 let squad:any[]=[];
 const europe=JSON.parse(await readFile(new URL('./players-europe.json',import.meta.url),'utf8'));
 if(europe[t.id])squad=europe[t.id];
 if(code==='PE1')squad=JSON.parse(await readFile(new URL(j===0?'./players-uni.json':'./players-pe.json',import.meta.url),'utf8'));
 const official=JSON.parse(await readFile(new URL('./rosters-official.json',import.meta.url),'utf8'));
 if(official[t.id]){const extra=squad;squad=official[t.id].slice(0,17).map((p:any)=>{const hit=extra.find((x:any)=>x.name===p.name||(p.name.length>4&&x.name.endsWith(p.name)));return hit?{...hit,...p,goals:hit.goals,assists:hit.assists,played:hit.played}:p;});}
 const data={squad,sourceUrl:code==='PE1'?(j===0?'https://universitario.pe/equipos/futbol-masculino':'https://liga1.pe/club/alianza-lima/'):'',rosterSnapshot:squad.length?'2026-11-04':null};
 await db.team.upsert({where:{id:t.id},update:{crest:t.crest,data},create:{...t,leagueCode:code,data}});
 }
 await db.match.upsert({where:{id:`demo-${code}`},update:{home:teams[0],away:teams[1]},create:{id:`demo-${code}`,leagueCode:code,home:teams[0],away:teams[1],kickoff:new Date(Date.now()+(48+i*3)*3600000),source:'demo'}});
 }
 const participants=[['demo@lasjijas.local','Luis Dionicio'],['carlos@lasjijas.local','Carlos R. · demo'],['ana@lasjijas.local','Ana M. · demo'],['diego@lasjijas.local','Diego S. · demo']];
 for(const [email,name] of participants)await db.user.upsert({where:{email},update:{},create:{email,name,password}});
 const demoTeams=await db.team.findMany({where:{leagueCode:'PD',id:{startsWith:'demo-'}},orderBy:{id:'asc'}});
 if(demoTeams.length>=2){
 const officialScores=[[2,1],[1,0],[1,1]];
 const users=await db.user.findMany({where:{email:{in:participants.map(p=>p[0])}}});
 for(const [ui,u] of users.entries()){
 let streak=0;
 for(let k=0;k<3;k++){
 const kickoff=new Date(Date.now()-(4-k)*86400000);
 const registeredAt=new Date(kickoff.getTime()-90000000);
 const match=await db.match.upsert({where:{id:'demo-history-'+k},update:{},create:{id:'demo-history-'+k,leagueCode:'PD',home:{id:demoTeams[0].id,name:demoTeams[0].name,crest:demoTeams[0].crest},away:{id:demoTeams[1].id,name:demoTeams[1].name,crest:demoTeams[1].crest},kickoff,status:'FINISHED',homeScore:officialScores[k][0],awayScore:officialScores[k][1],source:'demo'}});
 const home=ui===0?officialScores[k][0]:ui===1?officialScores[k][0]+1:ui===2&&k===1?0:officialScores[k][0];
 const away=ui===0?officialScores[k][1]:ui===1?officialScores[k][1]+1:ui===2&&k===1?2:officialScores[k][1];
 const computed=score({home,away,actualHome:match.homeScore!,actualAway:match.awayScore!,kickoff:match.kickoff,registeredAt,streak,mode:process.env.SCORE_MODE==='cumulative'?'cumulative':'exclusive'});streak=computed.streak;
 await db.prediction.upsert({where:{userId_matchId:{userId:u.id,matchId:match.id}},update:{},create:{userId:u.id,matchId:match.id,home,away,createdAt:registeredAt,updatedAt:registeredAt,evaluated:true,points:computed.total,breakdown:computed}});
 }
 }
 }

}
await db.$disconnect();
