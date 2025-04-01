import { useContext } from "react"
import { UserContext } from "./App"
import { supabaseClient } from "./supa-client";

const UserMenu = () => {
    const { profile } = useContext(UserContext);
    return (
        <>
            <div className="flex flex-col">
                <h2>Welcome {profile?.username || "dawg"}</h2>
                <button
                    onClick={() => { supabaseClient.auth.signOut() }}
                    className="user-menu-logout-button">Logout</button>
            </div>
        </>
    )
}

export default UserMenu