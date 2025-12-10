# Guía de Instalación

## Paso 1: Instalar Node.js

### Opción A: Usando Homebrew (Recomendado para macOS)

```bash
# Instalar Homebrew si no lo tienes
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Node.js
brew install node
```

### Opción B: Usando el instalador oficial

1. Ve a https://nodejs.org/
2. Descarga la versión LTS (Long Term Support)
3. Ejecuta el instalador
4. Sigue las instrucciones

### Opción C: Usando NVM (Node Version Manager)

```bash
# Instalar NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Reiniciar la terminal o ejecutar:
source ~/.zshrc

# Instalar Node.js LTS
nvm install --lts
nvm use --lts
```

## Paso 2: Verificar la instalación

```bash
node --version
npm --version
```

Deberías ver algo como:
```
v18.x.x
9.x.x
```

## Paso 3: Instalar dependencias del proyecto

```bash
cd /Users/ramirososa/coding-interview-platform
npm run install:all
```

Este comando instalará:
- Dependencias del proyecto raíz (concurrently)
- Dependencias del backend
- Dependencias del frontend

## Paso 4: Ejecutar la aplicación

```bash
npm run dev
```

Esto iniciará:
- Backend en http://localhost:3000
- Frontend en http://localhost:5173

Abre tu navegador en http://localhost:5173

## Paso 5: Ejecutar tests

En una nueva terminal:

```bash
cd /Users/ramirososa/coding-interview-platform
npm test
```

## Solución de problemas

### Error: "command not found: npm"
- Asegúrate de que Node.js esté instalado correctamente
- Reinicia tu terminal después de instalar Node.js
- Verifica que Node.js esté en tu PATH: `echo $PATH`

### Error: "EACCES: permission denied"
- No uses `sudo` con npm
- Si es necesario, configura npm para usar un directorio diferente:
  ```bash
  mkdir ~/.npm-global
  npm config set prefix '~/.npm-global'
  export PATH=~/.npm-global/bin:$PATH
  ```

### Error al instalar dependencias
- Limpia la caché de npm: `npm cache clean --force`
- Elimina node_modules y reinstala:
  ```bash
  rm -rf node_modules backend/node_modules frontend/node_modules
  npm run install:all
  ```


