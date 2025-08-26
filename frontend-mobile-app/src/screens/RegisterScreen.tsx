import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { register } from '../services/authService';
import { connectionManager, ConnectionState } from '../utils/connectionManager';

export default function RegisterScreen() {
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.UNKNOWN);
  const router = useRouter();

  // Verificar estado de conexión al cargar
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

  const handleRegister = async () => {
    setError(''); // Limpiar errores previos
    setIsLoading(true);
    
    // Validaciones básicas
    if (!identifier.trim() || !name.trim() || !password.trim()) {
      setError('Todos los campos son obligatorios');
      setIsLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setIsLoading(false);
      return;
    }
    
    // Verificar conexión antes de intentar registro
    if (connectionState === ConnectionState.OFFLINE) {
      setError('⚠️ Conexión requerida: El registro de usuarios requiere conexión a internet para sincronizar con el servidor');
      setIsLoading(false);
      return;
    }
    
    try {
      console.log('🔐 Iniciando registro desde pantalla...');
      const result = await register(identifier, password, role, name);
      
      if (result.success) {
        console.log('✅ Registro exitoso, redirigiendo a login...');
        setError(''); // Limpiar errores
        
        Alert.alert(
          '✅ ¡Registro Exitoso!',
          'Usuario registrado correctamente. Ahora puedes iniciar sesión.',
          [{ text: 'OK', onPress: () => router.replace('/login') }]
        );
      } else {
        console.log('❌ Registro falló:', result);
        setError(result.message || 'Error en el registro');
      }
    } catch (e) {
      console.log('❌ Error capturado en pantalla de registro:', e);
      
      if (e instanceof Error) {
        // Mostrar el mensaje específico del error
        setError(e.message);
      } else {
        setError('Error inesperado durante el registro');
      }
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
      <Text style={styles.title}>Create Account</Text>
      
      {/* Indicador de conexión */}
      <View style={styles.connectionIndicator}>
        <Text style={styles.connectionText}>
          {getConnectionIcon()} {getConnectionText()}
        </Text>
        {connectionState === ConnectionState.OFFLINE && (
          <Text style={styles.connectionWarning}>
            ⚠️ Se requiere conexión para registrar usuarios
          </Text>
        )}
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Identifier"
        value={identifier}
        onChangeText={setIdentifier}
        editable={!isLoading}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!isLoading}
      />
      <Text style={styles.label}>Role:</Text>
      <View style={styles.roleContainer}>
        <Button 
          title="Student" 
          onPress={() => setRole('student')} 
          color={role === 'student' ? '#007AFF' : '#ccc'}
          disabled={isLoading}
        />
        <Button 
          title="Teacher" 
          onPress={() => setRole('teacher')} 
          color={role === 'teacher' ? '#007AFF' : '#ccc'}
          disabled={isLoading}
        />
      </View>
      
      {error ? <Text style={styles.error}>{error}</Text> : null}
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Registrando usuario...</Text>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Button 
            title="Register" 
            onPress={handleRegister}
            disabled={connectionState === ConnectionState.OFFLINE}
          />
          <Button 
            title="Back to Login" 
            onPress={() => router.push('/login')}
          />
        </View>
      )}
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
  connectionWarning: { 
    fontSize: 12, 
    color: '#ff6b6b', 
    textAlign: 'center',
    fontStyle: 'italic'
  },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 6 },
  label: { marginBottom: 8 },
  roleContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  error: { color: 'red', marginBottom: 8, textAlign: 'center', fontSize: 14 },
  loadingContainer: { 
    alignItems: 'center', 
    padding: 20 
  },
  loadingText: { 
    marginTop: 10, 
    fontSize: 16, 
    color: '#007AFF' 
  },
  buttonContainer: { 
    gap: 10 
  }
});
