import prisma from '../prisma';
import bcrypt from 'bcrypt';

type CreateUserRequest = { email: string; password: string; name: string; role?: 'USER'|'ADMIN' };
type UpdateUserRequest = Partial<CreateUserRequest>;

export async function getAllUsers(limit = 10) {
    const users = await prisma.user.findMany({
        orderBy: { id: 'asc' },
        take: limit
    });
    return users.map(({password, ...u}) => u);
}

export async function getUserById(id: number) {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) { const e:any=new Error('Usuario no encontrado'); e.statusCode=404; throw e; }
    const { password, ...u } = user; return u;
}

export async function createUser(data: CreateUserRequest) {
    const exists = await prisma.user.findUnique({ where: { email: data.email } });
    if (exists) { const e:any=new Error('Email ya registrado'); e.statusCode=409; throw e; }
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({ data: { ...data, password: hashed } });
    const { password, ...u } = user; return u;
}

export async function updateUser(id: number, data: UpdateUserRequest) {
    const patch:any = { ...data };
    if (data.password) patch.password = await bcrypt.hash(data.password, 10);
    else delete patch.password;

    try {
        const user = await prisma.user.update({ where: { id }, data: patch });
        const { password, ...u } = user; return u;
    } catch (e:any) {
        if (e.code === 'P2025') { const err:any=new Error('Usuario no encontrado'); err.statusCode=404; throw err; }
        throw e;
    }
}

export async function deleteUser(id: number) {
    try {
        await prisma.user.delete({ where: { id } });
    } catch (e:any) {
        if (e.code === 'P2025') { const err:any=new Error('Usuario no encontrado'); err.statusCode=404; throw err; }
        throw e;
    }
}
