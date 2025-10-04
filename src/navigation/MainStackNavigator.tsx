import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MainStackParamList, MainTabParamList, ROUTES_NAME } from './types'
import { HomeScreen } from '../screens/Main/HomeScreen'
import { AudioCaptureScreen } from '../screens/Main/AudioCaptureScreen'

const Stack = createNativeStackNavigator<MainStackParamList>()
const Tab = createBottomTabNavigator<MainTabParamList>()

const MainTabs = () => {
  const insets = useSafeAreaInsets()
  
  return (
    <Tab.Navigator
      initialRouteName={ROUTES_NAME.HOME}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#E3F2FD',
          borderTopWidth: 2,
          borderTopColor: '#BBDEFB',
          height: 70 + insets.bottom,
          paddingBottom: insets.bottom + 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#1976D2',
        tabBarInactiveTintColor: '#64B5F6',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen 
        name={ROUTES_NAME.HOME} 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size || 24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name={ROUTES_NAME.AUDIO_CAPTURE} 
        component={AudioCaptureScreen}
        options={{
          tabBarLabel: 'Gravar',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mic" size={size || 24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export const MainStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTES_NAME.MAIN_TABS} component={MainTabs} />
    </Stack.Navigator>
  )
}
