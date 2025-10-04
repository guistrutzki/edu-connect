import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useAuthStore } from '../../store/authStore'

export const HomeScreen = () => {
  const { user, logout } = useAuthStore()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.subtitle}>Olá, {user?.name || 'Usuário'}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Use o Edu Connect para capturar áudio e transformar em emojis educacionais.
        </Text>
        
        <View style={styles.features}>
          <Text style={styles.featureTitle}>Funcionalidades:</Text>
          <Text style={styles.feature}>🎤 Gravar áudio em tempo real</Text>
          <Text style={styles.feature}>🤖 Conversão automática para texto</Text>
          <Text style={styles.feature}>😊 Geração de emojis educacionais</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
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
    marginBottom: 30,
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
  content: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 30,
    textAlign: 'center',
  },
  features: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  feature: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 30,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
})
