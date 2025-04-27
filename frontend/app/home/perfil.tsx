import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useAppContext } from "../../src/context/authContext";

export default function Perfil() {
  const router = useRouter();
  const { veterinario, setVeterinario } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("usuario");
      router.replace("/Login"); 
      setVeterinario(null); 
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text style={styles.value}>Carregando dados do perfil...</Text>
      </View>
    );
  }

  if (!veterinario) {
    return (
      <View style={styles.container}>
        <Text style={styles.value}>Dados do veterinário não encontrados.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil do Veterinário</Text>

      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{veterinario.nome || "Não disponível"}</Text>

      <Text style={styles.label}>CRMV:</Text>
      <Text style={styles.value}>{veterinario.crmv || "Não disponível"}</Text>

      <Text style={styles.label}>E-mail:</Text>
      <Text style={styles.value}>{veterinario.email || "Não disponível"}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "600",
    marginTop: 10,
  },
  value: {
    marginBottom: 10,
    color: "#333",
  },
  button: {
    backgroundColor: "#d9534f",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
