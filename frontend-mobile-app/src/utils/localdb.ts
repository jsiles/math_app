import bcrypt from 'bcryptjs';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('local.db');

async function exec(sql, args = []) {
  const [result] = await db.execAsync([{ sql, args }]);
  return result;
}

export async function initLocalDB() {
  await exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    identifier TEXT UNIQUE,
    name TEXT,
    password TEXT,
    role TEXT,
    online_enabled INTEGER DEFAULT 0
  );`);
  await exec(`CREATE TABLE IF NOT EXISTS problems (
    id INTEGER PRIMARY KEY,
    topic TEXT,
    question TEXT,
    answer TEXT,
    difficulty TEXT
  );`);
  const result = await exec('SELECT * FROM users WHERE identifier = ?', ['admin']);
  if (result.rows.length === 0) {
    const hash = await bcrypt.hash('admin123', 10);
    await exec(
      'INSERT INTO users (identifier, name, password, role, online_enabled) VALUES (?, ?, ?, ?, ?)',
      ['admin', 'Administrator', hash, 'admin', 1]
    );
  }
}

export async function getLocalProblems() {
  const result = await exec('SELECT * FROM problems');
  return result.rows._array;
}

export async function saveProblems(problems) {
  for (const p of problems) {
    await exec(
      'INSERT OR REPLACE INTO problems (id, topic, question, answer, difficulty) VALUES (?, ?, ?, ?, ?)',
      [p.id, p.topic, p.question, p.answer, p.difficulty]
    );
  }
}

export async function saveUser(user) {
  await exec(
    'INSERT OR REPLACE INTO users (identifier, name, password, role, online_enabled) VALUES (?, ?, ?, ?, ?)',
    [user.identifier, user.name, user.password, user.role, 1]
  );
}

export async function getLocalUser(identifier) {
  const result = await exec('SELECT * FROM users WHERE identifier = ?', [identifier]);
  return result.rows._array[0];
}
