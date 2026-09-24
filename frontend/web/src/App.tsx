import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/MainLayout';
import Login from './pages/Login/Login';
import Home from './pages/Home';
import PasswordResets from './pages/PasswordResets';
import CreateDelivery from './pages/CreateDelivery/CreateDelivery';
import CreateClient from './pages/CreateClient/CreateClient';
import CreateUser from './pages/CreateUser/CreateUser';
import Payments from './pages/Payments';
import DeliveryHistory from './pages/DeliveryHistory';

import './App.css';


function App() {
  return (
    <>
      <Router>
        
          <Routes>

            {/* Login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/create-delivery" element={<CreateDelivery />} />
              <Route path="/my-deliveries" element={<DeliveryHistory />} />
              <Route path="/create-client" element={<CreateClient />} />
              <Route path="/create-user" element={<CreateUser />} />
              <Route path="/payments" element={<Payments />} />
            </Route>

            <Route path="/v1/password-resets" element={<PasswordResets />}/>

          </Routes>

      </Router>
    </>
  );
};

export default App;