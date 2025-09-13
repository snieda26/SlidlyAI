import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../contexts/ThemeContext';
import { getColors } from '../constants/colors';

interface CustomPostPageProps {
  onBack: () => void;
}

const CustomPostPage: React.FC<CustomPostPageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const Colors = getColors(isDark);

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.background.primary }]}
    >
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={[styles.backButtonText, { color: Colors.text.secondary }]}>
          ← Back
        </Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.illustration}>
          <Text style={styles.illustrationText}>✏️</Text>
        </View>
        <Text style={[styles.title, { color: Colors.text.secondary }]}>
          {t('customPost.title')}
        </Text>
        <Text style={[styles.subtitle, { color: Colors.text.secondary }]}>
          {t('customPost.subtitle')}
        </Text>
      </View>

      <View style={styles.inputContainer}>
        <View
          style={[
            styles.inputField,
            { backgroundColor: Colors.input.background },
          ]}
        >
          <Text
            style={[
              styles.placeholderText,
              { color: Colors.input.placeholder },
            ]}
          >
            {t('customPost.placeholder')}
          </Text>
          <View style={styles.inputActions}>
            <TouchableOpacity style={styles.voiceButton}>
              <Text style={styles.voiceIcon}>
                {t('general.buttons.voiceIcon')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.sendButton, { backgroundColor: Colors.gray[500] }]}
            >
              <Text style={[styles.sendIcon, { color: Colors.white }]}>
                {t('general.buttons.sendIcon')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  illustration: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  illustrationText: {
    fontSize: 64,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  inputField: {
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  placeholderText: {
    flex: 1,
    fontSize: 16,
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voiceButton: {
    marginRight: 12,
    padding: 8,
  },
  voiceIcon: {
    fontSize: 20,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomPostPage;
