import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const checklist = [
  {
    title: "📄 Capítulo I – Documentos Obrigatórios",
    sections: [
      {
        title: "1. Documentação da Empresa",
        items: [
          { title: "Contrato Social ou Ata de Constituição", done: true, route: "/documentos/empresa/contrato" },
          { title: "Cadastro Nacional da Pessoa Jurídica (CNPJ)", done: false, route: "/documentos/empresa/cnpj" },
          { title: "Inscrição Estadual", done: false, route: "/documentos/empresa/inscricao" },
        ],
      },
      {
        title: "2. Responsabilidade Técnica",
        items: [
          { title: "ART emitida pelo CRMV", done: false, route: "/documentos/tecnica/art" },
        ],
      },
      {
        title: "3. Planta e Memorial",
        items: [
          { title: "Planta-baixa com todas as instalações", done: false, route: "/documentos/planta/baixa" },
          { title: "Planta de localização com coordenadas", done: false, route: "/documentos/planta/localizacao" },
          { title: "Memorial descritivo", done: false, route: "/documentos/planta/memorial" },
        ],
      },
    ],
  },
  {
    title: "🏗️ Capítulo II – Exigências Físicas",
    sections: [
      {
        title: "1. Condições Gerais",
        items: [
          { title: "Cerca perimetral ou barreira", done: false, route: "/exigencias/gerais/cerca" },
          { title: "Localização livre de alagamentos", done: false, route: "/exigencias/gerais/localizacao" },
        ],
      },
      {
        title: "2. Instalações Obrigatórias",
        items: [
          { title: "Sala de Manipulação de Sêmen", done: false, route: "/exigencias/laboratorio/semen" },
          { title: "Sala de Lavagem e Esterilização", done: false, route: "/exigencias/laboratorio/lavagem" },
          { title: "Área de coleta de sêmen", done: false, route: "/exigencias/coleta/area" },
          { title: "Alojamento dos doadores", done: false, route: "/exigencias/alojamento" },
          { title: "Instalação administrativa", done: false, route: "/exigencias/administrativo" },
          { title: "Vestiários e Banheiros", done: false, route: "/exigencias/vestiario" },
          { title: "Armazenamento de sêmen", done: false, route: "/exigencias/armazenamento" },
        ],
      },
    ],
  },
];

export default function CheckListSection() {
  const router = useRouter();
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});

  const toggleExpanded = (index: number) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <ScrollView style={{ padding: 16 }}>
      {checklist.map((capitulo, capIndex) => (
        <View key={capIndex} style={styles.container}>
          <TouchableOpacity onPress={() => toggleExpanded(capIndex)} style={styles.header}>
            <Text style={styles.title}>{capitulo.title}</Text>
            <Ionicons
              name={expanded[capIndex] ? "chevron-up-outline" : "chevron-down-outline"}
              size={20}
              color="#333"
            />
          </TouchableOpacity>

          {expanded[capIndex] && capitulo.sections.map((section, secIndex) => (
            <View key={secIndex} style={styles.itemsContainer}>
              <Text style={styles.subtitle}>{section.title}</Text>
              {section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={itemIndex}
                  onPress={() => router.push(item.route)}
                  style={styles.itemRow}
                >
                  <Ionicons
                    name={item.done ? "checkmark-circle" : "ellipse-outline"}
                    size={20}
                    color={item.done ? "green" : "gray"}
                    style={styles.bullet}
                  />
                  <Text style={styles.itemText}>{item.title}</Text>
                  <Ionicons name="chevron-forward-outline" size={20} color="#999" />
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },
  itemsContainer: {
    marginVertical: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bullet: {
    marginRight: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
  },
});
