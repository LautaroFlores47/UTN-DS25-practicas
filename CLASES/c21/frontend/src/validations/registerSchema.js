// src/validations/registerSchema.js
import * as yup from "yup";

export const registerSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required("El nombre es obligatorio")
        .min(2, "Debe tener al menos 2 caracteres")
        .max(50, "Máximo 50 caracteres"),

    email: yup
        .string()
        .trim()
        .required("El email es obligatorio")
        .email("Formato de email inválido"),

    password: yup
        .string()
        .required("La contraseña es obligatoria")
        .min(8, "Debe tener al menos 8 caracteres")
        .matches(/[A-Z]/, "Debe incluir una mayúscula")
        .matches(/\d/, "Debe incluir un número"),

    confirmPassword: yup
        .string()
        .required("Debe confirmar la contraseña")
        .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden"),
});
