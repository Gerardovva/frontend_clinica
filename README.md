

# Clínica API Rest - Frontend

Este proyecto es la interfaz de usuario desarrollada con Angular para complementar la API Rest de gestión clínica. Proporciona una experiencia amigable y funcional para interactuar con los recursos ofrecidos por la API.

## Funcionalidades

El frontend de Angular ofrece las siguientes funcionalidades clave:

- **Interfaz Intuitiva**: Diseñada para ser fácil de usar y proporcionar una navegación clara y eficiente para los usuarios finales.
- **Gestión de Médicos**: Permite visualizar, agregar, actualizar y eliminar información detallada de médicos registrados en la clínica.
- **Gestión de pacientes**: Permite visualizar, agregar, actualizar y eliminar información detallada de pacientes registrados en la clínica.
- **Visualización de Consultas**: Facilita la visualización y gestión de las citas agendadas entre pacientes y médicos.
- **Integración con API**: Utiliza endpoints definidos en la API para interactuar de manera segura y eficiente con la base de datos y la lógica de negocio del backend.
- **Seguridad**: Implementa medidas de seguridad compatibles con las políticas de autenticación y autorización definidas en la API.

## Configuración del Backend

Para que el frontend de Angular funcione correctamente, es necesario clonar y configurar el backend de la Clínica API Rest. Sigue estos pasos para configurar el backend:

1. **Clonación del Repositorio del Backend**: Clona el repositorio del backend en tu máquina local utilizando el siguiente comando:

   ```
   git clone <URL_del_repositorio_del_backend>
   ```

   Sustituye `<URL_del_repositorio_del_backend>` con la URL del repositorio del backend de la Clínica API Rest.

2. **Configuración de la Base de Datos**: Asegúrate de tener una base de datos MySQL configurada y funcionando según las instrucciones proporcionadas en el README del backend. Generalmente, deberás crear una base de datos llamada `vollmed_api`.

3. **Configuración del Entorno de Desarrollo**: Sigue las instrucciones proporcionadas en el README del backend para configurar tu entorno de desarrollo. Esto puede incluir la configuración de variables de entorno, la instalación de dependencias y cualquier otra configuración específica del proyecto.

4. **Ejecución del Backend**: Inicia el backend en tu servidor local según las instrucciones proporcionadas en su README. Esto generalmente implicará ejecutar la aplicación Spring Boot.

5. **Configuración de la URL Base**: Una vez que el backend esté en funcionamiento, asegúrate de configurar la URL base de la API en el frontend de Angular. Esto se realiza comúnmente en el archivo de configuración de entorno (`environment.ts`).

   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8080/api', // Reemplaza con la URL correcta de tu backend
   };
   ```

6. **Interacción Completa**: Con el backend configurado y ejecutándose, y la URL base de la API configurada en el frontend, el frontend de Angular debería poder interactuar correctamente con los recursos del backend a través de solicitudes HTTP.

## Uso

Para comenzar a utilizar el frontend de Angular, sigue estos pasos:

1. **Clonación del Repositorio**: Clona el repositorio de frontend en tu máquina local utilizando el comando `git clone`.

2. **Instalación de Dependencias**: Ejecuta `npm install` para instalar todas las dependencias necesarias listadas en `package.json`.

3. **Configuración del Entorno**: Asegúrate de configurar las variables de entorno necesarias, como la URL base de la API, en `environment.ts`.

4. **Ejecución en Modo Desarrollo**: Ejecuta `ng serve` para iniciar un servidor de desarrollo. Navega a `http://localhost:4200/` para ver la aplicación en tu navegador.

5. **Despliegue**: Utiliza `ng build` para construir la aplicación. Los artefactos de construcción se almacenarán en el directorio `dist/`.


