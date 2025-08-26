import axios from 'axios';
import { API_TIMEOUT, API_URL } from '../utils/config';
import { executeSmartOperation } from '../utils/connectionManager';
import { getLocalUser } from '../utils/localdb';

export async function getUser(identifier: string, callback: (u: any) => void) {
  console.log(`👤 Obteniendo usuario: ${identifier}...`);
  
  // Operación online
  const getOnlineUser = async () => {
    console.log('✅ Obteniendo usuario ONLINE');
    const res = await axios.get(`${API_URL}/users/${identifier}`, {
      timeout: API_TIMEOUT
    });
    
    if (res.data) {
      console.log('✅ Usuario obtenido desde servidor online');
      return { ...res.data, source: 'online' };
    } else {
      throw new Error('Usuario no encontrado en el servidor');
    }
  };

  // Operación offline
  const getOfflineUser = async () => {
    console.log('📱 Obteniendo usuario OFFLINE');
    const user = await getLocalUser(identifier);
    
    if (user) {
      console.log('✅ Usuario obtenido desde BD local (offline)');
      return { ...user, source: 'offline' };
    } else {
      throw new Error('Usuario no encontrado en BD local. Conecta a internet para buscar usuarios.');
    }
  };

  // Usar el sistema inteligente
  try {
    const user = await executeSmartOperation(getOnlineUser, getOfflineUser);
    callback(user);
  } catch (error) {
    console.log('❌ Error obteniendo usuario:', error);
    callback(null);
  }
}
