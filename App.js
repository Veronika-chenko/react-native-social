import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
// auth screens
import { RegistrationScreen } from './Screens/auth/RegistrationScreen';
import { LoginScreen } from './Screens/auth/LoginScreen';
// main screens
import { Home } from './Screens/main/Home';

const AuthStack = createStackNavigator();

import { Text } from 'react-native';

export default function App() {
  return (
    // <Text>ASd</Text>
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen 
          options={{
              headerShown: false,
          }} 
          name='Login' 
          component={LoginScreen}/>
        <AuthStack.Screen 
          options={{
              headerShown: false,
          }} 
          name='Register' 
          component={RegistrationScreen}/>
        <AuthStack.Screen 
          options={{
              headerShown: false,
          }} 
          name='Home' 
          component={Home}/>
        </AuthStack.Navigator>
    </NavigationContainer>
  );
}
