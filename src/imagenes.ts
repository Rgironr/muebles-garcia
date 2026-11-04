// Direcciones de imágenes de public/ con una huella de su contenido (?v=…).
// Cuando una foto cambia, cambia su dirección y los navegadores bajan la nueva
// en lugar de mostrar la que tenían guardada.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

export function urlImagen(ruta: string) {
  const huella = createHash('md5').update(readFileSync(`public${ruta}`)).digest('hex').slice(0, 8);
  return `${ruta}?v=${huella}`;
}

export function fotoProducto(codigo: string, archivo: string) {
  return urlImagen(`/img/productos/${codigo.toLowerCase()}/${archivo}`);
}
