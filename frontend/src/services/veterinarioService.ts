import * as veterinarioApi from '../api/veterinarioApi';

export const fetchVeterinarios = async () => {
  try {
    return await veterinarioApi.getVeterinarios();
  } catch (error) {
    console.error('Erro ao buscar veterinários:', error);
    throw error;
  }
};
