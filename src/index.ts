// src/index.ts
export { TranslateProvider } from './components/TranslateProvider';
export { setLocale, getLocale, setTranslations, translate, translate as t } from './model';
export type { LocaleType, Translations, ITranslateModelState } from './model';
export { useLocale, useTranslations } from './hooks';