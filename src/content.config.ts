import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Un archivo .md por producto en src/content/productos/ (modelo de datos: CLAUDE.md §4).
const productos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/productos' }),
  schema: z.object({
    codigo: z.string().regex(/^[A-Z]{3}-\d{3}$/),
    nombre: z.string(),
    categoria: z.enum(['recamaras', 'comedores', 'cocinas']),
    precio: z.number().nullable().optional(),
    precio_mayoreo: z.number().nullable().optional(), // Nunca se publica.
    disponible: z.boolean().default(true),
    destacado: z.boolean().default(false),
    medidas: z.string().optional(),
    material: z.string().optional(),
    colores: z.array(z.string()).default([]),
    descripcion: z.string(),
    fotos: z.array(z.string()).min(1),
    fecha_alta: z.coerce.date(),
  }),
});

export const collections = { productos };
