'use client'

import React from 'react'
import {
  LocaleType,
  AllTranslations,
  setDefaultLocale,
  setTranslations,
  useTranslateModel,
  setLocale
} from '../model'
import {
  TranslateProviderStorageProps,
  getLocaleFromStorage,
  setLocaleInStorage
} from '../utils/storage'
import { useEffect } from 'react'

interface TranslateProviderProps {
  children: React.ReactNode
  defaultLocale: LocaleType
  translations: AllTranslations
  storage?: TranslateProviderStorageProps
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
  translations,
  storage
}) => {
  const { defaultLocale: currentDefaultLocale, translations: currentTranslations } =
    useTranslateModel.getState()
  const currentLocale = useTranslateModel.use.locale()

  // Synchronous initialization only if the state is empty
  if (!currentDefaultLocale) {
    setDefaultLocale(defaultLocale)
  }

  if (Object.keys(currentTranslations).length === 0) {
    setTranslations(translations)
  }

  // Check locale from storage on first render
  useEffect(() => {
    const storedLocale = getLocaleFromStorage(storage)
    if (storedLocale && storedLocale !== defaultLocale) {
      // Update state if not default
      setLocale(storedLocale as LocaleType)
    } else if (!storedLocale) {
      // Update store if exists
      setLocaleInStorage(defaultLocale, storage)
    }
  }, [])

  // Update the repository when the locale changes
  useEffect(() => {
    const storedLocale = getLocaleFromStorage(storage)
    if (currentLocale && storedLocale && currentLocale !== storedLocale) {
      setLocaleInStorage(currentLocale, storage)
    }
  }, [currentLocale, storage])

  return <>{children}</>
}
