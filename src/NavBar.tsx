import { Link } from "react-router"
import logo from "./assets/logo.svg"
import { useContext } from "react"
import { UserContext } from "./App"
import Login from "./Login"
import UserMenu from "./UserMenu"

const NavBar = () => {
    const { session } = useContext(UserContext);
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
                    <li>
                        {session?.user ? <UserMenu/> : <Login />}
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar