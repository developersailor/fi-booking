import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',  // Update the base URL as needed
});

export default axiosInstance;
