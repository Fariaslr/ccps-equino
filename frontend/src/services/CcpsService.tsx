import { Ccps } from "../models/Ccps";


export const ccpsService = {
  /**
   * Lista todos os CCPS associados a um veterinário específico
   * @param veterinarioId ID do veterinário
   * @returns Promise com array de CCPS
   */
  async listarPorVeterinario(veterinarioId: string): Promise<Ccps[]> {
    try {
      // Implementação real seria uma chamada à API:
      // const response = await api.get(`/ccps?veterinarioId=${veterinarioId}`);
      // return response.data;

      // Mock implementation:
      return new Promise((resolve) => {
        setTimeout(() => {
          const result = ccpsData.filter(ccps => ccps.veterinario.id === veterinarioId);
          console.log(`CCPS encontrados para veterinário ${veterinarioId}:`, result);
          resolve(result);
        }, 500); // Simula delay de rede
      });
    } catch (error) {
      console.error("Erro ao buscar CCPS por veterinário:", error);
      throw error;
    }
  },

  /**
   * Busca um CCPS específico por ID
   * @param ccpsId ID do CCPS
   * @returns Promise com o CCPS ou null se não encontrado
   */
  async buscarPorId(ccpsId: string): Promise<Ccps | null> {
    try {
      // Implementação real:
      // const response = await api.get(`/ccps/${ccpsId}`);
      // return response.data;

      // Mock implementation:
      return new Promise((resolve) => {
        setTimeout(() => {
          const result = ccpsData.find(ccps => ccps.id === ccpsId) || null;
          console.log(`CCPS encontrado para ID ${ccpsId}:`, result);
          resolve(result);
        }, 500);
      });
    } catch (error) {
      console.error("Erro ao buscar CCPS por ID:", error);
      throw error;
    }
  },

  /**
   * Lista todos os CCPS (para administradores)
   * @returns Promise com array de todos os CCPS
   */
  async listarTodos(): Promise<Ccps[]> {
    try {
      // Implementação real:
      // const response = await api.get('/ccps');
      // return response.data;

      // Mock implementation:
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Todos os CCPS:", ccpsData);
          resolve([...ccpsData]);
        }, 500);
      });
    } catch (error) {
      console.error("Erro ao listar todos os CCPS:", error);
      throw error;
    }
  }
};