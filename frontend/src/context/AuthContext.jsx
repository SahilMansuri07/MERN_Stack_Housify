// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("token"),
    role: localStorage.getItem("role"),
    username: localStorage.getItem("username"),
  });

  const logout = () => {
    localStorage.clear();
    setAuth({ token: null, role: null, username: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Export the custom hook
export const useAuth = () => useContext(AuthContext);
