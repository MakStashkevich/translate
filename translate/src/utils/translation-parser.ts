/**
* Recursively extracts a value from an object using a key with dot notation.
* @param obj is an object containing translations.
* @param key is the translation key (for example, "one.two.three").
* @returns the found value or undefined if the key is not found.
*/
export function getNestedTranslation(obj: Record<string, any>, key: string): string | undefined {
  const parts = key.split('.')
  let current: any = obj

  for (const part of parts) {
    if (current === null || typeof current !== 'object' || !current.hasOwnProperty(part)) {
      return undefined
    }
    current = current[part]
  }

  if (typeof current === 'string') {
    return current
  }

  return undefined // We return undefined if the found value is not a string.
}
