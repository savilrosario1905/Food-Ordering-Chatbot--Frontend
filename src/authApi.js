// authApi.js
import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;  
  }
};

export const signIn = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signin`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
