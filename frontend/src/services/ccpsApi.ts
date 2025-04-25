import api from '../api';
import { Ccps } from '../types/models';


export const createCcps = async (ccps: Ccps) => {
  const response = await api.post('/ccps', ccps);
  return response.data;
};

export const getCcpsByVeterinario = async (veterinarioId: string) => {
  const response = await api.get(`/ccps?veterinarioId=${veterinarioId}`);
  return response.data;
};

export const getCcpsById = async (id: string) => {
  const response = await api.get(`/ccps/${id}`);
  return response.data;
};

export const updateCcps = async (id: string, ccps: Partial<Ccps>) => {
  const response = await api.put(`/ccps/${id}`, ccps);
  return response.data;
};

export const deleteCcps = async (id: string) => {
  await api.delete(`/ccps/${id}`);
};
