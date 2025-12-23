# Micancha


## Ejecución del proyecto

Este proyecto está dividido en dos partes independientes: backend y frontend. Ambas deben ejecutarse de forma simultánea, junto con la base de datos SQL.

### Requisitos previos

Node.js y npm instalados

Servidor de base de datos SQL operativo

Base de datos creada con el nombre DBP

Base de datos

Crear y levantar la base de datos SQL con el nombre:

CREATE DATABASE DBP;

```
 // Ejecutar los scripts SQL del proyecto sobre esta base de datos antes de iniciar la aplicación.
```

### Backend

Ubicarse en la carpeta del backend y ejecutar:

```
cd node
npm install
npm run dev

```

El servidor backend quedará escuchando según la configuración definida en el proyecto.

### Frontend

En otra terminal, ubicarse en la carpeta del frontend y ejecutar:
```
cd front
npm install
npm run dev
```

El frontend se iniciará en modo desarrollo y se conectará al backend configurado.

Nota

Ambos procesos (backend, frontend) y la base de datos DBP deben estar activos para que el sistema funcione correctamente.
