// src/components/TranslateProvider.tsx
'use client';

import React, { useEffect } from 'react';
import { LocaleType, AllTranslations, setLocale, setTranslations } from '../model';

interface TranslateProviderProps {
  children: React.ReactNode;
  locale: LocaleType;
  translations: AllTranslations;
}

/**
 * Компонент-провайдер для инициализации системы локализации.
 * Устанавливает начальный язык и загружает переводы в Zustand модель.
 * @param {TranslateProviderProps} props Свойства компонента.
 * @returns {React.ReactNode} Дочерние элементы.
 */
export const TranslateProvider: React.FC<TranslateProviderProps> = ({
  children,
  locale,
  translations,
}) => {
  useEffect(() => {
    setLocale(locale);
    setTranslations(translations);
  }, [locale, translations]);

  return <>{children}</>;
};