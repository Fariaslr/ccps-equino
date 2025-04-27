import { createContext, useContext, useState } from "react";
import { Veterinario } from "../models/Veterinario";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AppContextType = {
  veterinario: Veterinario | null;
  setVeterinario: (veterinario: Veterinario | null) => void;
  loadUserFromStorage: () => Promise<void>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [veterinario, setVeterinario] = useState<Veterinario | null>(null);

  const loadUserFromStorage = async () => {
    const storedUser = await AsyncStorage.getItem("veterinario");
    if (storedUser) {
      setVeterinario(JSON.parse(storedUser));
    }
  };

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <AppContext.Provider value={{ veterinario, setVeterinario }}>
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
