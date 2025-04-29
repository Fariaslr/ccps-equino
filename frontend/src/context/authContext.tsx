import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Usuario } from "../models/Usuario"; // Importa o modelo de Usuario
import AsyncStorage from "@react-native-async-storage/async-storage";

type AppContextType = {
  usuario: Usuario | null;
  setUsuario: (usuario: Usuario | null) => void;
  loadUserFromStorage: () => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const loadUserFromStorage = async () => {
    try {
      const storedUser = await AsyncStorage.getItem("usuario");
      if (storedUser) {
        setUsuario(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Erro ao carregar usuário do AsyncStorage:", error);
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <AppContext.Provider value={{ usuario, setUsuario, loadUserFromStorage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
