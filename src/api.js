import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.secret-talks.app',
});

export default api;