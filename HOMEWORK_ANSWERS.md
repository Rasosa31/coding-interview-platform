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

**Servicio recomendado para deployment:**

Puedes usar cualquiera de estos servicios:
- **Railway** (recomendado - fácil de usar)
- **Render** (gratis con limitaciones)
- **Heroku** (requiere tarjeta de crédito para producción)
- **Vercel** (para frontend) + **Railway/Render** (para backend)
- **AWS/GCP/Azure** (más complejo pero más control)

Para este proyecto, **Railway** o **Render** son las mejores opciones porque:
- Soportan Node.js nativamente
- Permiten desplegar fácilmente aplicaciones full-stack
- Tienen planes gratuitos
- Configuración simple

## Homework URL

Una vez que subas el código a GitHub, usa el link a la carpeta del proyecto. Por ejemplo:
```
https://github.com/tu-usuario/ai-dev-tools/tree/main/02-coding-interview
```

## Notas Adicionales

- El proyecto está completamente funcional y listo para deployment
- Todos los archivos necesarios están incluidos
- El README.md contiene todas las instrucciones de instalación y uso
- Los tests de integración verifican la comunicación cliente-servidor
- El Dockerfile permite containerizar la aplicación completa


