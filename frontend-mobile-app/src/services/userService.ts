import axios from 'axios';
import { API_TIMEOUT, API_URL } from '../utils/config';
import { getLocalUser } from '../utils/localdb';

export async function getUser(identifier: string, callback: (u: any) => void) {
  try {
    console.log(`👤 Obteniendo usuario: ${identifier} (timeout: ${API_TIMEOUT}ms)`);
    const res = await axios.get(`${API_URL}/users/${identifier}`, {
      timeout: API_TIMEOUT
    });
    if (res.data) {
      console.log('✅ Usuario obtenido desde servidor online');
      callback({ ...res.data, source: 'online' });
      return;
    }
  } catch (e) {
    console.log('❌ Error al obtener usuario online, intentando offline:', e);
    // fallback to local DB
    try {
      const user = await getLocalUser(identifier); // Ahora devuelve datos
      console.log(`📱 Usuario consultado en BD local: ${user ? 'Encontrado' : 'No encontrado'}`);
      
      if (user) {
        console.log('✅ Usuario obtenido desde BD local (offline)');
        callback({ ...user, source: 'offline' });
      } else {
        console.log('❌ Usuario no encontrado en BD local');
        callback(null);
      }
    } catch (error) {
      console.log('❌ Error al consultar BD local:', error);
      callback(null);
    }
  }
}
