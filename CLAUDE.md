# Muebles García — Archivo maestro del proyecto

> Este archivo es la fuente de verdad del proyecto. Claude lo lee al inicio de cada sesión.
> Mantenerlo actualizado cuando cambie una decisión, el alcance o el proceso de mantenimiento.

## 1. Contexto del negocio

- **Negocio:** Muebles García (antes referido en este proyecto como Mueblería "Amanda"). Negocio establecido que vende muebles y artículos para el hogar.
- **Dueña:** Amanda (cliente del proyecto; aprueba contenidos, precios y diseño).
- **Desarrollador / mantenimiento:** Rafael (responsable de construir el sitio y de las altas, cambios y bajas de productos).

### Canales de venta actuales
1. **Tienda física:** el cliente visita, pregunta precio, compra y se le envía el artículo a domicilio.
2. **WhatsApp (clientes recurrentes):** preguntan por modelos disponibles, piden fotos y características, negocian y compran.
3. **Mayoreo:** venta de artículos a otras mueblerías.

### Objetivo del proyecto
Expandir ventas atrayendo clientes nuevos por Internet mediante un **sitio web catálogo** donde Amanda exponga sus productos.
El sitio debe **llevar al cliente a WhatsApp** (el canal que ya funciona) en lugar de reemplazarlo.

## 2. Alcance

### Incluido (versión 1)
- Página de inicio con presentación de la mueblería, ubicación, horario y contacto.
- **Catálogo de productos** organizado por categorías (salas, comedores, recámaras, colchones, decoración, etc.).
- **Ficha de producto:** nombre, fotos (varias), descripción, medidas, material, color/acabados, precio (o "Consultar precio"), disponibilidad.
- **Botón "Pedir por WhatsApp"** en cada producto, con mensaje prellenado que incluya nombre/código del producto.
- Sección **Mayoreo** con formulario o enlace de WhatsApp dedicado para mueblerías.
- Mapa / dirección de la tienda física y zona de envíos.
- Diseño adaptable a celular (la mayoría del tráfico vendrá de celular y redes sociales).
- SEO básico (títulos, descripciones, Google Business Profile, Open Graph para compartir en WhatsApp/Facebook).

### Fuera de alcance (por ahora)
- Pagos en línea / carrito de compras.
- Inventario en tiempo real conectado a un sistema de punto de venta.
- Cuentas de usuario para clientes.

> Se pueden reconsiderar en una versión 2 si el sitio genera demanda.

## 3. Arquitectura

Prioridad: **bajo costo, rápido, fácil de mantener para Rafael.**

| Aspecto | Propuesta | Motivo |
|---|---|---|
| Tipo de sitio | Sitio estático (catálogo) | Sin servidor ni base de datos que mantener; barato y rápido |
| Generador | **Astro 5** — ✅ confirmado | Genera una página por producto a partir de archivos de datos (`npm run dev` / `npm run build`) |
| Datos de productos | Un `.md` por producto en `src/content/productos/` (esquema en `src/content.config.ts`) | Altas/cambios/bajas = agregar, editar o borrar un archivo |
| Imágenes | Originales en `privado/fotos-originales/<codigo>/` (fuera de Git). `npm run fotos` (`scripts/marca-de-agua.mjs`) les pone el logotipo como marca de agua y las guarda optimizadas (WebP, ≤ 200 KB) en `public/img/productos/<codigo-en-minúsculas>/` | Carga rápida en celular; las fotos publicadas siempre llevan la marca |
| Hospedaje | **Cloudflare Pages (plan gratuito)** — ✅ publicado en https://muebles-garcia.pages.dev (preset Astro, build `npm run build`, salida `dist`) | Despliegue automático al subir cambios a GitHub; CDN global, HTTPS incluido |
| Control de versiones | Git + GitHub: https://github.com/Rgironr/muebles-garcia (público, rama `main`) | Historial de cambios y respaldo |
| Dominio | Por definir (ej. `mueblesgarcia.com.mx`). Mientras tanto: subdominio gratuito `*.pages.dev` | Costo anual a cargo de Amanda; DNS administrable desde Cloudflare |

### Límites del plan gratuito de Cloudflare Pages a considerar
- 500 compilaciones (builds) por mes → agrupar cambios menores cuando sea posible.
- Máximo 20,000 archivos por sitio y 25 MiB por archivo → mantener fotos optimizadas.
- Ancho de banda y solicitudes de sitio estático sin límite.

