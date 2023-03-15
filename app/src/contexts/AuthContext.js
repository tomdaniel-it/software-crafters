import { createContext, useState } from "react";
import { auth } from "../utils/firebase";
import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

export const AuthContext = createContext({
    user: null,
    getGoogleCredentials: null,
    logout: null,
});

export const AuthContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);

    const getGoogleCredentials = async () => {
        const provider = new GoogleAuthProvider();
        const credentials = await signInWithPopup(auth, provider);
        setUser(credentials.user);
	};

    const logout = async () => {
        await signOut(auth);
    }

    return (
        <AuthContext.Provider value={{
            user,
            getGoogleCredentials,
            logout,
        }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
