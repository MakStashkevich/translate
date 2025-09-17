// src/components/TranslateProvider.tsx
'use client';

import React from 'react';
import { LocaleType, AllTranslations, setDefaultLocale, setTranslations, useTranslateModel } from '../model';

interface TranslateProviderProps {
  children: React.ReactNode;
  defaultLocale: LocaleType;
  translations: AllTranslations;
}

/**
 * Компонент-провайдер для инициализации системы локализации.
 * Устанавливает начальный язык и загружает переводы.
 * Если переводы уже были инициализированы на сервере, то повторной инициализации не происходит.
 * @param {TranslateProviderProps} props Свойства компонента.
 * @returns {React.ReactNode} Дочерние элементы.
 */
export const TranslateProvider: React.FC<TranslateProviderProps> = ({
  children,
  defaultLocale,
  translations,
}) => {
  const currentDefaultLocale = useTranslateModel((state) => state.defaultLocale);
  const currentTranslations = useTranslateModel((state) => state.translations);

  if (currentDefaultLocale !== defaultLocale) {
    setDefaultLocale(defaultLocale);
  }

  if (currentTranslations !== translations) {
    setTranslations(translations);
  }

  return <>{children}</>;
};