## 4. Modelo de datos de un producto

```yaml
codigo: SAL-001            # Único. Prefijo por categoría + número consecutivo
nombre: Sala Venecia 3-2-1
categoria: salas
precio: 18500              # MXN. Vacío = "Consultar precio"
precio_mayoreo: null       # Nunca se publica; solo referencia interna (opcional)
disponible: true           # false = se muestra "Agotado" o se oculta
destacado: false           # Aparece en la página de inicio
medidas: "Sofá 210 x 90 x 85 cm"
material: Tela antimanchas, estructura de madera de pino
colores: [gris, beige]
descripcion: >
  Texto breve y atractivo del producto.
fotos:
  - sal-001-1.webp
  - sal-001-2.webp
fecha_alta: 2026-10-22
```

### Prefijos de categoría (propuesta)
`SAL` salas · `COM` comedores · `REC` recámaras · `COC` cocinas integrales · `COL` colchones · `ROP` roperos/closets · `CEN` centros de entretenimiento · `DEC` decoración/hogar · `OFI` oficina

## 5. Proceso de mantenimiento (altas, cambios y bajas)

1. **Amanda envía** por WhatsApp: fotos del producto + nombre, precio, medidas, material, colores.
2. **Rafael registra** la solicitud en `mantenimiento/bitacora.md` (fecha, tipo, código, detalle).
3. **Alta:** crear archivo del producto con el siguiente código consecutivo. Guardar las fotos originales en `privado/fotos-originales/<codigo>/` y correr `npm run fotos` (marca de agua + optimización).
4. **Cambio:** editar el archivo existente (precio, disponibilidad, fotos, etc.).
5. **Baja:** preferir `disponible: false` (temporal) o eliminar archivo y fotos (definitivo).
6. Revisar en local → **esperar a que Rafael autorice la publicación** → subir cambios (commit + push) → Cloudflare Pages despliega automáticamente → verificar en el sitio publicado.
7. Confirmar a Amanda con el enlace del producto.

Reglas:
- Nunca publicar precios de mayoreo.
- Las fotos deben ser propias de la mueblería (no de catálogos de proveedores sin permiso).
- Toda foto publicada lleva el logotipo como marca de agua (esquina inferior derecha). Nunca subir a `public/` una foto sin marca. Si la foto no es 4:3, el script pone la marca dentro de la zona central 4:3 (la que se ve en las tarjetas); la ficha del producto muestra la foto completa. Las fotos de las casas de inicio (`public/img/portadas/`) también las genera el script (lista `PORTADAS`). Ninguna imagen de producto se publica sin pasar por `npm run fotos`.
- El repositorio es público: cotizaciones, contratos y datos privados van en `privado/` (ignorado por Git), nunca en archivos versionados.
- Un commit por solicitud de mantenimiento, con mensaje del tipo `alta: SAL-012 Sala Milán`.

## 6. Pendientes / información por obtener de Amanda

- [x] Número de WhatsApp para el sitio: 55 9143 9289 (en `src/config.ts`).
- [x] Dirección (2026-10-29): Av. Jardines de Morelos 507, lote 10, ext. 470, Secc. Montes, Ecatepec; entre Nicolás Bravo y Playa Tijuana, frente a la iglesia. Coordenadas 19°36'11.9"N 98°59'27.8"W. En `src/config.ts`, con mapa en la página de inicio.
- [x] Horario (2026-10-29): lunes a viernes de 10 a.m. a 7 p.m.; sábado y domingo de 10 a.m. a 4 p.m. En `src/config.ts`.
- [ ] Zona y costo de envíos.
- [x] Logotipo elegido (2026-10-27): casa con sofá ocre y "PARA TU HOGAR". Redibujado en `src/components/LogoIcono.astro`. Falta un archivo maestro del logo completo (SVG) y fotos de la tienda.
- [x] Se muestran precios; si `precio` está vacío dice "Consultar precio".
- [ ] Lista inicial de productos con fotos (¿cuántos son aprox.?).
- [ ] Redes sociales existentes (Facebook, Instagram, TikTok).
- [ ] Dominio deseado y quién lo paga.
- [ ] Condiciones de mayoreo (mínimo de piezas, cómo contactar).
- [ ] Métodos de pago aceptados (efectivo, transferencia, tarjeta, crédito/apartado).
- [x] Cotización enviada (2026-10-22). Detalle en `privado/cotizacion.md` (fuera de Git). Pendiente: plan de mantenimiento que elija Amanda.

