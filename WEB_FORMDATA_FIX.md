# 🔧 Correção do FormData para Web

## 🐛 **Problema Identificado**

O upload de áudio estava falhando na plataforma web, enviando `[object Object]` em vez do arquivo de áudio real. Isso acontecia porque:

1. **React Native** usa objetos com `{ uri, type, name }` para FormData
2. **Web** precisa de objetos `File` ou `Blob` reais
3. O header `Content-Type` deve ser definido automaticamente pelo navegador na web

## ✅ **Solução Implementada**

### **1. Detecção de Plataforma**
```typescript
import { Platform } from 'react-native'

if (Platform.OS === 'web') {
  // Lógica específica para web
} else {
  // Lógica para React Native (iOS/Android)
}
```

### **2. FormData para Web**
```typescript
// Para web: converter URI em Blob e depois em File
const response = await fetch(audioUri)
const audioBlob = await response.blob()
const audioFile = new File([audioBlob], `chunk_${chunkId}.m4a`, {
  type: 'audio/m4a'
})
formData.append('audio', audioFile)
```

### **3. FormData para React Native**
```typescript
// Para React Native: usar objeto com URI
formData.append('audio', {
  uri: audioUri,
  type: 'audio/m4a',
  name: `chunk_${chunkId}.m4a`,
} as any)
```

### **4. Headers Corretos**
```typescript
// Apenas definir Content-Type para React Native
const headers: Record<string, string> = {}
if (Platform.OS !== 'web') {
  headers['Content-Type'] = 'multipart/form-data'
}
```

## 📁 **Arquivos Modificados**

- `src/services/audio3sService.ts` - Serviço principal de áudio 3s
- `src/services/apiService.ts` - Serviço de API geral

## 🧪 **Como Testar**

1. **Web**: Execute `expo start --web` e teste o upload de áudio
2. **Mobile**: Execute `expo start` e teste no dispositivo/emulador
3. **Verificar logs**: Procure por mensagens como:
   - `🌐 Web platform detected, fetching audio blob`
   - `📱 React Native FormData created with URI`

## 🔍 **Logs de Debug**

O código agora inclui logs detalhados para debug:
- Detecção de plataforma
- Criação do FormData
- Informações do arquivo (nome, tipo, tamanho)
- Headers utilizados

## 🚀 **Resultado Esperado**

- ✅ Web: Upload funciona com `File` objects
- ✅ Mobile: Upload funciona com `URI` objects  
- ✅ Headers corretos para cada plataforma
- ✅ Logs detalhados para debug
