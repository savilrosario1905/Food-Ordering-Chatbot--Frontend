// menuApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getMenu = async () => {
  try {
    const response = await axios.get(`${API_URL}/menu`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
