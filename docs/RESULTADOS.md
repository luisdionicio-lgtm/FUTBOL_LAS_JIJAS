# Resultados observados — 4 de noviembre de 2026

14/14 pruebas unitarias, 26/26 comprobaciones de integración HTTP y 4/4 verificaciones de evaluación/corrección en base de datos. Compilación TypeScript y Vite aprobada. Auditoría npm final: 0 vulnerabilidades reportadas en las dependencias bloqueadas al momento de consulta.

| Escenario | Solicitudes | RPS | Media ms | p95 ms | Error |
|---|---:|---:|---:|---:|---:|
|k6-2replicas-100|1500|98.65|11.02|25.67|0.00%|
|k6-2replicas-20|300|19.71|12.32|18.47|0.00%|
|k6-2replicas-50|750|49.22|13.03|32.65|0.00%|
|k6-3replicas-100|1500|98.63|11.64|22.79|0.00%|
|k6-3replicas-20|300|19.72|12.42|24.61|0.00%|
|k6-3replicas-50|750|49.40|10.30|18.62|0.00%|
|k6-incremental|3397|84.64|4.36|8.59|0.00%|
|k6-sustained-50|1500|49.36|11.12|22.16|0.00%|

Las pruebas de 20/50/100 VUs duran 15 s y pausan 1 s por iteración. La carga sostenida dura 30 s a 50 VUs. La incremental dura 40 s con escalones 20→50→100→0 y pausa de 0,5 s. Se usó un conjunto pequeño de encuentros de demostración y fixtures QA, no una temporada completa. Son pruebas académicas cortas, no un soak test de horas. Los thresholds fueron p95<1500 ms y error<1%; todas las ejecuciones terminaron con código 0.

Con dos réplicas se observaron dos IDs distintos; con tres, tres IDs. Tras detener una réplica se obtuvieron 12 respuestas correctas desde las restantes. Se restauraron dos réplicas al finalizar. Consulte balance-*.json y availability-one-stopped.json.

El RPS se mantiene cerca del objetivo limitado por las pausas, por lo que añadir una réplica no demuestra un aumento lineal del throughput. La variación de latencia también depende de caché, VM y tareas simultáneas. Los snapshots docker stats de resources-*.jsonl registran CPU/memoria observadas después de cada bloque, no su pico.

Las pruebas iniciales lanzadas durante una reconstrucción fallaron por servicio todavía no listo; se repitieron tras healthchecks. No se verificó el proveedor autenticado por falta de token. La seguridad de una app publicada, TLS externo y despliegue cloud quedan fuera del alcance local.

## Verificación visual

Verificación en navegador completada: acceso de demo, guardado y edición de pronóstico (2–1 → 3–1), creación de sala e invitación con ranking, navegación de ligas a equipo y 17 fichas con 11 etiquetas XI y 6 de suplente. 204 imágenes locales con cabecera de archivo válida; ninguna imagen rota en las vistas inspeccionadas. Desktop 1280 px, móvil 390 px y 320 px; sin desbordamiento horizontal en las comprobaciones. Tema oscuro revisado a 320 px. Se corrigió la conservación de scroll al navegar. Capturas: dashboard-desktop.jpg, dashboard-mobile.jpg, team-mobile.jpg y mobile-320-dark.jpg.

## Ajuste visual según maqueta — 4 de noviembre de 2026

Se añadieron cabecera azul noche, fondos blanco hielo con acentos cian/violeta, botones con degradados azul/cian, violeta y rojo, paneles oscuros de ranking/reglas, escudos y tipografía mayores y cabecera móvil con marca centrada. Se conservan las fotos reales y las reglas de negocio. La portada indica la fecha actual en America/Lima y cada encuentro muestra (PER). Los seis encuentros de demostración pendientes se actualizaron a 5–7 de noviembre de 2026; siguen siendo simulados.

Revisión visual de escritorio a 1440×1000 completada: scrollWidth 1425, sin desbordamiento horizontal. La comprobación móvil del rediseño no pudo finalizar porque el uso local del navegador se deshabilitó en los ajustes de Work. Los resultados responsive anteriores corresponden a la versión anterior. La compilación del rediseño se comprobó por separado.
