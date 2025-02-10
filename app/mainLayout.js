import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { useAuth, AuthContextProvider } from "../context/authContext";  // Corrigido

const MainLayout = () => {
  const { isAuthenticated } = useAuth() || { isAuthenticated: false }; // Pegando o estado de autenticação
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
  
    if (typeof isAuthenticated === "undefined") return;
  
    const inApp = segments[0] === "(app)";
  
    if (isAuthenticated && !inApp) {
      console.log("Redirecionando para home");
      router.replace("/home");  // Caminho atualizado
    } else if (!isAuthenticated && inApp) {
      console.log("Redirecionando para signIn");
      router.replace("/signIn");  // Caminho correto
    }
  }, [isAuthenticated, segments, router]);
  

  return <Slot />;  // Renderiza a tela correspondente
};

export default function _layout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}

