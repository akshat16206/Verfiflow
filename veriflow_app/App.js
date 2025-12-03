import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import LandingScreen from './screen/LandingScreen';
import LoginScreen from './screen/LoginScreen';
import RegisterScreen from './screen/RegisterScreen';
import FarmerDashboard from './screen/FarmerDashboard';

const Stack = createStackNavigator();

// Expo Router / ExpoRoot already provides a NavigationContainer at runtime.
// Do NOT wrap this navigator in a NavigationContainer to avoid nesting warnings.
export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Landing">
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="FarmerDashboard" component={FarmerDashboard} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

