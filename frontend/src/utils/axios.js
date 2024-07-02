import axios from 'axios';
import { baseURL } from './helpers';

// Create an Axios instance
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});

export { api };