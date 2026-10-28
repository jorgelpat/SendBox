import { useNavigate } from "react-router-dom";

import {
  FiChevronRight,
  FiPhone,
  FiInfo,
  FiSave,
} from "react-icons/fi";

import Sidebar from "../../../components/Sidebar/Sidebar";

import "./CreateClient.css";

function CreateClient() {
    const navigate = useNavigate()

    function handleCancel() {
        navigate("/clientes")
    }

    return (
        <div className="create-client-layout">

        <Sidebar />

        <main className="create-client-main">

            <div className="create-client-breadcrumb">
            <span>Clientes</span>
            <FiChevronRight />
            <span>Crear cliente</span>
            </div>

            <header className="create-client-header">
            <h1>Crear cliente</h1>

            <p>
                Registra un nuevo cliente en el sistema. Debe existir al menos un
                nombre o una razón social.
            </p>
            </header>

            <section className="create-client-card">

            <h2>Información general</h2>

            <form className="create-client-form">

                <div className="create-client-fields">

                <div className="form-field">
                    <label htmlFor="name">
                    Nombre
                    </label>

                    <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ej. Juan Pérez"
                    />

                    <small>
                    Nombre de la persona de contacto
                    (opcional si diligencia razón social).
                    </small>
                </div>

                <div className="form-field">
                    <label htmlFor="businessName">
                    Razón social
                    </label>

                    <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    placeholder="Ej. Empresa ABC S.A.S"
                    />

                    <small>
                    Nombre de la empresa
                    (opcional si diligencia nombre).
                    </small>
                </div>

                <div className="form-field">
                    <label htmlFor="phone">
                    Teléfono
                    </label>

                    <div className="phone-input">
                    <FiPhone />

                    <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Ej. 300 123 4567"
                    />
                    </div>

                    <small>
                    Número de contacto principal del cliente.
                    </small>
                </div>

                </div>

                <div className="create-client-info">
                <FiInfo />

                <div>
                    <strong>Importante</strong>

                    <p>
                    Debe existir al menos un nombre o una razón social
                    para registrar el cliente.
                    </p>
                </div>
                </div>

                <div className="create-client-actions">
                <button
                    type="button"
                    className="button-cancel"
                    onClick={handleCancel}
                >
                    Cancelar
                </button>

                <button
                    type="submit"
                    className="button-save"
                >
                    <FiSave />
                    Guardar cliente
                </button>
                </div>

            </form>

            </section>

        </main>

        </div>
    );
}

export default CreateClient;