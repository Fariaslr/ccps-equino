import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { useRouter } from "expo-router";
import { checkBackendConnection, getAuthenticatedUser } from "@/src/services/authService";

export default function IndexScreen() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const backendOk = await checkBackendConnection();
        if (!backendOk) {
          setError("Erro de conexão com o servidor.");
          return;
        }

        const user = await getAuthenticatedUser();
        if (user) {
          router.replace("/home/Home");
        } else {
          router.replace("/Login");
        }
      } catch (err) {
        setError("Erro inesperado.");
      }
    };

    initializeApp();
  }, []);

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#4CAF50" />
      <Text style={{ marginTop: 10 }}>Carregando...</Text>
    </View>
  );
}
