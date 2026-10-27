# Muebles García — sitio web

Catálogo de muebles hecho con [Astro](https://astro.build). Los clientes ven los productos y piden por WhatsApp.
Las decisiones del proyecto están en `CLAUDE.md`.

## Trabajar en local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera el sitio en dist/
```

## Productos

- Datos: un archivo por producto en `src/content/productos/<codigo>.md`.
- Fotos: `public/img/productos/<codigo>/` (WebP, ≤ 200 KB).
- WhatsApp, dirección y horario: `src/config.ts`.
- Cada cambio se anota en `mantenimiento/bitacora.md`.

## Publicar en Cloudflare Pages

1. Sube este repositorio a GitHub.
2. En Cloudflare: **Workers & Pages → Create → Pages → Connect to Git** y elige el repositorio.
3. Configuración de compilación:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Rama de producción: `main`
   - La versión de Node se toma de `.node-version` (20).
4. Al terminar, el sitio queda en `https://<proyecto>.pages.dev`. Si el nombre no es `muebles-garcia`, cambia `site` en `astro.config.mjs`.

Cada `git push` a `main` vuelve a publicar el sitio automáticamente.
