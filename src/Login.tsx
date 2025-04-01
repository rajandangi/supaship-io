import { useState } from "react";
import Dialog from "./Dialog"
import { Auth } from "@supabase/auth-ui-react";
import { supabaseClient } from "./supa-client";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export const setReturnPath = () => {
    localStorage.setItem("returnPath", window.location.pathname);
}

const Login = () => {
    const [showModal, setShowModal] = useState(false);
    const [authMode, setAuthMode] = useState<"sign_in" | "sign_up">("sign_in");
    return (
        <>
            <div className="flex m-4 place-items-center">
                <button
                    onClick={() => {
                        setShowModal(true);
                        setAuthMode("sign_in");
                        setReturnPath();
                    }}
                >
                    Login
                </button>{" "}
                <span className="p-2">or</span> {" "}
                <button
                    onClick={() => {
                        setShowModal(true);
                        setAuthMode("sign_up");
                        setReturnPath();
                    }}>
                    Sign Up
                </button>
            </div>
            <Dialog
                open={showModal}
                dialogStateChange={(open) => setShowModal(open)}
                contents={<>
                    {
                        <Auth
                            supabaseClient={supabaseClient}
                            providers={['github']}
                            view={authMode}
                            appearance={{
                                theme: ThemeSupa,
                                className: {
                                    container: "login-form-container",
                                    label: "login-form-label",
                                    button: "login-form-button",
                                    input: "login-form-input",
                                }
                            }}
                        />
                    }
                </>} />
        </>
    )
}

export default Login