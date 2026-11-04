# LASJIJAS ⚽

**Predice, acierta y suma puntos.** Plataforma educativa de pronósticos, sin apuestas ni premios monetarios. Laboratorio 12, Tecsup.

Aplicación local: **http://localhost:8080**. No utiliza AWS, no publica un sitio y solo expone el puerto de entrada en `127.0.0.1`.

## Iniciar en Docker Desktop

Requisitos: Docker Desktop activo, Docker Compose v2 o superior y Git. Se descarga software e imágenes al construir; las consultas deportivas requieren Internet.

Inicio automático (genera secretos locales si faltan): `node scripts/start.mjs`. Alternativa manual:

```sh
cp .env.example .env
# Cambia JWT_SECRET por un valor aleatorio de al menos 32 caracteres.
# Cambia POSTGRES_PASSWORD por un valor alfanumérico aleatorio.
docker compose up --build -d
docker compose ps
```

En la entrega local `.env` ya está generado y no se incluye en Git. El volumen `postgres_data` conserva cuentas, salas y pronósticos entre reinicios.

Credenciales **solo de demostración** (se crean únicamente con `DEMO_MODE=true`):

| Cuenta | Correo | Contraseña inicial |
|---|---|---|
| Participante | demo@lasjijas.local | DemoLocal2026! |
| Administrador | admin@lasjijas.local | DemoLocal2026! |

Se puede cambiar `DEMO_PASSWORD` antes del primer arranque. El seed no cambia contraseñas de cuentas existentes. Después del primer arranque, cámbialas desde Perfil si hace falta.

## Qué incluye

- Dashboard responsive basado en la referencia: escritorio con menú lateral y columna de perfil; móvil con navegación inferior; temas claro y oscuro.
- Registro, acceso, cierre de sesión, perfil, cambio de contraseña y recuperación local con enlace entregado por el administrador.
- Seis ligas, búsqueda, filtros y 12 clubes de referencia con 204 fotos oficiales locales, 17 jugadores por equipo (11 + 6), y fichas con fuentes. La selección de 11 + 6 es de referencia, nunca se anuncia como alineación confirmada de un partido.
- Pronósticos persistentes, editables hasta el inicio, validados en servidor, historial y desglose de puntos.
- Rankings global, por competición y por sala; gráficos de precisión y estadísticas personales calculadas a partir de resultados evaluados.
- Salas privadas con códigos aleatorios, invitaciones, membresías, configuración del creador y retirada de integrantes.
- Panel administrativo, importación de partidos, sincronización, corrección auditada de resultados y recálculo determinista.
- PostgreSQL, Redis, Nginx y dos réplicas del backend por defecto. Migración versionada y seed idempotente.

## Datos reales y demostración

Sin token, los encuentros de ejemplo son **simulados**, con fechas generadas en el primer seed. Nunca se presentan como calendario oficial. Los logos y las fotos reales son independientes de esos partidos simulados. Las fichas oficiales se guardan como consultas fechadas y no garantizan una actualización continua.

Configura tu token **localmente**, sin subirlo al repositorio:

```dotenv
FOOTBALL_DATA_TOKEN=tu_token
DEMO_MODE=true
SCORE_MODE=exclusive
```

Después ejecuta `docker compose up -d --force-recreate backend` y entra como administrador. Usa un botón de sincronización por vez. La API v4 se consulta desde el servidor: el token nunca llega al navegador. Caché compartida de 5 minutos y una consulta externa cada 7,5 segundos como máximo. Los errores quedan en auditoría; no se sustituyen datos oficiales por resultados inventados.

football-data.org incluye las cinco competiciones europeas en su cobertura publicada. **Liga 1 de Perú no figura**: utiliza la importación administrativa con URL de origen y auditoría. Los planes tienen límites y no todos incluyen plantillas, fotos o estadísticas avanzadas. Los campos faltantes se muestran como `—`. Consulta [fuentes y límites](docs/DATOS.md).

