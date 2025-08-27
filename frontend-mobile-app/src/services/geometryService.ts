import axios from 'axios';
import { API_TIMEOUT, API_URL } from '../utils/config';
import { executeSmartOperation } from '../utils/connectionManager';
import { getLocalProblems, saveProblems } from '../utils/localdb';
import { getToken } from '../utils/auth';

export async function getRandomGeometryQuestion(callback: (q: any) => void) {
  console.log('📐 Obteniendo pregunta de geometría...');
  
  // Operación online
  const getOnlineQuestion = async () => {
    console.log('✅ Obteniendo pregunta de geometría ONLINE');
    console.log(`🌐 URL: ${API_URL}/problems/geometry`);
    
    // Obtener token de autorización
    const token = await getToken();
    console.log('🔐 Token obtenido:', !!token);
    
    const headers: any = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const res = await axios.get(`${API_URL}/problems/geometry`, {
      timeout: API_TIMEOUT,
      headers
    });
    
    console.log('📊 Respuesta del servidor:', res.status, res.data?.length || 0, 'items');
    
    if (res.data && res.data.length > 0) {
      console.log(`📥 Sincronizando ${res.data.length} problemas de geometría en BD local`);
      // Sincronizar problemas en BD local (no await para no bloquear)
      saveProblems(res.data);
      
      const idx = Math.floor(Math.random() * res.data.length);
      console.log('📤 Enviando pregunta de geometría desde servidor online');
      return { ...res.data[idx], source: 'online' };
    } else {
      throw new Error('No hay preguntas de geometría disponibles en el servidor');
    }
  };

  // Operación offline
  const getOfflineQuestion = async () => {
    console.log('📱 Obteniendo pregunta de geometría OFFLINE');
    const problems = await getLocalProblems();
    console.log(`📱 Encontrados ${problems.length} problemas en BD local`);
    
    // Debug: mostrar los topics disponibles
    const topics = [...new Set(problems.map(p => p.topic))];
    console.log('📚 Topics disponibles en BD:', topics);
    
    // Filtrar problemas de geometría
    const geometryProblems = problems.filter(p => p.topic === 'geometry');
    console.log(`📐 Problemas de geometría encontrados: ${geometryProblems.length}`);
    
    if (geometryProblems.length === 0) {
      throw new Error('No hay preguntas de geometría disponibles offline. Conecta a internet para descargar preguntas.');
    }
    
    const idx = Math.floor(Math.random() * geometryProblems.length);
    console.log('📤 Enviando pregunta de geometría desde BD local');
    return { ...geometryProblems[idx], source: 'offline' };
  };

  // Usar el sistema inteligente
  try {
    const question = await executeSmartOperation(getOnlineQuestion, getOfflineQuestion);
    callback(question);
  } catch (error) {
    console.log('❌ Error obteniendo pregunta de geometría:', error);
    callback(null);
  }
}
