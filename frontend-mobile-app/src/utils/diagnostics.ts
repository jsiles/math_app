import axios from 'axios';
import { API_URL, API_TIMEOUT } from './config';

export async function testBackendConnection() {
  console.log('🔍 DIAGNÓSTICO: Iniciando prueba de conectividad');
  console.log(`🌐 API_URL configurada: ${API_URL}`);
  console.log(`⏱️ API_TIMEOUT: ${API_TIMEOUT}ms`);
  
  const results = {
    baseConnection: false,
    endpoints: {
      problems: false,
      geometry: false,
      algebra: false,
      trigonometry: false,
      statistics: false
    },
    errors: [] as string[]
  };

  // Test 1: Conectividad básica
  try {
    console.log('🔍 Test 1: Conectividad básica al servidor...');
    const response = await axios.get(`${API_URL}`, { 
      timeout: API_TIMEOUT,
      validateStatus: () => true // Aceptar cualquier status
    });
    console.log(`✅ Servidor responde con status: ${response.status}`);
    results.baseConnection = true;
  } catch (error: any) {
    console.log('❌ Error de conectividad básica:', error.message);
    results.errors.push(`Conectividad básica: ${error.message}`);
  }

  // Test 2: Endpoint /problems
  try {
    console.log('🔍 Test 2: Endpoint /problems...');
    const response = await axios.get(`${API_URL}/problems`, { 
      timeout: API_TIMEOUT,
      validateStatus: () => true
    });
    console.log(`✅ /problems responde con status: ${response.status}`);
    if (response.status === 200) {
      results.endpoints.problems = true;
      console.log(`📊 Datos recibidos:`, response.data?.length || 0, 'items');
    }
  } catch (error: any) {
    console.log('❌ Error en /problems:', error.message);
    results.errors.push(`/problems: ${error.message}`);
  }

  // Test 3: Endpoints específicos
  const categories = ['geometry', 'algebra', 'trigonometry', 'statistics'];
  
  for (const category of categories) {
    try {
      console.log(`🔍 Test 3.${categories.indexOf(category) + 1}: Endpoint /problems/${category}...`);
      const response = await axios.get(`${API_URL}/problems/${category}`, { 
        timeout: API_TIMEOUT,
        validateStatus: () => true
      });
      console.log(`✅ /problems/${category} responde con status: ${response.status}`);
      
      if (response.status === 200) {
        results.endpoints[category as keyof typeof results.endpoints] = true;
        console.log(`📊 ${category}: ${response.data?.length || 0} problemas disponibles`);
        
        if (response.data?.length > 0) {
          console.log(`📋 Primer problema de ${category}:`, {
            id: response.data[0].id,
            topic: response.data[0].topic,
            question: response.data[0].question?.substring(0, 50) + '...'
          });
        }
      }
    } catch (error: any) {
      console.log(`❌ Error en /problems/${category}:`, error.message);
      results.errors.push(`/problems/${category}: ${error.message}`);
    }
  }

  // Resumen final
  console.log('🎯 RESUMEN DEL DIAGNÓSTICO:');
  console.log(`🌐 Conectividad básica: ${results.baseConnection ? '✅' : '❌'}`);
  console.log(`📋 /problems: ${results.endpoints.problems ? '✅' : '❌'}`);
  console.log(`📐 /problems/geometry: ${results.endpoints.geometry ? '✅' : '❌'}`);
  console.log(`🔢 /problems/algebra: ${results.endpoints.algebra ? '✅' : '❌'}`);
  console.log(`📏 /problems/trigonometry: ${results.endpoints.trigonometry ? '✅' : '❌'}`);
  console.log(`📊 /problems/statistics: ${results.endpoints.statistics ? '✅' : '❌'}`);
  
  if (results.errors.length > 0) {
    console.log('❌ ERRORES ENCONTRADOS:');
    results.errors.forEach((error, index) => {
      console.log(`   ${index + 1}. ${error}`);
    });
  }
  
  return results;
}
