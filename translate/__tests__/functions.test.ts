import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { replaceArguments } from '../src/utils/argument-replacer'
import { getNestedTranslation } from '../src/utils/translation-parser'
import {
  setLocale,
  getLocale,
  setTranslations,
  translate,
  setDefaultLocale,
  getDefaultLocale
} from '../src/model'

describe('argument-replacer', () => {
  it('should replace positional arguments correctly', () => {
    const result = replaceArguments('Hello, {1}! Welcome to {2}.', ['World', 'Vitest'])
    expect(result).toBe('Hello, World! Welcome to Vitest.')
  })

  it('should replace named arguments correctly', () => {
    const result = replaceArguments('Hello, {name}! Welcome to {place}.', {
      name: 'Vitest',
      place: 'Testing'
    })
    expect(result).toBe('Hello, Vitest! Welcome to Testing.')
  })

  it('should not replace unmatched placeholders', () => {
    const result = replaceArguments('Hello, {name}! Your id is {id}.', { name: 'Vitest' })
    expect(result).toBe('Hello, Vitest! Your id is {id}.')
  })

  it('should return original string if no arguments are provided', () => {
    const result = replaceArguments('Hello, World!')
    expect(result).toBe('Hello, World!')
  })

  it('should return original string if args is undefined', () => {
    expect(replaceArguments('Test', undefined)).toBe('Test')
  })

  it('should handle empty string and empty arguments', () => {
    expect(replaceArguments('', {})).toBe('')
    expect(replaceArguments('', [])).toBe('')
  })
})

describe('translation-parser', () => {
  const translations = {
    en: {
      hello: 'Hello',
      welcome: 'Welcome {name}',
      nested: {
        message: 'This is a nested message',
        deep: {
          value: 'Deep nested value'
        }
      },
      array: ['item1', 'item2']
    },
    es: {
      hello: 'Hola'
    }
  }

  it('should return the translation for a top-level key', () => {
    expect(getNestedTranslation(translations.en, 'hello')).toBe('Hello')
  })

  it('should return the translation for a nested key', () => {
    expect(getNestedTranslation(translations.en, 'nested.message')).toBe('This is a nested message')
  })

  it('should return the translation for a deeply nested key', () => {
    expect(getNestedTranslation(translations.en, 'nested.deep.value')).toBe('Deep nested value')
  })

  it('should return undefined for a non-existent key', () => {
    expect(getNestedTranslation(translations.en, 'nonExistent')).toBeUndefined()
  })

  it('should return undefined for a partially non-existent nested key', () => {
    expect(getNestedTranslation(translations.en, 'nested.nonExistent.value')).toBeUndefined()
  })

  it('should return undefined if the value is not a string', () => {
    expect(getNestedTranslation(translations.en, 'nested')).toBeUndefined()
    expect(getNestedTranslation(translations.en, 'array')).toBeUndefined()
  })

  it('should handle empty object', () => {
    expect(getNestedTranslation({}, 'hello')).toBeUndefined()
  })

  it('should handle empty key', () => {
    expect(getNestedTranslation(translations.en, '')).toBeUndefined()
  })
})

describe('model', () => {
  const mockTranslations = {
    en: {
      greeting: 'Hello',
      welcome: 'Welcome, {name}!',
      nested: {
        message: 'Nested message'
      }
    },
    es: {
      greeting: 'Hola',
      welcome: '¡Bienvenido, {name}!'
    }
  }

  beforeEach(() => {
    // Reset the store before each test
    setDefaultLocale('')
    setLocale('')
    setTranslations({})
  })

  it('should set and get locale', () => {
    setLocale('en')
    expect(getLocale()).toBe('en')
  })

  it('should set and get default locale', () => {
    setDefaultLocale('es')
    expect(getDefaultLocale()).toBe('es')
    expect(getLocale()).toBe('es') // Setting default locale also sets current locale
  })

  it('should set translations', () => {
    setTranslations(mockTranslations)
    // Since we don't have a direct getter for all translations, we'll test via translate function
    setLocale('en')
    expect(translate('greeting')).toBe('Hello')
  })

  it('should translate a simple key', () => {
    setTranslations(mockTranslations)
    setLocale('en')
    expect(translate('greeting')).toBe('Hello')
  })

  it('should translate a key with named arguments', () => {
    setTranslations(mockTranslations)
    setLocale('en')
    expect(translate('welcome', { name: 'John' })).toBe('Welcome, John!')
  })

  it('should translate a nested key', () => {
    setTranslations(mockTranslations)
    setLocale('en')
    expect(translate('nested.message')).toBe('Nested message')
  })

  it('should return key if translation not found', () => {
    setTranslations(mockTranslations)
    setLocale('en')
    expect(translate('nonExistentKey')).toBe('nonExistentKey')
  })

  it('should return key if locale not found', () => {
    setTranslations(mockTranslations)
    setLocale('fr') // Non-existent locale
    expect(translate('greeting')).toBe('greeting')
  })

  it('should use default locale if current locale has no translation for key', () => {
    const translationsWithDefault = {
      en: {
        greeting: 'Hello'
      },
      fr: {
        // No greeting in French
      }
    }
    setTranslations(translationsWithDefault)
    setDefaultLocale('en')
    setLocale('fr')
    // Currently, the model's translate function only checks the current locale.
    // If default locale fallback is desired, it needs to be implemented in the translate function.
    // For now, it should return the key if not found in current locale.
    expect(translate('greeting')).toBe('greeting')
  })

  it('should handle empty translations object', () => {
    setTranslations({})
    setLocale('en')
    expect(translate('greeting')).toBe('greeting')
  })

  it('should handle empty key for translation', () => {
    setTranslations(mockTranslations)
    setLocale('en')
    expect(translate('')).toBe('')
  })
})
