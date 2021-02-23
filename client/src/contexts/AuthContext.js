import { createContext, useState, useEffect, useContext } from "react";

//firebase auth
import { auth } from "../firebase";

export const AuthContext = createContext();

//usecontext hook
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  //signup function
  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  //login / signin function
  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  //logout function
  const logout = (email, password) => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    localStorage.getItem("isAuthenticated");

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp,
    signIn,
    isAuthenticated,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
