# Postmortem: Incidente en la Pasarela de Pagos PayFlow TIC

## 1. Resumen del incidente

El 28 de octubre de 2026, a las 10:00 UTC, se detectó una incidencia crítica en la API de la pasarela de pagos PayFlow TIC. El servicio comenzó a devolver errores HTTP 504 Gateway Timeout debido a la saturación del pool de conexiones de la base de datos.

La causa principal fue una fuga de conexiones introducida durante un despliegue realizado a las 09:30 UTC en el módulo de facturación.

## 2. Impacto del incidente

- **Servicio afectado:** API de Pasarela de Pagos.
- **Entorno:** Producción.
- **Severidad:** P1 - Crítica.
- **Error presentado:** HTTP 504 Gateway Timeout.
- **Conexiones activas:** 50/50.
- **Hilos en espera:** 142.
- **Consecuencia:** Interrupción del procesamiento de pagos y fallos en las transacciones.

## 3. Línea de tiempo

| Hora UTC | Evento |
|---|---|
| 09:30 | Se realiza el despliegue que introduce el problema. |
| 10:00 | Se detecta la incidencia en producción. |
| 10:02 | Los registros muestran saturación del pool de conexiones. |
| Posteriormente | Se registra la incidencia en GitHub Issues. |
| Posteriormente | Se desarrolla y revisa la solución mediante un Hotfix. |
| Posteriormente | Se fusiona el Pull Request en la rama main. |

## 4. Análisis de los 5 porqués

1. **¿Por qué fallaban los pagos?** Porque la API no podía obtener conexiones disponibles de la base de datos.
2. **¿Por qué no había conexiones disponibles?** Porque todas las conexiones del pool estaban ocupadas.
3. **¿Por qué permanecían ocupadas?** Porque el módulo de facturación no liberaba correctamente las conexiones.
4. **¿Por qué no se detectó antes del despliegue?** Porque la simulación y validación no identificaron adecuadamente la fuga de conexiones.
5. **¿Qué debemos mejorar?** Implementar mecanismos de liberación de conexiones y fortalecer las pruebas y revisiones antes de desplegar cambios.

## 5. Solución aplicada

Se creó una rama Hotfix para corregir el problema en `src/config/database.js`.

Los cambios realizados fueron:
- Ajustar la capacidad simulada del pool de conexiones.
- Implementar un bloque `try...finally`.
- Garantizar la liberación de las conexiones al finalizar el procesamiento.
- Validar el funcionamiento mediante la ejecución de `npm start`.

El resultado de la simulación pasó de HTTP 504 a HTTP 200.

## 6. Lecciones aprendidas

- Es importante controlar correctamente el ciclo de vida de las conexiones.
- Las pruebas deben contemplar escenarios de alta demanda.
- Los cambios críticos deben pasar por revisión de código.
- GitHub Issues y Projects facilitan el seguimiento de incidencias.
- La documentación Postmortem permite prevenir problemas similares.

## 7. Acciones de mejora

| Acción | Prioridad | Estado |
|---|---|---|
| Implementar pruebas de carga | Alta | Pendiente |
| Validar la liberación de conexiones | Alta | Implementada en la simulación |
| Revisar el código antes de cada despliegue | Alta | Pendiente |
| Monitorear el uso del pool de conexiones | Media | Pendiente |
| Documentar futuras incidencias | Media | En proceso |

## 8. Conclusión

La incidencia permitió identificar la importancia de una adecuada gestión de conexiones en los servicios TIC. Mediante el registro, análisis, corrección y revisión del código se logró solucionar el problema simulado y establecer acciones de mejora para reducir la posibilidad de recurrencia.

El análisis se realizó sin buscar culpables, enfocándose en mejorar los procesos técnicos y operativos.