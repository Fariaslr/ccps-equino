// app/chat/[id].tsx
import { Stack, useLocalSearchParams } from "expo-router";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";

export default function ChatScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen options={{ title: "Liberar acesso" }} />

      <ScrollView contentContainerStyle={styles.chatContainer}>
        <MessageBubble
          text="Por aqui você libera o acesso e a movimentação de sua conta..."
          date="25/04/2025 10:43"
        />

        <Divider label="Novas mensagens" />

        <MessageBubble
          text="Olá, LUCAS REGO FARIAS."
          date="28/04/2025 10:49"
        />

        <MessageBubble
          text="Por aqui você libera o acesso e a movimentação de sua conta..."
          date="28/04/2025 10:49"
          showButton
        />
      </ScrollView>
    </View>
  );
}

function MessageBubble({ text, date, showButton = false }: any) {
  return (
    <View style={styles.bubble}>
      <Text style={styles.messageText}>{text}</Text>
      {showButton && (
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Liberar acesso</Text>
        </Pressable>
      )}
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

function Divider({ label }: any) {
  return (
    <View style={styles.dividerContainer}>
      <View style={styles.line} />
      <Text style={styles.dividerText}>{label}</Text>
      <View style={styles.line} />
    </View>
  );
}

const styles = StyleSheet.create({
  chatContainer: {
    padding: 16,
  },
  bubble: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  messageText: {
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    borderColor: "#000",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  buttonText: {
    color: "#000",
  },
  date: {
    fontSize: 12,
    color: "#888",
    alignSelf: "flex-end",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  dividerText: {
    marginHorizontal: 8,
    fontWeight: "bold",
    color: "#0055cc",
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
});
