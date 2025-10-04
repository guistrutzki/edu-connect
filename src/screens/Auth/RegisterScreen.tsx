import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useAuthStore } from '../../store/authStore'

export const RegisterScreen = () => {
  const login = useAuthStore(state => state.login)

  const handleRegister = () => {
    // Mock registration - replace with actual registration logic
    login({
      id: '1',
      email: 'user@example.com',
      name: 'Test User'
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Registre-se para começar</Text>
      
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  registerButton: {
    backgroundColor: '#34C759',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 200,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
})
