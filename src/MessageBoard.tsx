import { useContext } from "react"
import { Link, Outlet } from "react-router"
import Login from "./Login";
import { UserContext } from "./App";

const MessageBoard = () => {
    const userProfile = useContext(UserContext);

    return (
        <div className="message-board-container">
            <Link to="/1">
                <h2 className="message-board header-link">Message Board</h2>
            </Link>
            { userProfile.session ? ( <></>) :
            (
                <h2 className="message-board-login-message" data-e2e="message-board-login">
                    You dawg. You gotta <Login/> to join in the discussion.
                </h2>
            )}
            <Outlet />
        </div>
    )
}

export default MessageBoard