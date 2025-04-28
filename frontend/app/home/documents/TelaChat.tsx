import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function TelaChat() {
  const router = useRouter();
  const { slug } = useLocalSearchParams();
  const [fileName, setFileName] = useState<string | null>(null);

  const documentTitle = Array.isArray(slug) ? slug.join(' / ') : slug;

  const handleSelectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      });

      if (result.assets && result.assets.length > 0) {
        const file = result.assets[0];
        setFileName(file.name);
      }
    } catch (error) {
      console.error('Erro ao selecionar arquivo:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Documento: {documentTitle}</Text>

      <View style={styles.chatBubble}>
        <Text style={styles.chatText}>
          Por favor, envie o documento necessário para a validação: {documentTitle}.
        </Text>
      </View>

      {fileName ? (
        <View style={styles.fileInfo}>
          <Ionicons name="document-outline" size={24} color="green" />
          <Text style={styles.fileName}>{fileName}</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={handleSelectFile} style={styles.button}>
          <Ionicons name="attach-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>Selecionar Documento</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chatBubble: {
    backgroundColor: '#f1f1f1',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  chatText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  fileName: {
    marginLeft: 10,
    fontSize: 16,
    color: 'green',
  },
});
