import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

interface Mensagem {
  id: string;
  conteudo: string;
  remetente: 'VETERINARIO' | 'MAPA';
  dataEnvio: string;
}

export default function ChatScreen() {
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const { id_sala } = useLocalSearchParams(); 
  
  useEffect(() => {
    // Aqui você faria a chamada para buscar as mensagens da API
    async function carregarMensagens() {
      // Exemplo de fetch
      const response = await fetch(`http://192.168.0.175:8080/${id_sala}`);
      const data = await response.json();
      setMensagens(data);
    }

    carregarMensagens();
  }, []);

  const enviarMensagem = async () => {
    if (!novaMensagem.trim()) return;

    const mensagemNova: Mensagem = {
      id: Date.now().toString(), 
      conteudo: novaMensagem,
      remetente: 'VETERINARIO', 
      dataEnvio: new Date().toISOString(),
    };

    setMensagens((prev) => [...prev, mensagemNova]);
    setNovaMensagem('');

    // Aqui você chamaria sua API para salvar no banco
    await fetch(`http://SEU_BACKEND/api/mensagens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        salaId: id_sala,
        conteudo: mensagemNova.conteudo,
        remetente: mensagemNova.remetente,
      }),
    });

    flatListRef.current?.scrollToEnd({ animated: true });
  };

  const renderMensagem = ({ item }: { item: Mensagem }) => {
    const isVeterinario = item.remetente === 'VETERINARIO';
    return (
      <View style={{
        alignSelf: isVeterinario ? 'flex-end' : 'flex-start',
        backgroundColor: isVeterinario ? '#DCF8C5' : '#ECECEC',
        marginVertical: 5,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        maxWidth: '70%',
      }}>
        <Text>{item.conteudo}</Text>
        <Text style={{ fontSize: 10, color: 'gray', alignSelf: 'flex-end' }}>
          {new Date(item.dataEnvio).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={flatListRef}
        data={mensagens}
        renderItem={renderMensagem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 10 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', backgroundColor: 'white' }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 15 }}
          placeholder="Digite uma mensagem..."
          value={novaMensagem}
          onChangeText={setNovaMensagem}
        />
        <TouchableOpacity onPress={enviarMensagem} style={{ marginLeft: 10 }}>
          <Ionicons name="send" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
