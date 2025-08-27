import axios from 'axios';
import { API_TIMEOUT, API_URL } from '../utils/config';
import { executeSmartOperation } from '../utils/connectionManager';
import { getLocalProblems, saveProblems } from '../utils/localdb';
import { getToken } from '../utils/auth';

export async function getRandomAlgebraQuestion(callback: (q: any) => void) {
  console.log('🔢 Obteniendo pregunta de álgebra...');
  
  // Operación online
  const getOnlineQuestion = async () => {
    console.log('✅ Obteniendo pregunta de álgebra ONLINE');
    console.log(`🌐 URL: ${API_URL}/problems/algebra`);
    
    // Obtener token de autorización
    const token = await getToken();
    console.log('🔐 Token obtenido:', !!token);
    
    const headers: any = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const res = await axios.get(`${API_URL}/problems/algebra`, {
      timeout: API_TIMEOUT,
      headers
    });
    
    console.log('📊 Respuesta del servidor:', res.status, res.data?.length || 0, 'items');
    
    if (res.data && res.data.length > 0) {
      console.log(`📥 Sincronizando ${res.data.length} problemas de álgebra en BD local`);
      // Sincronizar problemas en BD local (no await para no bloquear)
      saveProblems(res.data);
      
      const idx = Math.floor(Math.random() * res.data.length);
      console.log('📤 Enviando pregunta de álgebra desde servidor online');
      return { ...res.data[idx], source: 'online' };
    } else {
      throw new Error('No hay preguntas de álgebra disponibles en el servidor');
    }
  };

  // Operación offline
  const getOfflineQuestion = async () => {
    console.log('📱 Obteniendo pregunta de álgebra OFFLINE');
    const problems = await getLocalProblems();
    
    // Filtrar problemas de álgebra
    const algebraProblems = problems.filter(p => p.topic === 'algebra');
    console.log(`🔢 Problemas de álgebra encontrados: ${algebraProblems.length}`);
    
    if (algebraProblems.length === 0) {
      throw new Error('No hay preguntas de álgebra disponibles offline. Conecta a internet para descargar preguntas.');
    }
    
    const idx = Math.floor(Math.random() * algebraProblems.length);
    console.log('📤 Enviando pregunta de álgebra desde BD local');
    return { ...algebraProblems[idx], source: 'offline' };
  };

  // Usar el sistema inteligente
  try {
    const question = await executeSmartOperation(getOnlineQuestion, getOfflineQuestion);
    callback(question);
  } catch (error) {
    console.log('❌ Error obteniendo pregunta de álgebra:', error);
    callback(null);
  }
}
