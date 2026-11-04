# Entrega local de LASJIJAS

- [Video explicativo de 5 minutos](LASJIJAS_Demostracion_5min.mp4): captura real de la aplicación local, 1920 × 1080, 30 fps, narración sintética en español y rótulos de capítulos.
- [Copia desarrollada del laboratorio con capturas](S12_Luis_Dionicio_LASJIJAS.docx): documento original conservado como base, con desarrollo, evidencias, pruebas y límites de la entrega local.

El video muestra un pronóstico guardado, la sala **Grupo de Desarrollo de Software** con Luis Dionicio, Andy Capos, Jaime Farfan y Juan Leon, su invitación QR, plantillas, actualidad, tablas, líderes, cuotas informativas, estadísticas y la creación real de una segunda sala **Grupo de Desarrollo de Software · Prueba en vivo**. Las cuentas y pronósticos son ejemplos académicos; no describen apuestas reales de estas personas.

La aplicación permanece en `http://localhost:8080` y requiere Docker Desktop. No se ha publicado un sitio en Internet ni se realizaron pruebas AWS. No usa una API deportiva activa. Actualidad conserva fuentes y fechas de consulta del 4 de noviembre de 2026; sus datos no se actualizan en directo. El QR de localhost funciona en el mismo equipo.

## Capítulos del video

| Tiempo | Contenido |
| --- | --- |
| 00:00 | Portada, ligas, alcance local y reglas |
| 01:22 | Edición y guardado de pronóstico |
| 01:38 | Sala principal, participantes, QR y configuración |
| 02:19 | Club, once de referencia y seis suplentes |
| 02:34 | Actualidad, resultados y tabla |
| 02:54 | Clasificación, goleadores y asistentes |
| 03:08 | Cuotas publicadas, comparación informativa |
| 03:18 | Estadísticas de los participantes |
| 03:52 | Creación de sala durante la grabación |
| 04:30 | QR y clasificación de la sala principal |

Para preparar las cuatro cuentas de prueba en una instalación local ya inicializada: `node scripts/prepare-presentation-demo.mjs`. El script recalcula los puntos mediante el servidor. No ejecutar sobre datos de producción.
