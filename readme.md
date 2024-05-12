# Dashboard

https://soniamartinezz.github.io/dashboard 

En este Dasboard se podrán ver 4 elementos:
- Un reloj digital 24h + Fecha
- Una estación meteorológica
- Un creador de contraseñas seguras
- Un listado de links interesántes
(Además de imagenes aleatorias de fondo)

Desde la home se podrá acceder a cada página.

## Reloj digital 24h + Fecha:

Un reloj digital con la fecha y hora actual del lugar en el que te encuentres. Tendrá las siguientes características: 
- Por un lado tendremos un reloj digital con horas, minutos y segundos que se actualizará automaticamente cada segundo que pase.
- La fecha tendrá formato DD/MM/AAAA 
- Aparecerán unas frases dependiendo un intervalo de horas.  

## Generador de contraseñas seguras:

- Tendrá entre 12 caracteres como mínimo y 50 de máximo. Se podrá elegir el número de caracteres
- Se compondrá de mayúsculas, minúsculas, números y símbolos. Mínimo una de cada.
- Un input dónde meteremos la longitud de la contraseña y un botón para que nos dé el resultado.

## Listado de links:

- Tendremos 2 inputs. Uno de ellos será el título que aparecerá en cada uno de nuestros elementos. Al pulsar el botón de `añadir link` se añadirá en el DOM pero también en nuestro `localStorage` para poder recuperarlo siempre.
- Cada uno de los elementos tendrá el nombre que hemos añadido y el enlace al pulsar sobre él (ya sea el texto o el bloque completo). También tendrá un botón de eliminar si ya no vamos a hacer uso de él.
- Será un listado de links que funcionará de la misma manera tanto en la página independiente como en el dashboard.

## Estación meteorológica:

- El tiempo en el momento en el que accedemos a la página con varios elementos:
  - Ciudad y Pais. Pondremos la ciudad y País en el que nos encontramos.
  - El estado del clima.
  - Imagen y grados celsius de nuestra ciudad.
  - Precipitaciones, humedad y viento km/h.
- La previsión por horas en el día en el que estamos. Con su hora, imagen y grados celsius. 

## Imagenes random background:

Todas las páginas del proyecto tendrán una imagen random de background. Cambiará cada X segundos.
