# ReactJS Scaffolding

## Instalación, configuración y lanzamiento

Para el funcionamiento del proyecto se utiliza Docker. A continuación la forma de inicializar

### Configuración

Antes de iniciar los servicios del proyecto es necesario generar un archivo de configuración para las variables de entorno, para ello sera necesario realizar los siguientes pasos:

- En la raiz del proyecto generar un archivo para las variables de entorno que debera llamarse `.env`

```
touch .env
```
- En dicho archivo agregar y configurar las variables necesarias

#### Variables de entorno

```
PORT=YOUR_PORT
```

### Configuración del archivo env.json

Existe otro archivo de configuración necesario antes de iniciar

- En la raiz del proyecto generar un archivo para las variables de entorno que debera llamarse `env.json`

```
touch src/config/env.json
```

- En dicho archivo agregar y configurar las variables necesarias

#### Variables de configuración

```
{
  "external_api": {
    "backend": {
			"url": "..."
    },
    "main_socket": {
      "url": "..."
    }
  },
  "main_external_api": "backend",
  "main_external_socket": "main_socket",
  "has_site": boolean // Indica si se va a tener rutas para el site
  "secure_home": string // Indica cual es la ruta por defecto para los componentes seguros Ej: /home
  "google_analytics": string // Identificador del proyecto en Google Analytics Ej: "UA-12312312-1"
}
```

### Lanzamiento

#### Modo desarrollo - Con Docker

- Para el modo de desarrollo es importante tener configuradas las variables de entorno 
  - PORT

- Inicializar el contenedor

```

# Iniciarlizar el contenedor por primera vez
docker-compose up -d --build

# Cuando ya se ha construido la imagen es posible ejecutar
docker-compose up -d

```

- Cuando el contenedor termine de inicializar es posible acceder a este a traves de la dirección `http://localhost:PORT`

- Como ultimo paso y para finalizar es necesario dar de baja el contenedor

```
# Finalizar el contenedor
docker-compose down
```

### Lanzamiento Modo producción - Con Docker

- Para el modo de desarrollo es importante tener configuradas las variables de entorno 
  - PORT

- Inicializar el contenedor

```

# Iniciarlizar el contenedor por primera vez
docker-compose -f docker-compose.prod.yml up -d --build

# Cuando ya se ha construido la imagen es posible ejecutar
docker-compose -f docker-compose.prod.yml up -d

```

- Cuando el contenedor termine de inicializar es posible acceder a este a traves de la dirección `http://localhost:PORT`

- Como ultimo paso y para finalizar es necesario dar de baja el contenedor

```
# Finalizar el contenedor
docker-compose down --remove-orphans

```

Para inicializar los servicios sin usar docker: 

### Modo desarrollo - Sin Docker

```
  npm install
  npm run build:dev

```

### Modo producción - Sin Docker

```
  npm install
  npm run build:dll
  npm run build:prod
```

## Estructura de directorios y explicación

```
|_ src
    |_ assets                               # Almacenamiento estatico de recursos
    |_ components                           # Elementos que contienen logica y presentación de la aplicación. Son la composición a mas baja escala de la aplicación
                |_ commons
                        |_ ...              # Pequeñas piesas del app que ejecutan una tarea especifica pero que ademas son compartidas
                |_ layouts
                        |_ ...              # Componentes que enmarcan los componentes tipo "screens"
                |_ modules
                        |_ ...              #  Componentes que ejecutan tareas con logica compleja que ademas son compartidos 
                |_ screens
                        |_ ...              # Componentes cuya unica responsabilidad es conectar otros componentes
    |_ config                               # Archivos de configuración de la aplicación
    |_ providers                            # Higher order components (HOC)
	|_ reducers                               # Almacenamiento redux
	|_ resources                               # Recursos del sistema
				|_ locales                       # Archivos de intenacionalización
    |_ router                               # Enrutamiento del app
    |_ services                             # Objetos que permiten ejecutar funcionalidades importantes para la aplicación
    |_ store                                # Configuración de librerias para almacenamiento y persistencia de datos
	|_ styles                              # Archivos no compilados para estilos
    |_ utils                                # Librerias de funcionamiento simples y compartidas 
	|_ i18n.js                            # Archivo de configuración de I18N
	|_ index.tsx                         # Archivo principal de la aplicación

```

## Estructura de un componente

```
|_ component-name
                |_ components           # Parte de presentación del componente
                |_ containers           # Parte logica del componente

```

## Formularios

Para simplificar el trabajo con formularios y validacion de los mismos se usa [React-form-hooks](https://react-hook-form.com/get-started)
