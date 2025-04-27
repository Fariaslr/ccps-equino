import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, Dimensions, Animated } from "react-native";
import { useRef, useState } from "react";
import NotificationDrawer from "@/components/NotificationDrawer";

const { width } = Dimensions.get("window");

export default function Layout() {
  const [visible, setVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(width)).current;

  const openPanel = () => {
    setVisible(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closePanel = () => {
    Animated.timing(slideAnim, {
      toValue: width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setVisible(false));
  };

  const mockNotifications = [
    "Novo chamado disponível",
    "Seu CCPS foi aprovado",
    "Atualização na legislação",
  ];

  return (
    <>
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
          headerStyle: { backgroundColor: "#4CAF50" },
          headerTitleStyle: { color: "white" },
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 15, marginRight: 15 }}>
              <TouchableOpacity onPress={openPanel}>
                <Ionicons name="notifications-outline" size={24} color="black" />
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
          name="validacao"
          options={{
            title: "Validação",
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

      <NotificationDrawer
        visible={visible}
        slideAnim={slideAnim}
        onClose={closePanel}
        notifications={mockNotifications}
      />
    </>
  );
}
