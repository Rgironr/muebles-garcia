// Datos del negocio. Todo lo que diga [POR DEFINIR] falta confirmarlo con Amanda.
export const NEGOCIO = {
  nombre: 'Muebles García',
  lema: 'Para tu hogar',
  // Formato internacional sin espacios ni signos: 52 + 10 dígitos.
  whatsapp: '525591439289',
  whatsappVisible: '55 9143 9289',
  direccion: '[POR DEFINIR] Dirección de la tienda',
  horario: '[POR DEFINIR] Horario de atención',
  zonaEnvios: '[POR DEFINIR] Zona de envíos a domicilio',
  // Mientras sea true, se muestra un aviso de que los productos son de ejemplo.
  productosDeEjemplo: true,
};

export const CATEGORIAS = {
  recamaras: {
    nombre: 'Recámaras',
    prefijo: 'REC',
    descripcion: 'Camas, cabeceras, burós y cómodas para descansar a gusto.',
    portada: '/img/productos/rec-001/rec-001-1.svg',
  },
  comedores: {
    nombre: 'Comedores',
    prefijo: 'COM',
    descripcion: 'Mesas y sillas para reunir a toda la familia.',
    portada: '/img/productos/com-001/com-001-1.svg',
  },
} as const;

export type Categoria = keyof typeof CATEGORIAS;

export function enlaceWhatsApp(mensaje: string) {
  return `https://wa.me/${NEGOCIO.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export function formatoPrecio(precio: number | null | undefined) {
  if (!precio) return 'Consultar precio';
  return precio.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 });
}
