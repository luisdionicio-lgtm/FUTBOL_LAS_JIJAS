# Entregable 5 — Plan y evidencias reales

Fecha local: 4 de noviembre de 2026. Entorno: Docker Desktop en macOS; contenedores Linux ARM64, Node 22 y PostgreSQL 16. No se probó AWS ni un servicio publicado.

## Cobertura

- 14 unitarias: exacto, ganador, empate, diferencia acumulable/excluyente, derrota, rachas 3/4/6, anticipación estricta >24h, exactamente24h, últimos10min, bonus anticipado independiente y determinismo.
- Integración HTTP contra Nginx/PostgreSQL/Redis: registro, duplicado, acceso multi réplica, permisos, validación, creación/edición concurrente de pronósticos, códigos, ingreso idempotente, permisos de sala, login, importación, plazos, auditoría, correcciones, recálculo, ranking, CSRF, recuperación y cierre de sesión.
- Cuatro comprobaciones de puntuación con DB real: 3 exactos anticipados suman 20, recálculo sin duplicar ni cambiar horas, corrección retroactiva reduce a 13 y ranking/racha coinciden.
- Browser E2E manual mediante automatización: acceso, creación/edición de pronóstico, navegación, salas y validación responsive. Capturas en `evidence` si se completó verificación visual.
- k6: lecturas `/api/matches` con 20,50,100 VUs, 15s cada uno, pausa de1s. Compara dos y tres réplicas y añade carga sostenida e incremental. Incluye latencia media/p95, RPS y errores en cada salida. No mide capacidad de escrituras ni recálculos.

## Reproducir

```sh
npm test
npm run build
node tests/integration.mjs
node tests/scoring-integration.mjs
for vus in 20 50 100; do
 docker run --rm -i -e VUS="$vus" -e DURATION=15s grafana/k6:latest run - < tests/load.js
done
```

`tests/integration.mjs` crea usuarios `qa-...@example.test`, salas y un partido de prueba con nombres QA y fuente `example.org/educational-test-fixture`. Son datos educativos de prueba, no resultados de fútbol. Se pueden limpiar con el script documentado para entorno demo; no usarlo en datos reales. Los intentos fallidos de arranque durante reconstrucción se repitieron tras healthchecks; solo los resultados de la ejecución final están en `evidence/integration.txt`.

Consulta `RESULTADOS.md` para métricas observadas y límites. No se probó sincronización autenticada de football-data.org por falta de token. Los fallos se registran, no se presentan como pruebas aprobadas.
