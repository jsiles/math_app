import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import { getUser } from '../services/userService';

export default function UserScreen() {
  const [identifier, setIdentifier] = useState('');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'online' | 'offline' | null>(null);

  const fetchUser = () => {
    setLoading(true);
    getUser(identifier, (u: any) => {
      setUser(u);
      setLoading(false);
      setMode(u && u.source === 'online' ? 'online' : 'offline');
    });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter identifier"
        value={identifier}
        onChangeText={setIdentifier}
      />
      <Button title="Get User" onPress={fetchUser} />
      {mode && (
        <Text style={mode === 'online' ? styles.online : styles.offline}>
          {mode === 'online' ? '🟢 Online mode (synced)' : '🟠 Offline mode (local DB)'}
        </Text>
      )}
      {loading && <ActivityIndicator size="large" />}
      {user && (
        <View style={styles.userBox}>
          <Text style={styles.label}>Name: {user.name}</Text>
          <Text style={styles.label}>Role: {user.role}</Text>
          <Text style={styles.label}>Identifier: {user.identifier}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 16, width: '80%' },
  online: { color: 'green', margin: 8 },
  offline: { color: 'orange', margin: 8 },
  userBox: { backgroundColor: '#f2f2f2', padding: 16, borderRadius: 8, marginTop: 16 },
  label: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
});
