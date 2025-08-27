import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Components
import FloatingMenu, { CategoryType } from '../components/FloatingMenu';

// Screens
import { AlgebraScreen, GeometryScreen, TrigonometryScreen, StatisticsScreen } from './index';

// Utils
import { connectionManager, ConnectionState } from '../utils/connectionManager';

export default function MainCategoriesScreen() {
  const [currentCategory, setCurrentCategory] = useState<CategoryType>('algebra');
  const [connectionState, setConnectionState] = useState<ConnectionState>(ConnectionState.UNKNOWN);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          router.replace('/login');
          return;
        }
        setIsLoading(false);
      } catch (error) {
        console.log('🔴 Error checking auth:', error);
        router.replace('/login');
      }
    };

    checkAuth();
  }, []);

  // Verificar estado de conexión
  useEffect(() => {
    const checkConnection = async () => {
      const state = await connectionManager.getConnectionState({ forceCheck: false });
      setConnectionState(state);
    };
    
    checkConnection();
    const interval = setInterval(checkConnection, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCategorySelect = (category: CategoryType) => {
    setCurrentCategory(category);
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

  const renderCurrentScreen = () => {
    switch (currentCategory) {
      case 'algebra':
        return <AlgebraScreen />;
      case 'trigonometry':
        return <TrigonometryScreen />;
      case 'geometry':
        return <GeometryScreen />;
      case 'statistics':
        return <StatisticsScreen />;
      default:
        return <GeometryScreen />;
    }
  };

  const getCategoryTitle = () => {
    const titles = {
      algebra: '🔢 Álgebra',
      trigonometry: '📐 Trigonometría', 
      geometry: '📏 Geometría',
      statistics: '📊 Estadísticas',
    };
    return titles[currentCategory];
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with connection status */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{getCategoryTitle()}</Text>
        <View style={styles.connectionIndicator}>
          <Text style={styles.connectionText}>
            {getConnectionIcon()} {getConnectionText()}
          </Text>
        </View>
      </View>

      {/* Content Area */}
      <View style={styles.content}>
        {renderCurrentScreen()}
      </View>

      {/* Floating Menu */}
      <FloatingMenu
        onCategorySelect={handleCategorySelect}
        currentCategory={currentCategory}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 10,
  },
  connectionIndicator: {
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
  },
  connectionText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#6C757D',
  },
  content: {
    flex: 1,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  placeholderTitle: {
    fontSize: 48,
    marginBottom: 20,
  },
  placeholderText: {
    fontSize: 18,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 24,
  },
});
