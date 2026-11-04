# Estado de cumplimiento — 4 de noviembre de 2026

## Laboratorio Word

| Requisito | Estado verificable |
|---|---|
| Arquitectura | Implementada y documentada en ARQUITECTURA.md; Docker Desktop local adapta las instancias virtualizadas |
| Aplicación | Registro/login, perfiles, pronósticos, salas con invitaciones, clasificaciones y estadísticas funcionan con PostgreSQL |
| Docker | Compose, imágenes, migración, seed y healthchecks ejecutados localmente |
| Balanceo y escalamiento | Dos réplicas por defecto; prueba con tres y con una detenida, evidencias guardadas |
| Pruebas y estrés | 14 unitarias, 26 comprobaciones HTTP, 4 de evaluación/corrección y escenarios k6 20/50/100 VUs ejecutados; carga de lectura breve, no validación integral de producción |
| Cinco reglas | Motor servidor con anticipación, racha y modo base configurable; límites y ambigüedad matemática documentados |
| Salas e invitaciones | Código, enlace, QR local descargable, ingreso, ranking, edición y control de miembros |

La adaptación de Mundial a seis ligas y la exclusión de AWS y de la API deportiva fueron instrucciones explícitas del usuario. No se requieren pruebas de AWS ni integración/pruebas autenticadas con football-data.org para este alcance. La fuente acordada es información actual consultada en la web, con enlaces y fecha de verificación. El QR no modifica el acceso de red: `localhost` solo abre en la computadora donde corre Docker. No se certifica una calificación ni aceptación por el docente.

## Límites reales dentro del alcance local acordado

- **Actualización continua:** la actualidad deportiva y las cuotas son consultas web fechadas, no feeds en vivo ni sincronización automática programada. Hay que renovar y verificar los snapshots.
- **Equipos y plantillas:** las tablas incluyen114clubes; las plantillas de17jugadores están completas solo en12clubes de referencia. No hay plantilla de17por cada club de las seis ligas. Algunas fotos son de archivo y20líderes estadísticos no tienen retrato verificado.
- **Pruebas UI:** hubo revisión inicial de flujos y responsive; las últimas ampliaciones no se revisaron visualmente porque el navegador local quedó deshabilitado. No existe una suite E2E automatizada completa para todas las pantallas.
- **Recuperación:** entrega local de enlace por administrador, sin correo saliente. No hay proveedor de email.
- **Pantallas y administración:** landing y dashboard se integran en la misma pantalla; no hay landing separada. Administración gestiona roles, datos, resultados y auditoría, pero no implementa todas las operaciones CRUD posibles de usuarios/ligas/salas ni centro de notificaciones persistente.
- **Modelo:** roles, temporadas, puntuaciones e invitaciones se representan con campos/tablas consolidadas; no existen como cada una de las16entidades separadas sugeridas. Las estadísticas se agregan a demanda. Swagger completo no está implementado: hay un índice OpenAPI mínimo y referencia de endpoints.
- **Puntuación:** modo exclusivo prioriza ganador sobre diferencia, por lo que diferencia firmada correcta queda absorbida; modo acumulativo permite3+2. El usuario puede adaptar la interpretación a su docente. Se toma última modificación para anticipación, se permite editar hasta inicio y últimos10min solo base.
- **Apuestas:** módulo informativo añadido por instrucción posterior, sin dinero ni transacciones. Cuotas UK no verificadas para disponibilidad en Perú.

Conclusión: los entregables centrales están implementados y cuentan con evidencia local. AWS y la API deportiva están fuera del alcance y no son pendientes. Los límites restantes se detallan arriba; la documentación no implica que la consulta web se actualice por sí sola.
