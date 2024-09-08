import axios from 'axios';

const apiUrl = axios.create({
  baseURL: 'http://localhost:3000' // URL da API simulada com db.json
});

export default apiUrl;
