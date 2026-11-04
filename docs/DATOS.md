# Fuentes, fotos y cobertura

Consulta de documentación: 4 de noviembre de 2026.

- [Cobertura football-data.org](https://www.football-data.org/coverage): Premier League PL, LaLiga PD, Serie A SA, Bundesliga BL1 y Ligue 1 FL1. Perú no aparece.
- [API v4](https://www.football-data.org/documentation/quickstart), [equipos](https://docs.football-data.org/general/v4/team.html), [competiciones](https://docs.football-data.org/general/v4/competition.html).
- [Planes](https://www.football-data.org/pricing): el plan gratuito publica 10 llamadas/minuto; alineaciones, plantillas y otros datos dependen del plan. Las respuestas pueden tener campos nulos.
- [Liga 1: Alianza Lima](https://liga1.pe/club/alianza-lima/) y [Universitario](https://liga1.pe/club/universitario-de-deportes/): fotos y datos de plantilla.
- [Universitario: primer equipo](https://universitario.pe/equipos/futbol-masculino): fotos, dorsal y posición publicados por el club.
- Fotografías y estadísticas europeas: fuentes enlazadas por jugador; las cifras muestran temporada o ámbito para no mezclar torneos.
- Fotografía real de portada: [Emerson Vieira / Unsplash](https://unsplash.com/photos/people-in-stadium-at-night-gOQ_57KsJKM), Unsplash License.

Google Imágenes se utilizó como búsqueda visual, no como fuente de cifras ni como licencia. Los recursos se toman de su página de origen. Los escudos y retratos son marcas/obras de sus titulares. Este repositorio documenta procedencia para una demostración académica local; no afirma autorización comercial general.

## Importación manual

Panel Administración → Importar partidos verificados. Formato en `import-example.json`. Se exige `sourceUrl` HTTPS y temporada. Los resultados FINISHED necesitan ambos goles y una fecha pasada. Los IDs se prefijan `manual:` para no sobrescribir datos del proveedor o de demo. Un resultado corregido se audita y recalcula en una transacción.

No se atribuyen equipos de demostración a una temporada actual sin sincronización. El catálogo inicial tiene clubes de referencia; los participantes actuales se obtienen del proveedor. No se inventan resultados oficiales, estadísticas de jugadores o fotografías ausentes. El once de referencia y los seis suplentes son una selección visual de la plantilla, no una convocatoria verificada de un partido.

## Actualización

La sincronización es explícita desde Administración; la caché dura cinco minutos. No hay cron externo ni descarga automática en background. El proveedor aplica una pausa compartida de 7,5 segundos antes de otra llamada no cacheada. En 429/403/5xx se informa el error y se preservan datos anteriores. No se probó una respuesta autenticada del proveedor porque no se dispone de token. Las fotos guardadas funcionan sin acceso a sus servidores durante la demostración; las fuentes y enlaces sí requieren Internet.

**Aclaración de alcance del usuario (04/11/2026):** no se utilizará AWS ni la API deportiva. La aplicación corre en Docker Desktop local y utiliza información consultada en la web con fuente y fecha. Las menciones anteriores a la API describen el adaptador inicial, no un requisito vigente ni un pendiente.
