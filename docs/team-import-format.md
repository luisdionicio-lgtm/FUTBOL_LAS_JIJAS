# Equipo y plantilla administrativa

En Administración → Gestionar equipo y sus 17 jugadores, pega JSON con `id`, `name`, `leagueCode`, `crest` (URL HTTPS o null), `sourceUrl` (URL HTTPS) y `squad` con **exactamente 17** jugadores. Cada jugador requiere `id`, `name`, `position`, `photo` HTTPS y `sourceUrl`. Opcionales: `shirtNumber`, `goals`, `assists`, `statsScope`. Ordena los 11 de referencia primero y los 6 suplentes después. No presentar la selección como once confirmado de un partido sin fuente de alineación.

La operación crea o actualiza el equipo, guarda fecha de consulta y audita el cambio completo. No convierte nombres de muestra en partidos oficiales. Las URLs de imágenes externas pueden dejar de estar disponibles: para la demostración inicial los recursos fotografícos se guardan en public/players.
