import { I18n } from 'i18n-js';
import { getLocales } from 'react-native-localize';
import { String_EN } from './localization/en';
import type { LocalizationType } from './localization.type';

// Get the device locale
const deviceLanguage = getLocales()[0]?.languageCode || 'en';

// Define available translations
const translations = {
  en: String_EN,
};

// Create i18n instance
const i18n = new I18n(translations);

// Set the locale with fallback to 'en'
i18n.locale = Object.keys(translations).includes(deviceLanguage)
  ? deviceLanguage
  : 'en';
i18n.defaultLocale = 'en';
i18n.enableFallback = true;

/**
 * Translate a string using the current locale
 * @param key The translation key
 * @param options Optional parameters for the translation
 * @returns The translated string
 */
export const t = (key: string, options?: object): string => {
  return i18n.t(key, options);
};

/**
 * Get the current locale
 * @returns The current locale code (e.g., 'en', 'fr')
 */
export const getCurrentLocale = (): string => {
  return i18n.locale;
};

/**
 * Set the locale manually
 * @param locale The locale code to set
 */
export const setLocale = (locale: string): void => {
  if (Object.keys(translations).includes(locale)) {
    i18n.locale = locale;
  }
};

// Export everything
export type { LocalizationType };

export const Localize = {
  t,
  getCurrentLocale,
  setLocale,
};

export default Localize;
