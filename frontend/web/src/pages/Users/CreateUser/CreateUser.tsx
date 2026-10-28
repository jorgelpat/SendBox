import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FiChevronRight,
  FiUser,
  FiCreditCard,
  FiInfo,
  FiAlertTriangle,
  FiUserPlus,
} from "react-icons/fi";

import Sidebar from "../../../components/Sidebar/Sidebar";

import "./CreateUser.css";

type UserRole = "" | "ADMIN" | "OPERADOR" | "MENSAJERO";

function CreateUser() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [document, setDocument] = useState("");
  const [role, setRole] = useState<UserRole>("");

  function handleCancel() {
    navigate("/usuarios");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newUser = {
      name,
      document,
      role,
    };

    /*
      Más adelante aquí enviaremos
      los datos al backend FastAPI.

      El backend se encargará de:

      - Crear el usuario.
      - Crear la contraseña inicial.
      - Guardarla como hash.
      - Asignar el rol.
      - Crear el perfil courier si
        el rol es MENSAJERO.
      - Crear el usuario inicialmente activo.
    */

    console.log(newUser);

    navigate("/usuarios");
  }

  return (
    <div className="create-user-layout">
      <Sidebar />

      <main className="create-user-main">
        {/* Breadcrumb */}
        <div className="create-user-breadcrumb">
          <button
            type="button"
            onClick={() => navigate("/usuarios")}
          >
            Usuarios
          </button>

          <FiChevronRight />

          <span>Crear usuario</span>
        </div>

        {/* Encabezado */}
        <header className="create-user-header">
          <h1>Crear usuario</h1>

          <p>
            Registra un nuevo usuario en el sistema. Selecciona el rol
            correspondiente según sus responsabilidades.
          </p>
        </header>

        {/* Formulario */}
        <form
          className="create-user-card"
          onSubmit={handleSubmit}
        >
          <h2>Información del usuario</h2>

          <div className="create-user-fields">
            {/* Nombre */}
            <div className="create-user-field">
              <label htmlFor="name">
                Nombre completo <span>*</span>
              </label>

              <div className="create-user-input">
                <FiUser />

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Ej. Ana María López"
                  required
                />
              </div>

              <small>
                Nombre completo de la persona.
              </small>
            </div>

            {/* Documento */}
            <div className="create-user-field">
              <label htmlFor="document">
                Documento <span>*</span>
              </label>

              <div className="create-user-input">
                <FiCreditCard />

                <input
                  id="document"
                  type="text"
                  value={document}
                  onChange={(event) =>
                    setDocument(event.target.value)
                  }
                  placeholder="Ej. 1098723456"
                  required
                />
              </div>

              <small>
                Número de documento de identidad.
              </small>
            </div>

            {/* Rol */}
            <div className="create-user-field role-field">
              <label htmlFor="role">
                Rol <span>*</span>
              </label>

              <select
                id="role"
                value={role}
                onChange={(event) =>
                  setRole(event.target.value as UserRole)
                }
                required
              >
                <option value="">
                  Seleccionar rol
                </option>

                <option value="ADMIN">
                  Administrador
                </option>

                <option value="OPERADOR">
                  Operador
                </option>

                <option value="MENSAJERO">
                  Mensajero
                </option>
              </select>

              <small>
                Define el rol que tendrá el usuario en el sistema.
              </small>
            </div>
          </div>

          {/* Información de roles */}
          <div className="create-user-alert role-information">
            <FiInfo />

            <div>
              <strong>
                Información sobre roles
              </strong>

              <ul>
                <li>
                  <b>ADMIN:</b> acceso completo al sistema.
                  Puede gestionar usuarios, clientes, domicilios
                  y mensajeros.
                </li>

                <li>
                  <b>OPERADOR:</b> puede gestionar clientes,
                  domicilios y mensajeros.
                </li>

                <li>
                  <b>MENSAJERO:</b> puede acceder solo a la
                  aplicación móvil para gestionar sus domicilios.
                </li>
              </ul>
            </div>
          </div>

          {/* Información importante */}
          <div className="create-user-alert important-information">
            <FiAlertTriangle />

            <div>
              <strong>
                Importante
              </strong>

              <ul>
                <li>
                  La contraseña inicial será asignada
                  automáticamente según la configuración
                  del sistema.
                </li>

                <li>
                  Si se selecciona el rol de MENSAJERO,
                  se creará automáticamente su perfil
                  de mensajero.
                </li>
              </ul>
            </div>
          </div>

          {/* Botones */}
          <div className="create-user-actions">
            <button
              type="button"
              className="create-user-cancel"
              onClick={handleCancel}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="create-user-submit"
            >
              <FiUserPlus />
              Crear usuario
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateUser;