import React, { useEffect } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { useAuth, AuthContextProvider } from "../context/authContext";  // Corrigido

const MainLayout = () => {
  const { isAuthenticated } = useAuth();  // Pegando o estado de autenticação
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
  
    if (typeof isAuthenticated === "undefined") return;
  
    const inApp = segments[0] === "(app)";
  
    // Forçar redirecionamento para testar
    if (isAuthenticated && !inApp) {
      console.log("Redirecionando para home");
      router.replace("home");
    } else if (!isAuthenticated && inApp) {
      console.log("Redirecionando para signIn");
      router.replace("signIn");
    }
  }, [isAuthenticated, segments, router]);
     // Dependências ajustadas

  return <Slot />;  // Renderiza a tela correspondente
};

export default function _layout() {
  return (
    <AuthContextProvider>
      <MainLayout />
    </AuthContextProvider>
  );
}

