// Datos del negocio. Todo lo que diga [POR DEFINIR] falta confirmarlo con Amanda.
export const NEGOCIO = {
  nombre: 'Muebles García',
  lema: 'Para tu hogar',
  // Formato internacional sin espacios ni signos: 52 + 10 dígitos.
  whatsapp: '525591439289',
  whatsappVisible: '55 9143 9289',
  direccion: 'Av. Jardines de Morelos 507, lote 10, ext. 470, Secc. Montes, Ecatepec, Edo. Méx.',
  referencias: 'Entre Nicolás Bravo y Playa Tijuana, frente a la iglesia.',
  // Un renglón por grupo de días.
  horario: [
    'Lunes a viernes: 10 a.m. a 7 p.m.',
    'Sábado y domingo: 10 a.m. a 4 p.m.',
  ],
  zonaEnvios: '[POR DEFINIR] Zona de envíos a domicilio',
  // Ubicación de la tienda física: 19°36'11.9"N 98°59'27.8"W.
  ubicacion: { lat: 19.603306, lng: -98.991056 },
  // Mientras sea true, se muestra un aviso de que los productos son de ejemplo.
  productosDeEjemplo: true,
};

export const CATEGORIAS = {
  recamaras: {
    nombre: 'Recámaras',
    prefijo: 'REC',
    descripcion: 'Camas, cabeceras, burós y cómodas para descansar a gusto.',
    // Foto de la casa en inicio: la genera npm run fotos (ver PORTADAS en scripts/marca-de-agua.mjs).
    portada: '/img/portadas/recamaras.webp',
    portadaPosicion: 'center',
  },
  comedores: {
    nombre: 'Comedores',
    prefijo: 'COM',
    descripcion: 'Mesas y sillas para reunir a toda la familia.',
    portada: '/img/portadas/comedores.webp',
    portadaPosicion: 'center',
  },
  cocinas: {
    nombre: 'Cocinas integrales',
    menu: 'Cocinas', // nombre corto para el menú
    prefijo: 'COC',
    descripcion: 'Alacenas, gabinetes y cubiertas a la medida de tu cocina.',
    portada: '/img/portadas/cocinas.webp',
    portadaPosicion: 'center',
  },
} as const;

export type Categoria = keyof typeof CATEGORIAS;

export function enlaceWhatsApp(mensaje: string) {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

// Mapa de Google para insertar en un iframe (no requiere clave de API).
export function mapaEmbed() {
  const { lat, lng } = NEGOCIO.ubicacion;
  return `https://maps.google.com/maps?q=${lat},${lng}&z=17&hl=es&output=embed`;
}

// Abre Google Maps (app o web) con la ruta hasta la tienda.
export function enlaceComoLlegar() {
  const { lat, lng } = NEGOCIO.ubicacion;
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
}

export function formatoPrecio(precio: number | null | undefined) {
  if (!precio) return 'Consultar precio';
  return precio.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
}
