import { create } from 'zustand';
import { createSelectors } from './utils/selectors';
import { getNestedTranslation } from './utils/translation-parser';
import { replaceArguments } from './utils/argument-replacer';

export type LocaleType = 'ru' | 'en' | string; // Добавляем string для поддержки других языков
export type Translations = Record<string, any>; // Объект переводов для конкретного языка
export type AllTranslations = Record<LocaleType, Translations>; // Объект, содержащий переводы для всех языков
type Args = Record<string, string | number> | (string | number)[];

export interface ITranslateModelState {
  locale: LocaleType;
  translations: AllTranslations;
  setLocale: (locale: LocaleType) => void;
  setTranslations: (translations: AllTranslations) => void;
  t: (key: string, args?: Args) => string;
}

const initialState: ITranslateModelState = {
  locale: 'ru', // По умолчанию английский
  translations: {
    ru: {}, // Инициализируем русский язык пустым объектом
  },
  setLocale: () => {},
  setTranslations: () => {},
  t: () => '',
};

const _useTranslateModel = create<ITranslateModelState>((set, get) => ({
  ...initialState,
  setLocale: (locale: LocaleType) => {
    set({ locale });
  },
  setTranslations: (translations: AllTranslations) => {
    set({ translations });
  },
  t: (key: string, args?: Args): string => {
    const { translations, locale } = get();
    const currentTranslations = translations[locale] || {}; // Получаем переводы для текущего языка
    const translationString = getNestedTranslation(currentTranslations, key);

    if (translationString) {
      return replaceArguments(translationString, args);
    }

    return key; // Возвращаем ключ, если перевод не найден
  },
}));

export const useTranslateModel = createSelectors(_useTranslateModel);
export const setLocale = (locale: LocaleType) => _useTranslateModel.getState().setLocale(locale);
export const getLocale = (): LocaleType => _useTranslateModel.getState().locale;
export const setTranslations = (translations: AllTranslations) => _useTranslateModel.getState().setTranslations(translations);
export const t = (key: string, args?: Args) => _useTranslateModel.getState().t(key, args);