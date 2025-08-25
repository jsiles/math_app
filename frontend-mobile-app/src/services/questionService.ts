import axios from 'axios';
import { getToken } from '../utils/auth';
import { API_URL } from '../utils/config';

const ALGEBRA_URL = `${API_URL}/problems/algebra`;

export async function getRandomQuestion() {
  try {
    const token = await getToken();
    const res = await axios.get(ALGEBRA_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Selecciona una pregunta aleatoria del array
    if (Array.isArray(res.data) && res.data.length > 0) {
      const idx = Math.floor(Math.random() * res.data.length);
      return res.data[idx];
    }
    return null;
  } catch (e) {
    return null;
  }
}
