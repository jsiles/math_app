console.log('🧪 TEST: Archivo de prueba cargándose...');

export function testFunction(): string {
  console.log('🧪 TEST: testFunction ejecutándose');
  return 'Hello from test!';
}

export async function testAsyncFunction(): Promise<string> {
  console.log('🧪 TEST: testAsyncFunction ejecutándose');
  return 'Hello async from test!';
}

console.log('🧪 TEST: Funciones exportadas');
