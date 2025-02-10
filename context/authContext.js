import React, { createContext, useContext, useState, useEffect } from "react";

// Criando o Contexto de Autenticação
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);

  useEffect(() => {
    setTimeout(() => {
      setIsAuthenticated(false);
    }, 3000);
  }, []);

  const login = (email, password) => {
  };

  const logout = () => {
  };

  const register = (email, password, username) => {

  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
