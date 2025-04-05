import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const [progress, setProgress] = useState<number>(44);
  const [greeting, setGreeting] = useState("");

  const strokeDasharray = `${progress * 2.83} ${283 - progress * 2.83}`;


  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{greeting}, Mel 👋</Text>
      <Pressable style={styles.progressContainer} android_ripple={{ color: "#ddd" }}>
        <View style={styles.content}>
          <Text style={styles.title}>Progresso das Etapas</Text>
        </View>

        <View style={styles.graphContainer}>
          <Svg width={120} height={120} viewBox="0 0 100 100">
            <Circle cx="50" cy="50" r="45" stroke="#ddd" strokeWidth="10" fill="none" />
            <Circle
              cx="50"
              cy="50"
              r="45"
              stroke="green"
              strokeWidth="10"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeLinecap="round"
              transform="rotate(-90 50 50)"
            />
          </Svg>
          <Text style={styles.progressText}>{progress}%</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    paddingTop: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "600",
    alignSelf: "flex-start",
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 30,
    color: "#333",
  },
  progressContainer: {
    width: width * 0.90,
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  content: {
    width: "100%",
    marginBottom: 20,
    alignItems: "flex-start",
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
  graphContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    position: "absolute",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default HomeScreen;
