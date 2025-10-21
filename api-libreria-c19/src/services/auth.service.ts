import prisma from '../prisma';
import bcrypt from 'bcrypt';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

type LoginRequest = { email: string; password: string };
type RegisterRequest = { email: string; password: string; name: string };
type LoginData = { user: Omit<import('@prisma/client').User, 'password'>; token: string };

function makeToken(user: { id: number; email: string; role: 'USER'|'ADMIN' }) {
    const payload = { id: user.id, email: user.email, role: user.role };
    const secret: Secret = process.env.JWT_SECRET as string;

    const envExp = process.env.JWT_EXPIRES_IN ?? '2h';
    const expiresInNormalized: string | number = /^\d+$/.test(envExp) ? Number(envExp) : envExp;
    const options: SignOptions = { expiresIn: expiresInNormalized as any };

    return jwt.sign(payload, secret, options);
}

export async function login(data: LoginRequest): Promise<LoginData> {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    const invalid: any = new Error('Credenciales inválidas'); invalid.statusCode = 401;
    if (!user) throw invalid;

    const ok = await bcrypt.compare(data.password, user.password);
    if (!ok) throw invalid;

    const token = makeToken(user);
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
}

export async function register(data: RegisterRequest): Promise<LoginData> {
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) { const e:any=new Error('Email ya registrado'); e.statusCode=409; throw e; }

    const hashed = await bcrypt.hash(data.password, 10);
    // Fuerza role USER (no permitimos crear ADMIN desde formulario público)
    const user = await prisma.user.create({
        data: { email: data.email, password: hashed, name: data.name, role: 'USER' }
    });

    const token = makeToken(user);
    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
}
