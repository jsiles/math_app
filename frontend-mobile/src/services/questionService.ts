import axios from 'axios';

const API_URL = 'http://localhost:3000/algebra'; // Cambia la URL según el tipo de pregunta

export async function getRandomQuestion() {
  try {
    const res = await axios.get(API_URL);
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
