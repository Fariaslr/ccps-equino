import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

const HomeScreen = () => {
  const [progress, setProgress] = useState<number>(75);
  const strokeDasharray = `${progress * 2.83} ${283 - progress * 2.83}`;
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Gera um número aleatório entre 0 e 100
      const novoProgresso = Math.floor(Math.random() * 101);
      setProgress(novoProgresso);
      
      console.log(`Progresso atualizado: ${novoProgresso}%`);
    }, 10000); // 10 segundos = 10000 milissegundos

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Svg width={150} height={150} viewBox="0 0 100 100">
          {/* Fundo do círculo */}
          <Circle cx="50" cy="50" r="45" stroke="#ddd" strokeWidth="10" fill="none" />
          {/* Progresso */}
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

      <View style={styles.content}>
        <Text style={styles.title}>Progresso das Etapas</Text>
        <Text style={styles.description}>Acompanhe o status das etapas validadas no sistema.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f5f5f5", 
    alignItems: "center", 
    paddingTop: 30 
  },
  progressContainer: { 
    width: width * 0.9, 
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
  progressText: { 
    position: "absolute", 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#333" 
  },
  content: { 
    marginTop: 30, 
    alignItems: "center", 
    paddingHorizontal: 20 
  },
  title: { 
    fontSize: 22, 
    fontWeight: "bold", 
    color: "#333",
    marginBottom: 10
  },
  description: { 
    fontSize: 16, 
    textAlign: "center", 
    color: "#666" 
  },
});

export default HomeScreen;
