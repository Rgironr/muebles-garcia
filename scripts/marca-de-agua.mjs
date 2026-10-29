// Pone el logotipo de Muebles García como marca de agua en las fotos de productos.
//
// Uso:  npm run fotos
//
// Lee las fotos originales (sin marca) de privado/fotos-originales/<codigo>/
// y escribe la versión con marca, optimizada en WebP, en public/img/productos/<codigo>/.
// Los originales viven en privado/ (fuera de Git) para que nadie descargue fotos sin marca.
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { createRequire } from 'node:module';
import sharp from 'sharp';

const ORIGENES = 'privado/fotos-originales';
const DESTINO = 'public/img/productos';
const EXTENSIONES = new Set(['.jpg', '.jpeg', '.png', '.webp', '.heic', '.avif', '.tif', '.tiff', '.svg']);
const ANCHO_MAXIMO = 1600;
const TAMAÑO_MARCA = 2; // 1 = logo de ~17 % del ancho de la foto; 2 = el doble
const PESO_MAXIMO = 200 * 1024; // 200 KB (regla del proyecto)

// Fotos de las casas de la página de inicio (una por categoría), recortadas en vertical (4:5)
// para que la marca quede dentro de la casa. posicion: 0 = lado izquierdo de la foto, 1 = derecho.
// Si se cambia la foto de portada, cambiar aquí y correr npm run fotos.
const PORTADAS = [
  { categoria: 'recamaras', foto: 'rec-001/rec-001-1.webp', posicion: 0.8 },
  { categoria: 'comedores', foto: 'com-001/com-001-1.svg', posicion: 0.5 },
];
const DESTINO_PORTADAS = 'public/img/portadas';

const OCRE = '#B07A3A';
const fuentes = createRequire(import.meta.url).resolve('@fontsource/red-hat-display/package.json').replace(/package\.json$/, 'files/');
const FUENTE_500 = fuentes + 'red-hat-display-latin-500-normal.woff';
const FUENTE_800 = fuentes + 'red-hat-display-latin-800-normal.woff';

