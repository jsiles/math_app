import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function MenuScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Button title="Algebra" onPress={() => router.push('/question')} />
      <Button title="Geometry" onPress={() => router.push('/src/screens/GeometryScreen')} />
      <Button title="Trigonometry" onPress={() => router.push('/src/screens/TrigonometryScreen')} />
      <Button title="Statistics" onPress={() => router.push('/src/screens/StatisticsScreen')} />
      <Button title="User" onPress={() => router.push('/src/screens/UserScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 16 },
});
