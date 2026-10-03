import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Alert } from 'react-native';
import ThemedAlertModal, { AlertIconType, ThemedAlertButton } from '../components/ThemedAlertModal';

export interface AlertOptions {
  title: string;
  message?: string;
  icon?: AlertIconType;
  buttons?: ThemedAlertButton[];
  isDestructive?: boolean;
}

interface AlertContextType {
  showAlert: (options: AlertOptions) => void;
  hideAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState<AlertOptions>({
    title: '',
    message: '',
    icon: 'logo',
    buttons: [{ text: 'OK' }],
    isDestructive: false,
  });

  const showAlert = (options: AlertOptions) => {
    setAlertConfig({
      title: options.title,
      message: options.message,
      icon: options.icon || 'logo',
      buttons: options.buttons && options.buttons.length > 0 ? options.buttons : [{ text: 'OK' }],
      isDestructive: options.isDestructive || false,
    });
    setModalVisible(true);
  };

  const hideAlert = () => {
    setModalVisible(false);
  };

  // Intercept standard React Native Alert.alert calls across the app to guarantee all popups
  // smoothly slide up from the bottom as themed sheets with the app logo.
  useEffect(() => {
    const originalAlert = Alert.alert;
    Alert.alert = (title: string, message?: string, buttons?: any[]) => {
      showAlert({
        title: title || '',
        message: typeof message === 'string' ? message : undefined,
        buttons: buttons && buttons.length > 0
          ? buttons.map((b) => ({
              text: b.text || 'OK',
              style: b.style,
              onPress: b.onPress,
            }))
          : [{ text: 'OK' }],
      });
    };
    return () => {
      Alert.alert = originalAlert;
    };
  }, []);

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      <ThemedAlertModal
        visible={modalVisible}
        title={alertConfig.title}
        message={alertConfig.message}
        icon={alertConfig.icon}
        buttons={alertConfig.buttons}
        isDestructive={alertConfig.isDestructive}
        onClose={hideAlert}
      />
    </AlertContext.Provider>
  );
};

export const useThemedAlert = (): AlertContextType => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useThemedAlert must be used within an AlertProvider');
  }
  return context;
};
