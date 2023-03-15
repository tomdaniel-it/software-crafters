import { createContext, useState } from "react";

export const AuthContext = createContext({
    user: null,
    getGoogleCredentials: null,
    logout: null,
});

export const AuthContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState(null);

    const getGoogleCredentials = async () => {
        // TODO: Sign in with google
        // TODO: setUser with correct user object
	};

    const logout = async () => {
        // TODO: Sign out from firebase
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
