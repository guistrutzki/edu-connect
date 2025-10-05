import { TranscriptionChunk, VisualRepresentation, AudioProcessingResult } from '../types/audio.types'

import { 
  EMOJI_SMILEYS_EMOTION_FACE_SMILING_CODE_1F600,
  EMOJI_OBJECTS_BOOK_PAPER_CODE_1F4D6,
  EMOJI_SYMBOLS_MATH_CODE_2795,
  EMOJI_SYMBOLS_MATH_CODE_2796,
  EMOJI_SYMBOLS_ALPHANUM_CODE_1F522,
  EMOJI_FOOD_DRINK_FOOD_FRUIT_CODE_1F34E,
  EMOJI_OBJECTS_OFFICE_CODE_2702,
  EMOJI_SMILEYS_EMOTION_EMOTION_CODE_1F4A4,
  EMOJI_ACTIVITIES_EVENT_CODE_1F389,
  EMOJI_SMILEYS_EMOTION_EMOTION_CODE_1F4AF
} from '@assets/svgs'

// Mock data para transcrições
export const mockTranscriptionChunks: TranscriptionChunk[] = [
  {
    id: 'chunk_1',
    text: 'Olá, hoje vamos aprender sobre matemática básica. Vamos começar com adição e subtração.',
    timestamp: new Date('2024-01-15T10:00:00'),
    confidence: 0.95,
    isFinal: true
  },
  {
    id: 'chunk_2',
    text: 'A adição é quando juntamos números. Por exemplo, dois mais três é igual a cinco.',
    timestamp: new Date('2024-01-15T10:00:03'),
    confidence: 0.92,
    isFinal: true
  },
  {
    id: 'chunk_3',
    text: 'A subtração é quando tiramos números. Se temos cinco maçãs e comemos duas, sobram três.',
    timestamp: new Date('2024-01-15T10:00:06'),
    confidence: 0.88,
    isFinal: true
  },
  {
    id: 'chunk_4',
    text: 'Vamos praticar com alguns exercícios. Quanto é sete mais quatro?',
    timestamp: new Date('2024-01-15T10:00:09'),
    confidence: 0.94,
    isFinal: true
  },
  {
    id: 'chunk_5',
    text: 'Muito bem! Sete mais quatro é onze. Agora vamos para a subtração.',
    timestamp: new Date('2024-01-15T10:00:12'),
    confidence: 0.91,
    isFinal: true
  },
  {
    id: 'chunk_6',
    text: 'Quanto é dez menos seis? Pense bem antes de responder.',
    timestamp: new Date('2024-01-15T10:00:15'),
    confidence: 0.89,
    isFinal: true
  },
  {
    id: 'chunk_7',
    text: 'Excelente! Dez menos seis é quatro. Vocês estão indo muito bem!',
    timestamp: new Date('2024-01-15T10:00:18'),
    confidence: 0.96,
    isFinal: true
  }
]

// Mock data para representações visuais com emojis SVG variados
export const mockVisualRepresentations: VisualRepresentation[] = [
  {
    id: 'visual_1',
    emoji: EMOJI_OBJECTS_BOOK_PAPER_CODE_1F4D6,
    content: 'Aprendendo matemática básica',
    confidence: 0.95,
    timestamp: new Date('2024-01-15T10:00:00')
  },
  {
    id: 'visual_2',
    emoji: EMOJI_SYMBOLS_MATH_CODE_2795,
    content: 'Operação de adição',
    confidence: 0.92,
    timestamp: new Date('2024-01-15T10:00:03')
  },
  {
    id: 'visual_3',
    emoji: EMOJI_FOOD_DRINK_FOOD_FRUIT_CODE_1F34E,
    content: 'Exemplo com maçãs',
    confidence: 0.88,
    timestamp: new Date('2024-01-15T10:00:06')
  },
  {
    id: 'visual_4',
    emoji: EMOJI_SYMBOLS_MATH_CODE_2796,
    content: 'Operação de subtração',
    confidence: 0.89,
    timestamp: new Date('2024-01-15T10:00:09')
  },
  {
    id: 'visual_5',
    emoji: EMOJI_OBJECTS_OFFICE_CODE_2702,
    content: 'Exercícios práticos',
    confidence: 0.94,
    timestamp: new Date('2024-01-15T10:00:12')
  },
  {
    id: 'visual_6',
    emoji: EMOJI_SMILEYS_EMOTION_EMOTION_CODE_1F4A4,
    content: 'Pensando na resposta',
    confidence: 0.91,
    timestamp: new Date('2024-01-15T10:00:15')
  },
  {
    id: 'visual_7',
    emoji: EMOJI_ACTIVITIES_EVENT_CODE_1F389,
    content: 'Parabéns pelo progresso',
    confidence: 0.96,
    timestamp: new Date('2024-01-15T10:00:18')
  },
  {
    id: 'visual_8',
    emoji: EMOJI_SYMBOLS_ALPHANUM_CODE_1F522,
    content: 'Números e cálculos',
    confidence: 0.87,
    timestamp: new Date('2024-01-15T10:00:21')
  },
  {
    id: 'visual_9',
    emoji: EMOJI_SMILEYS_EMOTION_EMOTION_CODE_1F4AF,
    content: 'Objetivo alcançado',
    confidence: 0.93,
    timestamp: new Date('2024-01-15T10:00:24')
  }
]

