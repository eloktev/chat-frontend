import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://127.0.0.1:8000',
  baseURL: 'https://api.secret-talks.app',
});

export default api;