import axios from 'axios';
import { API_TIMEOUT, API_URL } from '../utils/config';
import { getLocalProblems } from '../utils/localdb';

export async function getRandomTrigonometryQuestion(callback: (q: any) => void) {
  try {
    console.log(`📏 Obteniendo pregunta de trigonometría (timeout: ${API_TIMEOUT}ms)`);
    const res = await axios.get(`${API_URL}/problems/trigonometry`, {
      timeout: API_TIMEOUT
    });
    if (res.data && res.data.length > 0) {
      const idx = Math.floor(Math.random() * res.data.length);
      console.log('✅ Pregunta de trigonometría obtenida desde servidor online');
      callback({ ...res.data[idx], source: 'online' });
      return;
    }
  } catch (e) {
    console.log('❌ Error al obtener pregunta online, intentando offline:', e);
    // fallback to local DB
    try {
      const problems = await getLocalProblems(); // Ahora devuelve datos
      console.log(`📱 Consultando BD local - Encontrados: ${problems.length} problemas`);
      
      // Filtrar problemas de trigonometría
      const trigProblems = problems.filter(p => p.topic === 'trigonometry');
      console.log(`📏 Problemas de trigonometría encontrados: ${trigProblems.length}`);
      
      if (trigProblems.length > 0) {
        const idx = Math.floor(Math.random() * trigProblems.length);
        console.log('📤 Enviando pregunta de trigonometría desde BD local (offline)');
        callback({ ...trigProblems[idx], source: 'offline' });
      } else {
        console.log('❌ No hay preguntas de trigonometría en BD local');
        callback(null);
      }
    } catch (error) {
      console.log('❌ Error al consultar BD local:', error);
      callback(null);
    }
  }
}
