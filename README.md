# Palabras Encadenadas

Desarrollado con React, Vite, React Router, Axios y Bootstrap.

## Requisitos

- Node.js (npm)
- Internet para consultar la API (https://word-api-hmlg.vercel.app)

## Cómo descargar e instalar el proyecto

- Ir a la terminal
- `git clone https://github.com/BorziEmiliano/unq-ui-emiliano-borzi-trabajo-final.git`
- `cd unq-ui-emiliano-borzi-trabajo-final`
- `npm install`

## Cómo ejecutarlo localmente

- Ejecutar `npm run dev`
- Ingresar a http://localhost:5173

## Observaciones

En WordChain.jsx pensé utilizar `removeAccents(usedWord.toLowerCase())` para que al poner tildes al azar (ej: árból) se las saque en la cadena (ya que a la Api le da igual las tildes y mayúsculas). Pero esto hace que palabras bien utilizadas, como "árbol", pierdan su tilde.