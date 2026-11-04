import http from 'k6/http';import {check,sleep} from 'k6';
export const options={vus:Number(__ENV.VUS||20),duration:__ENV.DURATION||'20s',thresholds:{http_req_failed:['rate<0.01'],http_req_duration:['p(95)<1500']}};
export default function(){const base=__ENV.BASE_URL||'http://host.docker.internal:8080';const r=http.get(base+'/api/matches');check(r,{'status 200':r=>r.status===200,'array body':r=>Array.isArray(r.json())});sleep(1);}
