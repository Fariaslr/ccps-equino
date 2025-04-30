import { Modal, View, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { MaterialIcons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { useAppContext } from "@/src/context/authContext"; // Seu hook de autenticação
import { useCcps } from "@/src/context/ccpsContext"; // Seu contexto de CCPS


interface CcpsModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function CcpsModal({ visible, onClose }: CcpsModalProps) {
  // Dados do usuário logado
  const user  = useAppContext(); // Use o hook correto para obter o usuário logado
  const { currentCcps, setCurrentCcps } = useCcps();
  
  // Estados do componente
  const [ccpsList, setCcpsList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Carrega os CCPS quando o modal é aberto
  useEffect(() => {
    if (visible && user?.id && user?.tipo_usuario === "VETERINARIO") {
      loadVeterinarioCcps();
    }
  }, [visible, user]);

  const loadVeterinarioCcps = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Busca apenas os CCPS do veterinário logado
      const response = await ccpsService.listarPorVeterinario(user.id);
      setCcpsList(response);
      
      // Verifica se o CCPS atual ainda pertence ao veterinário
      if (currentCcps && !response.some(ccps => ccps.id === currentCcps.id)) {
        setCurrentCcps(null);
      }
    } catch (err) {
      console.error("Erro ao carregar CCPS:", err);
      setError("Não foi possível carregar seus CCPS");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCcps = (itemValue: string) => {
    if (!itemValue) {
      setCurrentCcps(null);
      return;
    }
    
    const selected = ccpsList.find(ccps => ccps.id === itemValue);
    if (selected) {
      setCurrentCcps(selected);
      onClose(); // Fecha o modal após seleção
    }
  };

  // Se não for veterinário, não mostra o modal
  if (user?.tipo_usuario !== "VETERINARIO") {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Meus Centros de Coleta</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#4CAF50" />
              <Text style={styles.loadingText}>Carregando seus CCPS...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={48} color="#f44336" />
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={loadVeterinarioCcps}
              >
                <Text style={styles.retryButtonText}>Tentar novamente</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <Text style={styles.userInfo}>
                Veterinário: {user.nome}
              </Text>
              
              <Picker
                selectedValue={currentCcps?.id || ''}
                onValueChange={handleSelectCcps}
                style={styles.picker}
                dropdownIconColor="#4CAF50"
              >
                <Picker.Item 
                  label={ccpsList.length ? "Selecione um CCPS" : "Você não possui CCPS cadastrados"} 
                  value="" 
                />
                {ccpsList.map((ccps) => (
                  <Picker.Item 
                    key={ccps.id} 
                    label={`${ccps.nomeCcps} - ${ccps.cidade}/${ccps.estado}`} 
                    value={ccps.id} 
                  />
                ))}
              </Picker>
              
              {ccpsList.length > 0 && (
                <TouchableOpacity 
                  style={styles.confirmButton}
                  onPress={onClose}
                >
                  <Text style={styles.confirmButtonText}>Confirmar Seleção</Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 30,
    maxHeight: '60%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  userInfo: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  picker: {
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  errorContainer: {
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    marginTop: 10,
    color: '#f44336',
    textAlign: 'center',
    fontSize: 16,
  },
  retryButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#f44336',
    borderRadius: 8,
    minWidth: 150,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});