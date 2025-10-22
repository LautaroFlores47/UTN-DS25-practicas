import { z } from 'zod';

export const createBookSchema = z.object({
    title: z.string().min(1).max(200).trim(),

    price: z.coerce.number().positive().max(999999),
    stock: z.coerce.number().int().min(0).default(0),

    authorId: z.coerce.number().int().positive().optional(),
    authorName: z.string().min(1).max(120).optional(),

    categoryIds: z.array(z.coerce.number().int().positive()).optional(),
    categoryNames: z.array(z.string().min(1)).optional(),

    imageUrl: z.string().min(1).optional()
})
.refine(d => !!d.authorId || !!d.authorName, {
    message: 'Debes enviar authorId o authorName',
    path: ['author']
})
.refine(d => !(d.categoryIds && d.categoryNames), {
    message: 'Usá categoryIds o categoryNames, no ambos',
    path: ['categories']
});

export const updateBookSchema = createBookSchema.partial();
