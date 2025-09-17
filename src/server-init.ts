// src/server-init.ts
import { LocaleType, AllTranslations, initializeTranslations } from './model';

/**
 * Инициализирует переводы на сервере.
 * Эту функцию следует вызывать в серверных компонентах Next.js (например, в layout.ts).
 * @param locale Текущая локаль.
 * @param translations Все переводы.
 */
export const initTranslations = (locale: LocaleType, translations: AllTranslations) => {
  initializeTranslations(locale, translations);
};