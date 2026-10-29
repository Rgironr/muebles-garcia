// Direcciones de imágenes de public/ con una huella de su contenido (?v=…).
// Cuando una foto cambia, cambia su dirección y los navegadores bajan la nueva
// en lugar de mostrar la que tenían guardada.
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const huellas = new Map<string, string>();

export function urlImagen(ruta: string) {
  let huella = huellas.get(ruta);
  if (!huella) {
    huella = createHash('md5').update(readFileSync(`public${ruta}`)).digest('hex').slice(0, 8);
    huellas.set(ruta, huella);
  }
  return `${ruta}?v=${huella}`;
}

export function fotoProducto(codigo: string, archivo: string) {
  return urlImagen(`/img/productos/${codigo.toLowerCase()}/${archivo}`);
}
