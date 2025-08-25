import React, { useState } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { getRandomGeometryQuestion } from '../services/geometryService';

export default function GeometryScreen() {
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'online' | 'offline' | null>(null);

  const fetchQuestion = () => {
    setLoading(true);
    getRandomGeometryQuestion((q: any) => {
      setQuestion(q);
      setLoading(false);
      setMode(q && q.source === 'online' ? 'online' : 'offline');
    });
  };

  return (
    <View style={styles.container}>
      <Button title="Get Geometry Question" onPress={fetchQuestion} />
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
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  online: { color: 'green', margin: 8 },
  offline: { color: 'orange', margin: 8 },
  questionBox: { backgroundColor: '#f2f2f2', padding: 16, borderRadius: 8, marginTop: 16 },
  topic: { fontWeight: 'bold', fontSize: 16 },
  text: { fontSize: 16, marginTop: 8 },
});
