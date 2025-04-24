import { Veterinario } from '../types/models';
import api from './index';


export const getVeterinarios = async (): Promise<Veterinario[]> => {
  const response = await api.get('/veterinarios');
  return response.data;
};

export const createVeterinario = async (veterinario: Veterinario) => {
  const response = await api.post('/veterinarios', veterinario);
  return response.data;
};

