import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const { getGoogleCredentials, user } = useContext(AuthContext);
    const navigate = useNavigate();

    const login = async () => {
        await getGoogleCredentials();
    }

    useEffect(() => {
        if (!!user) {
            navigate('/tasks');
        }
    }, [user, navigate]);

    return (
        <div className="text-center">
            <h1 className="text-lg mb-5">Login with Google</h1>
            <button
                className="px-4 py-2 bg-green-300 rounded hover:bg-green-400"
                onClick={login}
            >Login</button>
        </div>
    );
}

export default Login;
