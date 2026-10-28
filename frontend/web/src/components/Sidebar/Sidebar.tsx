import {
  FiBox,
  FiUsers,
  FiPackage,
  FiTruck,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";

import "./Sidebar.css";

type SidebarProps = {
  activePage?: "clients" | "shipments" | "couriers" | "users";
};

function Sidebar() {
    const navigate = useNavigate();

    function getLinkClass({
        isActive,
    }: {
        isActive: boolean;
    }) {
        return isActive
            ? "sidebar-link sidebar-link-active"
            : "sidebar-link";
    }

    function handleLogout() {
        navigate("/login")
    }

    return (
        <aside className="sidebar">
        <div>
            <div className="sidebar-brand">
            <FiBox className="sidebar-logo" />
            <span>SendBox</span>
            </div>

            <nav className="sidebar-nav">
            <NavLink
                to="/clientes"
                className={getLinkClass}
            >
                <FiUsers />
                <span>Clientes</span>
            </NavLink>

            <NavLink
                to="/domicilios"
                className={getLinkClass}
            >
                <FiPackage />
                <span>Domicilios</span>
            </NavLink>

            <NavLink
                to="/mensajeros"
                className={getLinkClass}
            >
                <FiTruck />
                <span>Mensajeros</span>
            </NavLink>

            <NavLink
                to="/usuarios"
                className={getLinkClass}
            >
                <FiUser />
                <span>Usuarios</span>
            </NavLink>
            </nav>
        </div>

        <div className="sidebar-bottom">
            <div className="sidebar-user">
            <div className="sidebar-avatar">JP</div>

            <div>
                <strong>Jorge Patiño</strong>
                <span>Administrador</span>
            </div>
            </div>

            <button className="sidebar-logout" type="button" onClick={handleLogout}>
            <FiLogOut />
            <span>Cerrar sesión</span>
            </button>
        </div>
        </aside>
    );
}

export default Sidebar;