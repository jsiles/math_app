import axios from 'axios';
import { getToken } from '../utils/auth';
import { API_URL } from '../utils/config';
import { getLocalProblems, saveProblems } from '../utils/localdb';

const ALGEBRA_URL = `${API_URL}/problems/algebra`;

async function isBackendAvailable() {
  try {
    await axios.get(`${API_URL}/health`); // Debes crear un endpoint /health en el backend
    return true;
  } catch {
    return false;
  }
}

export async function getRandomQuestion(callback: (q: any) => void) {
  if (await isBackendAvailable()) {
    try {
      const token = await getToken();
      const res = await axios.get(ALGEBRA_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Selecciona una pregunta aleatoria del array
      if (Array.isArray(res.data) && res.data.length > 0) {
        saveProblems(res.data); // Sincroniza problemas en BD local
        const idx = Math.floor(Math.random() * res.data.length);
        callback({ ...res.data[idx], source: 'online' });
        return;
      }
      callback(null);
    } catch {
      callback(null);
    }
  } else {
    // Sin conexión, consulta desde BD local
    getLocalProblems((problems: any[]) => {
      if (Array.isArray(problems) && problems.length > 0) {
        const idx = Math.floor(Math.random() * problems.length);
        callback({ ...problems[idx], source: 'offline' });
      } else {
        callback(null);
      }
    });
  }
}
