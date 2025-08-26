import axios from 'axios';
import { API_TIMEOUT, API_URL } from '../utils/config';
import { getLocalProblems } from '../utils/localdb';

export async function getRandomGeometryQuestion(callback: (q: any) => void) {
  try {
    console.log(`📐 Obteniendo pregunta de geometría (timeout: ${API_TIMEOUT}ms)`);
    const res = await axios.get(`${API_URL}/problems/geometry`, {
      timeout: API_TIMEOUT
    });
    if (res.data && res.data.length > 0) {
      const idx = Math.floor(Math.random() * res.data.length);
      console.log('✅ Pregunta de geometría obtenida desde servidor online');
      callback({ ...res.data[idx], source: 'online' });
      return;
    }
  } catch (e) {
    console.log('❌ Error al obtener pregunta online, intentando offline:', e);
    // fallback to local DB
    try {
      const problems = await getLocalProblems(); // Ahora devuelve datos
      console.log(`📱 Consultando BD local - Encontrados: ${problems.length} problemas`);
      
      // Filtrar problemas de geometría
      const geometryProblems = problems.filter(p => p.topic === 'geometry');
      console.log(`📐 Problemas de geometría encontrados: ${geometryProblems.length}`);
      
      if (geometryProblems.length > 0) {
        const idx = Math.floor(Math.random() * geometryProblems.length);
        console.log('📤 Enviando pregunta de geometría desde BD local (offline)');
        callback({ ...geometryProblems[idx], source: 'offline' });
      } else {
        console.log('❌ No hay preguntas de geometría en BD local');
        callback(null);
      }
    } catch (error) {
      console.log('❌ Error al consultar BD local:', error);
      callback(null);
    }
  }
}
