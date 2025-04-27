import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { FONT_SIZES } from "@/constants/theme";
import { login, checkBackendConnection } from "@/src/services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppContext } from "@/src/context/authContext";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState<string | null>(null);

  const router = useRouter();
  const { setVeterinario, loadUserFromStorage } = useAppContext();

  useEffect(() => {
    const checkLogin = async () => {
      const isConnected = await checkBackendConnection();
      if (!isConnected) {
        Alert.alert("Erro", "Não foi possível conectar ao servidor.");
        return;
      }

      await loadUserFromStorage(); 

      const storedUser = await AsyncStorage.getItem("veterinario");
      if (storedUser) {
        router.replace("/home/Home");
      }
    };

    checkLogin();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const user = await login({ email, senha: password });
      await AsyncStorage.setItem("veterinario", JSON.stringify(user));
      setVeterinario(user);
      router.replace("/home/Home");
    } catch (err: any) {
      console.error("Erro ao autenticar:", err);
      setErrorMessage("Email ou senha inválidos");
      Alert.alert("Erro", "Email ou senha inválidos");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
        <Text style={{ marginTop: 10 }}>Carregando...</Text>
      </View>
    );
  }

  if (backendError) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: "red", textAlign: "center" }}>
          {backendError}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
        />
        <Text style={styles.title}>Veterinário</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            accessibilityLabel="Campo de e-mail"
          />

          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            accessibilityLabel="Campo de senha"
          />

          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push("/RegisterVeterinario")}
          >
            <Text style={styles.buttonText}>Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: FONT_SIZES.xlarge,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  label: {
    fontSize: FONT_SIZES.medium,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#555",
  },
  input: {
    height: 44,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    width: "100%",
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  secondaryButton: {
    backgroundColor: "#6c757d",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: FONT_SIZES.medium,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  errorText: {
    color: "red",
    fontSize: FONT_SIZES.small,
    marginBottom: 10,
    textAlign: "center",
  },
});
