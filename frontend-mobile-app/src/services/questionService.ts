import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = 'http://10.0.2.2:3000/problems/algebra'; // Cambia la URL según el tipo de pregunta

export async function getRandomQuestion() {
  try {
    const token = await getToken();
    const res = await axios.get(API_URL, {
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
