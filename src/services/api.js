
import axios from 'axios';


const api = axios.create({
 baseURL: 'https://pkaislan234-36840.portmap.io:36840',
 //baseURL: 'http://192.168.1.207:8080',
  timeout: 30000,
});


api.interceptors.response.use(
  response => response,
  error => {
    console.log("Mensagem de erro: " + error.message)

    if (error.message === "Network Error") {
      console.log("é o erro")
      api.defaults.baseURL = 'https://pkaislan234-36840.portmap.io:36840';
      //return api.request(error.config);
    }
    return Promise.reject(error);
  }
);


export default api;