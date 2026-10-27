import logo from "../../assets/logo.png";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export const Login = () => {
    const { login, user, loading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [enviando, setEnviando] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setEnviando(true);

        try {
            await login(formData.email, formData.password);
            navigate("/admin", { replace: true });
        } catch (err) {
            console.error(err);
            setError("Correo o contraseña incorrectos.");
        } finally {
            setEnviando(false);
        }
    };

    if (loading) return null;
    if (user) return <Navigate to="/admin" replace />;

    return (
        <div className="login-page">
            <div className="login-brand">
                <img src={logo} alt="" />
                <span>Nexus Gear</span>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
                <p className="login-tag">Acceso administrador</p>
                <h1 className="login-title">Iniciar sesión</h1>
                <p className="login-subtitle">
                    Ingresá con tu cuenta para gestionar el catálogo.
                </p>

                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Correo electrónico" autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        aria-invalid={Boolean(error)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        aria-invalid={Boolean(error)}
                        required
                    />
                </div>

                {error && (
                    <p className="login-error" role="alert">
                        {error}
                    </p>
                )}

                <button className="login-btn" type="submit" disabled={enviando}>
                    {enviando ? "Ingresando..." : "Ingresar"}
                </button>
            </form>

            <Link className="login-back" to="/">
                ← Volver a la tienda
            </Link>
        </div>
    )
}
