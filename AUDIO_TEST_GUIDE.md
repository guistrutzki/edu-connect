# 🎙️ Guia de Teste de Áudio

## ⚠️ Problemas Comuns no Emulador

### 1. **Permissões de Microfone**
- **iOS Simulator**: Pode não ter microfone físico
- **Android Emulator**: Precisa configurar microfone virtual
- **Solução**: Teste em dispositivo físico quando possível

### 2. **Configuração do Emulador Android**
```bash
# No Android Studio AVD Manager:
# 1. Editar o emulador
# 2. Advanced Settings
# 3. Enable "Use Host GPU"
# 4. Enable "Microphone" (se disponível)
```

### 3. **Configuração do iOS Simulator**
```bash
# No iOS Simulator:
# 1. Device > Microphone > Built-in Microphone
# 2. Ou Device > Microphone > None (para testar sem microfone)
```

## 🧪 Como Testar

### 1. **Usar o Componente de Teste**
Temporariamente substitua o conteúdo do `AudioCaptureScreen`:

```typescript
// Em src/screens/Main/AudioCaptureScreen.tsx
import { AudioTest } from '../../components/AudioTest'

export const AudioCaptureScreen = () => {
  return <AudioTest />
}
```

### 2. **Verificar Logs no Console**
Abra o console do Expo/Metro e procure por:
- `🎙️ Configurando áudio...`
- `📋 Status das permissões:`
- `✅ Áudio configurado com sucesso`
- `🎬 Iniciando gravação...`

### 3. **Testar Passo a Passo**

1. **Iniciar o app**
2. **Verificar permissões** (deve aparecer popup)
3. **Clicar em "Iniciar"**
4. **Verificar logs** no console
5. **Falar no microfone**
6. **Aguardar 3 segundos** (deve aparecer chunk)
7. **Clicar em "Parar"**

## 🔍 Diagnóstico de Problemas

### Se não aparecer popup de permissão:
```bash
# Limpar cache e rebuildar
npx expo start --clear
```

### Se aparecer erro de permissão:
```bash
# Verificar se app.json tem as permissões corretas
# Verificar se o plugin expo-audio está configurado
```

### Se não conseguir gravar:
```bash
# Testar em dispositivo físico
# Verificar se o microfone está funcionando
# Verificar logs de erro no console
```

## 📱 Teste em Dispositivo Físico

### Android:
```bash
npx expo run:android
```

### iOS:
```bash
npx expo run:ios
```

## 🐛 Logs Esperados

### Sucesso:
```
🎙️ Configurando áudio...
📋 Status das permissões: {granted: true}
✅ Áudio configurado com sucesso
🎬 Iniciando gravação...
📋 Verificando permissões: {granted: true}
🔧 Preparando recorder...
✅ Recorder preparado
▶️ Iniciando gravação...
🎙️ Gravação iniciada!
⏰ Processamento de chunks iniciado
🔄 Iniciando processamento de chunks...
📦 Processando chunk...
🎵 URI atual: file:///...
📁 Chunk URI: file:///tmp/chunk_1_...
✅ Chunk copiado com sucesso
🎉 Chunk 1 pronto!
```

### Erro de Permissão:
```
🎙️ Configurando áudio...
📋 Status das permissões: {granted: false}
❌ Falha ao configurar áudio: Audio recording permission not granted
```

## 🔧 Soluções

### 1. **Rebuild do App**
```bash
# Limpar tudo e rebuildar
npx expo start --clear
# Ou
rm -rf node_modules
yarn install
npx expo start
```

### 2. **Verificar Versões**
```bash
# Verificar se expo-audio está atualizado
npx expo install expo-audio
```

### 3. **Testar Permissões Manualmente**
```typescript
// Adicionar este código temporariamente para testar
import { AudioModule } from 'expo-audio'

const testPermissions = async () => {
  const status = await AudioModule.requestRecordingPermissionsAsync()
  console.log('Permissões:', status)
}
```

## 📞 Próximos Passos

1. **Teste com o componente AudioTest**
2. **Verifique os logs no console**
3. **Teste em dispositivo físico se possível**
4. **Reporte os logs de erro se houver problemas**

O componente `AudioTest` mostra todos os logs em tempo real e permite testar cada funcionalidade individualmente.
