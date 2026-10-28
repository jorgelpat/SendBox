import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiSearch,
  FiPlus,
  FiEye,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import Sidebar from "../../components/Sidebar/Sidebar";

import "./Shipments.css";

type ShipmentStatus =
  | "CREADO"
  | "ASIGNADO"
  | "RECOGIDO"
  | "ENTREGADO"
  | "CANCELADO";

type Shipment = {
  id: number;
  client: string;
  origin: string;
  destination: string;
  courier: string;
  status: ShipmentStatus;
};

const shipmentsData: Shipment[] = [
  {
    id: 1,
    client: "Juan Pérez",
    origin: "Calle 45 # 12-30, Bucaramanga",
    destination: "Carrera 27 # 18-44, Floridablanca",
    courier: "",
    status: "CREADO",
  },
  {
    id: 2,
    client: "Empresa ABC S.A.S",
    origin: "Carrera 15 # 28-10, Bucaramanga",
    destination: "Avenida 33 # 76-21, Bucaramanga",
    courier: "María Torres",
    status: "ASIGNADO",
  },
  {
    id: 3,
    client: "María González",
    origin: "Calle 70 # 9-15, Floridablanca",
    destination: "Calle 45 # 8-12, Bucaramanga",
    courier: "Carlos Mendieta",
    status: "ENTREGADO",
  },
  {
    id: 4,
    client: "Distribuciones del Norte",
    origin: "Zona Industrial, Bodega 4, Girón",
    destination: "Carrera 12 # 54-30, Bucaramanga",
    courier: "Andrés López",
    status: "RECOGIDO",
  },
  {
    id: 5,
    client: "Carlos Ramírez",
    origin: "Carrera 27 # 45-10, Floridablanca",
    destination: "Calle 18 # 9-45, Bucaramanga",
    courier: "",
    status: "CREADO",
  },
  {
    id: 6,
    client: "Alimentos y Más S.A.S",
    origin: "Calle 36 # 21-18, Bucaramanga",
    destination: "Carrera 15 # 22-60, Floridablanca",
    courier: "Daniel Castro",
    status: "ASIGNADO",
  },
  {
    id: 7,
    client: "Laura Torres",
    origin: "Calle 90 # 11-05, Bucaramanga",
    destination: "Carrera 36 # 18-44, Floridablanca",
    courier: "Sofía Herrera",
    status: "RECOGIDO",
  },
  {
    id: 8,
    client: "Ferretería El Constructor",
    origin: "Avenida 27 # 15-60, Bucaramanga",
    destination: "Calle 72 # 15-20, Bucaramanga",
    courier: "Luis Ramírez",
    status: "ENTREGADO",
  },
  {
    id: 9,
    client: "Andrés López",
    origin: "Carrera 19 # 40-22, Floridablanca",
    destination: "Carrera 12 # 33-18, Bucaramanga",
    courier: "",
    status: "CANCELADO",
  },
  {
    id: 10,
    client: "Tecnología Global LTDA",
    origin: "Calle 20 # 30-18, Bucaramanga",
    destination: "Avenida 33 # 76-21, Floridablanca",
    courier: "María Torres",
    status: "ASIGNADO",
  },
  {
    id: 11,
    client: "Panadería Central",
    origin: "Carrera 22 # 18-30, Bucaramanga",
    destination: "Calle 50 # 12-44, Girón",
    courier: "",
    status: "CREADO",
  },
  {
    id: 12,
    client: "Daniel Suárez",
    origin: "Calle 34 # 20-15, Bucaramanga",
    destination: "Carrera 8 # 15-42, Floridablanca",
    courier: "Carlos Mendieta",
    status: "ASIGNADO",
  },
];

