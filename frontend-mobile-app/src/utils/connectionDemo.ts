// Utility para migrar todos los servicios al nuevo sistema de conexión inteligente
export async function showConnectionManagerDemo() {
  const { connectionManager } = await import('./connectionManager');
  
  // Mostrar estadísticas actuales
  const stats = connectionManager.getConnectionStats();
  console.log('📊 ESTADÍSTICAS DE CONEXIÓN:');
  console.log(`  📈 Total de verificaciones: ${stats.total}`);
  console.log(`  🌐 Online: ${stats.online} (${stats.onlinePercentage}%)`);
  console.log(`  📱 Offline: ${stats.offline}`);
  console.log(`  🔮 Estado predicho para próxima operación: ${stats.predictedNextState}`);
  console.log(`  📍 Último estado conocido: ${stats.lastKnownState}`);
  
  // Forzar verificación del estado actual
  const currentState = await connectionManager.refreshConnectionState();
  console.log(`  🎯 Estado actual (verificado): ${currentState}`);
  
  return stats;
}
