import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  FiBox,
  FiUsers,
  FiPackage,
  FiTruck,
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

import "./Sidebar.css";

// type SidebarProps = {
//   activePage?: "clients" | "shipments" | "couriers" | "users";
// };

function Sidebar() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  function getLinkClass({ isActive }: { isActive: boolean }) {
    return isActive ? "sidebar-link sidebar-link-active" : "sidebar-link";
  }

  function closeSidebar() {
    setIsOpen(false);
  }

  function handleLogout() {
    setIsOpen(false);
    navigate("/login");
  }

  return (
    <>
      {/* Barra superior móvil */}
      <header className="mobile-header">
        <button
          type="button"
          className="mobile-menu-button"
          onClick={() => setIsOpen(true)}
          aria-label="Abrir menú"
        >
          <FiMenu />
        </button>
        
        <div className="mobile-brand">
          <FiBox />
          <span>SendBox</span>
        </div>
      </header>

      {isOpen && (<div className="sidebar-overlay" onClick={closeSidebar}/>)}

      {/* sidebar */}
      <aside className={isOpen ? "sidebar sidebar-open" : "sidebar"}>
        <div>
          <div className="sidebar-brand">
            <FiBox className="sidebar-logo" />
            <span>SendBox</span>

            <button
              type="button"
              className="sidebar-close"
              onClick={closeSidebar}
              aria-label="Cerrar Menú"
            >
              <FiX />
            </button>
          </div>

          <nav className="sidebar-nav">
            <NavLink to="/clientes" className={getLinkClass} onClick={closeSidebar}>
              <FiUsers />
              <span>Clientes</span>
            </NavLink>

            <NavLink to="/domicilios" className={getLinkClass} onClick={closeSidebar}>
              <FiPackage />
              <span>Domicilios</span>
            </NavLink>

            <NavLink to="/mensajeros" className={getLinkClass} onClick={closeSidebar}>
              <FiTruck />
              <span>Mensajeros</span>
            </NavLink>

            <NavLink to="/usuarios" className={getLinkClass} onClick={closeSidebar}>
              <FiUser />
              <span>Usuarios</span>
            </NavLink>
          </nav>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="sidebar-avatar">JP</div>

            <div className="sidebar-user-info">
              <strong>Jorge Patiño</strong>
              <span>Administrador</span>
            </div>
          </div>

          <button
            className="sidebar-logout"
            type="button"
            onClick={handleLogout}
          >
            <FiLogOut />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
