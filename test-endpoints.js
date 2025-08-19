// Test script for AI endpoints
const testEndpoints = async () => {
  const baseUrl = 'http://localhost:3000';
  
  // Test AI providers endpoint
  try {
    const response = await fetch(`${baseUrl}/api/ai/generate`);
    console.log('✅ AI Providers endpoint status:', response.status);
    const data = await response.json();
    console.log('Available providers:', data.providers?.length || 0);
  } catch (error) {
    console.error('❌ AI Providers endpoint error:', error.message);
  }
  
  // Test suggestions endpoint
  try {
    const response = await fetch(`${baseUrl}/api/ai/suggestions`);
    console.log('✅ Suggestions endpoint status:', response.status);
  } catch (error) {
    console.error('❌ Suggestions endpoint error:', error.message);
  }
};

if (typeof window === 'undefined') {
  // Node.js environment
  const fetch = require('node-fetch');
  testEndpoints();
} else {
  // Browser environment
  window.testEndpoints = testEndpoints;
}
