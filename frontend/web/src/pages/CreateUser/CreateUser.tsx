import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import styles from "./CreateUser.module.css"


interface CreateUserForm {
    name: string;
    lastname: string;
    document: string;
    phone: string;
    email: string;
    username: string;
    password: string;
    role: string;
}

const CreateUser = () => {

    const [form, setForm] = useState<CreateUserForm>({ 
        name: "", 
        lastname: "", 
        document: "", 
        phone: "", 
        email: "", 
        username: "", 
        password: "", 
        role:"" 
    });
        
    const [error, setError] = useState<string>("");

    // Usamos InputElement para los input del formulario y SelectElement para la lista
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            !form.name.trim() || !form.lastname.trim() || 
            !form.document.trim() || !form.phone.trim() || 
            !form.email.trim() || !form.username.trim() || 
            !form.password.trim() || !form.role.trim()
        ) {
            setError("Debes completar todos los campos.");
            return;
        }

        setError("");

        // Mostrar los datos en la consola
        console.log("Nombre:", form.name)
        console.log("Apellido:", form.lastname)
        console.log("Documento:", form.document)
        console.log("Teléfono:", form.phone)
        console.log("Email:", form.email)
        console.log("Usuario:", form.username)
        console.log("Password:", form.password)
        console.log("Rol:", form.role)
    }


    return (

        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h2>Crear Usuario</h2>


            <div className={styles.formRow}>
                <label htmlFor="name">Nombre:</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    value={form.name}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.formRow}>
                <label htmlFor="lastname">Apellido:</label>
                <input
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Apellido"
                    value={form.lastname}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.formRow}>
                <label htmlFor="document">Documento:</label>
                <input
                    id="document"
                    name="document"
                    type="text"
                    placeholder="Número de documento"
                    value={form.document}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.formRow}>
                <label htmlFor="phone">Teléfono:</label>
                <input
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="Número telefónico"
                    value={form.phone}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.formRow}>
                <label htmlFor="email">Correo:</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Correo electrónico"
                    value={form.email}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.formRow}>
                <label htmlFor="username">Usuario:</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="usuario"
                    value={form.username}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.formRow}>
                <label htmlFor="password">Contraseña:</label>
                <input
                    id="password"
                    name="password"
                    type="text"
                    placeholder="Contraseña"
                    value={form.password}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.formRow}>
                <label htmlFor="role">Rol:</label>
                <select
                    id="role"
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                >
                    <option value="">Selecciona un rol</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Operador">Operador</option>
                    <option value="Mensajero">Mensajero</option>
                </select>
            </div>

            {error && <p role="alert" className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submitButton}>
                Guardar
            </button>

        </form>
        
    )
};

export default CreateUser