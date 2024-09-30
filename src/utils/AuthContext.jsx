/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useState, useEffect, useContext } from "react";
import { account } from "../appwrite/config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserStatus();
  }, []);

  const checkUserStatus = async () => {
    try {
      const session = await account.getSession("current");
      if (session) {
        setUser(session);
      }
    } catch (error) {
      console.error("Session not found", error);
    }
    setLoading(false);
  };

  const login = async (email, password) => {
    const session = await account.createEmailPasswordSession(email, password);
    setUser(session);
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const value = {
    user,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
