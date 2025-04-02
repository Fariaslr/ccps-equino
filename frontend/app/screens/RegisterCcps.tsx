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
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    cep: "",
    telefone: "",
  });

  const [error, setError] = useState<Record<string, string>>({});

  // Função para atualizar os valores do formulário
  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Remove o erro caso o campo seja preenchido
    setError((prev) => {
      const newErrors = { ...prev };
      if (value.trim() !== "") {
        delete newErrors[field];
      }
      return newErrors;
    });
  };

  const validateFields = () => {
    let errors: Record<string, string> = {};
  
    if (!formData.nome.trim()) errors.nome = "Nome do CCPS é obrigatório!";
    
    if (formData.cnpj.length !== 18) {
      errors.cnpj = "CNPJ inválido!";
    }
  
    if (formData.cep.length !== 9) {
      errors.cep = "CEP inválido!";
    }
  
    if (formData.telefone.length !== 15) {
      errors.telefone = "Número de telefone inválido!";
    }
  
    setError(errors);
    return Object.keys(errors).length === 0;
  };
  

  const handleNext = () => {
    if (validateFields()) {
      router.navigate("/screens/RegisterVet");
    }
  };

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
          {/* Nome do CCPS */}
          <Text style={styles.label}>Nome do CCPS</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Rancho Estrela"
            value={formData.nome}
            onChangeText={(text) => handleChange("nome", text)}
          />
          {error.nome && <Text style={styles.error}>{error.nome}</Text>}

          {/* CNPJ */}
          <Text style={styles.label}>CNPJ</Text>
          <MaskedTextInput
            mask="99.999.999/9999-99"
            style={styles.input}
            placeholder="12.345.678/1234-01"
            keyboardType="numeric"
            value={formData.cnpj}
            onChangeText={(text) => handleChange("cnpj", text)}
          />
          {error.cnpj && <Text style={styles.error}>{error.cnpj}</Text>}

          {/* CEP */}
          <Text style={styles.label}>CEP</Text>
          <MaskedTextInput
            mask="99999-999"
            style={styles.input}
            placeholder="40010-000"
            keyboardType="numeric"
            value={formData.cep}
            onChangeText={(text) => handleChange("cep", text)}
          />
          {error.cep && <Text style={styles.error}>{error.cep}</Text>}

          {/* Telefone */}
          <Text style={styles.label}>Telefone</Text>
          <MaskedTextInput
            mask="(99) 99999-9999"
            style={styles.input}
            placeholder="(11) 91234-5678"
            keyboardType="phone-pad"
            value={formData.telefone}
            onChangeText={(text) => handleChange("telefone", text)}
          />
          {error.telefone && <Text style={styles.error}>{error.telefone}</Text>}

          {/* Botão de Avançar */}
          <TouchableOpacity
            style={[
              styles.button,
              Object.keys(error).length > 0 && styles.buttonDisabled,
            ]}
            onPress={handleNext}
            disabled={Object.keys(error).length > 0}
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
  error: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
});
