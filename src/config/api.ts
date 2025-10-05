import { Platform } from 'react-native'

// Configuração da API baseada na plataforma
export const getApiBaseUrl = (): string => {
  // Se estiver rodando no Expo Go ou emulador
  if (__DEV__) {
    // Para Android emulador, use 10.0.2.2
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000'
    }
    
    // Para iOS simulador, use o IP da máquina
    if (Platform.OS === 'ios') {
      return 'http://192.168.2.101:3000'
    }
    
    // Para web, use localhost
    if (Platform.OS === 'web') {
      return 'http://localhost:3000'
    }
    
    // Para Expo Go em dispositivo físico, use o IP local da máquina
    // Substitua pelo IP da sua máquina se necessário
    return 'http://192.168.2.101:3000'
  }
  
  // Para produção, use a URL do ambiente
  return process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000'
}

// Configuração da API
export const API_CONFIG = {
  baseUrl: getApiBaseUrl(),
  timeout: 30000,
  maxRetries: 3,
  retryDelay: 1000,
}

// Log da configuração
console.log('🔧 API Configuration:', {
  platform: Platform.OS,
  baseUrl: API_CONFIG.baseUrl,
  isDev: __DEV__,
})
