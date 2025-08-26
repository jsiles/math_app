import axios from 'axios';
import { API_TIMEOUT, API_URL } from '../utils/config';
import { executeSmartOperation } from '../utils/connectionManager';
import { getLocalProblems, saveProblems } from '../utils/localdb';

export async function getRandomTrigonometryQuestion(callback: (q: any) => void) {
  console.log('📏 Obteniendo pregunta de trigonometría...');
  
  // Operación online
  const getOnlineQuestion = async () => {
    console.log('✅ Obteniendo pregunta de trigonometría ONLINE');
    const res = await axios.get(`${API_URL}/problems/trigonometry`, {
      timeout: API_TIMEOUT
    });
    
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
