import { I18n } from 'i18n-js';
import { getLocales } from 'react-native-localize';

// Import translation files by page
import aiGenerationEn from '../translations/AIGeneration/en.json';
import aiGenerationEs from '../translations/AIGeneration/es.json';
import customPostEn from '../translations/CustomPost/en.json';
import customPostEs from '../translations/CustomPost/es.json';
import generalEn from '../translations/General/en.json';
import generalEs from '../translations/General/es.json';

// Create i18n instance with nested structure
const i18n = new I18n({
  en: {
    aiGeneration: aiGenerationEn,
    customPost: customPostEn,
    general: generalEn,
  },
  es: {
    aiGeneration: aiGenerationEs,
    customPost: customPostEs,
    general: generalEs,
  },
});

// Set default locale to English
i18n.defaultLocale = 'en';

// Enable fallback to default locale
i18n.enableFallback = true;

// Initialize with English, will be updated when device locale is available
i18n.locale = 'en';

// Function to set locale based on device language
export const initializeLocale = () => {
  try {
    const deviceLocales = getLocales();
    const deviceLanguage = deviceLocales[0]?.languageCode;

    // Set locale based on device language, fallback to English
    if (deviceLanguage && i18n.translations[deviceLanguage]) {
      i18n.locale = deviceLanguage;
    } else {
      i18n.locale = 'en';
    }
  } catch (error) {
    console.warn('Failed to get device locale, using English:', error);
    i18n.locale = 'en';
  }
};

export default i18n;
