import axios from 'axios';
import { API_TIMEOUT, API_URL } from '../utils/config';
import { executeSmartOperation } from '../utils/connectionManager';
import { getLocalProblems, saveProblems } from '../utils/localdb';
import { getToken } from '../utils/auth';

export async function getRandomTrigonometryQuestion(callback: (q: any) => void) {
  console.log('📏 Obteniendo pregunta de trigonometría...');
  
  // Operación online
  const getOnlineQuestion = async () => {
    console.log('✅ Obteniendo pregunta de trigonometría ONLINE');
    console.log(`🌐 URL: ${API_URL}/problems/trigonometry`);
    
    // Obtener token de autorización
    const token = await getToken();
    console.log('🔐 Token obtenido:', !!token);
    
    const headers: any = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    
    const res = await axios.get(`${API_URL}/problems/trigonometry`, {
      timeout: API_TIMEOUT,
      headers
    });
    
    console.log('📊 Respuesta del servidor:', res.status, res.data?.length || 0, 'items');
    
    if (res.data && res.data.length > 0) {
      console.log(`📥 Sincronizando ${res.data.length} problemas de trigonometría en BD local`);
      // Sincronizar problemas en BD local (no await para no bloquear)
      saveProblems(res.data);
      
      const idx = Math.floor(Math.random() * res.data.length);
      console.log('📤 Enviando pregunta de trigonometría desde servidor online');
      return { ...res.data[idx], source: 'online' };
    } else {
      throw new Error('No hay preguntas de trigonometría disponibles en el servidor');
    }
  };

  // Operación offline
  const getOfflineQuestion = async () => {
    console.log('📱 Obteniendo pregunta de trigonometría OFFLINE');
    const problems = await getLocalProblems();
    console.log(`📱 Encontrados ${problems.length} problemas en BD local`);
    
    // Debug: mostrar los topics disponibles
    const topics = [...new Set(problems.map(p => p.topic))];
    console.log('📚 Topics disponibles en BD:', topics);
    
    // Filtrar problemas de trigonometría
    const trigProblems = problems.filter(p => p.topic === 'trigonometry');
    console.log(`📏 Problemas de trigonometría encontrados: ${trigProblems.length}`);
    
    if (trigProblems.length === 0) {
      throw new Error('No hay preguntas de trigonometría disponibles offline. Conecta a internet para descargar preguntas.');
    }
    
    const idx = Math.floor(Math.random() * trigProblems.length);
    console.log('📤 Enviando pregunta de trigonometría desde BD local');
    return { ...trigProblems[idx], source: 'offline' };
  };

  // Usar el sistema inteligente
  try {
    const question = await executeSmartOperation(getOnlineQuestion, getOfflineQuestion);
    callback(question);
  } catch (error) {
    console.log('❌ Error obteniendo pregunta de trigonometría:', error);
    callback(null);
  }
}
