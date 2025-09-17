// src/components/TranslateProvider.tsx
'use client';

import React from 'react';
import { LocaleType, AllTranslations, setLocale, setTranslations, getLocale, useTranslateModel } from '../model';

interface TranslateProviderProps {
  children: React.ReactNode;
  locale: LocaleType;
  translations: AllTranslations;
}

/**
 * Компонент-провайдер для инициализации системы локализации.
 * Устанавливает начальный язык и загружает переводы в Zustand модель.
 * Если переводы уже были инициализированы на сервере, то повторной инициализации не происходит.
 * @param {TranslateProviderProps} props Свойства компонента.
 * @returns {React.ReactNode} Дочерние элементы.
 */
export const TranslateProvider: React.FC<TranslateProviderProps> = ({
  children,
  locale,
  translations,
}) => {
  const currentLocale = useTranslateModel((state) => state.locale);
  const currentTranslations = useTranslateModel((state) => state.translations);

  if (currentLocale !== locale) {
    setLocale(locale);
  }
  if (currentTranslations !== translations) {
    setTranslations(translations);
  }

  return <>{children}</>;
};