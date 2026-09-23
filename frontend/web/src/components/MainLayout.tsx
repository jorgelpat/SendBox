import { Outlet } from "react-router-dom";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Navbar from './Navbar';


const MainLayout = () => {

    const [showNav, setShowNav] = useState(false);

    return (
        <>
            <header>
                <GiHamburgerMenu className='burger' onClick={() => setShowNav(!showNav)} />
            </header>

            <Navbar show={showNav} />

            <div className="main">
                <Outlet />
            </div>
        </>
    );
};

export default MainLayout