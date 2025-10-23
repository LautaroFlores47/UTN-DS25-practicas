import prisma from '../prisma';

export async function getAllBooks(filters?: { category?: string; q?: string }) {
    const where: any = {};

    if (filters?.category) {
        where.categories = {
        some: {
            name: { equals: filters.category, mode: 'insensitive' } // Terror / terror
        }
        };
    }

    if (filters?.q) {
        // búsqueda por título (opcional)
        where.title = { contains: filters.q, mode: 'insensitive' };
    }

    return prisma.book.findMany({
        where,
        include: { author: true, categories: true },
        orderBy: { id: 'asc' }
    });
}

    export async function getBookById(id: number) {
    const book = await prisma.book.findUnique({
        where: { id },
        include: { author: true, categories: true }
    });
    if (!book) {
        const err: any = new Error('Libro no encontrado');
        err.statusCode = 404;
        throw err;
    }
    return book;
    }

    type CreateBookInput = {
    title: string;
    price: number;
    stock: number;
    imageUrl?: string;
    authorId?: number;
    authorName?: string;
    categoryIds?: number[];
    categoryNames?: string[];
    };

    export async function createBook(data: CreateBookInput) {
    let authorId: number | undefined;

    if (data.authorId) {
        const author = await prisma.author.findUnique({ where: { id: data.authorId } });
        if (!author) {
        const err: any = new Error('El autor no existe');
        err.statusCode = 404;
        throw err;
        }
        authorId = author.id;
    } else if (data.authorName) {
        let author = await prisma.author.findFirst({ where: { name: data.authorName } });
        if (!author) author = await prisma.author.create({ data: { name: data.authorName } });
        authorId = author.id;
    } else {
        const err: any = new Error('Debes enviar authorId o authorName');
        err.statusCode = 400;
        throw err;
    }

    let categoriesConnect: { id: number }[] | undefined;
    if (data.categoryIds?.length) {
        categoriesConnect = data.categoryIds.map((id) => ({ id }));
    } else if (data.categoryNames?.length) {
        const ids: number[] = [];
        for (const name of data.categoryNames) {
        let cat = await prisma.category.findFirst({ where: { name } });
        if (!cat) cat = await prisma.category.create({ data: { name } });
        ids.push(cat.id);
        }
        categoriesConnect = ids.map((id) => ({ id }));
    }

    return prisma.book.create({
        data: {
        title: data.title,
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl,
        author: { connect: { id: authorId } },
        ...(categoriesConnect ? { categories: { connect: categoriesConnect } } : {})
        },
        include: { author: true, categories: true }
    });
}

type UpdateBookInput = Partial<CreateBookInput>;

export async function updateBook(id: number, data: UpdateBookInput) {
    let authorOps: any = {};
    if (data.authorId) {
        const author = await prisma.author.findUnique({ where: { id: data.authorId } });
        if (!author) {
        const err: any = new Error('El autor no existe');
        err.statusCode = 404;
        throw err;
        }
        authorOps = { author: { connect: { id: data.authorId } } };
    } else if (data.authorName) {
        let author = await prisma.author.findFirst({ where: { name: data.authorName } });
        if (!author) author = await prisma.author.create({ data: { name: data.authorName } });
        authorOps = { author: { connect: { id: author.id } } };
    }

    let categoriesOps: any = {};
    if (data.categoryIds) {
        categoriesOps = {
        categories: {
            set: [],
            connect: data.categoryIds.map((id) => ({ id }))
        }
        };
    } else if (data.categoryNames) {
        const ids: number[] = [];
        for (const name of data.categoryNames) {
        let cat = await prisma.category.findFirst({ where: { name } });
        if (!cat) cat = await prisma.category.create({ data: { name } });
        ids.push(cat.id);
        }
        categoriesOps = {
        categories: {
            set: [],
            connect: ids.map((id) => ({ id }))
        }
        };
    }

    try {
        return await prisma.book.update({
        where: { id },
        data: {
            title: data.title,
            price: data.price,
            stock: data.stock,
            imageUrl: data.imageUrl,
            ...authorOps,
            ...categoriesOps
        },
        include: { author: true, categories: true }
        });
    } catch (e: any) {
        if (e.code === 'P2025') {
        const err: any = new Error('Libro no encontrado');
        err.statusCode = 404;
        throw err;
        }
        throw e;
    }
}

export async function deleteBook(id: number) {
    try {
        await prisma.book.delete({ where: { id } });
    } catch (e: any) {
        if (e.code === 'P2025') {
        const err: any = new Error('Libro no encontrado');
        err.statusCode = 404;
        throw err;
        }
        throw e;
    }
}
