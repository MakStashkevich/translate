export type StorageType = 'localStorage' | 'sessionStorage' | 'cookie'

export interface TranslateProviderStorageProps {
  type?: StorageType
  key?: string
}

const DEFAULT_STORAGE_KEY = 'locale'

const getStorageKey = (key?: string) => key || DEFAULT_STORAGE_KEY

// Custom cookie utility functions
const setCookie = (name: string, value: string, days: number = 7) => {
  let expires = ''
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
    expires = '; expires=' + date.toUTCString()
  }
  document.cookie = name + '=' + (value || '') + expires + '; path=/'
}

const getCookie = (name: string): string | undefined => {
  const nameEQ = name + '='
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
  }
  return undefined
}

export const setLocaleInStorage = (locale: string, storage?: TranslateProviderStorageProps) => {
  const storageType = storage?.type || 'localStorage'
  const storageKey = getStorageKey(storage?.key)

  if (typeof window === 'undefined') {
    return
  }

  switch (storageType) {
    case 'localStorage':
      localStorage.setItem(storageKey, locale)
      break
    case 'sessionStorage':
      sessionStorage.setItem(storageKey, locale)
      break
    case 'cookie':
      setCookie(storageKey, locale)
      break
    default:
      localStorage.setItem(storageKey, locale)
  }
}

export const getLocaleFromStorage = (
  storage?: TranslateProviderStorageProps
): string | undefined => {
  const storageType = storage?.type || 'localStorage'
  const storageKey = getStorageKey(storage?.key)

  if (typeof window === 'undefined') {
    return undefined
  }

  switch (storageType) {
    case 'localStorage':
      return localStorage.getItem(storageKey) || undefined
    case 'sessionStorage':
      return sessionStorage.getItem(storageKey) || undefined
    case 'cookie':
      return getCookie(storageKey) || undefined
    default:
      return localStorage.getItem(storageKey) || undefined
  }
}
