import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://192.168.3.25:8000',
  withCredentials: true, 
});

export { api };