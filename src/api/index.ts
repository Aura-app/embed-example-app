import axios from 'axios';
import { API_URL } from '@env';

const apiClient = axios.create({
  baseURL: process.env.API_URL, // Base URL from .env file
  headers: {
    'Content-Type': 'application/json',
  },
  
});

export const getToken = async () => {
    console.log('API URL:', API_URL);
    console.log('Request body:', {
        clientId: process.env.client_id,
        clientSecret: process.env.client_secret,
      });
  try {
    const response = await apiClient.post('/oauth/token', {
        clientId: process.env.client_id,
        clientSecret: process.env.client_secret,
    });
    console.log('Token response:', response.data);
    return response.data.accessToken;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

export default apiClient;