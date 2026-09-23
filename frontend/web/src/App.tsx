import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/MainLayout';
import Login from './pages/Login';
import Home from './pages/Home';
import About from './pages/About';
import PasswordResets from './pages/PasswordResets';
import CreateUser from './pages/CreateUser';
import Payments from './pages/Payments';
import DeliveryHistory from './pages/DeliveryHistory';

import './App.css';

// link: https://www.youtube.com/watch?v=5I_uGo8-jPs&list=PL9LZM-hWdUvspSZa2EMvnGbZclySfLhnk
// time: 18:57

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
              <Route path="/about" element={<About />} />
              <Route path="/my-deliveries" element={<DeliveryHistory />} />
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