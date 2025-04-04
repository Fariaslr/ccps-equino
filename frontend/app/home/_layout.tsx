import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import { useState } from "react";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { 
          backgroundColor: "#f8f8f8", 
          height: 90, 
          paddingBottom: 10,
          paddingTop: 10,  
        },
        headerStyle: { backgroundColor: "#4CAF50" }, // Verde Claro
        headerTitleStyle: { fontWeight: "bold", color: "#333" },
        headerRight: () => (
          <View style={{ flexDirection: "row", gap: 15, marginRight: 15 }}>
            <TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="search-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
        ),
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="prancheta"
        options={{
          title: "Chamados",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="clipboard-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
