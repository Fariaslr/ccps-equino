import { View, Text, TextInput,  StyleSheet, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter }from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Senha:", password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={() => router.push("/screens/RegisterScreen")}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
    gap: 15,
    shadowRadius: 2,
  },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    height: 40,
    borderWidth: 0,
    width: "30%", 
    shadowRadius: 2,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  secondaryButton: {
    backgroundColor: "#6c757d", // Cinza para um botão secundário
  },
  button: {
    backgroundColor: "#007bff", // Cor do botão
    padding: 5,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 5,
    width: "30%",
  },
  buttonText: {
    color: "#fff", 
    fontWeight: "bold",
    fontSize: 16,
  },
});
