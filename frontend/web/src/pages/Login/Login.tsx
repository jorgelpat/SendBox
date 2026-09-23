import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import { IoLogoAndroid } from "react-icons/io";

import styles from "./Login.module.css"

interface LoginForm {
    username: string;
    password: string;
}


const Login = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState<LoginForm>({ username: "", password: "" });
    const [error, setError] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({ ...prev, [name]: value}));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Evita la recarga de la página

        // aquí se valida usuario y contraseña que no estén vacíos
        if (!form.username.trim() || !form.password.trim()) {
            setError("Debes completar usuario y contraseña.");
            return;
        }

        setError("");


        // Mostrar los datos en la consola
        console.log("Usuario:", form.username);
        console.log("Password:", form.password);

        navigate("/home")

    };

    return (

        <form onSubmit={handleSubmit} className={styles.formContainer} noValidate>
            <h1>Login</h1>

            <IoLogoAndroid title="Logo" className="logo"/>

            <label htmlFor="username" className={styles.srOnly}>Usuario</label>
            <input 
                id="username"
                name="username"
                type="text" 
                placeholder="Usuario" 
                value={form.username} 
                onChange={handleChange} 
            />

            <label htmlFor="password" className={styles.srOnly}>Contraseña</label>
            <input 
                id="password"
                name="password"
                type="password" 
                placeholder="Contraseña" 
                value={form.password} 
                onChange={handleChange} 
            />

            {error && <p role="alert" className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submitButton}>
                {/* Entra directamente a home */}
                Ingresar
            </button>

            <Link to="/v1/password-resets">¿Olvidaste tu Contraseña?</Link>
        </form>

    );
};

export default Login;