export type ScoreInput={home:number;away:number;actualHome:number;actualAway:number;kickoff:Date;registeredAt:Date;streak:number;mode:'exclusive'|'cumulative'};
export function score(p:ScoreInput){
 const exact=p.home===p.actualHome&&p.away===p.actualAway;
 const winner=Math.sign(p.home-p.away)===Math.sign(p.actualHome-p.actualAway);
 const difference=p.home-p.away===p.actualHome-p.actualAway;
 const base=exact?5:p.mode==='cumulative'?(winner?3:0)+(difference?2:0):winner?3:difference?2:0;
 const lead=p.kickoff.getTime()-p.registeredAt.getTime();
 const streak=winner?p.streak+1:0;
 const early=lead>86400000?1:0;
 const bonus=winner&&streak%3===0&&lead>600000?2:0;
 return {base,early,bonus,streak,winner,exact,total:base+early+bonus};
}
