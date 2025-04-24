import { View, Text, Button, Alert, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";

export default function Perfil() {
  const router = useRouter();
  const [ccps, setCcps] = useState<any>(null);

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const usuarioJson = await SecureStore.getItemAsync("usuario");
        console.log("Usuário no perfil:", usuarioJson);

        if (usuarioJson) {
          const usuario = JSON.parse(usuarioJson);
          setCcps(usuario);
        } else {
          Alert.alert("Erro", "Nenhum dado encontrado.");
        }
      } catch (error) {
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
        console.error("Erro ao carregar perfil:", error);
      }
    };

    carregarPerfil();
  }, []);

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("usuario");
      router.replace("/LoginScreen");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível sair. Tente novamente.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Perfil do CCPS</Text>

      {ccps ? (
        <>
          <Text style={styles.label}>Nome do CCPS:</Text>
          <Text style={styles.value}>{ccps.nomeCcps}</Text>

          <Text style={styles.label}>CNPJ:</Text>
          <Text style={styles.value}>{ccps.cnpj}</Text>

          <Text style={styles.label}>Cidade/Estado:</Text>
          <Text style={styles.value}>{ccps.cidade} / {ccps.estado}</Text>

          <Text style={styles.label}>Endereço:</Text>
          <Text style={styles.value}>{ccps.endereco}</Text>

          <Text style={styles.label}>Telefone:</Text>
          <Text style={styles.value}>{ccps.telefone}</Text>

          <Text style={styles.label}>Validade:</Text>
          <Text style={styles.value}>{ccps.dataValidade}</Text>
        </>
      ) : (
        <Text>Carregando dados...</Text>
      )}

      <Button title="Sair" onPress={handleLogout} color="#d9534f" />
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
});