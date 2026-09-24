import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import styles from "./CreateClient.module.css"

interface CreateClientForm {
    company: string;
    name: string;
    phone: string;
    email: string;
    address: string;
};

const CreateClient = () => {

    const [form, setForm] = useState<CreateClientForm>({
        company: "",
        name: "",
        phone: "",
        email: "",
        address: ""
    });

    const [error, setError] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // hay que evaluar que no sea necesario company si name, o name si company, o ambos.
        if (
            !form.company.trim() || !form.name.trim() || 
            !form.phone.trim() || !form.email.trim() || 
            !form.address.trim()
        ) {
            setError("Debes completar todos los campos.");
            return;
        };

        setError("");

        // Mostrar los datos en la consola
        console.log("Empresa:", form.company)
        console.log("Nombre:", form.name)
        console.log("Teléfono:", form.phone)
        console.log("Email:", form.email)
        console.log("Dirección:", form.address)
    };

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h2>Crear Cliente</h2>


            <div className={styles.formRow}>
                <label htmlFor="company">Empresa:</label>
                <input
                    id="company"
                    name="company"
                    type="text"
                    placeholder="Empresa"
                    value={form.company}
                    onChange={handleChange}
                />
            </div>

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
                <label htmlFor="address">Dirección:</label>
                <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Dirección"
                    value={form.address}
                    onChange={handleChange}
                />
            </div>

            {error && <p role="alert" className={styles.error}>{error}</p>}

            <button type="submit" className={styles.submitButton}>
                Guardar
            </button>

        </form>
    );
    
};

export default CreateClient;

