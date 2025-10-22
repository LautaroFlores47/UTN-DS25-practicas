import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Email inválido').toLowerCase().trim(),
    password: z.string().min(1, 'Password requerido')
});

export const registerSchema = z.object({
    email: z.string().email('Email inválido').toLowerCase().trim(),
    password: z.string()
        .min(8, 'Mínimo 8 caracteres')
        .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
        .regex(/[0-9]/, 'Debe contener al menos un número'),
    name: z.string().min(2, 'Mínimo 2 caracteres').max(50).trim()
});
