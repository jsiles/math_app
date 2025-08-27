import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { showConnectionManagerDemo } from '../src/utils/connectionDemo';
import DatabaseHelper from '../src/utils/dbHelper';

export default function DebugScreen() {
  const router = useRouter();
  const [resetting, setResetting] = useState(false);

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

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <Text style={styles.backButtonText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.title}>🛠️ Herramientas de Desarrollo</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.debugButtons}>
          <TouchableOpacity style={styles.debugButton} onPress={handleDebugDatabase}>
            <Text style={styles.debugButtonIcon}>🔍</Text>
            <View style={styles.debugButtonContent}>
              <Text style={styles.debugButtonTitle}>Ver BD Local</Text>
              <Text style={styles.debugButtonDescription}>Muestra contenido en consola</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.debugButton} onPress={handleConnectionStats}>
            <Text style={styles.debugButtonIcon}>📊</Text>
            <View style={styles.debugButtonContent}>
              <Text style={styles.debugButtonTitle}>Estadísticas de Conexión</Text>
              <Text style={styles.debugButtonDescription}>Estado de conectividad</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.debugButton, styles.dangerButton, resetting && styles.disabledButton]} 
            onPress={handleResetDatabase}
            disabled={resetting}
          >
            {resetting ? (
              <ActivityIndicator color="#FF3B30" size="small" />
            ) : (
              <Text style={styles.debugButtonIcon}>🗑️</Text>
            )}
            <View style={styles.debugButtonContent}>
              <Text style={[styles.debugButtonTitle, styles.dangerText]}>
                {resetting ? "Reseteando..." : "Resetear BD Local"}
              </Text>
              <Text style={styles.debugButtonDescription}>Elimina y recrea la BD</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>ℹ️ Información</Text>
          <Text style={styles.infoText}>
            • Ver BD: Inspecciona usuarios y problemas guardados{'\n'}
            • Estadísticas: Historial de conectividad{'\n'}
            • Resetear: Elimina todos los datos locales
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E1E8ED',
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498DB',
    fontWeight: '500',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  debugButtons: {
    gap: 16,
    marginBottom: 30,
  },
  debugButton: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  debugButtonIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  debugButtonContent: {
    flex: 1,
  },
  debugButtonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 4,
  },
  debugButtonDescription: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  dangerButton: {
    borderWidth: 1,
    borderColor: '#FF3B30',
  },
  dangerText: {
    color: '#FF3B30',
  },
  disabledButton: {
    opacity: 0.6,
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3498DB',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#7F8C8D',
    lineHeight: 20,
  },
});
