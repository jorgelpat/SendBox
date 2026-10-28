import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiSearch,
  FiEye,
  FiMoreVertical,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import Sidebar from "../../components/Sidebar/Sidebar";

import "./Couriers.css";

type Courier = {
  id: number;
  name: string;
  userActive: boolean;
  courierActive: boolean;
  activeShipments: number;
};

const couriersData: Courier[] = [
  {
    id: 1,
    name: "Luis Ramírez",
    userActive: true,
    courierActive: true,
    activeShipments: 2,
  },
  {
    id: 2,
    name: "María Torres",
    userActive: true,
    courierActive: true,
    activeShipments: 3,
  },
  {
    id: 3,
    name: "Andrés López",
    userActive: true,
    courierActive: true,
    activeShipments: 1,
  },
  {
    id: 4,
    name: "Daniel Castro",
    userActive: true,
    courierActive: false,
    activeShipments: 0,
  },
  {
    id: 5,
    name: "Sofía Herrera",
    userActive: false,
    courierActive: false,
    activeShipments: 0,
  },
  {
    id: 6,
    name: "Carlos Mendieta",
    userActive: true,
    courierActive: true,
    activeShipments: 1,
  },
  {
    id: 7,
    name: "Julián Ardila",
    userActive: true,
    courierActive: true,
    activeShipments: 0,
  },
  {
    id: 8,
    name: "Valentina Rojas",
    userActive: true,
    courierActive: true,
    activeShipments: 1,
  },
  {
    id: 9,
    name: "Esteban Martínez",
    userActive: true,
    courierActive: true,
    activeShipments: 3,
  },
  {
    id: 10,
    name: "Camila Salazar",
    userActive: true,
    courierActive: false,
    activeShipments: 0,
  },
  {
    id: 11,
    name: "Miguel Hernández",
    userActive: true,
    courierActive: true,
    activeShipments: 2,
  },
];

function Couriers() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const couriersPerPage = 10;

    const filteredCouriers = useMemo(() => {
        const text = search.trim().toLowerCase();

        if (!text) {
        return couriersData;
        }

        return couriersData.filter((courier) =>
        courier.name.toLowerCase().includes(text)
        );
    }, [search]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredCouriers.length / couriersPerPage)
    );

    const startIndex = (currentPage - 1) * couriersPerPage;
    const endIndex = startIndex + couriersPerPage;

    const visibleCouriers = filteredCouriers.slice(
        startIndex,
        endIndex
    );

    function handleSearch(value: string) {
        setSearch(value);
        setCurrentPage(1);
    }

    function handleViewCourier(courierId: number) {
        navigate(`/mensajeros/${courierId}`);
    }

    return (
        <div className="couriers-layout">

        <Sidebar />

        <main className="couriers-main">

            <header className="couriers-header">
            <div>
                <h1>Mensajeros</h1>

                <p>
                Consulta y administra el estado de los mensajeros
                registrados en el sistema.
                </p>
            </div>
            </header>

            <section className="couriers-content">

            <div className="couriers-search">

                <FiSearch />

                <input
                type="search"
                value={search}
                onChange={(event) =>
                    handleSearch(event.target.value)
                }
                placeholder="Buscar por nombre..."
                aria-label="Buscar mensajeros"
                />

            </div>

            <div className="couriers-table-container">

                <table className="couriers-table">

                <thead>
                    <tr>
                    <th>Nombre</th>
                    <th>Activo</th>
                    <th>Habilitado</th>
                    <th>Domicilios activos</th>
                    <th className="couriers-action-column">
                        Acción
                    </th>
                    </tr>
                </thead>

                <tbody>

                    {visibleCouriers.length > 0 ? (
                    visibleCouriers.map((courier) => (
                        <tr key={courier.id}>

                        <td className="courier-name">
                            {courier.name}
                        </td>

                        <td>
                            <span
                            className={
                                courier.userActive
                                ? "courier-badge badge-active"
                                : "courier-badge badge-inactive"
                            }
                            >
                            {courier.userActive
                                ? "Activo"
                                : "Inactivo"}
                            </span>
                        </td>

                        <td>
                            <span
                            className={
                                courier.courierActive
                                ? "courier-badge badge-enabled"
                                : "courier-badge badge-disabled"
                            }
                            >
                            {courier.courierActive
                                ? "Habilitado"
                                : "Deshabilitado"}
                            </span>
                        </td>

                        <td className="courier-shipments">
                            {courier.activeShipments} / 3
                        </td>

                        <td>
                            <div className="couriers-actions">

                            <button
                                type="button"
                                className="couriers-view-button"
                                onClick={() =>
                                handleViewCourier(courier.id)
                                }
                            >
                                <FiEye />
                                Ver
                            </button>

                            <button
                                type="button"
                                className="couriers-more-button"
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
                        className="couriers-empty"
                        >
                        No se encontraron mensajeros que coincidan
                        con la búsqueda.
                        </td>
                    </tr>
                    )}

                </tbody>

                </table>

            </div>

            <footer className="couriers-footer">

                <span>
                Mostrando{" "}
                {filteredCouriers.length === 0
                    ? 0
                    : startIndex + 1}
                {" - "}
                {Math.min(
                    endIndex,
                    filteredCouriers.length
                )}
                {" de "}
                {filteredCouriers.length} mensajeros
                </span>

                <div className="couriers-pagination">

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

export default Couriers;