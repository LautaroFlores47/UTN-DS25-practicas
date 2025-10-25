// backend/src/services/book.service.test.ts
import { getBookById } from './book.service';

jest.mock('../prisma', () => ({
    __esModule: true,
    default: {
        book: {
        findUnique: jest.fn(),
        },
    },
    }));
    import prisma from '../prisma';

    describe('BookService - getBookById', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('debe retornar un libro cuando existe', async () => {
        const mockBook = { id: 1, title: '1984', author: { name: 'Orwell' }, categories: [] };
        (prisma.book.findUnique as jest.Mock).mockResolvedValueOnce(mockBook);

        const result = await getBookById(1);

        expect(result).toEqual(mockBook);
        expect(prisma.book.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { author: true, categories: true },
        });
    });

    test('debe lanzar error 404 cuando no existe', async () => {
        (prisma.book.findUnique as jest.Mock).mockResolvedValueOnce(null);
        await expect(getBookById(999)).rejects.toThrow('Libro no encontrado');
    });
});
