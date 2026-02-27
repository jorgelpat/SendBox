import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import { GiHamburgerMenu } from "react-icons/gi";
import './App.css';


function App() {
  const [ showNav, setShowNav ] = useState(false)
  return (
    <>
      <Router>
        <header>
          <GiHamburgerMenu className='burger' onClick={ () => setShowNav(!showNav) }/>
        </header>

        <Navbar show={showNav} />

        <main className='main'>
          <Routes>
            <Route path='/' exact={true} element={<Home/>} />
            <Route path='/about' exact={true} element={<About/>} />
          </Routes>
        </main>
      </Router>
    </>
  );
}

export default App;
