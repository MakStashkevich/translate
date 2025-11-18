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
  const currentDefaultLocale = useTranslateModel(state => state.defaultLocale)
  const currentTranslations = useTranslateModel(state => state.translations)

  if (currentDefaultLocale !== defaultLocale) {
    setDefaultLocale(defaultLocale)
  }

  if (currentTranslations !== translations) {
    setTranslations(translations)
  }

  return <>{children}</>
}
