import React, { createContext, useContext, useState, ReactNode } from 'react';
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
    icon: 'info',
    buttons: [{ text: 'OK' }],
    isDestructive: false,
  });

  const showAlert = (options: AlertOptions) => {
    setAlertConfig({
      title: options.title,
      message: options.message,
      icon: options.icon || 'info',
      buttons: options.buttons && options.buttons.length > 0 ? options.buttons : [{ text: 'OK' }],
      isDestructive: options.isDestructive || false,
    });
    setModalVisible(true);
  };

  const hideAlert = () => {
    setModalVisible(false);
  };

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
