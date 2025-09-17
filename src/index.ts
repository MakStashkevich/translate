// src/index.ts

import { AllTranslations, LocaleType, setLocale, setTranslations } from './model';

/**
 * Инициализирует переводы на сервере.
 * Эту функцию следует вызывать в серверных компонентах Next.js (например, в layout.ts).
 * @param locale Текущая локаль.
 * @param translations Все переводы.
 */
export const initTranslations = (locale: LocaleType, translations: AllTranslations) => {
  setLocale(locale);
  setTranslations(translations);
};

export { useTranslate } from './hooks/useTranslate';
export { TranslateProvider } from './components/TranslateProvider';
export { setLocale, getLocale, setTranslations, useTranslateModel } from './model';
export type { LocaleType, Translations, ITranslateModelState } from './model';