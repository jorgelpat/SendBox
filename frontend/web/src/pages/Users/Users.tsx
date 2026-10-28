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

import "./Users.css";

type UserRole =
  | "ADMIN"
  | "OPERADOR"
  | "MENSAJERO";

type User = {
  id: number;
  name: string;
  document: string;
  role: UserRole;
  active: boolean;
};

const usersData: User[] = [
  {
    id: 1,
    name: "Jorge Patiño",
    document: "1.098.765.432",
    role: "ADMIN",
    active: true,
  },
  {
    id: 2,
    name: "Laura Gómez",
    document: "1.045.678.901",
    role: "OPERADOR",
    active: true,
  },
  {
    id: 3,
    name: "Luis Ramírez",
    document: "1.102.334.556",
    role: "MENSAJERO",
    active: true,
  },
  {
    id: 4,
    name: "María Torres",
    document: "1.036.778.990",
    role: "MENSAJERO",
    active: true,
  },
  {
    id: 5,
    name: "Andrés López",
    document: "1.075.889.221",
    role: "MENSAJERO",
    active: true,
  },
  {
    id: 6,
    name: "Daniel Castro",
    document: "1.092.334.110",
    role: "MENSAJERO",
    active: false,
  },
  {
    id: 7,
    name: "Sofía Herrera",
    document: "1.080.445.667",
    role: "MENSAJERO",
    active: true,
  },
  {
    id: 8,
    name: "Carlos Mendieta",
    document: "1.034.556.778",
    role: "MENSAJERO",
    active: true,
  },
  {
    id: 9,
    name: "Valentina Rojas",
    document: "1.089.223.445",
    role: "ADMIN",
    active: true,
  },
  {
    id: 10,
    name: "Esteban Martínez",
    document: "1.076.889.900",
    role: "MENSAJERO",
    active: false,
  },
  {
    id: 11,
    name: "Camila Salazar",
    document: "1.067.445.332",
    role: "OPERADOR",
    active: true,
  },
];

function Users() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const usersPerPage = 10;

  const filteredUsers = useMemo(() => {
    const text = search.trim().toLowerCase();

    if (!text) {
      return usersData;
    }

    return usersData.filter((user) => {
      return (
        user.name.toLowerCase().includes(text) ||
        user.document.toLowerCase().includes(text) ||
        user.role.toLowerCase().includes(text) ||
        (user.active ? "activo" : "inactivo").includes(text)
      );
    });
  }, [search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredUsers.length / usersPerPage)
  );

  const startIndex =
    (currentPage - 1) * usersPerPage;

  const endIndex =
    startIndex + usersPerPage;

  const visibleUsers =
    filteredUsers.slice(
      startIndex,
      endIndex
    );

  function handleSearch(value: string) {
    setSearch(value);
    setCurrentPage(1);
  }

  function handleCreateUser() {
    navigate("/usuarios/crear");
  }

  function handleViewUser(userId: number) {
    navigate(`/usuarios/${userId}`);
  }

  return (
    <div className="users-layout">

      <Sidebar />

      <main className="users-main">

        <header className="users-header">

          <div>
            <h1>Usuarios</h1>

            <p>
              Consulta y administra los usuarios
              registrados en el sistema.
            </p>
          </div>

          <button
            type="button"
            className="users-create-button"
            onClick={handleCreateUser}
          >
            <FiPlus />
            Crear usuario
          </button>

        </header>

        <section className="users-content">

          <div className="users-search">

            <FiSearch />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                handleSearch(
                  event.target.value
                )
              }
              placeholder="Buscar por nombre, documento, rol o estado..."
              aria-label="Buscar usuarios"
            />

          </div>

          <div className="users-table-container">

            <table className="users-table">

              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Documento</th>
                  <th>Rol</th>
                  <th>Activo</th>
                  <th className="users-action-column">
                    Acción
                  </th>
                </tr>
              </thead>

              <tbody>

                {visibleUsers.length > 0 ? (
                  visibleUsers.map((user) => (
                    <tr key={user.id}>

                      <td>
                        {user.id
                          .toString()
                          .padStart(3, "0")}
                      </td>

                      <td className="user-name">
                        {user.name}
                      </td>

                      <td>
                        {user.document}
                      </td>

                      <td>
                        <span
                          className={`user-role role-${user.role.toLowerCase()}`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td>
                        <span
                          className={
                            user.active
                              ? "user-status status-active"
                              : "user-status status-inactive"
                          }
                        >
                          {user.active
                            ? "Activo"
                            : "Inactivo"}
                        </span>
                      </td>

                      <td>
                        <div className="users-actions">

                          <button
                            type="button"
                            className="users-view-button"
                            onClick={() =>
                              handleViewUser(
                                user.id
                              )
                            }
                          >
                            <FiEye />
                            Ver
                          </button>

                          <button
                            type="button"
                            className="users-more-button"
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
                      colSpan={6}
                      className="users-empty"
                    >
                      No se encontraron usuarios
                      que coincidan con la búsqueda.
                    </td>
                  </tr>
                )}

              </tbody>

            </table>

          </div>

          <footer className="users-footer">

            <span>
              Mostrando{" "}
              {filteredUsers.length === 0
                ? 0
                : startIndex + 1}
              {" - "}
              {Math.min(
                endIndex,
                filteredUsers.length
              )}
              {" de "}
              {filteredUsers.length} usuarios
            </span>

            <div className="users-pagination">

              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(
                    (page) => page - 1
                  )
                }
              >
                <FiChevronLeft />
              </button>

              {Array.from(
                {
                  length: totalPages,
                },
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
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(
                    (page) => page + 1
                  )
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

export default Users;