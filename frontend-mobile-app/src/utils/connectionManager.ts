import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from './config';

// Estados de conexión
export enum ConnectionState {
  UNKNOWN = 'unknown',
  ONLINE = 'online', 
  OFFLINE = 'offline'
}

// Configuración del manager
const CONFIG = {
  FAST_TIMEOUT: 800,      // Timeout súper rápido para verificación
  NORMAL_TIMEOUT: 2000,   // Timeout normal
  CACHE_DURATION: 10000,  // 10 segundos de cache
  MAX_RETRY_ATTEMPTS: 2,
  STORAGE_KEY: 'connection_state_history'
};

class ConnectionManager {
  private lastKnownState: ConnectionState = ConnectionState.UNKNOWN;
  private lastCheckTime: number = 0;
  private checkInProgress: boolean = false;
  private stateHistory: ConnectionState[] = [];

  constructor() {
    this.loadStateHistory();
  }

  // Cargar historial de estados desde AsyncStorage
  private async loadStateHistory() {
    try {
      const stored = await AsyncStorage.getItem(CONFIG.STORAGE_KEY);
      if (stored) {
        this.stateHistory = JSON.parse(stored);
        if (this.stateHistory.length > 0) {
          this.lastKnownState = this.stateHistory[this.stateHistory.length - 1];
        }
      }
    } catch (error) {
      console.log('⚠️ Error cargando historial de conexión:', error);
    }
  }

