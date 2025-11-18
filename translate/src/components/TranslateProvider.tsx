'use client'

import React from 'react'
import {
  LocaleType,
  AllTranslations,
  setDefaultLocale,
  setTranslations,
  useTranslateModel
} from '../model'

interface TranslateProviderProps {
  children: React.ReactNode
  defaultLocale: LocaleType
  translations: AllTranslations
}

/**
* The provider component for initializing the localization system.
* Sets the initial language and downloads the translations.
* If the transfers have already been initialized on the server, then reinitialization does not occur.
* @param {TranslateProviderProps} props Properties of the component.
* @returns {React.ReactNode} Child elements.
*/
export const TranslateProvider: React.FC<TranslateProviderProps> = ({
  children,
  defaultLocale,
  translations
}) => {
  const currentDefaultLocale = useTranslateModel.getState().defaultLocale;
  const currentTranslations = useTranslateModel.getState().translations;

  // Synchronous initialization only if the state is empty
  if (!currentDefaultLocale) {
    setDefaultLocale(defaultLocale)
  }

  if (Object.keys(currentTranslations).length === 0) {
    setTranslations(translations)
  }

  return <>{children}</>
}
