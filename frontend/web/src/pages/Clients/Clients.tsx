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

import "./Clients.css";


type Client = {
  id: number;
  name: string;
  businessName: string;
  phone: string;
  address: string;
};

const clientsData: Client[] = [
  {
    id: 1,
    name: "Juan Pérez",
    businessName: "",
    phone: "300 123 4567",
    address: "Calle 72 # 15-20",
  },
  {
    id: 2,
    name: "Empresa ABC",
    businessName: "Empresa ABC S.A.S",
    phone: "310 987 6543",
    address: "Carrera 27 # 45-10",
  },
  {
    id: 3,
    name: "María González",
    businessName: "",
    phone: "322 765 4321",
    address: "Calle 45 # 8-12",
  },
  {
    id: 4,
    name: "Distribuciones del Norte",
    businessName: "Distribuciones del Norte LTDA",
    phone: "318 444 3322",
    address: "Avenida 33 # 76-21",
  },
  {
    id: 5,
    name: "Carlos Ramírez",
    businessName: "",
    phone: "301 555 7788",
    address: "Carrera 12 # 54-30",
  },
  {
    id: 6,
    name: "Alimentos y Más",
    businessName: "Alimentos y Más S.A.S",
    phone: "320 111 2233",
    address: "Calle 18 # 9-45",
  },
  {
    id: 7,
    name: "Laura Torres",
    businessName: "",
    phone: "317 888 9900",
    address: "Carrera 45 # 22-10",
  },
  {
    id: 8,
    name: "Ferretería El Constructor",
    businessName: "El Constructor S.A.S",
    phone: "310 666 4433",
    address: "Avenida 27 # 15-60",
  },
  {
    id: 9,
    name: "Andrés López",
    businessName: "",
    phone: "323 222 7766",
    address: "Calle 90 # 11-05",
  },
  {
    id: 10,
    name: "Tecnología Global",
    businessName: "Tecnología Global LTDA",
    phone: "304 999 8811",
    address: "Carrera 36 # 18-44",
  },
  {
    id: 11,
    name: "Panadería Central",
    businessName: "Panadería Central S.A.S",
    phone: "315 443 2211",
    address: "Calle 20 # 30-18",
  },
  {
    id: 12,
    name: "Daniel Suárez",
    businessName: "",
    phone: "316 552 1177",
    address: "Carrera 19 # 40-22",
  },
];

function Clients() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const clientsPerPage = 10;

    const filteredClients = useMemo(() => {
        const text = search.trim().toLowerCase();

        if (!text) {
        return clientsData;
        }

        return clientsData.filter((client) => {
        return (
            client.name.toLowerCase().includes(text) ||
            client.businessName.toLowerCase().includes(text) ||
            client.phone.toLowerCase().includes(text) ||
            client.address.toLowerCase().includes(text)
        );
        });
    }, [search]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredClients.length / clientsPerPage)
    );

    const startIndex = (currentPage - 1) * clientsPerPage;
    const endIndex = startIndex + clientsPerPage;

    const visibleClients = filteredClients.slice(
        startIndex,
        endIndex
    );

    function handleSearch(value: string) {
        setSearch(value);
        setCurrentPage(1);
    }

    function handleCreateClient() {
        navigate("/clientes/crear");
    }

    function handleViewClient(clientId: number) {
        window.location.href = `/clientes/${clientId}`;
    }

    return (
        <div className="clients-layout">

        <Sidebar />

        <main className="clients-main">

            <header className="clients-header">
            <div>
                <h1>Clientes</h1>

                <p>
                Consulta y administra los clientes registrados en el sistema.
                </p>
            </div>

            <button
                type="button"
                className="clients-create-button"
                onClick={handleCreateClient}
            >
                <FiPlus />
                Crear cliente
            </button>
            </header>

            <section className="clients-content">

            <div className="clients-search">
                <FiSearch />

                <input
                type="search"
                value={search}
                onChange={(event) =>
                    handleSearch(event.target.value)
                }
                placeholder="Buscar por nombre, razón social, teléfono o dirección..."
                aria-label="Buscar clientes"
                />
            </div>

            <div className="clients-table-container">

                <table className="clients-table">

                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Razón social</th>
                    <th>Teléfono</th>
                    <th>Dirección</th>
                    <th className="clients-action-column">
                        Acción
                    </th>
                    </tr>
                </thead>

                <tbody>

                    {visibleClients.length > 0 ? (
                    visibleClients.map((client) => (
                        <tr key={client.id}>

                        <td>{client.name}</td>

                        <td>
                            {client.businessName || "-"}
                        </td>

                        <td>{client.phone}</td>

                        <td>{client.address}</td>

                        <td>
                            <div className="clients-actions">

                            <button
                                type="button"
                                className="clients-view-button"
                                onClick={() =>
                                handleViewClient(client.id)
                                }
                            >
                                <FiEye />
                                Ver
                            </button>

                            <button
                                type="button"
                                className="clients-more-button"
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
                        colSpan={5}
                        className="clients-empty"
                        >
                        No se encontraron clientes que coincidan
                        con la búsqueda.
                        </td>
                    </tr>
                    )}

                </tbody>

                </table>

            </div>

            <footer className="clients-footer">

                <span>
                Mostrando{" "}
                {filteredClients.length === 0
                    ? 0
                    : startIndex + 1}
                {" - "}
                {Math.min(
                    endIndex,
                    filteredClients.length
                )}
                {" de "}
                {filteredClients.length} clientes
                </span>

                <div className="clients-pagination">

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

export default Clients;