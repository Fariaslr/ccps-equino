import { View, Text, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useAppContext } from "../../src/context/authContext";

export default function Perfil() {
  const router = useRouter();
  const { usuario, setUsuario } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("usuario");
      router.replace("/Login");
      setUsuario(null);
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

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.value}>Dados do veterinário não encontrados.</Text>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <Text style={styles.value}>{usuario.nome || "Não disponível"}</Text>

      <Text style={styles.label}>CRMV:</Text>
      <Text style={styles.value}>{usuario.crmv || "Não disponível"}</Text>

      <Text style={styles.label}>E-mail:</Text>
      <Text style={styles.value}>{usuario.email || "Não disponível"}</Text>

      <Text style={styles.label}>Data de nascimento:</Text>
      <Text style={styles.value}>{usuario.data_nascimento || "Não disponível"}</Text>

      <Text style={styles.label}>Telefone:</Text>
      <Text style={styles.value}>{usuario.telefone || "Não disponível"}</Text>

      <Text style={styles.label}>Tipo usuário:</Text>
      <Text style={styles.value}>{usuario.tipo_usuario || "Não disponível"}</Text>

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
