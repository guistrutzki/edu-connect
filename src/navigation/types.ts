import { NavigatorScreenParams } from '@react-navigation/native'

export enum ROUTES_NAME {
  // Auth Routes
  LOGIN = 'Login',
  REGISTER = 'Register',
  
  // Main Routes  
  HOME = 'Home',
  AUDIO_CAPTURE = 'AudioCapture',
  EMOJI_DISPLAY = 'EmojiDisplay',
  
  // Tab Names
  MAIN_TABS = 'MainTabs'
}

// Auth Stack Navigator
export type AuthStackParamList = {
  Login: undefined
  Register: undefined
}

// Main Stack Navigator
export type MainStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>
}

// Main Tab Navigator
export type MainTabParamList = {
  Home: undefined
  AudioCapture: undefined
  EmojiDisplay: undefined
}

// Root Stack Navigator
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>
  Main: NavigatorScreenParams<MainStackParamList>
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