// Mock data para resultados de processamento de áudio
export const mockAudioProcessingResults: AudioProcessingResult[] = [
  {
    text: 'Olá, hoje vamos aprender sobre matemática básica. Vamos começar com adição e subtração.',
    content_emojis: [
      { emoji: '📚', content: 'Aprendendo matemática básica' },
      { emoji: '➕', content: 'Operação de adição' },
      { emoji: '➖', content: 'Operação de subtração' }
    ],
    confidence: 0.95,
    chunkId: 'chunk_1'
  },
  {
    text: 'A adição é quando juntamos números. Por exemplo, dois mais três é igual a cinco.',
    content_emojis: [
      { emoji: '🔢', content: 'Números e cálculos' },
      { emoji: '🍎', content: 'Exemplo prático' }
    ],
    confidence: 0.92,
    chunkId: 'chunk_2'
  },
  {
    text: 'A subtração é quando tiramos números. Se temos cinco maçãs e comemos duas, sobram três.',
    content_emojis: [
      { emoji: '🍎', content: 'Exemplo com maçãs' },
      { emoji: '➖', content: 'Operação de subtração' }
    ],
    confidence: 0.88,
    chunkId: 'chunk_3'
  },
  {
    text: 'Vamos praticar com alguns exercícios. Quanto é sete mais quatro?',
    content_emojis: [
      { emoji: '✏️', content: 'Exercícios práticos' },
      { emoji: '🤔', content: 'Pensando na resposta' }
    ],
    confidence: 0.94,
    chunkId: 'chunk_4'
  },
  {
    text: 'Muito bem! Sete mais quatro é onze. Agora vamos para a subtração.',
    content_emojis: [
      { emoji: '🎉', content: 'Parabéns pelo progresso' },
      { emoji: '➖', content: 'Continuando com subtração' }
    ],
    confidence: 0.91,
    chunkId: 'chunk_5'
  }
]

// Função para gerar dados mock dinâmicos
export const generateMockData = () => {
  const now = new Date()
  const baseTime = new Date(now.getTime() - 30000) // 30 segundos atrás
  
  return {
    transcriptionChunks: mockTranscriptionChunks.map((chunk, index) => ({
      ...chunk,
      timestamp: new Date(baseTime.getTime() + (index * 3000)) // 3 segundos entre chunks
    })),
    visualRepresentations: mockVisualRepresentations.map((visual, index) => ({
      ...visual,
      timestamp: new Date(baseTime.getTime() + (index * 3000))
    }))
  }
}

// Função para simular processamento em tempo real
export const simulateRealTimeProcessing = (
  onChunkReady: (chunk: TranscriptionChunk) => void,
  onVisualReady: (visual: VisualRepresentation) => void,
  interval: number = 2000
) => {
  let chunkIndex = 0
  let visualIndex = 0
  
  const chunkInterval = setInterval(() => {
    if (chunkIndex < mockTranscriptionChunks.length) {
      onChunkReady(mockTranscriptionChunks[chunkIndex])
      chunkIndex++
    }
  }, interval)
  
  const visualInterval = setInterval(() => {
    if (visualIndex < mockVisualRepresentations.length) {
      onVisualReady(mockVisualRepresentations[visualIndex])
      visualIndex++
    }
  }, interval + 500) // Slight delay for visual processing
  
  return () => {
    clearInterval(chunkInterval)
    clearInterval(visualInterval)
  }
}
