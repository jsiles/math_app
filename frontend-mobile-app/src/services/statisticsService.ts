import axios from 'axios';
import { API_TIMEOUT, API_URL } from '../utils/config';
import { getLocalProblems } from '../utils/localdb';

export async function getRandomStatisticsQuestion(callback: (q: any) => void) {
  try {
    console.log(`📊 Obteniendo pregunta de estadística (timeout: ${API_TIMEOUT}ms)`);
    const res = await axios.get(`${API_URL}/problems/statistics`, {
      timeout: API_TIMEOUT
    });
    if (res.data && res.data.length > 0) {
      const idx = Math.floor(Math.random() * res.data.length);
      console.log('✅ Pregunta de estadística obtenida desde servidor online');
      callback({ ...res.data[idx], source: 'online' });
      return;
    }
  } catch (e) {
    console.log('❌ Error al obtener pregunta online, intentando offline:', e);
    // fallback to local DB
    try {
      const problems = await getLocalProblems(); // Ahora devuelve datos
      console.log(`📱 Consultando BD local - Encontrados: ${problems.length} problemas`);
      
      // Filtrar problemas de estadística
      const statProblems = problems.filter(p => p.topic === 'statistics');
      console.log(`📊 Problemas de estadística encontrados: ${statProblems.length}`);
      
      if (statProblems.length > 0) {
        const idx = Math.floor(Math.random() * statProblems.length);
        console.log('📤 Enviando pregunta de estadística desde BD local (offline)');
        callback({ ...statProblems[idx], source: 'offline' });
      } else {
        console.log('❌ No hay preguntas de estadística en BD local');
        callback(null);
      }
    } catch (error) {
      console.log('❌ Error al consultar BD local:', error);
      callback(null);
    }
  }
}
