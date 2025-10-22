import { Request, Response, NextFunction } from 'express';

export function normalizeBookPayload(req: Request, _res: Response, next: NextFunction) {
    const b: any = req.body ?? {};

    if (typeof b.category === 'string' && b.category.trim()) {
        b.categoryNames = Array.isArray(b.categoryNames) ? b.categoryNames : [];
        b.categoryNames.push(b.category.trim());
        delete b.category;
    }

    if (typeof b.author === 'string' && b.author.trim()) {
        b.authorName = b.author.trim();
        delete b.author;
    }

    if (b.price !== undefined)  b.price  = Number(b.price);
    if (b.stock !== undefined)  b.stock  = Number(b.stock);
    if (b.authorId !== undefined) b.authorId = Number(b.authorId);
    if (Array.isArray(b.categoryIds)) b.categoryIds = b.categoryIds.map(Number);

    req.body = b;
    next();
}