// Casa con sofá del logotipo (mismo dibujo que src/components/LogoIcono.astro), en blanco y ocre.
function iconoSvg(ancho) {
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 96" width="${ancho}" height="${Math.round(ancho * 0.8)}">
  <path d="M5 44 L60 8 L115 44" fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="miter"/>
  <path d="M20 35 V88" stroke="#fff" stroke-width="6"/>
  <g fill="#fff">
    <rect x="53" y="24" width="6.5" height="6.5"/><rect x="61" y="24" width="6.5" height="6.5"/>
    <rect x="53" y="32" width="6.5" height="6.5"/><rect x="61" y="32" width="6.5" height="6.5"/>
  </g>
  <g fill="${OCRE}">
    <rect x="34" y="48" width="56" height="22" rx="6"/>
    <rect x="26" y="58" width="14" height="24" rx="6"/>
    <rect x="84" y="58" width="14" height="24" rx="6"/>
    <rect x="36" y="70" width="52" height="12" rx="2"/>
    <rect x="33" y="82" width="4" height="6"/><rect x="87" y="82" width="4" height="6"/>
  </g>
  <path d="M62 50 V68 M38 70 H86" stroke="#fff" stroke-width="2"/>
</svg>`);
}

// Texto blanco con la tipografía de la marca. tamaño en px; espaciado en em.
async function texto(contenido, familia, archivo, tamaño, espaciado = 0) {
  const espacio = Math.round(espaciado * tamaño * 1024 * 0.75); // Pango usa 1/1024 de punto
  const { data, info } = await sharp({
    text: {
      text: `<span foreground="white" letter_spacing="${espacio}">${contenido}</span>`,
      font: `${familia} ${tamaño * 0.75}`,
      fontfile: archivo,
      dpi: 96,
      rgba: true,
    },
  }).png().toBuffer({ resolveWithObject: true });
  return { data, ancho: info.width, alto: info.height };
}

// Logotipo completo (casa + MUEBLES / GARCÍA) con sombra suave para que se lea en fondos claros y oscuros.
async function marcaDeAgua(anchoFoto) {
  const escala = anchoFoto / 1200; // las medidas están pensadas para una foto de 1200 px de ancho
  const u = escala * TAMAÑO_MARCA;
  const anchoIcono = Math.round(78 * u);
  const altoIcono = Math.round(anchoIcono * 0.8);
  const icono = await sharp(iconoSvg(anchoIcono)).png().toBuffer();
  const muebles = await texto('MUEBLES', 'Red Hat Display Medium', FUENTE_500, Math.round(15 * u), 0.34);
  const garcia = await texto('GARCÍA', 'Red Hat Display ExtraBold', FUENTE_800, Math.round(31 * u));

  const separacion = Math.round(12 * u);
  const margen = Math.round(14 * u); // espacio para que la sombra no se corte
  const altoTexto = muebles.alto + garcia.alto;
  const ancho = anchoIcono + separacion + Math.max(muebles.ancho, garcia.ancho) + margen * 2;
  const alto = Math.max(altoIcono, altoTexto) + margen * 2;
  const xTexto = margen + anchoIcono + separacion;
  const yTexto = margen + Math.round((Math.max(altoIcono, altoTexto) - altoTexto) / 2);

  const lienzo = { create: { width: ancho, height: alto, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } };
  const logo = await sharp(lienzo).composite([
    { input: icono, left: margen, top: margen + Math.round((Math.max(altoIcono, altoTexto) - altoIcono) / 2) },
    { input: muebles.data, left: xTexto, top: yTexto },
    { input: garcia.data, left: xTexto, top: yTexto + muebles.alto },
  ]).png().toBuffer();

  // Sombra: la silueta del logo en negro, desenfocada y semitransparente.
  const negro = { create: { width: ancho, height: alto, channels: 4, background: '#000' } };
  const silueta = await sharp(negro).composite([{ input: logo, blend: 'dest-in' }]).png().toBuffer();
  const sombra = await sharp(silueta).blur(Math.max(1, 5 * u)).linear([1, 1, 1, 0.55], [0, 0, 0, 0]).png().toBuffer();
  const logoTenue = await sharp(logo).linear([1, 1, 1, 0.88], [0, 0, 0, 0]).png().toBuffer();

  const data = await sharp(lienzo).composite([{ input: sombra }, { input: logoTenue }]).png().toBuffer();
  // El logo queda a 32 px (en 1200) de la orilla sin importar su tamaño; el lienzo ya trae su margen.
  return { data, ancho, alto, distancia: Math.round(32 * escala) - margen };
}

// Los SVG se dibujan a buena resolución antes de reducirlos.
const abrir = (origen) => sharp(origen, origen.endsWith('.svg') ? { density: 300 } : {}).rotate();

async function guardarWebp(imagen, destino) {
  // Baja la calidad poco a poco hasta quedar en el peso máximo.
  let calidad = 82, salida;
  do {
    salida = await sharp(imagen).webp({ quality: calidad }).toBuffer();
    calidad -= 6;
  } while (salida.length > PESO_MAXIMO && calidad >= 40);
  await writeFile(destino, salida);
  return { kb: Math.round(salida.length / 1024), calidad: calidad + 6 };
}

async function procesar(origen, destino) {
  const base = abrir(origen).resize({ width: ANCHO_MAXIMO, withoutEnlargement: true });
  const { data: foto, info } = await base.toBuffer({ resolveWithObject: true });

  // Las tarjetas del catálogo recortan al centro en 4:3. Si la foto es más ancha o más alta,
  // la marca va en la esquina de esa zona central para que nunca quede cortada.
  const anchoVisible = Math.min(info.width, Math.round(info.height * 4 / 3));
  const altoVisible = Math.min(info.height, Math.round(info.width * 3 / 4));
  const derecha = (info.width + anchoVisible) / 2;
  const abajo = (info.height + altoVisible) / 2;

  const marca = await marcaDeAgua(anchoVisible);
  const conMarca = await sharp(foto).composite([{
    input: marca.data,
    left: Math.round(derecha - marca.ancho - marca.distancia),
    top: Math.round(abajo - marca.alto - marca.distancia),
  }]).toBuffer();

  return { ...(await guardarWebp(conMarca, destino)), ...info };
}

async function portada({ categoria, foto, posicion }) {
  const { data, info } = await abrir(join(ORIGENES, foto)).resize({ height: 900 }).toBuffer({ resolveWithObject: true });
  const ancho = Math.min(info.width, Math.round(info.height * 4 / 5));
  const recorte = await sharp(data)
    .extract({ left: Math.round((info.width - ancho) * posicion), top: 0, width: ancho, height: info.height })
    .toBuffer();
  const marca = await marcaDeAgua(ancho);
  const conMarca = await sharp(recorte).composite([{
    input: marca.data,
    left: ancho - marca.ancho - marca.distancia,
    top: info.height - marca.alto - marca.distancia,
  }]).toBuffer();
  const destino = join(DESTINO_PORTADAS, `${categoria}.webp`);
  const r = await guardarWebp(conMarca, destino);
  console.log(`✓ ${destino}  ${ancho}×${info.height}  ${r.kb} KB (portada)`);
}

const codigos = (await readdir(ORIGENES, { withFileTypes: true })).filter((d) => d.isDirectory()).map((d) => d.name);
let total = 0;
for (const codigo of codigos.sort()) {
  await mkdir(join(DESTINO, codigo), { recursive: true });
  for (const archivo of (await readdir(join(ORIGENES, codigo))).sort()) {
    const { name, ext } = parse(archivo);
    if (!EXTENSIONES.has(ext.toLowerCase())) continue;
    const destino = join(DESTINO, codigo, `${name.toLowerCase()}.webp`);
    const r = await procesar(join(ORIGENES, codigo, archivo), destino);
    console.log(`✓ ${destino}  ${r.width}×${r.height}  ${r.kb} KB (calidad ${r.calidad})`);
    total++;
  }
}
await mkdir(DESTINO_PORTADAS, { recursive: true });
for (const p of PORTADAS) await portada(p);
console.log(total ? `\n${total} foto(s) y ${PORTADAS.length} portada(s) con marca de agua.` : `No hay fotos en ${ORIGENES}/<codigo>/.`);
