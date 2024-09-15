


# Página Web de Uniformes Odontológicos para DELUXE

Bienvenido al repositorio del sitio web de uniformes para DELUXE, desarrollado utilizando Vite.js y Node.js. Este documento proporciona información sobre cómo configurar y ejecutar el proyecto, así como otros detalles relevantes.

## Tabla de Contenidos

1. [Requisitos](#requisitos)
2. [Configuración del Entorno](#configuración-del-entorno)
3. [Ejecución del Proyecto](#ejecución-del-proyecto)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Licencia](#licencia)

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) (se incluye con Node.js)
- [Vite.js](https://vitejs.dev/) (se instalará automáticamente con `npm`)

## Configuración del Entorno

Para que la aplicación funcione correctamente, debes configurar algunas variables de entorno. Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:

```dotenv
# URL de la API
VITE_API_URL=https://tu-api-url.com

# Clave de la API
VITE_API_KEY=tu_api_key

# Documento de identidad (sólo números)
VITE_ID_DOCUMENT=123456789

# Contraseña
VITE_PASSWORD=tu_contraseña
```

Asegúrate de reemplazar los valores de ejemplo con tus configuraciones reales.

## Ejecución del Proyecto

1. Instala las dependencias necesarias ejecutando:

   ```bash
   npm install
   ```

2. En la raíz del proyecto, crea un archivo `.env` con la configuración adecuada (consulta la sección de Configuración del Entorno).

3. Para iniciar el servidor de desarrollo, utiliza:

   ```bash
   npm run dev
   ```

   o, si prefieres usar Yarn:

   ```bash
   yarn dev
   ```

4. La aplicación estará disponible en `http://localhost:3000` (o el puerto configurado en tu entorno).

## Estructura del Proyecto

Este proyecto sigue una arquitectura cliente-servidor, con el front-end desarrollado en Vite.js y la API en Node.js. Puedes encontrar el backend en el siguiente repositorio: [DELUXE_Back-end](https://github.com/angelluna03030/DELUXE_Back-end).

## Licencia

**Uso Comercial**: Cualquier uso comercial del código requiere una licencia adicional acordada con el autor. 

Copyright 2024 Angel Steven Garcia Luna. Todos los derechos reservados.
```

Este formato incluye:

- Secciones bien definidas y detalladas.
- Ejemplos de comandos y configuraciones en bloques de código.
- Enlaces y referencias a herramientas y recursos relevantes.

Si necesitas ajustes adicionales o más detalles, no dudes en decírmelo.
