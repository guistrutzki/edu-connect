import React, { useState } from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

interface EmojiItem {
  emoji: string
  content: string
}

export const EmojiDisplayScreen = () => {
  const [emojis, setEmojis] = useState<EmojiItem[]>([
    { emoji: '🎓', content: 'Aprendizado educacional' },
    { emoji: '📚', content: 'Estudo de conceitos' },
    { emoji: '🧮', content: 'Cálculos matemáticos' },
    { emoji: '🔬', content: 'Experimentos científicos' },
  ])

  const addMockEmoji = () => {
    const mockEmojis = [
      { emoji: '🌟', content: 'Conceito importante' },
      { emoji: '💡', content: 'Ideia criativa' },
      { emoji: '🎯', content: 'Objetivo alcançado' },
      { emoji: '🚀', content: 'Progresso rápido' },
      { emoji: '🎨', content: 'Arte e criatividade' },
    ]
    
    const randomEmoji = mockEmojis[Math.floor(Math.random() * mockEmojis.length)]
    setEmojis(prev => [...prev, randomEmoji])
  }

  const clearEmojis = () => {
    setEmojis([])
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Emojis Educacionais</Text>
        <Text style={styles.subtitle}>Conteúdo convertido em emojis</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.addButton} onPress={addMockEmoji}>
          <Text style={styles.addButtonText}>+ Adicionar Emoji</Text>
        </TouchableOpacity>
        
        {emojis.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearEmojis}>
            <Text style={styles.clearButtonText}>Limpar</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.emojiList} showsVerticalScrollIndicator={false}>
        {emojis.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>😊</Text>
            <Text style={styles.emptyText}>Nenhum emoji ainda</Text>
            <Text style={styles.emptySubtext}>
              Grave áudio na aba "Gravar" para gerar emojis
            </Text>
          </View>
        ) : (
          emojis.map((item, index) => (
            <View key={index} style={styles.emojiItem}>
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={styles.emojiContent}>{item.content}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    flex: 1,
    marginLeft: 10,
  },
  clearButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  emojiList: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
  emojiItem: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  emoji: {
    fontSize: 30,
    marginRight: 15,
  },
  emojiContent: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
})
