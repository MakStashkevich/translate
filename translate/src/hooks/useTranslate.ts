import { useCallback } from 'react'
import { useTranslateModel } from '../model'
import { getNestedTranslation } from '../utils/translation-parser'
import { replaceArguments } from '../utils/argument-replacer'

type Args = Record<string, string | number> | (string | number)[]

export const useTranslate = () => {
  const translations = useTranslateModel.use.translations();
  const locale = useTranslateModel.use.locale();

  const translate = useCallback(
    (key: string, args?: Args): string => {
      const currentTranslations = translations[locale] || {}
      const translationString = getNestedTranslation(currentTranslations, key)

      if (translationString) {
        return replaceArguments(translationString, args)
      }

      if (translationString) {
        return translationString
      }

      return key
    },
    [locale, translations]
  )

  return translate
}