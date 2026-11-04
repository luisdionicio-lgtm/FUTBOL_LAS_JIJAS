import {execFileSync} from 'node:child_process';
const script=String.raw`
import {PrismaClient} from '@prisma/client';import argon2 from 'argon2';
const db=new PrismaClient();const password=await argon2.hash(process.env.DEMO_PASSWORD||'DemoLocal2026!');
const names=[['demo@lasjijas.local','Luis Dionicio'],['andy.capos@demo.lasjijas.local','Andy Capos'],['jaime.farfan@demo.lasjijas.local','Jaime Farfan'],['juan.leon@demo.lasjijas.local','Juan Leon']];
const users=[];for(const [email,name]of names)users.push(await db.user.upsert({where:{email},update:{name},create:{email,name,password}}));
let room=await db.room.findFirst({where:{ownerId:users[0].id,name:'Grupo de Desarrollo de Software'}});
if(!room)room=await db.room.create({data:{name:'Grupo de Desarrollo de Software',description:'Demostración académica con cuatro participantes de prueba; sin dinero real.',ownerId:users[0].id,code:'DESARROLLO26'}});
await db.room.update({where:{id:room.id},data:{description:'Demostración académica con Luis Dionicio, Andy Capos, Jaime Farfan y Juan Leon. Pronósticos simulados sin dinero real.'}});
for(const u of users)await db.roomMember.upsert({where:{roomId_userId:{roomId:room.id,userId:u.id}},create:{roomId:room.id,userId:u.id},update:{}});
const history=await db.match.findMany({where:{id:{startsWith:'demo-history-'}},orderBy:{kickoff:'asc'}});
for(let i=1;i<users.length;i++)for(let k=0;k<history.length;k++){
 const m=history[k];const wrong=i===2&&k===0||i===3&&k!==1;
 const home=wrong?0:i===1?(m.homeScore||0)+1:m.homeScore||0;
 const away=wrong?3:i===1?(m.awayScore||0)+1:m.awayScore||0;
 const at=new Date(m.kickoff.getTime()-90000000);
 await db.prediction.upsert({where:{userId_matchId:{userId:users[i].id,matchId:m.id}},create:{userId:users[i].id,matchId:m.id,home,away,createdAt:at,updatedAt:at},update:{home,away,updatedAt:at}});
}
console.log(JSON.stringify({roomId:room.id,name:room.name,participants:users.map(u=>u.name),simulation:true}));await db.$disconnect();`;
const result=execFileSync('docker',['compose','exec','-T','backend','node','--input-type=module'],{input:script,encoding:'utf8'});console.log(result);
const r=await fetch('http://127.0.0.1:8080/api/auth/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:'admin@lasjijas.local',password:process.env.DEMO_PASSWORD||'DemoLocal2026!'})});if(!r.ok)throw new Error('No se pudo autenticar al administrador para recalcular.');
const cookie=r.headers.get('set-cookie')?.split(';')[0];const recalc=await fetch('http://127.0.0.1:8080/api/admin/recalculate',{method:'POST',headers:{Cookie:cookie,'Content-Type':'application/json'},body:'{}'});if(!recalc.ok)throw new Error('Recálculo rechazado');console.log('Puntuación evaluada por el servidor para demostración.');
