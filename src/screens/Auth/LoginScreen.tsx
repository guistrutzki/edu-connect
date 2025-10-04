import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useAuthStore } from '../../store/authStore'

export const LoginScreen = () => {
  const login = useAuthStore(state => state.login)

  const handleLogin = () => {
    // Mock login - replace with actual authentication logic
    login({
      id: '1',
      email: 'user@example.com',
      name: 'Test User'
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edu Connect</Text>
      <Text style={styles.subtitle}>Faça login para continuar</Text>
      
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
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
  loginButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 200,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
})
