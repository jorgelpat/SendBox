import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


const Login = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita la recarga de la página
        navigate("/");
    };

    return (

        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <input type="text" placeholder="Usuario" />
            <input type="password" placeholder="Contraseña" />

            <button type="submit">
                {/* Entra directamente a home */}
                <Link to="/home">Ingresar</Link>
            </button>

            <Link to="/v1/password-resets">¿Olvidaste tu Contraseña?</Link>
        </form>

    );
};

export default Login;