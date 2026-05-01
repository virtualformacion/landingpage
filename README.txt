LANDING BOT CÓDIGOS STREAMING + CUPONES

Esta versión agrega códigos de descuento aleatorios.

CÓMO FUNCIONA:
- Cuando la promoción está activa, el sistema elige 1 código aleatorio desde js/config.js.
- El mensaje de WhatsApp queda así:
  "Vengo por el descuento - GAMAZ-XER3-O20S-3456 para la web de códigos"
- Cuando la promoción está inactiva, el mensaje será:
  "Deseo adquirir el servicio"

DÓNDE EDITAR LOS CÓDIGOS:
Abre:
js/config.js

Busca:
discountCodes: [
  "GAMAZ-XER3-O20S-3456",
  ...
]

Puedes:
- Agregar nuevos códigos
- Eliminar códigos
- Modificar códigos existentes

FORMATO RECOMENDADO:
GAMAZ-XXXX-XXXX-XXXX

IMPORTANTE:
- El sistema guarda el cupón elegido en el navegador del visitante para que no cambie a cada segundo.
- Si cambias campaignId, se reinicia el contador y también puede elegirse un nuevo cupón.


AJUSTE NUEVO:
- La página ahora abre siempre en la parte inicial.
- Ya no baja automáticamente a la sección de evaluación al cargar.


AJUSTE NUEVO:
- Se agregó un tercer botón en el inicio: 'Cómo funciona', que lleva a la sección de solución.
- Se añadió una imagen de referencia en la sección de solución.
- Se añadió un video local (MP4) dentro de la misma sección para mostrar el funcionamiento.
- Los archivos están dentro de la carpeta assets.


AJUSTE NUEVO:
- Se quitó la imagen de referencia.
- Se dejó solo el video en la sección de solución.
- Debajo del video se agregó: Código recibido / Tu cliente solicita el código y el proceso queda más ordenado.


AJUSTE NUEVO - PLANES:
- Después de la evaluación, el usuario elige entre Plan Básico ($5), Plan Pro ($18) y Plan Ultra ($25).
- El descuento solo aplica para Plan Pro y Plan Ultra.
- El Plan Básico indica claramente que no aplica para descuento.
- WhatsApp se abre después de seleccionar un plan.
- El mensaje incluye plan, descripción, cupón si aplica y valor a pagar por los 2 primeros meses con descuento.


AJUSTE NUEVO - MENSAJE CORTO:
- El mensaje de WhatsApp ya no incluye la descripción larga del plan.
- Ahora solo envía: cupón si aplica, plan elegido, precio regular, descuento y total por 2 meses.


AJUSTE NUEVO - CONTADOR REAL GLOBAL:
- El contador ya no se inicia desde cero para cada visitante.
- Ahora todos los visitantes ven el mismo conteo regresivo basado en promo.endAt dentro de js/config.js.
- Cuando llega a cero, la promoción se deshabilita visualmente y el mensaje de WhatsApp ya no menciona descuento.
- Para activar una nueva promoción debes editar js/config.js:
  enabled: true
  endAt: fecha futura exacta
  campaignId: nuevo valor, por ejemplo promo-streaming-003
