import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

const chamados = [
  { id: "1", titulo: "Enviar comprovante de instalações", status: "pendente" },
  { id: "2", titulo: "Anexar certidão do responsável técnico", status: "pendente" },
  { id: "3", titulo: "Documentação de equipamentos", status: "concluído" },
];

export default function ValidacaoScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.titulo}</Text>
      <Text style={styles.status}>Status: {item.status}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar Documento</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={chamados}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  status: {
    fontSize: 14,
    color: "#777",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
