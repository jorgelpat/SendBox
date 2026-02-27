import { FaReact } from "react-icons/fa6";
import { Link } from 'react-router-dom'

const Navbar = ({show}) => {
  return (
    <div className={ show ? 'sidenav active': 'sidenav' }>
      <FaReact alt="Logo" className='logo'/>  
      <ul>
        <li>
            <Link to='/' className="active">Home</Link>
        </li>
        <li>
            <Link to='/about'>About us</Link>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
