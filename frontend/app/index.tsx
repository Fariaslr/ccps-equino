import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import * as SecureStore from "expo-secure-store";
import { populateSalas, selectOperacao } from "@/src/database/initDatabase";
import { listarSalasPorCcps } from "@/src/services/salaService";

export default function Index() {
  const router = useRouter();

  useEffect(() => {    
    const startApp = async () => {
      try {
        const usuarioLogado = await SecureStore.getItemAsync("usuario");

        if (usuarioLogado) {
          router.replace("/home/Home");
        } else {
          router.replace("/Login");
        }
      } catch (error) {
        console.error("Erro ao verificar o usuário logado:", error);
        router.replace("/Login");
      }
    };

    startApp();
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
}
