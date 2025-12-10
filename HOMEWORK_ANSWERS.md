# Respuestas del Homework - Coding Interview Platform

## Question 1: Initial Implementation

**Prompt inicial dado a la IA:**

```
Necesito crear una plataforma de entrevistas de codificación en línea con las siguientes características:

1. Backend con Express.js que:
   - Permita crear sesiones de entrevista con IDs únicos
   - Use Socket.io para comunicación en tiempo real
   - Maneje múltiples usuarios editando código simultáneamente
   - Almacene el estado del código y lenguaje por sesión

2. Frontend con React + Vite que:
   - Permita crear y unirse a sesiones
   - Tenga un editor de código colaborativo en tiempo real
   - Muestre actualizaciones en tiempo real a todos los usuarios conectados
   - Soporte syntax highlighting para JavaScript y Python
   - Permita ejecutar código de forma segura en el navegador

Implementa tanto el frontend como el backend en una sola respuesta, con todos los archivos necesarios.
```

## Question 2: Integration Tests

**Comando para ejecutar tests:**

```bash
npm test
```

O desde el directorio backend:

```bash
cd backend && npm test
```

## Question 3: Running Both Client and Server

**Comando en package.json para npm dev:**

```json
"dev": "concurrently \"npm run dev:backend\" \"npm run dev:frontend\""
```

## Question 4: Syntax Highlighting

**Librería usada para syntax highlighting:**

**CodeMirror 6** con las siguientes extensiones:
- `@codemirror/lang-javascript` para JavaScript
- `@codemirror/lang-python` para Python
- `@codemirror/theme-one-dark` para el tema oscuro

## Question 5: Code Execution

**Librería usada para compilar Python a WASM:**

**Pyodide** (versión 0.24.1)

Pyodide es una distribución de Python que se ejecuta completamente en el navegador usando WebAssembly. Permite ejecutar código Python de forma segura sin necesidad de un servidor.

## Question 6: Containerization

**Imagen base usada en el Dockerfile:**

```dockerfile
FROM node:18-alpine
```

Se usa Node.js 18 en una imagen Alpine (ligera) como base.

## Question 7: Deployment

**Servicio usado para deployment:**

**Railway** - Deployment exitoso completado

**URL de producción:**
```
https://coding-interview-platform-production-1a91.up.railway.app
```

**Configuración utilizada:**
- Builder: **Railpack** (builder nativo de Railway, Nixpacks está deprecado)
- Build Command: `npm install && cd backend && npm install && cd ../frontend && npm install && npm run build`
- Start Command: `cd backend && node server.js`
- Archivo de configuración: `railway.json`

**Notas importantes:**
- Railway detecta automáticamente proyectos Node.js
- No se requiere Dockerfile (se usa Railpack en su lugar)
- El frontend y backend se despliegan juntos en un solo servicio
- Socket.io funciona correctamente en producción
- CORS configurado para permitir conexiones desde el dominio de producción

**Alternativas que también funcionarían:**
- **Render** (gratis con limitaciones)
- **Heroku** (requiere tarjeta de crédito para producción)
- **Vercel** (para frontend) + **Railway/Render** (para backend)
- **AWS/GCP/Azure** (más complejo pero más control)

**Railway fue elegido porque:**
- Soportan Node.js nativamente
- Permiten desplegar fácilmente aplicaciones full-stack
- Tienen planes gratuitos ($5 de crédito mensual)
- Configuración simple y automática
- Soporte para WebSockets (Socket.io) sin configuración adicional

## Homework URL

**Repositorio de GitHub:**
```
https://github.com/Rasosa31/coding-interview-platform
```

**URL de producción (Railway):**
```
https://coding-interview-platform-production-1a91.up.railway.app
```

## Notas Adicionales

- El proyecto está completamente funcional y listo para deployment
- Todos los archivos necesarios están incluidos
- El README.md contiene todas las instrucciones de instalación y uso
- Los tests de integración verifican la comunicación cliente-servidor
- El Dockerfile permite containerizar la aplicación completa


Cursor puede explicarme que hemos hecho hasta el momento?

