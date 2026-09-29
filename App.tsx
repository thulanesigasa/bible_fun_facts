import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { UserProvider } from './src/context/UserContext';
import { AlertProvider } from './src/context/AlertContext';
import { UpdateModal } from './src/components/UpdateModal';
import { ErrorBoundary } from './src/components/ErrorBoundary';
import { initSentry } from './src/services/sentryService';

// Initialize production crash logging early in application lifecycle
initSentry();

export default function App() {
  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AlertProvider>
          <UserProvider>
            <SafeAreaProvider>
              <StatusBar style="dark" />
              <ErrorBoundary>
                <AppNavigator />
              </ErrorBoundary>
              <UpdateModal />
            </SafeAreaProvider>
          </UserProvider>
        </AlertProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
}
