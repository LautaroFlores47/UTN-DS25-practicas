import { Request, Response, NextFunction } from 'express';
import * as bookService from '../services/book.service';

export async function getAllBooks(req: Request, res: Response, next: NextFunction) {
    try {
        const category =
        typeof req.query.category === 'string' ? req.query.category :
        typeof req.query.cat === 'string' ? req.query.cat :
        typeof req.query.categoryName === 'string' ? req.query.categoryName :
        undefined;

        const q = typeof req.query.q === 'string' ? req.query.q : undefined;

        const books = await bookService.getAllBooks({ category, q });
    
        const data = books.map(b => ({
        id: b.id,
        title: b.title,
        price: Number(b.price), 
        stock: b.stock,
        imageUrl: b.imageUrl ?? '',
        author: {
            id: b.author.id,
            name: b.author.name,
            nationality: b.author.nationality ?? ''
        },
        categories: b.categories, // por si el front usa el objeto completo
        categoryNames: b.categories.map(c => c.name) // por si el front filtra por string
        }));

        res.json({ success: true, data });
    } catch (err) { next(err); }
}


export async function getBookById(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const book = await bookService.getBookById(id);
        res.json({ success: true, data: book });
    } catch (err) { next(err); }
}

export async function createBook(req: Request, res: Response, next: NextFunction) {
    try {
        console.log('📝 BODY RECIBIDO EN POST /books:', req.body); // <--- DEBUG
        const book = await bookService.createBook(req.body as any);
        res.status(201).json({ success: true, message: 'Libro creado exitosamente', data: book });
    } catch (err) { next(err); }
}

export async function updateBook(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        const book = await bookService.updateBook(id, req.body as any);
        res.json({ success: true, message: 'Libro actualizado exitosamente', data: book });
    } catch (err) { next(err); }
}

export async function deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
        const id = Number(req.params.id);
        await bookService.deleteBook(id);
        res.json({ success: true, message: 'Libro eliminado exitosamente' });
    } catch (err) { next(err); }
}
