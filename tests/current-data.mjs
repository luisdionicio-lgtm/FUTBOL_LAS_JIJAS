import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const root='frontend/public/data/';
const matches=JSON.parse(await readFile(root+'matches-2026.json','utf8'));
assert.equal(matches.asOf,'2026-11-04');assert.equal(matches.matches.length,60);
const unique=new Set();
for(const m of matches.matches){const d=m.date||m.kickoff;assert.equal(String(d).slice(0,4),'2026');assert.match(m.sourceUrl,/^https:\/\//);const k=[m.leagueCode,m.home,m.away,d].join('|');assert.ok(!unique.has(k),'Duplicate match');unique.add(k);if(m.status==='FINISHED'){assert.ok(Number.isInteger(m.homeScore)&&m.homeScore>=0);assert.ok(Number.isInteger(m.awayScore)&&m.awayScore>=0);assert.ok(d.slice(0,10)<=matches.asOf);}else assert.ok(d.slice(0,10)>=matches.asOf);}
const odds=JSON.parse(await readFile(root+'odds-2026.json','utf8'));
for(const c of odds.comparisons){assert.equal(c.date.slice(0,4),'2026');assert.ok(c.quotes.length>=2);assert.equal(new Set(c.quotes.map(q=>q.bookmaker)).size,c.quotes.length);for(const q of c.quotes){assert.ok(q.odds>1);assert.match(q.sourceUrl,/^https:\/\//);assert.ok(q.observedAt);if(q.originalOdds){const [a,b]=q.originalOdds.split('/').map(Number);assert.ok(Math.abs(q.odds-(1+a/b))<.00001);}}}
const tables=JSON.parse(await readFile(root+'tables-leaders.json','utf8'));
assert.equal(tables.leagues.length,6);
for(const l of tables.leagues){const ranks=l.standings.map(x=>x.position);assert.equal(ranks.length,new Set(ranks).size);for(const p of l.leaders||[]){assert.match(p.sourceUrl,/^https:\/\//);assert.ok(p.scope);}if(l.standings.length)assert.match(l.standingsSourceUrl,/^https:\/\//);}
console.log(JSON.stringify({status:'PASS',matches:matches.matches.length,oddsComparisons:odds.comparisons.length,quotes:odds.comparisons.reduce((a,c)=>a+c.quotes.length,0),tables:tables.leagues.map(l=>({league:l.code,rows:l.standings.length,partial:!!l.partial,leaders:l.leaders.length}))},null,2));
