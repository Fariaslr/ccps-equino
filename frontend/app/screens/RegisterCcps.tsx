import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaskedTextInput } from "react-native-mask-text";

export default function RegisterCcps() {
  const [cnpj, setCnpj] = useState("");
  const router = useRouter();

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://cdn3.iconfinder.com/data/icons/animals-105/150/icon_animal_cavalo-512.png",
          }}
        />
        <Text style={styles.title}>Cadastrar CCPS</Text>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Nome do CCPS</Text>
          <TextInput style={styles.input} placeholder="Ex: Rancho Estrela" />

          <Text style={styles.label}>CNPJ</Text>
          <MaskedTextInput
            mask="99.999.999/9999-99"
            style={styles.input}
            placeholder="00.000.000/0000-00"
            keyboardType="numeric"
            value={cnpj}
            onChangeText={setCnpj}
          />

          <Text style={styles.label}>CEP</Text>
          <MaskedTextInput
            mask="99.999.999/9999-99"
            style={styles.input}
            placeholder="00.000.000/0000-00"
            keyboardType="numeric"
            value={cnpj}
            onChangeText={setCnpj}
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="(11) 91234-5678"
            keyboardType="phone-pad"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => router.navigate("/screens/RegisterVet")}
          >
            <Text style={styles.buttonText}>Avançar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: 350,
  },
  label: {
    fontSize: 16,
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
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});
