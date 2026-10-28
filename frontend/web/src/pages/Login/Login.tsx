import { FaUser, FaLock, FaEye } from "react-icons/fa";
import { FiBox } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

import "./Login.css";


function Login() {
    const navigate = useNavigate();

    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        navigate("/clientes")
    }

    return (
        <main className="login-page">
        <section className="login-card">

            <div className="login-brand">
            <FiBox className="login-logo"/>

            <h1>SendBox</h1>
            </div>

            <form className="login-form" onSubmit={handleLogin}>

            <div className="form-group">
                <label htmlFor="document">
                Usuario
                </label>

                <div className="input-container">
                <FaUser className="input-icon"/>

                <input
                    id="document"
                    name="document"
                    type="text"
                    placeholder="Ej. 1098765432"
                />
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="password">
                Contraseña
                </label>

                <div className="input-container">
                <FaLock className="input-icon"/>

                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Ingresa tu contraseña"
                />

                <button
                    className="password-toggle"
                    type="button"
                    aria-label="Mostrar contraseña"
                >
                    <FaEye className="input-icon"/>
                </button>
                </div>
            </div>

            <button
                className="login-button"
                type="submit"
            >
                Iniciar sesión
            </button>

            </form>

        </section>
        </main>
    );
}

export default Login;