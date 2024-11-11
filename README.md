# Pruebas-software-backend

# Entregable 1
Este READ ME

# Entregable 2
Subido como entregable_2.pdf

# Video E1
https://www.youtube.com/watch?v=sBvolwws3io

# Video E2
https://www.youtube.com/watch?v=1XZJAQSP6fc

# Readme de Instalación

## Alcances de la herramienta de testing (Mocha Chai)

La herramienta de testing **Mocha** junto con **Chai** se ha utilizado para realizar pruebas unitarias a nivel de la capa de **network** en el backend. Esto significa que hemos testeado el flujo completo desde las rutas de red hasta el controlador, el repositorio y finalmente el esquema de base de datos. Si bien las pruebas son unitarias, cubren una gran parte de la funcionalidad de la aplicación al simular las peticiones HTTP que atraviesan estas capas.

### Cobertura:
- **Network** (Rutas)
- **Controller** (Controladores de lógica)
- **Repository** (Acceso a datos)
- **Schema** (Modelos y validación)

## Descripción del trabajo realizado

Neon Threads es un proyecto de tienda de ropa en línea que busca ofrecer a los usuarios una experiencia moderna y fluida para la compra de ropa. El frontend está desarrollado en React con TypeScript y utiliza Next.js para la estructura de rutas y el renderizado eficiente del lado del servidor (App Router). Además, se usa Tailwind CSS para estilizar la interfaz, proporcionando una apariencia minimalista y atractiva. El backend se realizó en Node.js, se utilizó MongoDB como base de datos y además se subió la solución a la nube de AWS.

## Dependencias entre la herramienta y la aplicación

Para el correcto funcionamiento de la herramienta de testing y la aplicación, se deben tener instaladas las siguientes dependencias:

- **Mocha**: Framework para ejecutar pruebas.
- **Chai**: Biblioteca de aserciones para verificar el comportamiento esperado en las pruebas.
- **Mongoose**: ORM utilizado para gestionar la base de datos MongoDB.

La carpeta de `test` almacena las pruebas automáticas que serán probadas en la aplicación. Estas pruebas ejecutan mayoritariamente el código
de los componentes de la carpeta `components`.

### Instalación de dependencias

```bash
npm install
```

## Ejecución del programa

Para ejecución en ambiente de prueba
```bash
npm run dev
```

Para ejecución en producción
```bash
npm start
```

## Estrategia de pruebas utilizadas

Se han implementado pruebas unitarias que verifican el comportamiento de la aplicación en las capas de network, controller, repository y schema. Las pruebas se enfocan en:

- Validar las respuestas HTTP y sus códigos de estado.
- Verificar que los controladores gestionen correctamente los datos.
- Asegurar que las consultas al repositorio de la base de datos sean correctas.
- Validar los esquemas de datos antes de persistir en la base de datos.

## Procedimiento de ejecución de pruebas

Para ejecutar las pruebas, se utiliza el siguiente comando desde la terminal, que ejecuta todas las pruebas contenidas en la carpeta `test`:

```bash
npm test
```

## Reporte de resultados

Los resultados de las pruebas se muestran en la terminal después de ejecutar el comando de prueba. Para cada prueba se detalla:

- **Prueba pasada**: Un check verde indica que la prueba fue exitosa.
- **Prueba fallida**: Un mensaje de error y una marca roja indican qué prueba falló y cuál fue la salida esperada versus la salida obtenida.

## Problemas encontrados y soluciones

### Problema 1: Aserciones incorrectas en la validación de respuestas.
**Solución**: Se ajustaron las aserciones de Chai para que validaran correctamente tanto los códigos de estado como los mensajes en el cuerpo de la respuesta.
