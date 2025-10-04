import React from 'react'
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useAuthStore } from '@store/authStore'
import { LottieAnimation } from '@components/LottieAnimation'
import { Typography } from '@components/atoms/Typography/Typography'
import puzzleAnimation from '../../../assets/puzzle-animation.json'

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
    <LinearGradient
      colors={['#FFF8E1', '#F3E5F5', '#E8F5E8']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Top Section - Animation */}
      <View style={styles.animationSection}>
        <LottieAnimation 
          source={puzzleAnimation}
          autoPlay={true}
          loop={true}
          speed={1}
          progress={0.9}
        />
      </View>

      {/* Middle Section - Branding */}
      <View style={styles.brandingSection}>
        <Typography 
          fontWeight="$bold" 
          style={[styles.title, { color: '#2C3E50', fontSize: 34, lineHeight: 38 }]}
        >
          Edu Connect
        </Typography>
        <Typography 
          size="$font-description-md" 
          fontWeight="$medium" 
          style={[styles.subtitle, { color: '#34495E' }]}
        >
          Aprenda, cresça e se desenvolva{'\n'}através de conexões únicas!
        </Typography>
      </View>

      <View style={styles.buttonSection}>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Typography 
            size="$font-description-lg" 
            fontWeight="$bold" 
            style={[styles.loginButtonText, { color: 'white' }]}
          >
            Acessar
          </Typography>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  animationSection: {
    flex: 0.55,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60,
    transform: [{ scale: 1.1 }],
  },
  brandingSection: {
    flex: 0.25,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonSection: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  title: {
    marginBottom: 8,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 22,
  },
  loginButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 18,
    borderRadius: 30,
    width: '100%',
    shadowColor: '#2196F3',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  loginButtonText: {
    textAlign: 'center',
  },
})
