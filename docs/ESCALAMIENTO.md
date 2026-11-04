# Entregable 4 — Balanceo y escalamiento

Reproducir con Docker Desktop activo y aplicación en ejecución:

```sh
docker compose ps
for i in 1 2 3 4 5 6; do curl -s http://localhost:8080/api/health; done
docker compose up -d --scale backend=3
for i in 1 2 3 4 5 6 7 8 9; do curl -s http://localhost:8080/api/health; done
docker stats --no-stream
```

Nginx 1.28 usa `resolver 127.0.0.11`, `zone` y `resolve` en upstream. La resolución se renueva cada cinco segundos; no se fijan IPs de contenedor. El proxy detecta fallos de conexión y 502/503, reintenta en otro upstream cuando es seguro. No se reintentan escrituras no idempotentes después de enviar el cuerpo. Redis y PostgreSQL compartidos permiten cambiar de réplica conservando sesión y datos.

Prueba de disponibilidad: detener una réplica concreta con `docker stop lasjijas-backend-1`, consultar health/ligas a través de Nginx y arrancarla con `docker start lasjijas-backend-1`. No detener base de datos para demostrar balanceo: es un servicio común y su caída afectaría todas las réplicas. No hay alta disponibilidad de DB en esta arquitectura educativa.

Las evidencias generadas se guardan en `docs/evidence`. Los tiempos y resultados son mediciones locales, no garantías ni un benchmark de producción. Al terminar la demostración se restablecen dos réplicas.
