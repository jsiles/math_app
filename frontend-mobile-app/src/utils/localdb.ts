import bcrypt from 'bcryptjs';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('local.db');
console.log('DB opened:', db);

async function exec(sql: string) {
  await db.execAsync(sql);
} // Closing brace added here

export async function initLocalDB(): Promise<void> {
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
  const hash = await bcrypt.hash('admin123', 10);
  await exec(`INSERT OR IGNORE INTO users (identifier, name, password, role, online_enabled) VALUES ('admin', 'Administrator', '${hash}', 'admin', 1)`);
}

export async function getLocalProblems(): Promise<void> {
  await exec('SELECT * FROM problems');
}

export async function saveProblems(problems: any[]): Promise<void> {
  for (const p of problems) {
    await exec(`INSERT OR REPLACE INTO problems (id, topic, question, answer, difficulty) VALUES ('${p.id}', '${p.topic}', '${p.question}', '${p.answer}', '${p.difficulty}')`);
  }
}

export async function saveUser(user: any): Promise<void> {
  await exec(`INSERT OR REPLACE INTO users (identifier, name, password, role, online_enabled) VALUES ('${user.identifier}', '${user.name}', '${user.password}', '${user.role}', 1)`);
}

export async function getLocalUser(identifier: string): Promise<void> {
  await exec(`SELECT * FROM users WHERE identifier = '${identifier}'`);
}

