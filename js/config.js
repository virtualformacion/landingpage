window.APP_CONFIG = {
  whatsappNumber: "573206199480",

  texts: {
    normalMessage: "Deseo adquirir el servicio",
    promoMessagePrefix: "Vengo por el descuento",
    promoMessageSuffix: "para la web de códigos"
  },

  promo: {
    /*
      PROMOCIÓN EN TIEMPO REAL PARA TODOS:
      - enabled: true activa la promoción.
      - enabled: false la desactiva manualmente.
      - endAt define la fecha y hora exacta en la que termina para TODOS los visitantes.
      - Usa formato ISO con zona horaria. Colombia/Perú normalmente usan -05:00.
      - Ejemplo: "2026-05-05T23:59:59-05:00"

      Para activar una nueva promo:
      1. Cambia enabled a true.
      2. Cambia endAt a una fecha futura.
      3. Cambia campaignId para iniciar una nueva campaña/cupones.
    */
    enabled: true,
    endAt: "2026-05-10T23:59:59-05:00",
    campaignId: "promo-streaming-002",

    /*
      CÓDIGOS DE DESCUENTO:
      - Puedes agregar, eliminar o modificar códigos cuando desees.
      - El sistema elegirá 1 código aleatorio cuando la promoción esté activa.
      - Mantén el formato: GAMAZ-XXXX-XXXX-XXXX
    */
    discountCodes: [
      "GAMAZ-XER3-O20S-3456",
      "GAMAZ-K7P4-M9Q2-7183",
      "GAMAZ-L8D2-R5T9-6041",
      "GAMAZ-Z3N6-V1C8-9275",
      "GAMAZ-B4W9-H2K7-1538",
      "GAMAZ-Q6A1-Y8M3-4820",
      "GAMAZ-P9S5-J4E2-7691",
      "GAMAZ-T2R8-C6N4-0357",
      "GAMAZ-D5X1-U7V9-6142",
      "GAMAZ-M3H6-F8B1-2904"
    ]
  }
};
