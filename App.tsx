import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/context/UserContext';
import { AlertProvider } from './src/context/AlertContext';
import { UpdateModal } from './src/components/UpdateModal';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AlertProvider>
        <UserProvider>
          <SafeAreaProvider>
            <StatusBar style="dark" />
            <AppNavigator />
            <UpdateModal />
          </SafeAreaProvider>
        </UserProvider>
      </AlertProvider>
    </GestureHandlerRootView>
  );
}
