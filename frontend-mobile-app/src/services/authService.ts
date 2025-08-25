import axios from 'axios';

const API_URL = 'http://10.0.2.2:3000/users'; // Cambia la URL según tu backend y red

export async function login(identifier: string, password: string) {
  try {
    const res = await axios.post(`${API_URL}/login`, { identifier, password });
    return res.data;
  } catch (e) {
    return { success: false };
  }
}

export async function register(identifier: string, password: string, role: string, name: string) {
  try {
    const res = await axios.post(API_URL, { identifier, password, role, name });
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