## Puntuación configurable

`SCORE_MODE=exclusive` (predeterminado): exacto 5; de lo contrario ganador/empate 3; de lo contrario diferencia firmada 2. Se prioriza una categoría base. Como una diferencia firmada correcta implica acertar ganador/empate, la categoría de diferencia queda absorbida por ganador en este modo. Es una consecuencia matemática de la prioridad exigida, no un error oculto.

`SCORE_MODE=cumulative`: exacto 5; sin exacto, ganador/empate 3 + diferencia firmada 2 si corresponden. No se suman otros puntos base al exacto.

Bonus independientes: +2 en los aciertos consecutivos 3, 6, 9…; +1 si la **última modificación efectiva** fue estrictamente más de 24 horas antes. En los últimos 10 minutos (incluido exactamente 10), solo base. El bonus anticipado se concede aunque falle el resultado, conforme a que es independiente de la base. Una modificación reinicia la anticipación; repetir una solicitud idéntica no cambia la hora. El cierre ocurre en el inicio, usando UTC en el servidor.

El motor evalúa únicamente partidos finalizados con ambos goles definitivos. Recalcular reconstruye puntos y rachas en orden cronológico, por usuario, sin duplicar bonus. Una corrección cambia también los bonus posteriores que dependan de la racha.

Después de cambiar modo: recrea `backend` y usa **Recalcular puntuación** en Administración.

## Escalamiento local

```sh
docker compose up -d --scale backend=3
curl http://localhost:8080/api/health
docker compose up -d --scale backend=2
docker compose logs --tail=50 backend nginx
```

No hay `container_name` ni puertos fijos en backend. Nginx usa DNS interno de Docker con resolución dinámica, upstream compartido y round robin. `/api/health` identifica la instancia y comprueba DB/Redis. Las cookies JWT, datos y límites no dependen de memoria de una réplica. Nginx aplica detección pasiva de fallos; Compose proporciona healthchecks, pero no es un orquestador con autoreparación completa.

Detener conservando datos: `docker compose stop`. Arrancar: `docker compose start`. `docker compose down` elimina contenedores y red, conservando el volumen. **No uses `down -v` si quieres conservar datos.**

## Desarrollo y validación

```sh
npm ci
npm run db:generate -w backend
npm run build
npm test
node tests/integration.mjs
# Prueba de carga sobre Docker ya levantado:
docker run --rm -i -e VUS=20 -e DURATION=15s grafana/k6:latest run - < tests/load.js
```

Vite: `npm run dev -w frontend` (puerto 5173), requiere backend accesible en 3000; el flujo verificado y recomendado es Docker en 8080. Node 22 es la versión de los contenedores. El proyecto está en un workspace npm con React 19, TypeScript, Vite, Lucide, Express, Prisma 6, PostgreSQL 16 y Redis 7. CSS propio reproduce la maqueta sin incorporar una biblioteca visual que imponga otra apariencia.

## Entregables

1. [Arquitectura y modelo relacional](docs/ARQUITECTURA.md).
2. Aplicación: `frontend/`, `backend/`, [referencia de endpoints](docs/API.md).
3. Contenedores: `docker-compose.yml`, Dockerfiles, configuración Nginx y `.env.example`.
4. [Balanceo y escalamiento](docs/ESCALAMIENTO.md), evidencias locales.
5. [Pruebas y resultados](docs/PRUEBAS.md), suites y escenarios k6.
6. Motor `backend/src/scoring.ts` y 14 pruebas unitarias de reglas y bordes.

La recuperación no envía correos: es una implementación local documentada. No hay servicio de IA ni resultados garantizados. Logos y fotos pertenecen a sus titulares; se registran URLs y atribuciones en `docs/asset-sources.json`, `docs/roster-sources.json` y `docs/cover-source.json`. No se distribuyen como imágenes libres ni se otorga una licencia sobre ellos. La entrega no contiene imágenes generadas por IA.
