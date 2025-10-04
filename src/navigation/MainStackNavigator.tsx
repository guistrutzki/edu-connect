import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Text } from 'react-native'
import { MainStackParamList, MainTabParamList, ROUTES_NAME } from './types'
import { HomeScreen } from '../screens/Main/HomeScreen'
import { AudioCaptureScreen } from '../screens/Main/AudioCaptureScreen'
import { EmojiDisplayScreen } from '../screens/Main/EmojiDisplayScreen'

const Stack = createNativeStackNavigator<MainStackParamList>()
const Tab = createBottomTabNavigator<MainTabParamList>()

const MainTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES_NAME.HOME}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen 
        name={ROUTES_NAME.HOME} 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>🏠</Text>
          ),
        }}
      />
      <Tab.Screen 
        name={ROUTES_NAME.AUDIO_CAPTURE} 
        component={AudioCaptureScreen}
        options={{
          tabBarLabel: 'Gravar',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>🎤</Text>
          ),
        }}
      />
      <Tab.Screen 
        name={ROUTES_NAME.EMOJI_DISPLAY} 
        component={EmojiDisplayScreen}
        options={{
          tabBarLabel: 'Emojis',
          tabBarIcon: ({ color }) => (
            <Text style={{ color, fontSize: 20 }}>😊</Text>
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
