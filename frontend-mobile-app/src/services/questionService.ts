import axios from 'axios';
import { getToken } from '../utils/auth';
import { API_TIMEOUT, API_URL } from '../utils/config';
import { executeSmartOperation } from '../utils/connectionManager';
import { getLocalProblems, saveProblems } from '../utils/localdb';

const ALGEBRA_URL = `${API_URL}/problems/algebra`;

export async function getRandomQuestion(callback: (q: any) => void) {
  console.log('🔍 Obteniendo pregunta aleatoria...');
  
  // Operación online
  const getOnlineQuestion = async () => {
    console.log('✅ Obteniendo pregunta ONLINE');
    const token = await getToken();
    const res = await axios.get(ALGEBRA_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: API_TIMEOUT
    });
    
    // Selecciona una pregunta aleatoria del array
    if (Array.isArray(res.data) && res.data.length > 0) {
      console.log(`📥 Sincronizando ${res.data.length} problemas en BD local`);
      saveProblems(res.data); // Sincroniza problemas en BD local (no await para no bloquear)
      const idx = Math.floor(Math.random() * res.data.length);
      console.log('📤 Enviando pregunta desde servidor online');
      return { ...res.data[idx], source: 'online' };
    } else {
      throw new Error('No hay preguntas disponibles en el servidor');
    }
  };

  // Operación offline
  const getOfflineQuestion = async () => {
    console.log('� Obteniendo pregunta OFFLINE');
    const problems = await getLocalProblems();
    
    // Filtrar problemas de álgebra
    const algebraProblems = problems.filter(p => p.topic === 'algebra');
    console.log(`🧮 Problemas de álgebra encontrados: ${algebraProblems.length}`);
    
    if (algebraProblems.length === 0) {
      throw new Error('No hay preguntas de álgebra disponibles offline. Conecta a internet para descargar preguntas.');
    }
    
    const idx = Math.floor(Math.random() * algebraProblems.length);
    console.log('📤 Enviando pregunta desde BD local');
    return { ...algebraProblems[idx], source: 'offline' };
  };

  // Usar el sistema inteligente
  try {
    const question = await executeSmartOperation(getOnlineQuestion, getOfflineQuestion);
    callback(question);
  } catch (error) {
    console.log('❌ Error obteniendo pregunta:', error);
    callback(null);
  }
}
