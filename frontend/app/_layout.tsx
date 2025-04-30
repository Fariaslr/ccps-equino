import { AppProvider } from "@/src/context/authContext";
import { CcpsProvider } from "@/src/context/ccpsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AppProvider>
      <CcpsProvider>
      <Stack screenOptions={{ headerShown: false }} />
      </CcpsProvider>      
    </AppProvider>
  );
}