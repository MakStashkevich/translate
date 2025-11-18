import { describe, it, expect, beforeEach } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import {
  setLocale,
  getLocale,
  setTranslations,
  translate,
  setDefaultLocale,
  getDefaultLocale
} from '../src/model'
import { TranslateProvider } from '../src/index'

describe('TranslateProvider', () => {
  const mockTranslations = {
    en: { greeting: 'Hello from provider' },
    fr: { greeting: 'Bonjour du fournisseur' }
  }

  const TestComponent = () => <div data-testid="greeting">{translate('greeting')}</div>

  beforeEach(() => {
    // очищаем предыдущий рендер
    cleanup()
    // сброс состояния перед каждым тестом
    setDefaultLocale('')
    setLocale('')
    setTranslations({})
  })

  it('initializes default locale and translations', async () => {
    render(
      <TranslateProvider defaultLocale="en" translations={mockTranslations}>
        <TestComponent />
      </TranslateProvider>
    )

    // Проверяем состояние сразу
    expect(getDefaultLocale()).toBe('en')
    expect(getLocale()).toBe('en')

    // Проверяем перевод
    expect(screen.getByTestId('greeting').textContent).toBe('Hello from provider')
  })

  it('does not reinitialize if props are the same', async () => {
    const initialTranslations = { en: { test: 'Initial' } }

    // имитация пользовательского изменения
    setDefaultLocale('en')
    setTranslations(initialTranslations)
    setLocale('fr')

    const { rerender } = render(
      <TranslateProvider defaultLocale="en" translations={initialTranslations}>
        <TestComponent />
      </TranslateProvider>
    )

    rerender(
      <TranslateProvider defaultLocale="en" translations={initialTranslations}>
        <TestComponent />
      </TranslateProvider>
    )

    // Locale должен остаться 'fr'
    expect(getLocale()).toBe('fr')
  })
})
