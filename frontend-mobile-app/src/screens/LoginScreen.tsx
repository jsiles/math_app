// React and React Native imports
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

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
    try {
      const result = await login(identifier, password);
      if (result.success && result.token) {
        await setToken(result.token);
        router.replace('/question');
      } else {
        setError('Invalid credentials');
      }
    } catch (e) {
      setError('Login failed');
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
      <Text style={styles.title}>Login</Text>
      
      {/* Indicador de conexión */}
      <View style={styles.connectionIndicator}>
        <Text style={styles.connectionText}>
          {getConnectionIcon()} {getConnectionText()}
        </Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Identifier"
        value={identifier}
        onChangeText={setIdentifier}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
      <Button title="Create Account" onPress={() => router.push('/register')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  connectionIndicator: { 
    alignItems: 'center', 
    marginBottom: 16, 
    padding: 8, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 8 
  },
  connectionText: { 
    fontSize: 14, 
    fontWeight: '500',
    marginBottom: 4
  },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 6 },
  error: { color: 'red', marginBottom: 8 },
});
