import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { login } from "../auth/api";
import { loginSchema } from "../validations/loginSchema";

export default function LoginPage() {
    const [showPass, setShowPass] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: { email: "admin@demo.com", password: "Admin1234" },
        mode: "onBlur",
    });

    async function onSubmit(values) {
        try {
        await login(values.email, values.password);
        window.location.href = "/";
        } catch (err) {
        setError("root", { message: err?.message || "Credenciales inválidas" });
        }
    }

    return (
        <div className="auth-container">
        <div className="form-card">
            <h2 className="form-title">Login</h2>
            <p className="form-subtitle">Ingresá con tu cuenta</p>

            {errors.root && <div className="form-error">{errors.root.message}</div>}

            <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
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

            {/* Password + mostrar/ocultar */}
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
                >
                    {showPass ? "Ocultar" : "Mostrar"}
                </button>
                </div>
                <div className="help-line">
                {errors.password && errors.password.message}
                </div>
            </div>

            <button type="submit" className="btn" disabled={isSubmitting}>
                {isSubmitting ? "Ingresando…" : "Ingresar"}
            </button>

            <div className="form-footer">
                ¿No tenés cuenta? <a href="/register">Registrate</a>
            </div>
            </form>
        </div>
        </div>
    );
}
