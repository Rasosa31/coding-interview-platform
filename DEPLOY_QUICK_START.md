# 🚀 Quick Start - Deployment en Railway

## Pasos Rápidos

### 1. Sube tu código a GitHub
```bash
git add .
git commit -m "Ready for Railway deployment"
git push origin main
```

### 2. Crea cuenta y proyecto en Railway
1. Ve a [railway.app](https://railway.app)
2. Inicia sesión con GitHub
3. Click en **"New Project"**
4. Selecciona **"Deploy from GitHub repo"**
5. Elige tu repositorio `coding-interview-platform`

### 3. Railway hará el resto automáticamente
- ✅ Detectará el `Dockerfile`
- ✅ Construirá la aplicación
- ✅ La desplegará automáticamente
- ✅ Te dará una URL pública

### 4. ¡Listo! 🎉
Tu aplicación estará disponible en una URL como:
`https://tu-proyecto.up.railway.app`

## Variables de Entorno (Opcional)

En Railway → Settings → Variables, puedes agregar:
- `NODE_ENV=production` (ya está en Dockerfile)
- `PORT` (Railway lo asigna automáticamente)

## ¿Problemas?

Revisa la guía completa en `RAILWAY_DEPLOYMENT.md`

