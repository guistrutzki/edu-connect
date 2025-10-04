import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { AuthStackParamList, ROUTES_NAME } from './types'
import { LoginScreen } from '../screens/Auth/LoginScreen'
import { RegisterScreen } from '../screens/Auth/RegisterScreen'

const Stack = createNativeStackNavigator<AuthStackParamList>()

export const AuthRoutes = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES_NAME.LOGIN}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={ROUTES_NAME.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES_NAME.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  )
}
