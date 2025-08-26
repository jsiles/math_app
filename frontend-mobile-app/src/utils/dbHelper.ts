/**
 * 🛠️ Utilidades para manejo de la base de datos local
 * Funciones helper para debugging y mantenimiento de la BD
 */

import { debugLocalDB, initLocalDB, resetLocalDB } from './localdb';

export class DatabaseHelper {
  
  /**
   * 🔍 Inspecciona y muestra el contenido de la BD en consola
   */
  static async inspect(): Promise<void> {
    console.log('🔍 Inspeccionando base de datos local...');
    await debugLocalDB();
  }

  /**
   * 🗑️ Resetea completamente la base de datos
   */
  static async reset(): Promise<boolean> {
    try {
      console.log('🗑️ Iniciando reset de base de datos...');
      const success = await resetLocalDB();
      
      if (success) {
        console.log('✅ Base de datos reseteada exitosamente');
        // Mostrar contenido después del reset
        await this.inspect();
      }
      
      return success;
    } catch (error) {
      console.error('❌ Error al resetear base de datos:', error);
      return false;
    }
  }

  /**
   * 🔄 Reinicializa la base de datos (solo crea tablas si no existen)
   */
  static async reinitialize(): Promise<boolean> {
    try {
      console.log('🔄 Reinicializando base de datos...');
      await initLocalDB();
      console.log('✅ Base de datos reinicializada');
      return true;
    } catch (error) {
      console.error('❌ Error al reinicializar base de datos:', error);
      return false;
    }
  }

  /**
   * 📊 Obtiene estadísticas básicas de la BD
   */
  static async getStats(): Promise<{users: number, problems: number}> {
    try {
      // Esta función requeriría acceso directo a la BD
      // Por ahora, usamos debugLocalDB() que muestra la info en consola
      await debugLocalDB();
      return { users: 0, problems: 0 }; // Placeholder
    } catch (error) {
      console.error('❌ Error al obtener estadísticas:', error);
      return { users: 0, problems: 0 };
    }
  }
}

export default DatabaseHelper;
