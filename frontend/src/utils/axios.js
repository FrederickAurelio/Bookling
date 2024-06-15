import axios from 'axios';

const baseURL = 'https://your-api-url.com';

// Create an Axios instance
const api = axios.create({
    baseURL: baseURL,
});

export { api };