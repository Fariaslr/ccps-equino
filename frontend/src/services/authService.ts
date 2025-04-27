import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api";
import { AuthRequestDto } from "../models/AuthRequestDto";
import { Veterinario } from "../models/Veterinario";

const STORAGE_KEY = "veterinario";

export async function login(authData: AuthRequestDto): Promise<Veterinario> {
  const response = await api.post("/auth/login", authData);
  return response.data;
}

export async function checkBackendConnection() {
  try {
    const response = await api.get("/veterinarios"); 
    return response.status === 200;
  } catch (error) {
    return false;
  }
}

export async function getAuthenticatedUser(): Promise<Veterinario | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Erro ao recuperar usuário autenticado:", e);
    return null;
  }
}

export async function logout() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Erro ao fazer logout:", e);
  }
}
