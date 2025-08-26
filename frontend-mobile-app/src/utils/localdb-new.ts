import * as SQLite from 'expo-sqlite';

console.log('🚀 LOCALDB: Módulo cargándose...');

// TEMP: Función simple de hash para desarrollo (NO USAR EN PRODUCCIÓN)
function simpleHash(password: string): string {
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return 'SIMPLE_' + Math.abs(hash).toString();
}

const db = SQLite.openDatabaseSync('local.db');
console.log('✅ LOCALDB: Database conectada');

async function exec(sql: string) {
  await db.execAsync(sql);
}

// Función helper para hashear passwords de manera segura
function hashPassword(password: string): string {
  try {
    if (!password || typeof password !== 'string') {
      throw new Error('Password inválida');
    }
    
    console.log('🔐 Hasheando password (simple hash)');
    const hash = simpleHash(password);
    
    if (!hash || typeof hash !== 'string') {
      throw new Error('Hash inválido generado');
    }
    
    return hash;
  } catch (error) {
    console.log('❌ Error en hashPassword:', error);
    throw error;
  }
}

// Función helper para comparar passwords
function comparePassword(password: string, hash: string): boolean {
  try {
    if (!password || typeof password !== 'string') {
      return false;
    }
    if (!hash || typeof hash !== 'string') {
      return false;
    }
    
    const passwordHash = simpleHash(password);
    return passwordHash === hash;
  } catch (error) {
    console.log('❌ Error en comparePassword:', error);
    return false;
  }
}

export async function initLocalDB(): Promise<void> {
  console.log('🔥 Iniciando initLocalDB');
  
  // Crear tabla users
  await exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    identifier TEXT UNIQUE,
    name TEXT,
    password TEXT,
    role TEXT,
    online_enabled INTEGER DEFAULT 0
  );`);
  
  // Crear tabla problems
  await exec(`CREATE TABLE IF NOT EXISTS problems (
    id INTEGER PRIMARY KEY,
    topic TEXT,
    question TEXT,
    answer TEXT,
    difficulty TEXT
  );`);
  
  // Crear usuario admin
  try {
    const hash = hashPassword('admin123');
    await db.runAsync(
      'INSERT OR IGNORE INTO users (identifier, name, password, role, online_enabled) VALUES (?, ?, ?, ?, ?)',
      ['admin', 'Administrator', hash, 'admin', 1]
    );
    console.log('✅ Usuario admin creado/verificado');
  } catch (error) {
    console.log('❌ Error al crear usuario admin:', error);
  }
}

export async function getLocalProblems(): Promise<any[]> {
  try {
    const result = await db.getAllAsync('SELECT * FROM problems');
    console.log(`📱 Encontrados ${result.length} problemas en BD local`);
    return result || [];
  } catch (error) {
    console.log('❌ Error al consultar BD local:', error);
    return [];
  }
}

export async function saveProblems(problems: any[]): Promise<void> {
  try {
    console.log(`💾 Guardando ${problems.length} problemas...`);
    for (const p of problems) {
      await db.runAsync(
        'INSERT OR REPLACE INTO problems (id, topic, question, answer, difficulty) VALUES (?, ?, ?, ?, ?)',
        [p.id, p.topic, p.question, p.answer, p.difficulty]
      );
    }
    console.log(`✅ ${problems.length} problemas guardados exitosamente`);
  } catch (error) {
    console.log('❌ Error al guardar problemas:', error);
  }
}

export async function saveUser(user: any): Promise<void> {
  try {
    console.log(`💾 Guardando usuario: ${user.identifier}`);
    
    // Si el password no está hasheado, hashearlo
    let passwordToSave = user.password;
    if (user.password && !user.password.startsWith('SIMPLE_')) {
      passwordToSave = hashPassword(user.password);
    }
    
    await db.runAsync(
      'INSERT OR REPLACE INTO users (identifier, name, password, role, online_enabled) VALUES (?, ?, ?, ?, ?)',
      [user.identifier, user.name, passwordToSave, user.role, 1]
    );
    console.log(`✅ Usuario ${user.identifier} guardado exitosamente`);
  } catch (error) {
    console.log('❌ Error al guardar usuario:', error);
  }
}

export async function getLocalUser(identifier: string): Promise<any> {
  try {
    const result = await db.getAllAsync('SELECT * FROM users WHERE identifier = ?', [identifier]);
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.log('❌ Error al consultar usuario en BD local:', error);
    return null;
  }
}

export async function debugLocalDB(): Promise<void> {
  try {
    console.log('🔍 === DEBUG BASE DE DATOS LOCAL ===');
    
    const users = await db.getAllAsync('SELECT * FROM users');
    console.log(`👥 Usuarios en BD local (${users.length}):`);
    users.forEach((user: any) => {
      console.log(`  - ${user.identifier} (${user.role})`);
    });
    
    const problems = await db.getAllAsync('SELECT * FROM problems');
    console.log(`📚 Problemas en BD local (${problems.length})`);
    
    console.log('🔍 === FIN DEBUG ===');
  } catch (error) {
    console.log('❌ Error al debuggear BD local:', error);
  }
}

export async function resetLocalDB(): Promise<boolean> {
  try {
    console.log('🗑️ Reseteando base de datos local...');
    
    await db.runAsync('DROP TABLE IF EXISTS users');
    await db.runAsync('DROP TABLE IF EXISTS problems');
    
    await initLocalDB();
    
    console.log('✅ Base de datos recreada exitosamente');
    return true;
  } catch (error) {
    console.log('❌ Error al resetear BD local:', error);
    return false;
  }
}

export { comparePassword };

console.log('🎯 LOCALDB: Todas las funciones exportadas');
console.log('🎯 LOCALDB: initLocalDB =', typeof initLocalDB);
console.log('🎯 LOCALDB: saveUser =', typeof saveUser);
console.log('🎯 LOCALDB: saveProblems =', typeof saveProblems);
