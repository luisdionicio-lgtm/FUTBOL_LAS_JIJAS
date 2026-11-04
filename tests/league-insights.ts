import assert from 'node:assert/strict';
import {recentForm} from '../frontend/src/LeagueInsights.js';
const matches=[{leagueCode:'PD',status:'FINISHED',home:'Málaga',away:'Sevilla',homeScore:2,awayScore:0,date:'2026-11-02',sourceUrl:'https://example.test/2'},{leagueCode:'PD',status:'FINISHED',home:'Sevilla',away:'Málaga',homeScore:1,awayScore:1,date:'2026-10-31',sourceUrl:'https://example.test/1'},{leagueCode:'PD',status:'TIMED',home:'Málaga',away:'Sevilla',homeScore:null,awayScore:null,date:'2026-11-06'},{leagueCode:'PL',status:'FINISHED',home:'Málaga',away:'Sevilla',homeScore:0,awayScore:5,date:'2026-11-01'}];
const form=recentForm('Malaga','PD',matches);
assert.deepEqual(form.map(m=>m.result),['E','G']);assert.deepEqual(form.map(m=>[m.gf,m.ga]),[[1,1],[2,0]]);
const opponent=recentForm('Sevilla','PD',matches);assert.deepEqual(opponent.map(m=>m.result),['E','P']);
const many=Array.from({length:8},(_,i)=>({...matches[0],date:'2026-10-'+String(i+10).padStart(2,'0')}));assert.equal(recentForm('Málaga','PD',many).length,5);assert.equal(recentForm('Málaga','PD',many)[0].date,'2026-10-13');
assert.deepEqual(recentForm('Unknown','PD',matches),[]);
console.log('PASS: chronological form, home/away scores, draws, unplayed and other leagues excluded, last5 and missing data');
