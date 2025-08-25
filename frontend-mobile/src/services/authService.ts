import axios from 'axios';

const API_URL = 'http://localhost:3000/users'; // Cambia la URL según tu backend

export async function login(identifier: string, password: string) {
  try {
    const res = await axios.post(`${API_URL}/login`, { identifier, password });
    return res.data;
  } catch (e) {
    return { success: false };
  }
}

export async function register(identifier: string, password: string, role: string) {
  try {
    const res = await axios.post(API_URL, { identifier, password, role });
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
