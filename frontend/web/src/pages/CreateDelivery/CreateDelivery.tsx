import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

import styles from "./CreateDelivery.module.css"

interface CreateDeliveryForm {
    company: string;
    nameClient: string;
    courier: string;
    phone: string;
    pickup: string;
    dropoff: string;
};

const CreateDelivery = () => {

    const [form, setForm] = useState<CreateDeliveryForm>({
        company: "",
        nameClient: "",
        courier: "",
        phone: "",
        pickup: "",
        dropoff: ""
    });

    const [error, setError] = useState<string>("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // hay que evaluar que no sea necesario company si nameClient, o nameClient si company.
        // hay que evaluar que no sea necesario el mensajero
        if (
            !form.company.trim() || !form.nameClient.trim() || 
            !form.courier.trim() || !form.phone.trim() || 
            !form.pickup.trim() || !form.dropoff.trim()
        ) {
            setError("Debes completar todos los campos.");
            return;
        };

        setError("");

        // Mostrar los datos en la consola
        console.log("Empresa:", form.company)
        console.log("Nombre Cliente:", form.nameClient)
        console.log("Mensajero:", form.courier)
        console.log("Teléfono:", form.phone)
        console.log("Recoger en:", form.pickup)
        console.log("Entregar en:", form.dropoff)

    };


    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h2>Crear Domicilio</h2>


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
                <label htmlFor="nameClient">Nombre Cliente:</label>
                <input
                    id="nameClient"
                    name="nameClient"
                    type="text"
                    placeholder="Nombre Cliente"
                    value={form.nameClient}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.formRow}>
                <label htmlFor="courier">Mensajero:</label>
                <input
                    id="courier"
                    name="courier"
                    type="text"
                    placeholder="Mensajero"
                    value={form.courier}
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
                <label htmlFor="pickup">Dirección Recogida:</label>
                <input
                    id="pickup"
                    name="pickup"
                    type="text"
                    placeholder="Dirección Recogida"
                    value={form.pickup}
                    onChange={handleChange}
                />
            </div>

            <div className={styles.formRow}>
                <label htmlFor="dropoff">Dirección Entrega:</label>
                <input
                    id="dropoff"
                    name="dropoff"
                    type="text"
                    placeholder="Dirección Entrega"
                    value={form.dropoff}
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

export default CreateDelivery