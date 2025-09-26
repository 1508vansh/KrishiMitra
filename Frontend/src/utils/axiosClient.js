import axios from 'axios';
const axiosClient = axios.create({
  //baseURL: 'http://localhost:5000',
  baseURL: 'https://krishimitra-production-68c9.up.railway.app',
  withCredentials:true,
  headers: {
    'Content-type': 'application/json'
  }
});

export default axiosClient;