// src/index.ts
export { useTranslate } from './hooks/useTranslate';
export { TranslateProvider } from './components/TranslateProvider';
export { setLocale, getLocale, setTranslations, useTranslateModel } from './model';
export type { LocaleType, Translations, ITranslateModelState } from './model';