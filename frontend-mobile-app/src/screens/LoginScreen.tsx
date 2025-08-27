// React and React Native imports
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ActivityIndicator } from 'react-native';

// Navigation imports
import { useRouter } from 'expo-router';

// Services imports
import { login } from '../services/authService';

// Utils imports
import { setToken } from '../utils/auth';
import { connectionManager, ConnectionState } from '../utils/connectionManager';
import { debugLocalDB } from '../utils/localdb';

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.UNKNOWN);
  const router = useRouter();

  // 🔍 Debug de la BD al cargar el componente
  useEffect(() => {
    const runDebug = async () => {
      await debugLocalDB();
    };
    runDebug();
  }, []);

  // Verificar estado de conexión al cargar y cada 5 segundos
  useEffect(() => {
    const checkConnection = async () => {
      const state = await connectionManager.getConnectionState({ forceCheck: false });
      setConnectionState(state);
    };
    
    checkConnection();
    // Actualizar cada 5 segundos
    const interval = setInterval(checkConnection, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleLogin = async () => {
    if (!identifier.trim() || !password.trim()) {
      setError('Por favor, completa todos los campos');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const result = await login(identifier, password);
      if (result.success && result.token) {
        await setToken(result.token);
        router.replace('/categories');
      } else {
        setError('Credenciales inválidas');
      }
    } catch (e) {
      setError('Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const getConnectionIcon = () => {
    switch (connectionState) {
      case ConnectionState.ONLINE:
        return '🟢';
      case ConnectionState.OFFLINE:
        return '🔴';
      default:
        return '⚪';
    }
  };

  const getConnectionText = () => {
    switch (connectionState) {
      case ConnectionState.ONLINE:
        return 'En línea';
      case ConnectionState.OFFLINE:
        return 'Sin conexión';
      default:
        return 'Verificando...';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>📚 Math App</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
      </View>
      
      {/* Indicador de conexión */}
      <View style={styles.connectionIndicator}>
        <Text style={styles.connectionText}>
          {getConnectionIcon()} {getConnectionText()}
        </Text>
      </View>
      
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Usuario o Email"
          placeholderTextColor="#999"
          value={identifier}
          onChangeText={setIdentifier}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.primaryButton, isLoading && styles.disabledButton]} 
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => router.push('/register')}
            disabled={isLoading}
          >
            <Text style={styles.secondaryButtonText}>Crear Cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA',
    padding: 24 
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 40,
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
    textAlign: 'center' 
  },
  subtitle: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  connectionIndicator: { 
    alignItems: 'center', 
    marginBottom: 24, 
    padding: 12, 
    backgroundColor: '#FFFFFF', 
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  connectionText: { 
    fontSize: 14, 
    fontWeight: '500',
    color: '#34495E',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  input: { 
    backgroundColor: '#FFFFFF',
    borderWidth: 1, 
    borderColor: '#E1E8ED', 
    padding: 16, 
    marginBottom: 16, 
    borderRadius: 12,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  error: { 
    color: '#E74C3C', 
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#3498DB',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#3498DB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  secondaryButtonText: {
    color: '#3498DB',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledButton: {
    backgroundColor: '#BDC3C7',
    shadowOpacity: 0,
    elevation: 0,
  },
});
