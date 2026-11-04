# Referencia API local

Base: `http://localhost:8080/api`. JSON. Cookies HttpOnly con `credentials: same-origin`. No pasar JWT por localStorage. `/openapi` ofrece un índice mínimo OpenAPI; esta tabla documenta las operaciones disponibles.

| Método | Ruta | Acceso / cuerpo |
|---|---|---|
| GET | /health | Local; DB, Redis e ID de instancia |
| GET | /config | Estado demo, proveedor y modo de puntuación |
| POST | /auth/register | Público; name, email, password ≥10 caracteres |
| POST | /auth/login | Público; email, password |
| POST | /auth/logout | Usuario; invalida sesiones |
| GET | /auth/me | Usuario |
| POST | /auth/forgot | Público; email; respuesta neutra |
| POST | /auth/reset | Público; token de 64 caracteres, password |
| PATCH | /profile | Usuario; name, oldPassword/password opcionales |
| GET | /leagues | Público; seis competiciones |
| GET | /matches?league=PD | Público; máximo 1000 encuentros |
| GET | /teams?league=PL | Público |
| GET | /teams/:id | Público; ficha y plantilla |
| GET | /standings/:code | Público; caché oficial, token necesario |
| GET | /predictions | Usuario; historial propio |
| PUT | /predictions/:matchId | Usuario; home/away enteros 0–99 |
| GET | /rankings?league=PD | Público; puntajes agregados |
| GET/POST | /rooms | Usuario; propias / crear name, description |
| POST | /rooms/join | Usuario; code de 12 caracteres |
| GET | /rooms/:id | Solo miembros; sala y ranking |
| PATCH | /rooms/:id | Solo creador; name, description |
| DELETE | /rooms/:id/members/:userId | Miembro sale o creador retira a otro |
| POST | /admin/sync/:code | ADMIN; sincroniza partidos europeos |
| PUT | /admin/teams/:id | ADMIN; equipo y exactamente 17 fotos/jugadores, ver team-import-format.md |
| PATCH | /admin/users/:id/role | ADMIN; USER/ADMIN; sin cambiar el propio rol |
| POST | /admin/teams/:id/sync | ADMIN; sincroniza plantilla del proveedor |
| POST | /admin/scorers/:code | ADMIN; consulta goleadores disponibles |
| POST | /admin/import | ADMIN; liga, URL de fuente, temporada y matches |
| PUT | /admin/matches/:id/result | ADMIN; homeScore, awayScore, reason ≥8 caracteres |
| POST | /admin/recalculate | ADMIN; reconstruye todos los puntajes |
| GET | /admin/status | ADMIN; usuarios, salas, últimas 50 auditorías |
| GET | /admin/reset/:userId | ADMIN; entrega enlace de recuperación local |

400 validación, 401 falta sesión, 403 permisos/origen, 404 no existe, 409 duplicado/plazo cerrado, 429 límite, 502 error externo, 503 token ausente. Errores inesperados devuelven mensaje genérico y log estructurado, sin claves.

Recuperación: solicitar desde acceso; administrador copia enlace desde usuarios; el titular abre `/?reset=TOKEN` y fija contraseña. Token hash en DB, caduca en 15 minutos y es de un solo uso. Redis conserva temporalmente el valor para entrega local. Sin correo saliente.
