import * as yup from 'yup';

export const loginSchema = yup.object({
    email: yup
        .string()
        .trim()
        .required('El email es obligatorio')
        .email('Formato de email inválido'),
    password: yup
        .string()
        .required('La contraseña es obligatoria')
        .min(8, 'Mínimo 8 caracteres')
        .matches(/[A-Z]/, 'Debe incluir al menos 1 mayúscula')
        .matches(/\d/, 'Debe incluir al menos 1 número'),
});
