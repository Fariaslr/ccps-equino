import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HomeMinist() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="search-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Conteúdo da Tela */}
      <View style={styles.content}>
        <Text>Conteúdo principal aqui...</Text>
      </View>

      {/* Rodapé com abas de navegação */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.tabButton}>
          <Ionicons name="home-outline" size={24} color="white" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Ionicons name="clipboard-outline" size={24} color="white" />
          <Text style={styles.tabText}>Prancheta</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton}>
          <Ionicons name="person-outline" size={24} color="white" />
          <Text style={styles.tabText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  headerIcons: {
    flexDirection: "row",
    gap: 15,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
  },
  tabButton: {
    alignItems: "center",
  },
  tabText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
});
