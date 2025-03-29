import { Link } from "react-router"
import logo from "./assets/logo.svg"

const NavBar = () => {
    return (
        <>
            <nav className="nav-bar">
                <Link to="/" className="nav-logo-link">
                    <img id="logo" src={logo} alt="Logo" className="nav-logo" />
                </Link>

                <ul className="nav-right-list">
                    <li className="nav-message-board-list-item">
                        <Link to="/1" className="nav-message-board-link">
                            Message Board
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar