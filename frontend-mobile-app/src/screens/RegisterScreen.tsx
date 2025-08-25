import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { register } from '../services/authService';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const result = await register(identifier, password, role, name);
      if (result.success) {
        router.replace('/login');
      } else {
        setError('Registration failed');
      }
    } catch (e) {
      setError('Error registering');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
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
      <Text style={styles.label}>Role:</Text>
      <View style={styles.roleContainer}>
        <Button title="Student" onPress={() => setRole('student')} color={role === 'student' ? '#007AFF' : '#ccc'} />
        <Button title="Teacher" onPress={() => setRole('teacher')} color={role === 'teacher' ? '#007AFF' : '#ccc'} />
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Button title="Register" onPress={handleRegister} />
      <Button title="Back to Login" onPress={() => router.push('/login')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, marginBottom: 16, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 12, borderRadius: 6 },
  label: { marginBottom: 8 },
  roleContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  error: { color: 'red', marginBottom: 8 },
});
