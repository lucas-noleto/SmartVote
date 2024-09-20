import axios from 'axios';

const apiUrl = axios.create({
  baseURL: 'http://localhost:5000' 
});

export default apiUrl;
