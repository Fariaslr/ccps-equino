import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";

import InstallationsCarousel from "@/components/InstalationsCarousel";
import { installations } from "@/src/data/instalationsData";
import ProgressGraph from "@/components/ProgressGraph";

const HomeScreen = () => {
  const [progress, setProgress] = useState<number>(0);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 1;
      });
    }, 600); 
  
    return () => clearInterval(interval); 
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.inner}>
        <Text style={styles.greeting}>
          {greeting}, <Text style={styles.username}>Mel</Text> 👋
        </Text>
        <ProgressGraph progress={progress}/>
        <InstallationsCarousel installations={installations}/>
      </ScrollView>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
  },
  inner: {
    flex: 1,
    padding: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  username: {
    fontWeight: "bold",
    color: "#007bff",
  },
});

export default HomeScreen;
