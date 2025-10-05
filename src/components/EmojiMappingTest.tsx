import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { mapApiEmojisToSvgs, getFoundEmojis, getNotFoundEmojis } from '../services/emojiMappingService'
import { convertMappedEmojisToVisualRepresentations } from '../utils/emojiToVisualRepresentation'
import { VisualRepresentationList } from './atoms/VisualRepresentationList'
import { useAudioStore } from '../store/audioStore'

// Dados reais da resposta da API que você mostrou
const testApiResponse = {
  text: "Como vocês estão por aí?",
  content_emojis: [
    {
      emoji: "1F642",
      content: "sorriso e felicidade"
    },
    {
      emoji: "1F4AC",
      content: "conversa e comunicação"
    },
    {
      emoji: "1F64C",
      content: "interação e celebração"
    },
    {
      emoji: "1F60A",
      content: "alegria e satisfação"
    }
  ],
  confidence: 0.95,
  timestamp: "2025-10-05T11:30:54.052Z",
  processing_time: 5297,
  chunk_duration: "3s",
  optimized_for: "ultra-fast-streaming",
  cache_hit: false,
  cache_size: 1
}

export const EmojiMappingTest: React.FC = () => {
  const [mappedEmojis, setMappedEmojis] = useState<any[]>([])
  const [foundEmojis, setFoundEmojis] = useState<any[]>([])
  const [notFoundEmojis, setNotFoundEmojis] = useState<any[]>([])
  const [visualRepresentations, setVisualRepresentations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [storeTestResult, setStoreTestResult] = useState<string>('')
  
  const { visualRepresentations: storeVisualReps, processAudioChunk3s } = useAudioStore()

  const testMapping = () => {
    setIsLoading(true)
    console.log('🧪 === TESTE DO NOVO SISTEMA DE MAPEAMENTO ===')
    
    try {
      // Testar mapeamento com o novo sistema
      const mapped = mapApiEmojisToSvgs(testApiResponse)
      const found = getFoundEmojis(mapped)
      const notFound = getNotFoundEmojis(mapped)
      
      console.log('📊 Resultado do mapeamento (NOVO SISTEMA):')
      console.log(`  - Total mapeados: ${mapped.length}`)
      console.log(`  - Encontrados: ${found.length}`)
      console.log(`  - Não encontrados: ${notFound.length}`)
      console.log(`  - Taxa de sucesso: ${((found.length / mapped.length) * 100).toFixed(1)}%`)
      
      // Converter para representações visuais
      const visualReps = convertMappedEmojisToVisualRepresentations(found)
      
      console.log('🎨 Representações visuais criadas:', visualReps.length)
      
      setMappedEmojis(mapped)
      setFoundEmojis(found)
      setNotFoundEmojis(notFound)
      setVisualRepresentations(visualReps)
      
      // Log detalhado
      found.forEach(emoji => {
        console.log(`  ✅ ${emoji.unicode} - ${emoji.content}`)
      })
      
      notFound.forEach(emoji => {
        console.log(`  ❌ ${emoji.unicode} - ${emoji.content}`)
      })
      
      if (found.length === mapped.length) {
        console.log('🎉 SUCESSO! Todos os emojis foram mapeados com o novo sistema!')
      } else {
        console.log('⚠️  Alguns emojis não foram encontrados.')
      }
      
    } catch (error) {
      console.error('❌ Erro no teste de mapeamento:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const testStore = async () => {
    console.log('🧪 === TESTE DO STORE ===')
    setStoreTestResult('Testando store...')
    
    try {
      // Simular resultado da API 3s
      const mockResult = {
        chunkId: 999,
        text: testApiResponse.text,
        content_emojis: testApiResponse.content_emojis,
        confidence: testApiResponse.confidence,
        timestamp: testApiResponse.timestamp
      }
      
      // Processar via store
      await processAudioChunk3s(mockResult, 999)
      
      setStoreTestResult(`✅ Store processado! Visual representations: ${storeVisualReps.length}`)
      console.log('✅ Store testado com sucesso!')
      
    } catch (error) {
      setStoreTestResult(`❌ Erro no store: ${error}`)
      console.error('❌ Erro no teste do store:', error)
    }
  }

  useEffect(() => {
    testMapping()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧪 Teste do Novo Sistema de Mapeamento</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Dados da API</Text>
        <Text style={styles.text}>Texto: "{testApiResponse.text}"</Text>
        <Text style={styles.text}>Emojis:</Text>
        {testApiResponse.content_emojis.map((emoji, index) => (
          <Text key={index} style={styles.emojiItem}>
            • {emoji.emoji} - {emoji.content}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Resultado do Mapeamento</Text>
        <Text style={styles.text}>Total mapeados: {mappedEmojis.length}</Text>
        <Text style={styles.text}>Encontrados: {foundEmojis.length}</Text>
        <Text style={styles.text}>Não encontrados: {notFoundEmojis.length}</Text>
        <Text style={styles.text}>Representações visuais: {visualRepresentations.length}</Text>
      </View>

      {foundEmojis.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Emojis Encontrados</Text>
          {foundEmojis.map((emoji, index) => (
            <View key={index} style={styles.emojiCard}>
              <Text style={styles.emojiCode}>{emoji.unicode}</Text>
              <Text style={styles.emojiContent}>{emoji.content}</Text>
              <Text style={styles.emojiStatus}>✅ SVG encontrado</Text>
            </View>
          ))}
        </View>
      )}

      {notFoundEmojis.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>❌ Emojis Não Encontrados</Text>
          {notFoundEmojis.map((emoji, index) => (
            <View key={index} style={styles.emojiCard}>
              <Text style={styles.emojiCode}>{emoji.unicode}</Text>
              <Text style={styles.emojiContent}>{emoji.content}</Text>
              <Text style={styles.emojiStatus}>❌ SVG não encontrado</Text>
            </View>
          ))}
        </View>
      )}

      {visualRepresentations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎨 Representações Visuais</Text>
          <VisualRepresentationList 
            representations={visualRepresentations}
            onRepresentationPress={(representation) => {
              console.log('Representação pressionada:', representation)
            }}
          />
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏪 Teste do Store</Text>
        <Text style={styles.text}>{storeTestResult || 'Clique no botão para testar o store'}</Text>
        <TouchableOpacity style={styles.button} onPress={testStore}>
          <Text style={styles.buttonText}>🧪 Testar Store</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={testMapping} disabled={isLoading}>
        <Text style={styles.buttonText}>
          {isLoading ? 'Testando...' : '🔄 Testar Mapeamento Novamente'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  text: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 8,
  },
  emojiItem: {
    fontSize: 14,
    color: '#cccccc',
    marginLeft: 16,
    marginBottom: 4,
  },
  emojiCard: {
    backgroundColor: '#3a3a3a',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  emojiCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    fontFamily: 'monospace',
  },
  emojiContent: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 4,
  },
  emojiStatus: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})
