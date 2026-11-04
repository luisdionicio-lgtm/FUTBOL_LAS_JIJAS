# Índice del laboratorio

| N.º | Entregable | Evidencia revisable |
|---|---|---|
|1|Propuesta de arquitectura|ARQUITECTURA.md, diagramas Mermaid y esquema Prisma|
|2|Aplicación desarrollada|Frontend React, API TypeScript, navegación y base de datos local|
|3|Contenerización|Dos Dockerfiles, Compose, Nginx, migración, seed, healthchecks y evidencia ps|
|4|Escalamiento y balanceo|ESCALAMIENTO.md, IDs de instancias y comparación 2/3 réplicas|
|5|Pruebas|PRUEBAS.md, RESULTADOS.md, unitarias, integración, k6 y capturas|
|6|Cinco reglas de puntuación|src/scoring.ts, configuración exclusiva/acumulativa y pruebas de bordes|

Decisión de alcance: Word describe un ejercicio sobre Mundial; el prompt del usuario lo adapta a seis ligas. Se implementan las seis ligas solicitadas, preservando las cinco reglas, salas y seis entregables. Se excluye AWS por instrucción explícita; Docker Desktop es el entorno único. El diseño se inspira en la maqueta adjunta, con recursos fotográficos reales y sin imágenes generadas por IA en la entrega.

**Aclaración de alcance del usuario (04/11/2026):** no se utilizará AWS ni la API deportiva. La aplicación corre en Docker Desktop local y utiliza información consultada en la web con fuente y fecha. Las menciones anteriores a la API describen el adaptador inicial, no un requisito vigente ni un pendiente.
