import {Link} from "react-scroll"
import {FaBars, FaTimes} from "react-icons/fa"
import {useState} from "react";
import '../stylesheets/NavBar.css'

const NavBar = () => {

    const [click, setClick] = useState(false)
    const handleClick = () => setClick(!click)

    const closeMenu = () => setClick(false)

    return (
        <div className="navbar-container">
            <nav className="navbar">
                <Link  to="about" spy={true} smooth={true} duration={500}><h2 className="page-title" >Your Secret</h2></Link>
                <div className='hamburger-icon' onClick={handleClick}>
                    {click ? (<FaTimes size={30} style={{ color: '#ffffff' }} />)
                        : (<FaBars size={30} style={{ color: '#ffffff' }} />)}
                </div>
                <ul className={click ? "navbar-menu active" : "navbar-menu"}>
                    <li className="navbar-item">
                        <Link to="about" onClick={closeMenu} spy={true} smooth={true} offset={-50} duration={500}>About</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="add-secret" onClick={closeMenu} spy={true} smooth={true} offset={-50} duration={500}>Add Secret</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="secret-page" onClick={closeMenu} spy={true} smooth={true} offset={-50} duration={500}>Get Secret</Link>
                    </li>
                    <li className="navbar-item">
                        <Link to="contacts" onClick={closeMenu} spy={true} smooth={true} offset={-50} duration={500}>Contacts</Link>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default NavBar