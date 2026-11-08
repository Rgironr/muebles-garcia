# Bitácora de mantenimiento

| Fecha | Tipo | Código | Detalle |
|---|---|---|---|
| 2026-10-27 | Alta (ejemplo) | REC-001 a REC-003 | Productos de ejemplo con fotos provisionales. Reemplazar por los reales. |
| 2026-10-27 | Alta (ejemplo) | COM-001 a COM-003 | Productos de ejemplo con fotos provisionales. Reemplazar por los reales. |
| 2026-10-27 | Cambio | REC-001 a REC-003 | Fotos reales de la tienda (WebP 1200×900, 63–98 KB) en lugar de las ilustraciones. Textos y precios siguen siendo de ejemplo. En REC-002 se desenfocó el reflejo de una persona en el espejo. |
| 2026-10-29 | Cambio | REC-001 a REC-003 | Marca de agua con el logotipo en las fotos (`npm run fotos`). Originales sin marca guardados en `privado/fotos-originales/`. |
| 2026-10-29 | Alta | REC-004 | Recámara Klarisa, $18,900. 5 piezas (cabecera con LED, cajonera, zapatera con espejo giratorio, 2 burós). Medidas tomadas del catálogo. Foto **temporal** recortada del catálogo del proveedor, con marca de agua. Reemplazar por foto propia. |
| 2026-10-29 | Cambio | COM-001 a COM-003 | Dibujos provisionales convertidos a WebP con marca de agua (originales SVG en `privado/fotos-originales/`). Portadas de inicio generadas con marca en `public/img/portadas/`. |
| 2026-10-29 | Alta (ejemplo) | COC-001 a COC-003 | Nueva categoría Cocinas integrales con 3 productos de ejemplo y dibujos provisionales (con marca de agua). Reemplazar por los reales. |
| 2026-10-29 | Cambio | COM-001 a COM-003, COC-001 a COC-003 | Dibujos de ejemplo sin marca de agua. Las fotos llevan `?v=<huella>` en su dirección para que ningún navegador muestre versiones viejas (sin marca). |
| 2026-11-04 | Baja | REC-003 | Recámara Lucía king size eliminada del sitio. Foto original guardada en `privado/fotos-bajas/rec-003/`. El código REC-003 no se reutiliza. |
| 2026-11-04 | Alta | REC-005 | Recámara Audio, $22,950. Foto real de la tienda con marca de agua. Solo nombre y precio, sin descripción (indicación de Rafael). |
| 2026-11-04 | Cambio | REC-004 | Se quitan descripción y medidas: solo nombre y precio (indicación de Rafael). La foto sigue siendo temporal. |
| 2026-11-04 | Alta | REC-006 | Recámara Renata, $25,000. Foto real de la tienda con marca de agua. Nombre, precio y colores (rosa, gris y nogal). |
| 2026-11-04 | Cambio | REC-006 | Se difumina un cuadro con personajes de Disney en la pared y su reflejo en el espejo. Foto sin retocar en `privado/fotos-sin-retoque/rec-006/`. |
| 2026-11-04 | Alta | REC-007 | Recámara Sebastiana, sin precio ("Consultar precio"). 3 imágenes con marca de agua, sacadas del video `Muebles/Recamaras/Recamara Sebastiana.mp4` (482 px de ancho): reemplazar por fotos si llegan. Solo nombre. |
| 2026-11-04 | Cambio | REC-007 | Se agrega el video a la ficha, con marca de agua y sin audio (480×848, 2.3 MB). Original en `privado/fotos-originales/rec-007/`. |
| 2026-11-04 | Alta | REC-008 | Recámara Stefany, $23,300. Foto real de la tienda con marca de agua. Solo nombre y precio. |
| 2026-11-04 | Cambio | REC-001, REC-002, COM-001 a COM-003, COC-001 a COC-003 | Se quitan los precios de ejemplo ("Consultar precio") y la nota "Producto de ejemplo". Nombres, descripciones, medidas y materiales siguen siendo de ejemplo. |
| 2026-11-04 | Cambio | REC-001, REC-002, COM-001 a COM-003, COC-001 a COC-003 | Se quitan descripción, medidas, material y colores inventados: solo nombre y "Consultar precio". |
| 2026-11-04 | Cambio | REC-005, REC-006, REC-008 | Pasan a "Lo más pedido" en inicio, en lugar de COM-001, COM-003 y REC-001 (elegidas por Claude a petición de Rafael). |
| 2026-11-05 | Cambio | REC-001 | Recámara Toscana matrimonial: precio $25,000 y "Contiene 7 piezas" (datos de Rafael). |
| 2026-11-05 | Cambio | REC-007 | Recámara Sebastiana: precio $15,500. |
| 2026-11-07 | Alta | REC-009 | Recámara Corona, $15,000. Foto real de la tienda con marca de agua. Nombre, precio y color (rosa). |
