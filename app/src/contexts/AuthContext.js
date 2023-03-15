import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../utils/firebase";

export const AuthContext = createContext({
    user: null,
    getGoogleCredentials: null,
    logout: null,
});

export const AuthContextProvider = ({ children }) => {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);

    const getGoogleCredentials = async () => {
		const provider = new GoogleAuthProvider();
		const credentials = await signInWithPopup(auth, provider);
        setUser(credentials.user);
	};

    const logout = async () => {
        await signOut(auth);
    }

    useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (authUser) => {
			if (authUser) {
                setUser({
                    uid: authUser.uid,
                    email: authUser.email,
                });
				setLoading(false);
			} else {
				setUser(null);
				setLoading(false);
			}
		});

		return () => unsubscribe();
	}, []);

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
