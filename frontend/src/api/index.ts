import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',  // Substitua pelo URL da sua API
  timeout: 10000,  // Timeout de 10 segundos
});

export default api;
