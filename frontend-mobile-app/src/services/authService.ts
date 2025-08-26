import axios from 'axios';
import { API_TIMEOUT, API_URL } from '../utils/config';
import { executeSmartOperation } from '../utils/connectionManager';
import {
  comparePassword,
  getLocalUser,
  saveUser
} from '../utils/localdb';

export async function login(identifier: string, password: string) {
  console.log(`🔐 Intentando login para: ${identifier}`);
  
  // Operación online
  const onlineLogin = async () => {
    console.log('✅ Ejecutando LOGIN ONLINE');
    const res = await axios.post(`${API_URL}/users/login`, { identifier, password }, {
      timeout: API_TIMEOUT
    });
    
    if (res.data && res.data.success !== false) {
      console.log('✅ Login exitoso desde servidor');
      console.log('📋 Datos de respuesta del servidor:', JSON.stringify(res.data, null, 2));
      
      // Guardar usuario en BD local para futuro uso offline
      try {
        if (res.data.user) {
          await saveUser({
            identifier: res.data.user.identifier,
            name: res.data.user.name,
            password: password, // saveUser se encarga del hash
            role: res.data.user.role
          });
          console.log('👤 Usuario sincronizado en BD local');
        }
      } catch (saveError) {
        console.log('⚠️ Error al sincronizar usuario en BD local:', saveError);
        // No fallar el login por esto
      }
      
      console.log('🎯 Retornando respuesta de login online exitoso');
      return {
        success: true,
        token: res.data.token,
        user: res.data.user,
        source: 'online'
      };
    } else {
      console.log('❌ Login fallido en servidor - respuesta indica fallo');
      console.log('📋 Datos de respuesta fallida:', JSON.stringify(res.data, null, 2));
      throw new Error('Login fallido en servidor');
    }
  };

  // Operación offline
  const offlineLogin = async () => {
    console.log('📱 Ejecutando LOGIN OFFLINE');
    const user = await getLocalUser(identifier);
    
    if (!user) {
      console.log('❌ Usuario no encontrado en BD local');
      throw new Error('Usuario no encontrado (offline)');
    }
    
    console.log('👤 Usuario encontrado en BD local:', user.identifier);
    console.log('🔍 Verificando contraseña...');
    
    // Verificar que la contraseña almacenada existe y es string
    if (!user.password || typeof user.password !== 'string') {
      console.log('❌ Contraseña inválida en BD local. Tipo:', typeof user.password, 'Valor:', user.password);
      throw new Error('Datos de usuario corruptos (offline)');
    }
    
    // Verificar contraseña
    const isValidPassword = comparePassword(password, user.password);
    console.log('🔍 Resultado de comparación:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('❌ Contraseña incorrecta en BD local');
      throw new Error('Contraseña incorrecta (offline)');
    }
    
    console.log('✅ Login offline exitoso');
    return {
      success: true,
      token: `offline_${identifier}_${Date.now()}`, // Token simulado para offline
      user: {
        identifier: user.identifier,
        name: user.name,
        role: user.role
      },
      source: 'offline'
    };
  };

  // Usar el sistema inteligente para ejecutar la operación
  try {
    const result = await executeSmartOperation(onlineLogin, offlineLogin);
    return result;
  } catch (error) {
    console.log('❌ Error en login:', error);
    // Si ambas operaciones fallan, intentar offline una vez más
    try {
      return await offlineLogin();
    } catch (offlineError) {
      throw error; // Lanzar el error original
    }
  }
}

export async function register(identifier: string, password: string, role: string, name: string) {
  console.log(`📝 Intentando registro para: ${identifier}`);
  console.log('🌐 REGISTRO REQUIERE CONEXIÓN ONLINE OBLIGATORIA');
  
  try {
    // Verificar conexión online de forma rápida
    console.log('🔍 Verificando conexión online para registro...');
    const { connectionManager } = await import('../utils/connectionManager');
    const currentState = await connectionManager.getConnectionState({ 
      forceCheck: true, 
      useCache: false,
      fastCheck: true 
    });
    
    if (currentState !== 'online') {
      console.log('❌ Registro rechazado: No hay conexión online');
      throw new Error('El registro de usuarios requiere conexión a internet. Verifica tu conectividad e intenta nuevamente.');
    }
    
    console.log('✅ Conexión online confirmada, procediendo con registro...');
    
    // Realizar registro en servidor
    console.log('🌐 Registrando usuario en servidor...');
    const res = await axios.post(`${API_URL}/users`, { identifier, password, role, name }, {
      timeout: API_TIMEOUT
    });
    
    if (!res.data || res.data.success === false) {
      console.log('❌ Registro fallido en servidor');
      console.log('📋 Respuesta del servidor:', res.data);
      throw new Error('El servidor rechazó el registro. Verifica que el usuario no exista ya.');
    }
    
    console.log('✅ Usuario registrado exitosamente en servidor');
    console.log('📋 Datos del servidor:', res.data);
    
    // SOLO después del éxito online, guardar en BD local
    try {
      console.log('💾 Sincronizando usuario registrado en BD local...');
      await saveUser({
        identifier,
        name,
        password: password, // saveUser se encarga del hash
        role
      });
      console.log('✅ Usuario sincronizado en BD local exitosamente');
    } catch (saveError) {
      console.log('⚠️ Error al sincronizar en BD local:', saveError);
      // IMPORTANTE: El registro online ya fue exitoso, así que no fallamos
      // Solo loggeamos el problema de sincronización local
      console.log('⚠️ ADVERTENCIA: Usuario registrado en servidor pero falló sincronización local');
    }
    
    return { 
      success: true, 
      source: 'online',
      message: 'Usuario registrado exitosamente'
    };
    
  } catch (error) {
    console.log('❌ Error en registro:', error);
    
    // Proporcionar mensajes específicos según el tipo de error
    if (error instanceof Error) {
      if (error.message.includes('conexión') || error.message.includes('conectividad')) {
        throw new Error('No se puede registrar usuarios sin conexión a internet. Verifica tu conectividad e intenta nuevamente.');
      } else if (error.message.includes('timeout')) {
        throw new Error('Tiempo de espera agotado. Verifica tu conexión a internet e intenta nuevamente.');
      } else if (error.message.includes('Network Error')) {
        throw new Error('Error de red. Verifica tu conexión a internet e intenta nuevamente.');
      }
    }
    
    throw error; // Re-lanzar el error original si no es de conectividad
  }
}
