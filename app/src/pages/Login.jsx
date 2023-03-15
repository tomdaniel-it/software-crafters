import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
    const navigate = useNavigate();
    const { getGoogleCredentials } = useContext(AuthContext);

    const login = async () => {
        await getGoogleCredentials();
        navigate('/tasks');
    }

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
