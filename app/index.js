import { useRouter } from "expo-router";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

export default function StartPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/(app)/home"); // Redireciona para a Home
  }, []);

  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}
