import { useCallback } from 'react';
import i18n from '../i18n';

export const useTranslation = () => {
  const t = useCallback((key: string, options?: any) => {
    return i18n.t(key, options);
  }, []);

  const changeLanguage = useCallback((language: string) => {
    i18n.locale = language;
  }, []);

  return {
    t,
    changeLanguage,
    currentLanguage: i18n.locale,
  };
};
