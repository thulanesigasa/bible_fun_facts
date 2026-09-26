import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import { Text } from './Typography';
import { ClockSvg, CloseSvg, RadioCheckedSvg, RadioUncheckedSvg } from './SvgIcons';
import { LOCK_TIMEOUT_OPTIONS, LockTimeoutOption } from '../services/biometricService';

interface LockTimeoutModalProps {
  visible: boolean;
  currentTimeout: number;
  onSelect: (seconds: number) => void;
  onClose: () => void;
}

export const LockTimeoutModal: React.FC<LockTimeoutModalProps> = ({
  visible,
  currentTimeout,
  onSelect,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.sheetContainer}>
              {/* Header */}
              <View style={styles.header}>
                <View style={styles.headerTitleBox}>
                  <View style={styles.iconCircle}>
                    <ClockSvg size={18} color="#0F172A" strokeWidth={2.2} />
                  </View>
                  <View>
                    <Text variant="h3" weight="800" color="#0F172A" style={styles.title}>
                      Inactivity Auto-Lock
                    </Text>
                    <Text variant="caption" color="#64748B">
                      Require biometric verification after absence
                    </Text>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={onClose}
                  activeOpacity={0.7}
                  accessibilityRole="button"
                  accessibilityLabel="Close dialog"
                >
                  <CloseSvg size={18} color="#64748B" strokeWidth={2.2} />
                </TouchableOpacity>
              </View>

              {/* Options List */}
              <View style={styles.optionsList}>
                {LOCK_TIMEOUT_OPTIONS.map((option: LockTimeoutOption, index: number) => {
                  const isSelected = currentTimeout === option.seconds;
                  const isLast = index === LOCK_TIMEOUT_OPTIONS.length - 1;

                  return (
                    <React.Fragment key={option.seconds}>
                      <TouchableOpacity
                        style={[
                          styles.optionRow,
                          isSelected && styles.optionRowSelected,
                        ]}
                        onPress={() => {
                          onSelect(option.seconds);
                          onClose();
                        }}
                        activeOpacity={0.75}
                        accessibilityRole="radio"
                        accessibilityState={{ selected: isSelected }}
                        accessibilityLabel={`${option.label}. ${option.description}`}
                      >
                        <View style={styles.optionTextBox}>
                          <Text
                            variant="body"
                            weight={isSelected ? '800' : '600'}
                            color="#0F172A"
                            style={styles.optionLabel}
                          >
                            {option.label}
                          </Text>
                          <Text variant="caption" color="#64748B" style={styles.optionDescription}>
                            {option.description}
                          </Text>
                        </View>

                        <View style={styles.radioBox}>
                          {isSelected ? (
                            <RadioCheckedSvg size={22} color="#0F172A" strokeWidth={2} />
                          ) : (
                            <RadioUncheckedSvg size={22} color="#CBD5E1" strokeWidth={1.8} />
                          )}
                        </View>
                      </TouchableOpacity>
                      {!isLast && <View style={styles.divider} />}
                    </React.Fragment>
                  );
                })}
              </View>

              {/* Cancel Button */}
              <TouchableOpacity
                style={styles.dismissButton}
                onPress={onClose}
                activeOpacity={0.8}
                accessibilityRole="button"
                accessibilityLabel="Cancel timeout selection"
              >
                <Text variant="body" weight="700" color="#64748B">
                  Done
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.45)', // 60% Dimmed
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  sheetContainer: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF', // 30% Panel Surface
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.08)',
    padding: 24,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitleBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: 'rgba(253, 210, 35, 0.18)', // 10% Accent Tint
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'SpaceMono',
  },
  closeButton: {
    padding: 6,
    borderRadius: 16,
    backgroundColor: '#F8FAFC',
  },
  optionsList: {
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  optionRowSelected: {
    backgroundColor: 'rgba(253, 210, 35, 0.10)',
  },
  optionTextBox: {
    flex: 1,
    paddingRight: 16,
  },
  optionLabel: {
    fontSize: 14,
    marginBottom: 2,
  },
  optionDescription: {
    fontSize: 12,
    lineHeight: 16,
  },
  radioBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.05)',
  },
  dismissButton: {
    height: 44,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(15, 23, 42, 0.06)',
  },
});

export default LockTimeoutModal;
