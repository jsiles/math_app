import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import { getRandomQuestion } from '../services/questionService';

export default function QuestionScreen() {
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [help, setHelp] = useState('');

  const fetchQuestion = async () => {
    setLoading(true);
    setHelp('');
    const q = await getRandomQuestion();
    setQuestion(q);
    setLoading(false);
  };

  const handleHelp = async () => {
    // Simulación de ayuda paso a paso
    if (question) {
      setHelp('Step-by-step solution coming soon...');
      // Aquí se puede integrar ChatGPT o IA
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Get Random Question" onPress={fetchQuestion} />
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
});
