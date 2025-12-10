# Guía de Deployment en Railway

Esta guía te ayudará a desplegar la plataforma de entrevistas de codificación en Railway paso a paso.

## Prerrequisitos

1. Una cuenta en [Railway](https://railway.app) (puedes usar GitHub para registrarte)
2. El código del proyecto subido a un repositorio de GitHub
3. Node.js instalado localmente (para pruebas)

## Opción 1: Deployment usando Docker (Recomendado)

Railway detectará automáticamente el `Dockerfile` y lo usará para construir la aplicación.

### Paso 1: Preparar el repositorio

Asegúrate de que tu código esté en GitHub:

```bash
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### Paso 2: Crear proyecto en Railway

1. Ve a [railway.app](https://railway.app) e inicia sesión
2. Haz clic en **"New Project"**
3. Selecciona **"Deploy from GitHub repo"**
4. Conecta tu cuenta de GitHub si es necesario
5. Selecciona el repositorio `coding-interview-platform`
6. Railway detectará automáticamente el `Dockerfile`

### Paso 3: Configurar variables de entorno (Opcional)

En la configuración del servicio en Railway:

1. Ve a la pestaña **"Variables"**
2. Agrega las siguientes variables si las necesitas:
   - `NODE_ENV=production` (ya está en el Dockerfile, pero puedes sobrescribirlo)
   - `PORT=3000` (Railway lo asignará automáticamente, pero puedes especificarlo)
   - `FRONTEND_URL` (opcional, si quieres restringir CORS a un dominio específico)

### Paso 4: Deployment

Railway comenzará automáticamente a construir y desplegar tu aplicación:

1. Ve a la pestaña **"Deployments"** para ver el progreso
2. Espera a que el build termine (puede tomar 5-10 minutos la primera vez)
3. Una vez completado, Railway te dará una URL pública (ej: `https://tu-proyecto.up.railway.app`)

### Paso 5: Verificar el deployment

1. Abre la URL proporcionada por Railway en tu navegador
2. Deberías ver la aplicación funcionando
3. Prueba crear una sesión y compartirla

## Opción 2: Deployment sin Docker (Build nativo)

Si prefieres no usar Docker, Railway puede construir la aplicación directamente:

### Paso 1: Crear archivo de configuración

Railway usará el `package.json` raíz. Asegúrate de tener un script `start`:

```json
{
  "scripts": {
    "start": "cd backend && node server.js",
    "build": "cd frontend && npm run build"
  }
}
```

### Paso 2: Configurar Railway

1. Crea un nuevo proyecto en Railway
2. Conecta tu repositorio de GitHub
3. En **Settings** → **Build & Deploy**:
   - **Build Command**: `npm run install:all && npm run build`
   - **Start Command**: `npm start`
   - **Root Directory**: `/` (raíz del proyecto)

### Paso 3: Variables de entorno

Agrega en Railway:
- `NODE_ENV=production`
- `PORT` (Railway lo asigna automáticamente)

## Solución de Problemas

### El build falla

- Verifica que todos los archivos estén en el repositorio
- Revisa los logs en Railway para ver el error específico
- Asegúrate de que el `Dockerfile` esté en la raíz del proyecto

### La aplicación no carga

- Verifica que el puerto esté configurado correctamente (Railway usa `PORT` automáticamente)
- Revisa los logs del servicio en Railway
- Asegúrate de que el frontend se haya construido correctamente (`frontend/dist` existe)

### CORS errors

- El CORS está configurado para permitir todos los orígenes en producción
- Si necesitas restringirlo, agrega la variable `FRONTEND_URL` con tu dominio

### Socket.io no funciona

- Railway soporta WebSockets automáticamente
- Asegúrate de que la URL del frontend apunte al backend correcto
- En producción, el frontend y backend están en el mismo dominio, así que no debería haber problemas

## Personalización del dominio

Railway te da un dominio gratuito (`*.up.railway.app`), pero puedes:

1. Ir a **Settings** → **Domains**
2. Agregar un dominio personalizado
3. Configurar los registros DNS según las instrucciones de Railway

## Monitoreo y Logs

- **Logs**: Ve a la pestaña **"Deployments"** y haz clic en el deployment activo para ver logs en tiempo real
- **Métricas**: Railway muestra uso de CPU, memoria y red en el dashboard
- **Alertas**: Configura alertas en **Settings** → **Notifications**

## Costos

- Railway ofrece un plan gratuito con $5 de crédito mensual
- Para proyectos pequeños, esto suele ser suficiente
- Revisa los precios en [railway.app/pricing](https://railway.app/pricing)

## Actualizar el deployment

Cada vez que hagas `git push` a la rama principal, Railway automáticamente:
1. Detectará los cambios
2. Construirá una nueva versión
3. Desplegará automáticamente (si tienes auto-deploy habilitado)

O puedes hacerlo manualmente:
1. Ve a **Deployments**
2. Haz clic en **"Redeploy"**

## Comandos útiles

```bash
# Ver logs localmente (si instalas Railway CLI)
railway logs

# Conectar a Railway CLI
railway login
railway link
```

## Recursos adicionales

- [Documentación de Railway](https://docs.railway.app)
- [Railway Discord](https://discord.gg/railway) para soporte
- [Ejemplos de Railway](https://github.com/railwayapp/starters)

---

¡Listo! Tu aplicación debería estar funcionando en Railway. Si tienes problemas, revisa los logs en el dashboard de Railway.

