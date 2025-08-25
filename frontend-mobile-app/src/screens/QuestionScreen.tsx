import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { getRandomQuestion } from '../services/questionService';
import { useRouter } from 'expo-router';
import { removeToken } from '../utils/auth';

export default function QuestionScreen() {
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [help, setHelp] = useState('');
  const [mode, setMode] = useState<'online' | 'offline' | null>(null);
  const router = useRouter();

  const fetchQuestion = () => {
    setLoading(true);
    setHelp('');
    getRandomQuestion((q: any) => {
      setQuestion(q);
      setLoading(false);
      setMode(q && q.source === 'online' ? 'online' : 'offline');
    });
  };

  const handleHelp = async () => {
    if (question) {
      setHelp('Step-by-step solution coming soon...');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await removeToken();
            router.replace('/home');
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Get Random Question" onPress={fetchQuestion} />
      <Button title="Logout" onPress={handleLogout} color="#d00" />
      {mode && (
        <Text style={mode === 'online' ? styles.online : styles.offline}>
          {mode === 'online' ? '🟢 Online mode (synced)' : '🟠 Offline mode (local DB)'}
        </Text>
      )}
      {loading && <ActivityIndicator size="large" />}
      {question && (
        <View style={styles.questionBox}>
          <Text style={styles.topic}>{question.topic}</Text>
          <Text style={styles.text}>{question.question}</Text>
          <Button title="Need Help?" onPress={handleHelp} />
          {help ? <Text style={styles.help}>{help}</Text> : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  questionBox: { marginTop: 24, padding: 16, borderWidth: 1, borderColor: '#eee', borderRadius: 8 },
  topic: { fontWeight: 'bold', marginBottom: 8 },
  text: { fontSize: 18, marginBottom: 12 },
  help: { color: '#007AFF', marginTop: 8 },
  online: { color: 'green', marginBottom: 8, textAlign: 'center', fontSize: 16 },
  offline: { color: 'orange', marginBottom: 8, textAlign: 'center', fontSize: 16 },
});
