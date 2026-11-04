import {existsSync,readFileSync,writeFileSync} from 'node:fs';
import {randomBytes} from 'node:crypto';
import {execFileSync} from 'node:child_process';
if(!existsSync('.env')){
 const env=readFileSync('.env.example','utf8').replace('replace-with-at-least-32-random-characters',randomBytes(40).toString('hex')).replace('local-education-only-change-this',randomBytes(18).toString('hex'));
 writeFileSync('.env',env,{mode:0o600});console.log('Variables locales creadas; .env está excluido de Git.');
}
execFileSync('docker',['compose','up','--build','-d'],{stdio:'inherit'});
console.log('LASJIJAS: http://localhost:8080');
