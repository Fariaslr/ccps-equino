import React, { useEffect, useState } from "react";
import { Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import InstallationsCarousel from "@/components/InstalationsCarousel";
import ProgressGraph from "@/components/ProgressGraph";
import { installations } from "@/src/data/instalationsData";
import { FONT_SIZES, COLORS } from "@/constants/theme";

import CardGroup from "@/components/CardList";
import CheckListSection from "@/components/CheckListSection";

const HomeScreen = () => {
  const progress = 100;
  const name = "Lucas";
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Bom dia");
    else if (hour < 18) setGreeting("Boa tarde");
    else setGreeting("Boa noite");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.greeting}>
          {greeting}, {name} 👋
        </Text>
        <ProgressGraph progress={progress} />
        <CardGroup />
        <CheckListSection />
        <InstallationsCarousel installations={installations} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  greeting: {
    fontSize: FONT_SIZES.large,
    fontWeight: "600",
    marginBottom: 15,
    color: COLORS.text,
  },
});

export default HomeScreen;
