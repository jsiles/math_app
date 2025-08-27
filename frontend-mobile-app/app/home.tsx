import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native';
import { getToken } from '../src/utils/auth';
import { showConnectionManagerDemo } from '../src/utils/connectionDemo';
import DatabaseHelper from '../src/utils/dbHelper';
import { initLocalDB } from '../src/utils/localdb';

console.log('🏠 HOME: Importes cargados');
console.log('🏠 HOME: initLocalDB:', initLocalDB);

export default function HomeScreen() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    console.log('🏠 HOME: Iniciando useEffect');
    
    async function init() {
      try {
        console.log('🏠 HOME: Ejecutando initLocalDB...');
        await initLocalDB();
        console.log('🏠 HOME: initLocalDB completado');
        
        console.log('🏠 HOME: Ejecutando checkAuth...');
        await checkAuth();
        console.log('🏠 HOME: checkAuth completado');
      } catch (error) {
        console.log('🏠 HOME: Error en init:', error);
        setChecking(false);
      }
    }
    
    async function checkAuth() {
      try {
        console.log('🏠 HOME: Obteniendo token...');
        const token = await getToken();
        console.log('🏠 HOME: Token obtenido:', !!token);
        
        if (token) {
          console.log('🏠 HOME: Redirigiendo a /categories');
          router.replace('/categories');
        } else {
          console.log('🏠 HOME: No hay token, mostrando home');
          setChecking(false);
        }
      } catch (error) {
        console.log('🏠 HOME: Error en checkAuth:', error);
        setChecking(false);
      }
    }
    
    init();
  }, []);

  const handleResetDatabase = async () => {
    Alert.alert(
      "🗑️ Resetear Base de Datos",
      "¿Estás seguro que quieres eliminar y recrear la base de datos local?\n\nEsto eliminará:\n• Todos los usuarios locales\n• Todos los problemas descargados\n• El usuario admin se recreará",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sí, resetear",
          style: "destructive",
          onPress: async () => {
            setResetting(true);
            try {
              const success = await DatabaseHelper.reset();
              if (success) {
                Alert.alert("✅ Éxito", "Base de datos reseteada correctamente\n\nRevisa la consola para ver el contenido actualizado");
              } else {
                Alert.alert("❌ Error", "No se pudo resetear la base de datos");
              }
            } catch (error) {
              Alert.alert("❌ Error", "Error inesperado al resetear BD");
              console.log('Error al resetear BD:', error);
            } finally {
              setResetting(false);
            }
          }
        }
      ]
    );
  };

  const handleDebugDatabase = async () => {
    console.log('🔍 Ejecutando debug de BD...');
    await DatabaseHelper.inspect();
    Alert.alert("🔍 Debug", "Revisa la consola para ver el contenido de la BD");
  };

  const handleConnectionStats = async () => {
    console.log('📊 Mostrando estadísticas de conexión...');
    try {
      const stats = await showConnectionManagerDemo();
      Alert.alert(
        "📊 Estadísticas de Conexión", 
        `Online: ${stats.onlinePercentage}% (${stats.online}/${stats.total})\nOffline: ${stats.offline}/${stats.total}\nEstado actual: ${stats.lastKnownState}\nPredicción: ${stats.predictedNextState}`
      );
    } catch (error) {
      console.log('❌ Error obteniendo estadísticas:', error);
      Alert.alert("❌ Error", "No se pudieron obtener las estadísticas");
    }
  };

  if (checking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Math Assistant</Text>
      
      {/* Botones principales */}
      <View style={styles.mainButtons}>
        <Button title="Login" onPress={() => router.push('/login')} />
        <Button title="Register" onPress={() => router.push('/register')} />
      </View>
      
      {/* Botones de desarrollo/debug */}
      <View style={styles.debugSection}>
        <Text style={styles.debugTitle}>🛠️ Herramientas de Desarrollo</Text>
        
        <View style={styles.debugButtons}>
          <Button 
            title="🔍 Ver BD Local" 
            onPress={handleDebugDatabase}
            color="#007AFF"
          />
          
          <Button 
            title="📊 Estadísticas de Conexión" 
            onPress={handleConnectionStats}
            color="#34C759"
          />
          
          <Button 
            title={resetting ? "Reseteando..." : "🗑️ Resetear BD Local"} 
            onPress={handleResetDatabase}
            disabled={resetting}
            color="#FF3B30"
          />
        </View>
        
        <Text style={styles.debugHelp}>
          • Ver BD: Muestra contenido en consola{'\n'}
          • Resetear: Elimina y recrea la BD local
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 24 
  },
  title: { 
    fontSize: 28, 
    marginBottom: 32, 
    fontWeight: 'bold' 
  },
  mainButtons: {
    gap: 16,
    marginBottom: 40,
    width: '100%',
    maxWidth: 300
  },
  debugSection: {
    borderTopWidth: 1,
    borderTopColor: '#E5E5E7',
    paddingTop: 24,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center'
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#8E8E93'
  },
  debugButtons: {
    gap: 12,
    width: '100%',
    marginBottom: 16
  },
  debugHelp: {
    fontSize: 12,
    color: '#8E8E93',
    textAlign: 'center',
    lineHeight: 16
  }
});
