import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiChevronRight,
  FiUser,
  FiMapPin,
  FiFlag,
  FiTruck,
  FiFileText,
  FiInfo,
  FiSave,
} from "react-icons/fi";

import Sidebar from "../../../components/Sidebar/Sidebar";

import "./CreateShipment.css";

function CreateShipment() {
  const navigate = useNavigate();

  const [clientId, setClientId] = useState("");
  const [courierId, setCourierId] = useState("");

  const [originName, setOriginName] = useState("");
  const [originAddress, setOriginAddress] = useState("");
  const [originPhone, setOriginPhone] = useState("");

  const [destinationName, setDestinationName] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [destinationPhone, setDestinationPhone] = useState("");

  const [description, setDescription] = useState("");

  function handleCancel() {
    navigate("/domicilios");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    /*
        Más adelante aquí enviaremos los datos
        al backend FastAPI.

        Por ahora solo simulamos el registro.
        */

    console.log({
      clientId,
      courierId,
      originName,
      originAddress,
      originPhone,
      destinationName,
      destinationAddress,
      destinationPhone,
      description,
    });

    navigate("/domicilios");
  }

  return (
    <div className="create-shipment-layout">
      <Sidebar />

      <main className="create-shipment-main">
        {/* Breadcrumb */}

        <div className="create-shipment-breadcrumb">
          <button type="button" onClick={() => navigate("/domicilios")}>
            Domicilios
          </button>

          <FiChevronRight />

          <span>Crear domicilio</span>
        </div>

        {/* Encabezado */}

        <header className="create-shipment-header">
          <h1>Crear domicilio</h1>

          <p>Registra un nuevo domicilio en el sistema.</p>
        </header>

        <form className="create-shipment-form" onSubmit={handleSubmit}>
          
          {/* CLIENTE */}
          <section className="shipment-section shipment-client-section">
            <div className="shipment-section-header">
              <FiUser />

              <div>
                <h2>Información del cliente</h2>

                <p>Selecciona el cliente que solicita el domicilio.</p>
              </div>
            </div>

            <div className="shipment-field">
              <label htmlFor="client">
                Cliente <span>*</span>
              </label>

              <select
                id="client"
                value={clientId}
                onChange={(event) => setClientId(event.target.value)}
                required
              >
                <option value="">Buscar y seleccionar un cliente...</option>

                <option value="1">Juan Pérez</option>

                <option value="2">Empresa ABC S.A.S</option>

                <option value="3">María González</option>

                <option value="4">Distribuciones del Norte</option>
              </select>
            </div>
          </section>

          {/* ORIGEN Y DESTINO */}

          <div className="shipment-two-columns">
            {/* ORIGEN */}

            <section className="shipment-section">
              <div className="shipment-section-header">
                <FiMapPin />

                <div>
                  <h2>Dirección de origen</h2>

                  <p>Información del lugar donde se recoge el paquete.</p>
                </div>
              </div>

              <div className="shipment-field">
                <label htmlFor="originName">
                  Nombre <span>*</span>
                </label>

                <input
                  id="originName"
                  type="text"
                  value={originName}
                  onChange={(event) => setOriginName(event.target.value)}
                  placeholder="Ej. Bodega principal"
                  required
                />
              </div>

              <div className="shipment-field">
                <label htmlFor="originAddress">
                  Dirección <span>*</span>
                </label>

                <input
                  id="originAddress"
                  type="text"
                  value={originAddress}
                  onChange={(event) => setOriginAddress(event.target.value)}
                  placeholder="Ej. Calle 45 # 12-30, Bucaramanga"
                  required
                />
              </div>

              <div className="shipment-field">
                <label htmlFor="originPhone">
                  Teléfono <span>*</span>
                </label>

                <input
                  id="originPhone"
                  type="tel"
                  value={originPhone}
                  onChange={(event) => setOriginPhone(event.target.value)}
                  placeholder="Ej. 300 123 4567"
                  required
                />
              </div>
            </section>

            {/* DESTINO */}

            <section className="shipment-section">
              <div className="shipment-section-header">
                <FiFlag />

                <div>
                  <h2>Dirección de destino</h2>

                  <p>Información del lugar donde se entrega el paquete.</p>
                </div>
              </div>

              <div className="shipment-field">
                <label htmlFor="destinationName">
                  Nombre <span>*</span>
                </label>

                <input
                  id="destinationName"
                  type="text"
                  value={destinationName}
                  onChange={(event) => setDestinationName(event.target.value)}
                  placeholder="Ej. María López"
                  required
                />
              </div>

              <div className="shipment-field">
                <label htmlFor="destinationAddress">
                  Dirección <span>*</span>
                </label>

                <input
                  id="destinationAddress"
                  type="text"
                  value={destinationAddress}
                  onChange={(event) =>
                    setDestinationAddress(event.target.value)
                  }
                  placeholder="Ej. Carrera 27 # 18-44, Floridablanca"
                  required
                />
              </div>

              <div className="shipment-field">
                <label htmlFor="destinationPhone">
                  Teléfono <span>*</span>
                </label>

                <input
                  id="destinationPhone"
                  type="tel"
                  value={destinationPhone}
                  onChange={(event) => setDestinationPhone(event.target.value)}
                  placeholder="Ej. 315 456 7890"
                  required
                />
              </div>
            </section>
          </div>

          {/* MENSAJERO + DESCRIPCIÓN */}

          <div className="shipment-two-columns">
            {/* MENSAJERO */}

            <section className="shipment-section">
              <div className="shipment-section-header">
                <FiTruck />

                <div>
                  <h2>Asignación de mensajero</h2>

                  <p>Puedes asignarlo ahora o dejar el domicilio disponible.</p>
                </div>
              </div>

              <div className="shipment-field">
                <label htmlFor="courier">Mensajero (opcional)</label>

                <select
                  id="courier"
                  value={courierId}
                  onChange={(event) => setCourierId(event.target.value)}
                >
                  <option value="">Sin asignar</option>

                  <option value="1">Luis Ramírez — 1/3 activos</option>

                  <option value="2">María Torres — 2/3 activos</option>

                  <option value="3">Andrés López — 1/3 activos</option>
                </select>
              </div>

              <div className="shipment-info">
                <FiInfo />

                <p>
                  Si no asignas un mensajero, el domicilio quedará en estado{" "}
                  <strong>CREADO</strong>.
                </p>
              </div>
            </section>

            {/* DESCRIPCIÓN */}

            <section className="shipment-section">
              <div className="shipment-section-header">
                <FiFileText />

                <div>
                  <h2>Información adicional</h2>

                  <p>Información relacionada con el servicio.</p>
                </div>
              </div>

              <div className="shipment-field">
                <label htmlFor="description">Descripción (opcional)</label>

                <textarea
                  id="description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Ej. Paquete pequeño, documentos, indicaciones para la recogida..."
                  maxLength={500}
                />

                <small>{description.length}/500</small>
              </div>
            </section>
          </div>

          {/* ACCIONES */}

          <div className="create-shipment-actions">
            <button
              type="button"
              className="shipment-cancel-button"
              onClick={handleCancel}
            >
              Cancelar
            </button>

            <button type="submit" className="shipment-save-button">
              <FiSave />
              Guardar domicilio
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateShipment;
