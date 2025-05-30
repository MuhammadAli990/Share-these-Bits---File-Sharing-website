import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Accept': 'application/json',
  },
});

export default axiosInstance;
