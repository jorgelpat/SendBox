import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login/Login';
import Clients from './pages/Clients/Clients';
import CreateClient from './pages/Clients/CreateClient/CreateClient';
import Shipments from './pages/Shipments/Shipments';
import CreateShipment from './pages/Shipments/CreateShipment/CreateShipment';
import Couriers from './pages/Couriers/Couriers';

import './App.css';
import Users from './pages/Users/Users';
import CreateUser from './pages/Users/CreateUser/CreateUser';


function App() {
  return (
    <>
      <Router>
        
        <Routes>

          {/* Login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />

          {/* Cliente */}
          <Route path="/clientes" element={<Clients />} />

          {/* Crear Cliente */}
          <Route path="/clientes/crear" element={<CreateClient />} />

          {/* Domicilios */}
          <Route path="/domicilios" element={<Shipments />} />

          {/* Crear Domicilios */}
          <Route path="/domicilios/crear" element={<CreateShipment />} />

          {/* Mensajeros */}
          <Route path="/mensajeros" element={<Couriers />} />

          {/* Usuarios */}
          <Route path="/usuarios" element={<Users />} />

          {/* Crear Usuario */}
          <Route path="/usuarios/crear" element={<CreateUser />} />

        </Routes>

      </Router>
    </>
  );
};

export default App;