## 7. Plan de trabajo

1. **Levantamiento:** reunir la información de la sección 6.
2. **Diseño:** maqueta de inicio, catálogo y ficha de producto; aprobación de Amanda.
3. **Desarrollo:** estructura del sitio, plantilla de producto, botón de WhatsApp.
4. **Carga inicial** de productos.
5. **Publicación:** conectar el repositorio de GitHub a Cloudflare Pages, dominio, Google Business Profile.
6. **Mantenimiento** continuo según la sección 5.

## 8. Convenciones para Claude

- Idioma del sitio y de la comunicación: **español (México)**. Moneda: MXN.
- Los textos para clientes deben ser cálidos, claros y cortos; pensados para lectura en celular.
- Antes de inventar datos del negocio (precios, dirección, teléfono), preguntar; usar marcadores `[POR DEFINIR]`.
- Al hacer altas/cambios/bajas, respetar el modelo de datos de la sección 4 y anotar en la bitácora.
- Actualizar este archivo cuando se tome una decisión de la sección 3 o se resuelva un pendiente de la sección 6.

## 9. Registro de decisiones

| Fecha | Decisión |
|---|---|
| 2026-10-22 | Se crea el archivo maestro. Arquitectura propuesta: sitio estático tipo catálogo con contacto por WhatsApp. |
| 2026-10-22 | Hospedaje confirmado: **Cloudflare Pages, plan gratuito** (despliegue desde GitHub). |
| 2026-10-22 | Cotización creada y enviada (detalle en `privado/cotizacion.md`). |
| 2026-10-22 | Logotipo: Rafael lo crea sin costo como cortesía. |
| 2026-10-25 | El negocio se llama **Muebles García** (antes "Mueblería Amanda"). Amanda sigue siendo la dueña. |
| 2026-10-25 | Se crean 5 propuestas de logotipo en `logos/muebles-garcia/` (SVG). |
| 2026-10-27 | Se elige el logotipo 1 (casa con sofá). Colores del sitio: carbón `#24282C`, ocre `#B07A3A`, ocre claro `#EBD9BD`, piedra `#ECEAE6`. Tipografía Red Hat Display / Red Hat Text. |
| 2026-10-27 | Sitio en **Astro 5**. Primeras secciones: **Recámaras** y **Comedores**. Se muestran precios. WhatsApp 55 9143 9289. Productos de ejemplo con fotos provisionales hasta tener las reales (`productosDeEjemplo` en `src/config.ts`). |
| 2026-10-27 | Repositorio público en GitHub y sitio publicado en Cloudflare Pages: https://muebles-garcia.pages.dev. La cotización se movió a `privado/` (fuera de Git). |
| 2026-10-29 | Mapa de la tienda con Google Maps insertado (iframe sin clave de API, gratuito) en la sección "Visita la tienda" de inicio, más enlace "Cómo llegar" en el pie. Coordenadas en `NEGOCIO.ubicacion`. |
| 2026-10-29 | Marca de agua con el logotipo (casa + MUEBLES GARCÍA, blanco con sofá ocre y sombra suave) en la esquina inferior derecha de todas las fotos de productos, de ~1/3 del ancho de la foto (`TAMAÑO_MARCA = 2`). Se aplica con `npm run fotos`; los originales sin marca quedan en `privado/fotos-originales/`. |
| 2026-10-29 | Se permiten **fotos temporales** del catálogo del proveedor (recortadas y con marca de agua) mientras llegan las fotos propias; se anotan como temporales en la bitácora para reemplazarlas. |
| 2026-10-29 | **Todas** las imágenes del sitio en vivo llevan marca de agua: también los dibujos provisionales de Comedores (ahora WebP) y las portadas de inicio, que el script recorta en vertical. |
| 2026-10-29 | Nueva categoría **Cocinas integrales** (`/cocinas/`, prefijo `COC`), con 3 productos de ejemplo y dibujos provisionales con marca de agua. En el menú aparece como "Cocinas"; en celular el menú baja a su propio renglón. |
