jest.mock('../prisma', () => ({
    __esModule: true,
    default: {
        user: {
        findUnique: jest.fn(),
        create: jest.fn(),
        },
    },
    }));

    jest.mock('jsonwebtoken', () => ({
    __esModule: true,
    default: {
        sign: jest.fn(() => 'fake.jwt.token'),
    },
    sign: jest.fn(() => 'fake.jwt.token'),
    }));

    jest.mock('bcryptjs', () => {
    const mock = {
        hash: jest.fn(async (pwd: string, _salt: number) => `hashed:${pwd}`),
        compare: jest.fn(async (plain: string, hashed: string) => hashed === `hashed:${plain}`),
    };
    return {
        __esModule: true,
        default: mock,
        hash: mock.hash,
        compare: mock.compare,
    };
    });

    import prisma from '../prisma';
    import jwt from 'jsonwebtoken';
    import bcrypt from 'bcryptjs';
    import { register, login } from './auth.service';

    const mockedPrisma = prisma as unknown as {
    user: { findUnique: jest.Mock; create: jest.Mock };
    };
    const mockedJwt = jwt as unknown as { sign: jest.Mock };
    const mockedBcrypt = bcrypt as unknown as { hash: jest.Mock; compare: jest.Mock };

    describe('AuthService', () => {
    const mockUser = {
        id: 1,
        email: 'admin@demo.com',
        name: 'Admin',
        password: 'hashed:Admin1234',
        role: 'USER',
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // TEST 1: register OK 
    test('register crea usuario y devuelve { token, user }', async () => {
        mockedPrisma.user.findUnique.mockResolvedValueOnce(null);
        mockedPrisma.user.create.mockResolvedValueOnce({
        id: 1, name: 'Admin', email: 'admin@demo.com', role: 'USER',
        });

        const result = await register({
        email: 'admin@demo.com',
        password: 'Admin1234',
        name: 'Admin',
        } as any);

        expect(mockedPrisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'admin@demo.com' } });
        expect(mockedPrisma.user.create).toHaveBeenCalled();
        expect(result).toEqual({
        token: 'fake.jwt.token',
        user: { id: 1, name: 'Admin', email: 'admin@demo.com', role: 'USER' },
        });
    });

    // TEST 2: usuario no existe -> "Credenciales inválidas"
    test('login lanza "Credenciales inválidas" si el usuario no existe', async () => {
        mockedPrisma.user.findUnique.mockResolvedValueOnce(null);
        await expect(
        login({ email: 'noexiste@demo.com', password: 'x' } as any)
        ).rejects.toThrow('Credenciales inválidas');
    });

    // TEST 3: contraseña incorrecta -> "Credenciales inválidas"
    test('login lanza "Credenciales inválidas" si la contraseña es incorrecta', async () => {
        mockedPrisma.user.findUnique.mockResolvedValueOnce({ ...mockUser, password: 'hashed:otra' });
        mockedBcrypt.compare.mockResolvedValue(false);
        await expect(
        login({ email: 'admin@demo.com', password: 'Admin1234' } as any)
        ).rejects.toThrow('Credenciales inválidas');
    });
});
