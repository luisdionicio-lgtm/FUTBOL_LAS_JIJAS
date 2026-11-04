# Actualidad de fútbol 2026 y comparación informativa

Ampliación solicitada el 4 de noviembre de 2026. Acceso desde el menú **Actualidad 2026**, el dashboard y Partidos. Permanece local en Docker Desktop.

## Fuentes y actualización

Google/búsqueda web sirve para descubrir páginas; los datos se guardan con enlaces a las fuentes originales, no se atribuyen a Google como propietario. Archivos:

- `frontend/public/data/matches-2026.json`: 60 encuentros, 5 recientes + 5 próximos por cada liga. Solo fechas de 2026. Horas convertidas a Perú únicamente cuando la zona de origen está confirmada; las demás muestran fecha y hora sin confirmar.
- `frontend/public/data/tables-leaders.json`: 114 filas de posiciones y 33 registros de líderes con temporada, ámbito, fuente y límites explícitos. Una clasificación parcial no se completa con cifras inventadas.
- `frontend/public/data/odds-2026.json`: 6 comparaciones de selección 1X2, 18 precios de casas identificadas, y 10 mercados diferentes con reglas consultables. Consulta publicada de partidos del 6–7 de noviembre, no cuotas en vivo.

Estos snapshots son una consulta fechada al 04/11/2026, no una actualización automática. Para actualizarlos se deben volver a verificar las páginas, conservar las URLs y cambiar la fecha de consulta del contenido y de la interfaz. No existe scraping periódico de Google, conexión privada con bookmakers ni inventario de promociones. Las fuentes pueden corregir resultados o programación.

## Cuotas

Se marca la mayor cuota decimal **entre las casas consultadas para el mismo evento, selección, mercado y periodo**. Los empates se marcan en todas las casas correspondientes. Las cuotas fraccionarias originales se convierten usando `1 + numerador/denominador`; se conservan en el archivo para trazabilidad. La visualización redondea a dos decimales; la comparación usa el valor con precisión original.

Los precios publicados corresponden a Reino Unido. No se verificó su disponibilidad regional en Perú. No se afirma que Betano, Betsson, Inkabet o Te Apuesto paguen menos o más sin precios equivalentes verificables. No hay enlaces afiliados, depósitos, apuestas reales, bonos ni recomendaciones personales de apuestas. El objetivo es informativo; la aplicación académica sigue sin premios monetarios.

El catálogo incluye 1X2, doble oportunidad, totales, ambos marcan, hándicap y mercados de jugador/equipo y combinadas. No se inventan mercados exclusivos ni cuotas de remates, córners o asistencias cuando no hay comparación pública verificable. Mayor cuota significa mayor retorno bruto condicional si se acierta, no más probabilidad de ganar ni beneficio garantizado.

## Rankings deportivos

Goleadores y asistidores indican el periodo del dato. “Mejor jugador” se limita a premios oficiales identificables y fechados; no se crea un ranking subjetivo sin criterio. Las tablas deportivas son distintas del ranking de participantes de LASJIJAS.

Los resultados web no recalculan puntos de usuarios automáticamente: permanecen separados de los fixtures de demostración. El administrador puede incorporar datos validados por el flujo auditado existente.

## Verificación

`node tests/current-data.mjs` valida año, fechas de resultados/próximos, duplicados, fuentes, conversión decimal, unicidad de casas y estructura de seis ligas. Esta prueba comprueba integridad de datos, no reemplaza la verificación editorial de las fuentes.

## Identidad visual de las secciones

Las vistas de actualidad comparten el sistema deportivo del dashboard: azul noche, azul eléctrico/cian y acentos violeta/dorado. Selector de seis ligas con logo, tarjetas de encuentros con ambos escudos, clasificación con escudo por club, líderes con retrato real y escudo del club, e iconos por tipo de mercado.

El catálogo `frontend/public/data/section-icons.json` resuelve nombres alternativos del mismo club sin cambiar los datos publicados. Los archivos se guardan localmente para evitar depender del hotlink. La procedencia y cobertura se documentan en `docs/section-icon-sources.json`. Las imágenes conservan derechos de sus titulares.

Si una foto no está disponible o falla al cargar, se muestra un icono de persona; si falta un escudo, un identificador neutral con iniciales. Ningún sustituto se presenta como fotografía o emblema oficial. Los logos de liga usan los recursos ya verificados del proyecto.

**Aclaración de alcance del usuario (04/11/2026):** no se utilizará AWS ni la API deportiva. La aplicación corre en Docker Desktop local y utiliza información consultada en la web con fuente y fecha. Las menciones anteriores a la API describen el adaptador inicial, no un requisito vigente ni un pendiente.

## Contexto adicional y tipografía

Se usan Plus Jakarta Sans para lectura y Barlow Condensed para títulos, servidas desde `/fonts/` sin depender de Google Fonts durante el uso. Licencias OFL y URLs originales incluidas. Los partidos muestran posición/puntos y forma G/E/P enlazada a sus resultados; la forma solo considera partidos presentes en esta consulta, hasta cinco, en orden cronológico. Las ligas resumen líder, ventaja sobre segundo, mayor diferencia de goles y goles/promedio en los resultados consultados. No se extrapolan a la temporada completa. Los nombres que no coinciden tras normalización se muestran sin posición vinculada en vez de asociar otro club.
