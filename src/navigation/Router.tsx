import { NavigationContainer } from '@react-navigation/native'
import { useAuthStore } from '../store/authStore'
import { AuthRoutes } from './Auth.routes'
import { MainStackNavigator } from './MainStackNavigator'

export const Router = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated)

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStackNavigator /> : <AuthRoutes />}
    </NavigationContainer>
  )
}
