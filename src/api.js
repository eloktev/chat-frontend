import axios from 'axios';

const api = axios.create({
  baseURL: 'http://api.secret-talks.app',
});

export default api;