  // Guardar estado en historial
  private async saveStateToHistory(state: ConnectionState) {
    try {
      this.stateHistory.push(state);
      // Mantener solo los últimos 10 estados
      if (this.stateHistory.length > 10) {
        this.stateHistory = this.stateHistory.slice(-10);
      }
      await AsyncStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(this.stateHistory));
    } catch (error) {
      console.log('⚠️ Error guardando historial de conexión:', error);
    }
  }

  // Predecir el estado más probable basado en historial
  private predictMostLikelyState(): ConnectionState {
    if (this.stateHistory.length === 0) {
      return ConnectionState.ONLINE; // Por defecto intentar online
    }

    // Analizar últimos 5 estados
    const recentStates = this.stateHistory.slice(-5);
    const onlineCount = recentStates.filter(s => s === ConnectionState.ONLINE).length;
    const offlineCount = recentStates.filter(s => s === ConnectionState.OFFLINE).length;

    // Si hay más estados offline recientes, empezar offline
    if (offlineCount > onlineCount) {
      return ConnectionState.OFFLINE;
    }
    
    return ConnectionState.ONLINE;
  }

  // Verificación rápida de conexión (no bloquea)
  private async quickConnectionCheck(): Promise<ConnectionState> {
    try {
      await axios.get(`${API_URL}/health`, {
        timeout: CONFIG.FAST_TIMEOUT // Timeout súper rápido
      });
      return ConnectionState.ONLINE;
    } catch (error) {
      return ConnectionState.OFFLINE;
    }
  }

  // Verificación completa de conexión
  private async fullConnectionCheck(): Promise<ConnectionState> {
    let attempts = 0;
    
    while (attempts < CONFIG.MAX_RETRY_ATTEMPTS) {
      try {
        await axios.get(`${API_URL}/health`, {
          timeout: CONFIG.NORMAL_TIMEOUT
        });
        return ConnectionState.ONLINE;
      } catch (error) {
        attempts++;
        if (attempts < CONFIG.MAX_RETRY_ATTEMPTS) {
          // Esperar un poco antes del siguiente intento
          await new Promise(resolve => setTimeout(resolve, 200));
        }
      }
    }
    
    return ConnectionState.OFFLINE;
  }

  // Método principal: obtener estado de conexión inteligente
  async getConnectionState(options?: {
    forceCheck?: boolean;
    useCache?: boolean;
    fastCheck?: boolean;
  }): Promise<ConnectionState> {
    const {
      forceCheck = false,
      useCache = true,
      fastCheck = false
    } = options || {};

    const now = Date.now();

    // Si hay un check en progreso, esperar un poco
    if (this.checkInProgress) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return this.lastKnownState;
    }

    // Usar cache si está disponible y no es muy antiguo
    if (useCache && !forceCheck && (now - this.lastCheckTime) < CONFIG.CACHE_DURATION) {
      console.log(`📋 Usando estado en cache: ${this.lastKnownState}`);
      return this.lastKnownState;
    }

    this.checkInProgress = true;

    try {
      console.log('🔄 Verificando estado de conexión...');
      
      let newState: ConnectionState;
      
      if (fastCheck) {
        newState = await this.quickConnectionCheck();
      } else {
        newState = await this.fullConnectionCheck();
      }

      // Actualizar estado solo si cambió
      if (newState !== this.lastKnownState) {
        console.log(`🔄 Estado de conexión cambió: ${this.lastKnownState} → ${newState}`);
        this.lastKnownState = newState;
        await this.saveStateToHistory(newState);
      }

      this.lastCheckTime = now;
      return newState;

    } catch (error) {
      console.log('❌ Error verificando conexión:', error);
      return this.lastKnownState || ConnectionState.OFFLINE;
    } finally {
      this.checkInProgress = false;
    }
  }

  // Estrategia inteligente: empezar con el modo más probable
  async getSmartConnectionStrategy(): Promise<{
    startWith: ConnectionState;
    fallbackTo: ConnectionState;
    shouldVerify: boolean;
  }> {
    const predicted = this.predictMostLikelyState();
    
    console.log(`🧠 Estrategia inteligente: empezar con ${predicted}`);
    
    return {
      startWith: predicted,
      fallbackTo: predicted === ConnectionState.ONLINE ? ConnectionState.OFFLINE : ConnectionState.ONLINE,
      shouldVerify: true
    };
  }

  // Método para operaciones que necesitan saber el estado rápidamente
  async executeWithSmartFallback<T>(
    onlineOperation: () => Promise<T>,
    offlineOperation: () => Promise<T>,
    options?: {
      fastCheck?: boolean;
      preferOffline?: boolean;
    }
  ): Promise<T> {
    const { fastCheck = true, preferOffline = false } = options || {};
    
    // Obtener estrategia inteligente
    const strategy = await this.getSmartConnectionStrategy();
    
    // Si prefiere offline, empezar ahí
    const startMode = preferOffline ? ConnectionState.OFFLINE : strategy.startWith;
    
    console.log(`⚡ Ejecutando operación empezando en modo: ${startMode}`);
    
    if (startMode === ConnectionState.OFFLINE) {
      try {
        return await offlineOperation();
      } catch (error) {
        console.log('❌ Operación offline falló, intentando online...');
        return await onlineOperation();
      }
    } else {
      // Verificación rápida si estamos empezando online
      const currentState = await this.getConnectionState({ fastCheck, useCache: true });
      
      if (currentState === ConnectionState.ONLINE) {
        try {
          return await onlineOperation();
        } catch (error) {
          console.log('❌ Operación online falló, cambiando a offline...');
          // Actualizar estado a offline
          this.lastKnownState = ConnectionState.OFFLINE;
          await this.saveStateToHistory(ConnectionState.OFFLINE);
          return await offlineOperation();
        }
      } else {
        console.log('🔄 Estado verificado como offline, usando operación offline');
        return await offlineOperation();
      }
    }
  }

  // Forzar actualización del estado
  async refreshConnectionState(): Promise<ConnectionState> {
    return await this.getConnectionState({ forceCheck: true, useCache: false });
  }

  // Obtener estadísticas del historial
  getConnectionStats() {
    const total = this.stateHistory.length;
    const online = this.stateHistory.filter(s => s === ConnectionState.ONLINE).length;
    const offline = this.stateHistory.filter(s => s === ConnectionState.OFFLINE).length;
    
    return {
      total,
      online,
      offline,
      onlinePercentage: total > 0 ? Math.round((online / total) * 100) : 0,
      lastKnownState: this.lastKnownState,
      predictedNextState: this.predictMostLikelyState()
    };
  }
}

// Singleton instance
export const connectionManager = new ConnectionManager();

// Funciones helper para usar fácilmente
export async function isOnline(fastCheck: boolean = true): Promise<boolean> {
  const state = await connectionManager.getConnectionState({ fastCheck });
  return state === ConnectionState.ONLINE;
}

export async function executeSmartOperation<T>(
  onlineOp: () => Promise<T>,
  offlineOp: () => Promise<T>,
  preferOffline: boolean = false
): Promise<T> {
  return connectionManager.executeWithSmartFallback(onlineOp, offlineOp, { preferOffline });
}
