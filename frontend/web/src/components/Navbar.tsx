import { Link } from "react-router-dom";
import { IoLogoAndroid } from "react-icons/io";

interface NavbarProps {
    show: boolean;
}

const Navbar = ({show}: NavbarProps) => {
    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <IoLogoAndroid title="Logo" className="logo"/>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/about">About us</Link>
                </li>
                <li>
                    <Link to="/my-deliveries">Mis Domicilios</Link>
                </li>
                <li>
                    <Link to="/create-user">Create User</Link>
                </li>
                <li>
                    <Link to="/payments">Payments</Link>
                </li>
                <li>
                    <Link to="/">Sign off</Link>
                </li>
            </ul>
        </div>
    );
};

export default Navbar