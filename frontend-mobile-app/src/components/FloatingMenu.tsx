import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatabaseHelper from '../utils/dbHelper';

const { width, height } = Dimensions.get('window');

export type CategoryType = 'algebra' | 'trigonometry' | 'geometry' | 'statistics';

interface FloatingMenuProps {
  onCategorySelect: (category: CategoryType) => void;
  currentCategory?: CategoryType;
}

const categories = [
  { id: 'algebra', name: 'Álgebra', icon: '🔢', color: '#FF6B6B' },
  { id: 'trigonometry', name: 'Trigonometría', icon: '📐', color: '#4ECDC4' },
  { id: 'geometry', name: 'Geometría', icon: '📏', color: '#45B7D1' },
  { id: 'statistics', name: 'Estadísticas', icon: '📊', color: '#96CEB4' },
  { id: 'home', name: 'Herramientas', icon: '🛠️', color: '#FFA726' },
  { id: 'debug', name: 'Debug BD', icon: '🔍', color: '#9B59B6' },
];

export default function FloatingMenu({ onCategorySelect, currentCategory }: FloatingMenuProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [animation] = useState(new Animated.Value(0));
  const router = useRouter();

  const toggleMenu = () => {
    const toValue = isExpanded ? 0 : 1;
    setIsExpanded(!isExpanded);
    
    Animated.spring(animation, {
      toValue,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start();
  };

  const handleCategorySelect = (category: CategoryType | 'debug' | 'home') => {
    if (category === 'debug') {
      handleDebugDatabase();
      toggleMenu();
    } else if (category === 'home') {
      handleGoToDevTools();
      toggleMenu();
    } else {
      onCategorySelect(category);
      toggleMenu();
    }
  };

  const handleDebugDatabase = async () => {
    try {
      console.log('🔍 Ejecutando debug de BD desde menú flotante...');
      await DatabaseHelper.inspect();
      Alert.alert(
        "🔍 Debug de Base de Datos", 
        "Información mostrada en consola.\n\nRevisa los logs del terminal para ver:\n• Usuarios locales\n• Problemas por categoría\n• Estado de sincronización"
      );
    } catch (error) {
      Alert.alert("❌ Error", "No se pudo inspeccionar la BD");
      console.log('Error en debug BD:', error);
    }
  };

  const handleGoToDevTools = () => {
    try {
      console.log('🛠️ Navegando a herramientas de desarrollo desde menú flotante...');
      router.push('/debug' as any);
    } catch (error) {
      console.log('🔴 Error al navegar a herramientas de desarrollo:', error);
    }
  };

  const handleLogout = async () => {
    try {
      // Limpiar token de AsyncStorage
      await AsyncStorage.removeItem('token');
      console.log('🚪 Usuario deslogueado exitosamente');
      // Redirigir al login
      router.replace('/login');
    } catch (error) {
      console.log('🔴 Error al cerrar sesión:', error);
      // Aún así redirigir al login
      router.replace('/login');
    }
  };

  const renderMenuItem = (category: any, index: number) => {
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -(60 * (index + 1) + 20)],
    });

    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const isSelected = currentCategory === category.id && category.id !== 'debug' && category.id !== 'home';

    return (
      <Animated.View
        key={category.id}
        style={[
          styles.menuItem,
          {
            transform: [{ translateY }, { scale }],
            backgroundColor: isSelected ? category.color : '#FFFFFF',
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => handleCategorySelect(category.id)}
          style={styles.menuItemButton}
        >
          <Text style={styles.menuItemIcon}>{category.icon}</Text>
          <Text style={[
            styles.menuItemText,
            { color: isSelected ? '#FFFFFF' : '#333333' }
          ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  const mainButtonRotation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

  return (
    <View style={styles.container}>
      {/* Overlay */}
      {isExpanded && (
        <TouchableOpacity
          style={styles.overlay}
          onPress={toggleMenu}
          activeOpacity={1}
        />
      )}

      {/* Menu Items */}
      {categories.map((category, index) => renderMenuItem(category, index))}

      {/* Logout Button */}
      <Animated.View
        style={[
          styles.logoutButton,
          {
            transform: [{
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -(60 * (categories.length + 1) + 40)],
              }),
            }, {
              scale: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 1],
              }),
            }],
          },
        ]}
      >
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButtonInner}>
          <Text style={styles.logoutIcon}>🚪</Text>
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Main Menu Button */}
      <Animated.View
        style={[
          styles.mainButton,
          currentCategory && {
            backgroundColor: categories.find(c => c.id === currentCategory)?.color || '#6C63FF'
          }
        ]}
      >
        <TouchableOpacity onPress={toggleMenu} style={styles.mainButtonInner}>
          <Animated.Text
            style={[
              styles.mainButtonText,
              { transform: [{ rotate: mainButtonRotation }] }
            ]}
          >
            {currentCategory ? 
              categories.find(c => c.id === currentCategory)?.icon || '📚' 
              : '📚'
            }
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    zIndex: 1000,
  },
  overlay: {
    position: 'absolute',
    top: -height,
    left: -width,
    width: width * 2,
    height: height * 2,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  mainButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6C63FF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  mainButtonInner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  menuItem: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 150,
    height: 50,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItemButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  menuItemIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  menuItemText: {
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 150,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF4757',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutButtonInner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  logoutIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
