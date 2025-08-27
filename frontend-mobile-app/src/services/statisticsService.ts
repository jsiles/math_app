import axios from 'axios';
import { API_TIMEOUT, API_URL } from '../utils/config';
import { executeSmartOperation } from '../utils/connectionManager';
import { getLocalProblems, saveProblems } from '../utils/localdb';
import { getToken } from '../utils/auth';

export async function getRandomStatisticsQuestion(callback: (q: any) => void) {
  console.log('📊 Obteniendo pregunta de estadística...');
  
  // Operación online
  const getOnlineQuestion = async () => {
    console.log('✅ Obteniendo pregunta de estadística ONLINE');
    console.log(`🌐 URL: ${API_URL}/problems/statistics`);
    
    // Obtener token de autorización
    const token = await getToken();
    console.log('🔐 Token obtenido:', !!token);
    
    const headers: any = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const res = await axios.get(`${API_URL}/problems/statistics`, {
      timeout: API_TIMEOUT,
      headers
    });
    
    console.log('📊 Respuesta del servidor:', res.status, res.data?.length || 0, 'items');
    
    if (res.data && res.data.length > 0) {
      console.log(`📥 Sincronizando ${res.data.length} problemas de estadística en BD local`);
      // Sincronizar problemas en BD local (no await para no bloquear)
      saveProblems(res.data);
      
      const idx = Math.floor(Math.random() * res.data.length);
      console.log('📤 Enviando pregunta de estadística desde servidor online');
      return { ...res.data[idx], source: 'online' };
    } else {
      throw new Error('No hay preguntas de estadística disponibles en el servidor');
    }
  };

  // Operación offline
  const getOfflineQuestion = async () => {
    console.log('📱 Obteniendo pregunta de estadística OFFLINE');
    const problems = await getLocalProblems();
    console.log(`📱 Encontrados ${problems.length} problemas en BD local`);
    
    // Debug: mostrar los topics disponibles
    const topics = [...new Set(problems.map(p => p.topic))];
    console.log('📚 Topics disponibles en BD:', topics);
    
    // Filtrar problemas de estadística
    const statProblems = problems.filter(p => p.topic === 'statistics');
    console.log(`📊 Problemas de estadística encontrados: ${statProblems.length}`);
    
    if (statProblems.length === 0) {
      throw new Error('No hay preguntas de estadística disponibles offline. Conecta a internet para descargar preguntas.');
    }
    
    const idx = Math.floor(Math.random() * statProblems.length);
    console.log('📤 Enviando pregunta de estadística desde BD local');
    return { ...statProblems[idx], source: 'offline' };
  };

  // Usar el sistema inteligente
  try {
    const question = await executeSmartOperation(getOnlineQuestion, getOfflineQuestion);
    callback(question);
  } catch (error) {
    console.log('❌ Error obteniendo pregunta de estadística:', error);
    callback(null);
  }
}
