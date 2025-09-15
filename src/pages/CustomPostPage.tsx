import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import { useTheme } from '../contexts/ThemeContext';
import { getColors } from '../constants/colors';
import { sendChatGPTRequest } from '../services/chatgptService';

interface CustomPostPageProps {
  onBack: () => void;
}

const CustomPostPage: React.FC<CustomPostPageProps> = ({ onBack }) => {
  const { t } = useTranslation();
  const { isDark } = useTheme();
  const Colors = getColors(isDark);

  const [inputText, setInputText] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const chatResponse = await sendChatGPTRequest(inputText);
      setResponse(chatResponse);
    } catch (err) {
      // @ts-ignore
      setError(err.message);
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: Colors.background.primary }]}
    >
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={[styles.backButtonText, { color: Colors.text.secondary }]}>
          ← Back
        </Text>
      </TouchableOpacity>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
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

        {/* Response Display */}
        {(response || error) && (
          <View style={styles.responseContainer}>
            <Text
              style={[styles.responseLabel, { color: Colors.text.secondary }]}
            >
              Response:
            </Text>
            <View
              style={[
                styles.responseBox,
                { backgroundColor: Colors.input.background },
              ]}
            >
              <Text
                style={[
                  styles.responseText,
                  { color: error ? Colors.error : Colors.text.primary },
                ]}
              >
                {error || response}
              </Text>
            </View>
          </View>
        )}

        <View style={styles.inputContainer}>
          <View
            style={[
              styles.inputField,
              { backgroundColor: Colors.input.background },
            ]}
          >
            <TextInput
              style={[styles.textInput, { color: Colors.text.primary }]}
              placeholder={t('customPost.placeholder')}
              placeholderTextColor={Colors.input.placeholder}
              value={inputText}
              onChangeText={setInputText}
              multiline
              maxLength={500}
            />
            <View style={styles.inputActions}>
              <TouchableOpacity style={styles.voiceButton}>
                <Text style={styles.voiceIcon}>
                  {t('general.buttons.voiceIcon')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  {
                    backgroundColor:
                      inputText.trim() && !isLoading
                        ? Colors.gray[500]
                        : Colors.gray[300],
                  },
                ]}
                onPress={handleSendMessage}
                disabled={!inputText.trim() || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color={Colors.white} />
                ) : (
                  <Text style={[styles.sendIcon, { color: Colors.white }]}>
                    {t('general.buttons.sendIcon')}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
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
  scrollContainer: {
    flex: 1,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 20,
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
  responseContainer: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  responseLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  responseBox: {
    borderRadius: 12,
    padding: 16,
    minHeight: 80,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  responseText: {
    fontSize: 14,
    lineHeight: 20,
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
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minHeight: 50,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    textAlignVertical: 'top',
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
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
