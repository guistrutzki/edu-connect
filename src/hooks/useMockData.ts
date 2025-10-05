import { useState, useEffect, useCallback } from 'react'
import { TranscriptionChunk, VisualRepresentation } from '../types/audio.types'
import { 
  mockTranscriptionChunks, 
  mockVisualRepresentations, 
  generateMockData,
  simulateRealTimeProcessing 
} from '../utils/mockData'

export const useMockData = (enableMock: boolean = false) => {
  const [transcriptionChunks, setTranscriptionChunks] = useState<TranscriptionChunk[]>([])
  const [visualRepresentations, setVisualRepresentations] = useState<VisualRepresentation[]>([])
  const [isSimulating, setIsSimulating] = useState(false)

  // Carregar dados mock estáticos
  const loadStaticMockData = useCallback(() => {
    if (enableMock) {
      const mockData = generateMockData()
      setTranscriptionChunks(mockData.transcriptionChunks)
      setVisualRepresentations(mockData.visualRepresentations)
    }
  }, [enableMock])

  // Simular processamento em tempo real
  const startSimulation = useCallback(() => {
    if (!enableMock || isSimulating) return

    setIsSimulating(true)
    setTranscriptionChunks([])
    setVisualRepresentations([])

    const stopSimulation = simulateRealTimeProcessing(
      (chunk) => {
        setTranscriptionChunks(prev => [...prev, chunk])
      },
      (visual) => {
        setVisualRepresentations(prev => [...prev, visual])
      },
      2000 // 2 segundos entre chunks
    )

    // Parar simulação após 20 segundos
    const timeout = setTimeout(() => {
      stopSimulation()
      setIsSimulating(false)
    }, 20000)

    return () => {
      stopSimulation()
      clearTimeout(timeout)
      setIsSimulating(false)
    }
  }, [enableMock, isSimulating])

  // Parar simulação
  const stopSimulation = useCallback(() => {
    setIsSimulating(false)
  }, [])

  // Limpar dados
  const clearMockData = useCallback(() => {
    setTranscriptionChunks([])
    setVisualRepresentations([])
    setIsSimulating(false)
  }, [])

  // Adicionar chunk individual
  const addTranscriptionChunk = useCallback((chunk: TranscriptionChunk) => {
    setTranscriptionChunks(prev => [...prev, chunk])
  }, [])

  // Adicionar representação visual individual
  const addVisualRepresentation = useCallback((visual: VisualRepresentation) => {
    setVisualRepresentations(prev => [...prev, visual])
  }, [])

  // Carregar dados mock ao montar o componente
  useEffect(() => {
    if (enableMock) {
      loadStaticMockData()
    }
  }, [enableMock, loadStaticMockData])

  return {
    // Dados
    transcriptionChunks,
    visualRepresentations,
    
    // Estado
    isSimulating,
    
    // Ações
    loadStaticMockData,
    startSimulation,
    stopSimulation,
    clearMockData,
    addTranscriptionChunk,
    addVisualRepresentation,
    
    // Dados mock estáticos
    mockTranscriptionChunks,
    mockVisualRepresentations
  }
}
