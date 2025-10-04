import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Typography } from '../../components/atoms/Typography'
import { theme } from '../../utils/theme'

export const HomeScreen = () => {
  const insets = useSafeAreaInsets()

  return (
    <LinearGradient
      colors={['#FFF8E1', '#F3E5F5', '#E8F5E8']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={[styles.content, { paddingTop: insets.top + 20 }]}>
        {/* Header Section */}
        

        {/* Banner Section */}
        <View style={styles.bannerSection}>
          <Image 
            source={require('../../../assets/banner.png')} 
            style={styles.bannerImage}
            resizeMode="center"
          />
        </View>

        

        {/* Description Section */}
        <View style={styles.descriptionSection}>
          <Typography 
            size="$font-description-md" 
            fontWeight="$regular"
            color="$gray-800"
            style={styles.description}
          >
            Ajudamos pessoas com autismo, deficiência auditiva ou visual a compreenderem melhor o ambiente educacional através de representações visuais e textuais.
          </Typography>
        </View>

        {/* Feature Cards - 2x2 Grid */}
        <View style={styles.featuresContainer}>
          {/* First Row */}
          <View style={styles.featuresRow}>
            <LinearGradient
              colors={['#E3F2FD', '#BBDEFB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featureCard}
            >
              <View style={[styles.featureIcon, { backgroundColor: theme.COLORS['$autism-gray'] }]}>
                <Text style={styles.iconText}>🏫</Text>
              </View>
              <Typography 
                size="$font-description-lg" 
                fontWeight="$bold" 
                color="$gray-900"
                style={styles.featureTitle}
              >
                Sala Inclusiva
              </Typography>
              <Typography 
                size="$font-description-sm" 
                fontWeight="$regular" 
                color="$gray-600"
                style={styles.featureDescription}
              >
                Ambiente acolhedor para todos
              </Typography>
            </LinearGradient>

            <LinearGradient
              colors={['#E3F2FD', '#BBDEFB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featureCard}
            >
              <View style={[styles.featureIcon, { backgroundColor: theme.COLORS['$autism-gray'] }]}>
                <Text style={styles.iconText}>🎤</Text>
              </View>
              <Typography 
                size="$font-description-lg" 
                fontWeight="$bold" 
                color="$gray-900"
                style={styles.featureTitle}
              >
                Captura de Áudio
              </Typography>
              <Typography 
                size="$font-description-sm" 
                fontWeight="$regular" 
                color="$gray-600"
                style={styles.featureDescription}
              >
                Processamento em tempo real
              </Typography>
            </LinearGradient>
          </View>

          {/* Second Row */}
          <View style={styles.featuresRow}>
            <LinearGradient
              colors={['#E3F2FD', '#BBDEFB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featureCard}
            >
              <View style={[styles.featureIcon, { backgroundColor: theme.COLORS['$autism-gray'] }]}>
                <Text style={styles.iconText}>👁️</Text>
              </View>
              <Typography 
                size="$font-description-lg" 
                fontWeight="$bold" 
                color="$gray-900"
                style={styles.featureTitle}
              >
                Visual
              </Typography>
              <Typography 
                size="$font-description-sm" 
                fontWeight="$regular" 
                color="$gray-600"
                style={styles.featureDescription}
              >
                Texto em imagens
              </Typography>
            </LinearGradient>

            <LinearGradient
              colors={['#E3F2FD', '#BBDEFB']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.featureCard}
            >
              <View style={[styles.featureIcon, { backgroundColor: theme.COLORS['$autism-gray'] }]}>
                <Text style={styles.iconText}>♿</Text>
              </View>
              <Typography 
                size="$font-description-lg" 
                fontWeight="$bold" 
                color="$gray-900"
                style={styles.featureTitle}
              >
                Inclusão
              </Typography>
              <Typography 
                size="$font-description-sm" 
                fontWeight="$regular" 
                color="$gray-600"
                style={styles.featureDescription}
              >
                Acessível para todos
              </Typography>
            </LinearGradient>
          </View>
        </View>

        </View>
      </ScrollView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 26,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    lineHeight: 18,
  },
  bannerSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  bannerImage: {
    width: '100%',
    height: 180,
    borderRadius: 20,
  },
  descriptionSection: {
    marginBottom: 20,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 8,
  },
  description: {
    textAlign: 'center',
    lineHeight: 18,
  },
  featuresContainer: {
    marginBottom: 24,
    flex: 1,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  featureCard: {
    backgroundColor: theme.COLORS['$color-grayscale-1'],
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    alignItems: 'center',
    minHeight: 150,
    justifyContent: 'center',
  },
  featureIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconText: {
    fontSize: 24,
  },
  featureTitle: {
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 20,
  },
  featureDescription: {
    textAlign: 'center',
    lineHeight: 18,
  },
})
