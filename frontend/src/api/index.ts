import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.35.4.19:8080/', 
  timeout: 10000,  
});

api.interceptors.response.use(
  response => response,
  error => {
    if (!error.response) {
      console.error("Erro de rede ou servidor", error);
      return Promise.reject(new Error("Erro de rede ou servidor"));
    }
    return Promise.reject(error);
  }
);

export default api;
