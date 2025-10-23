import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { register as registerUser } from "../auth/api";
import { registerSchema } from "../validations/registerSchema";

export default function RegisterPage() {
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm({
        resolver: yupResolver(registerSchema),
        mode: "onBlur",
    });

    async function onSubmit(values) {
        try {
        await registerUser(values);
        window.location.href = "/login";
        } catch (err) {
        setError("root", { message: err?.message || "Error en el registro" });
        }
    }

    return (
        <div className="auth-container">
        <div className="form-card">
            <h2 className="form-title">Registro</h2>
            <p className="form-subtitle">Creá tu cuenta para continuar</p>

            {errors.root && <div className="form-error">{errors.root.message}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
            {/* Nombre */}
            <div className="form-group">
                <input
                placeholder="Nombre completo"
                {...register("name")}
                className={`input ${errors.name ? "input-error" : ""}`}
                aria-invalid={!!errors.name}
                />
                <div className="help-line">
                {errors.name && errors.name.message}
                </div>
            </div>

            {/* Email */}
            <div className="form-group">
                <input
                type="email"
                placeholder="Email"
                {...register("email")}
                className={`input ${errors.email ? "input-error" : ""}`}
                aria-invalid={!!errors.email}
                />
                <div className="help-line">
                {errors.email && errors.email.message}
                </div>
            </div>

            {/* Password */}
            <div className="form-group">
                <div className="field-row">
                <input
                    type={showPass ? "text" : "password"}
                    placeholder="Contraseña"
                    {...register("password")}
                    className={`input ${errors.password ? "input-error" : ""}`}
                    aria-invalid={!!errors.password}
                />
                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPass((v) => !v)}
                    aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                    {showPass ? "Ocultar" : "Mostrar"}
                </button>
                </div>
                <div className="help-line">
                {errors.password && errors.password.message}
                </div>
            </div>

            {/* Confirm Password */}
            <div className="form-group">
                <div className="field-row">
                <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Confirmar contraseña"
                    {...register("confirmPassword")}
                    className={`input ${errors.confirmPassword ? "input-error" : ""}`}
                    aria-invalid={!!errors.confirmPassword}
                />
                <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirm((v) => !v)}
                    aria-label={showConfirm ? "Ocultar confirmación" : "Mostrar confirmación"}
                >
                    {showConfirm ? "Ocultar" : "Mostrar"}
                </button>
                </div>
                <div className="help-line">
                {errors.confirmPassword && errors.confirmPassword.message}
                </div>
            </div>

            <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Registrando…" : "Registrarse"}
            </button>

            <div className="form-footer">
                ¿Ya tenés cuenta? <a href="/login">Iniciá sesión</a>
            </div>
            </form>
        </div>
        </div>
    );
}
