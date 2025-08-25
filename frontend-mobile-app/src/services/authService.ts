import axios from 'axios';
import { API_URL } from '../utils/config';

export async function login(identifier: string, password: string) {
  try {
    const res = await axios.post(`${API_URL}/users/login`, { identifier, password });
    return res.data;
  } catch (e) {
    return { success: false };
  }
}

export async function register(identifier: string, password: string, role: string, name: string) {
  try {
    const res = await axios.post(`${API_URL}/users`, { identifier, password, role, name });
    return { success: true };
  } catch (e) {
    return { success: false };
  }
}
