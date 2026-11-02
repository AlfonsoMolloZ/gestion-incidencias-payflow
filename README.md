# PayFlow TIC — Laboratorio de Gestión de Incidencias

Proyecto didáctico para practicar la gestión de incidencias con Git y GitHub.

## Requisitos
- Node.js 18 o superior
- Git
- Visual Studio Code
- Cuenta de GitHub

## Ejecutar el proyecto

```bash
npm install
npm start
```

El proyecto inicia una simulación local de procesamiento de pagos. El archivo `src/config/database.js`
contiene intencionalmente el problema de saturación descrito en la guía: el pool está al límite y no
se libera correctamente una conexión.

## Estructura

```text
gestion-incidencias-payflow/
├── .github/
│   └── ISSUE_TEMPLATE/
│       └── incident_report.md
├── docs/
│   └── postmortems/
│       └── plantilla-postmortem.md
├── src/
│   ├── config/
│   │   └── database.js
│   ├── services/
│   │   └── paymentGatewayService.js
│   └── index.js
├── package.json
└── README.md
```

## Flujo de trabajo solicitado en el laboratorio

1. Registrar la incidencia en GitHub Issues.
2. Clasificarla con las etiquetas `sev: P1-critical` y `domain: backend`.
3. Mover la tarjeta en GitHub Projects.
4. Crear una rama de hotfix desde `main`.
5. Corregir `src/config/database.js`.
6. Crear un Pull Request hacia `main` y añadir `Closes #NUMERO`.
7. Completar el postmortem en `docs/postmortems/`.

## Importante
Esta aplicación es una simulación educativa. No se conecta a una base de datos real ni implementa un
pool de conexiones de producción. El código representa de forma sencilla el escenario del laboratorio.
