import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { login } from '../services/authService';
import { setToken } from '../utils/auth';
import { debugLocalDB } from '../utils/localdb'; // ← Agregar import

export default function LoginScreen() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  // 🔍 Debug de la BD al cargar el componente
  useEffect(() => {
    const runDebug = async () => {
      await debugLocalDB();
    };
    runDebug();
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 6 },
  error: { color: 'red', marginBottom: 8 },
});