function Shipments() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const shipmentsPerPage = 10;

  const filteredShipments = useMemo(() => {
    const text = search.trim().toLowerCase();

    if (!text) {
      return shipmentsData;
    }

    return shipmentsData.filter((shipment) => {
      return (
        shipment.client.toLowerCase().includes(text) ||
        shipment.origin.toLowerCase().includes(text) ||
        shipment.destination.toLowerCase().includes(text) ||
        shipment.courier.toLowerCase().includes(text) ||
        shipment.status.toLowerCase().includes(text) ||
        shipment.id.toString().includes(text)
      );
    });
  }, [search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredShipments.length / shipmentsPerPage)
  );

  const startIndex = (currentPage - 1) * shipmentsPerPage;
  const endIndex = startIndex + shipmentsPerPage;

  const visibleShipments = filteredShipments.slice(
    startIndex,
    endIndex
  );

  function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleCreateShipment() {
    navigate("/domicilios/crear");
  }

  function handleViewShipment(shipmentId: number) {
    navigate(`/domicilios/${shipmentId}`);
  }

  return (
    <div className="shipments-layout">

      <Sidebar />

      <main className="shipments-main">

        <header className="shipments-header">

          <div>
            <h1>Domicilios</h1>

            <p>
              Consulta y administra los domicilios registrados en el sistema.
            </p>
          </div>

          <button
            type="button"
            className="shipments-create-button"
            onClick={handleCreateShipment}
          >
            <FiPlus />
            Crear domicilio
          </button>

        </header>

        <section className="shipments-content">

          <div className="shipments-search">

            <FiSearch />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                handleSearch(event.target.value)
              }
              placeholder="Buscar por cliente, origen, destino, mensajero o estado..."
              aria-label="Buscar domicilios"
            />

          </div>

          <div className="shipments-table-container">

            <table className="shipments-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th>Mensajero</th>
                  <th>Estado</th>
                  <th className="shipments-action-column">
                    Acción
                  </th>
                </tr>
              </thead>

              <tbody>

                {visibleShipments.length > 0 ? (
                  visibleShipments.map((shipment) => (
                    <tr key={shipment.id}>

                      <td>
                        {shipment.id
                          .toString()
                          .padStart(3, "0")}
                      </td>

                      <td>{shipment.client}</td>

                      <td
                        className="shipment-address"
                        title={shipment.origin}
                      >
                        {shipment.origin}
                      </td>

                      <td
                        className="shipment-address"
                        title={shipment.destination}
                      >
                        {shipment.destination}
                      </td>

                      <td>
                        {shipment.courier || "-"}
                      </td>

                      <td>
                        <span
                          className={`shipment-status status-${shipment.status.toLowerCase()}`}
                        >
                          {shipment.status}
                        </span>
                      </td>

                      <td>
                        <div className="shipments-actions">

                          <button
                            type="button"
                            className="shipments-view-button"
                            onClick={() =>
                              handleViewShipment(shipment.id)
                            }
                          >
                            <FiEye />
                            Ver
                          </button>

                          <button
                            type="button"
                            className="shipments-more-button"
                            aria-label="Más opciones"
                          >
                            <FiMoreVertical />
                          </button>

                        </div>
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="shipments-empty"
                    >
                      No se encontraron domicilios que coincidan
                      con la búsqueda.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

          <footer className="shipments-footer">

            <span>
              Mostrando{" "}
              {filteredShipments.length === 0
                ? 0
                : startIndex + 1}
              {" - "}
              {Math.min(
                endIndex,
                filteredShipments.length
              )}
              {" de "}
              {filteredShipments.length} domicilios
            </span>

            <div className="shipments-pagination">

              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) => page - 1)
                }
              >
                <FiChevronLeft />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  className={
                    currentPage === page
                      ? "pagination-active"
                      : ""
                  }
                  onClick={() =>
                    setCurrentPage(page)
                  }
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) => page + 1)
                }
              >
                <FiChevronRight />
              </button>

            </div>

          </footer>

        </section>

      </main>

    </div>
  );
}

export default Shipments;