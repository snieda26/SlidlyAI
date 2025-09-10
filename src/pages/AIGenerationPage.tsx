import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';

const AIGenerationPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustration}>
          <Text style={styles.illustrationText}>🤖</Text>
        </View>
        <Text style={styles.title}>{t('aiGeneration.title')}</Text>
        <Text style={styles.subtitle}>{t('aiGeneration.subtitle')}</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.inputField}>
          <Text style={styles.placeholderText}>
            {t('aiGeneration.placeholder')}
          </Text>
          <View style={styles.inputActions}>
            <TouchableOpacity style={styles.voiceButton}>
              <Text style={styles.voiceIcon}>
                {t('general.buttons.voiceIcon')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton}>
              <Text style={styles.sendIcon}>
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
    backgroundColor: '#f8f9fa',
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
    color: '#6c757d',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 22,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  inputField: {
    backgroundColor: '#fff',
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
    color: '#6c757d',
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
    backgroundColor: '#6c757d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendIcon: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AIGenerationPage;
