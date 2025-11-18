type Args = Record<string, string | number> | (string | number)[]

/**
 * Replaces the placeholders in the translation string with the corresponding arguments.
 * Supports placeholders like {1} (for arrays/lists) and {argName} (for objects).
 * If the argument is not found, the placeholder remains in the text.
 * @param translationString is a translation string with placeholders.
 * @param args Arguments to replace (array or object).
 * @returns String with replaced arguments.
 */
export function replaceArguments(translationString: string, args?: Args): string {
  if (!args) {
    return translationString
  }

  return translationString.replace(/\{(\w+)\}/g, (match, key) => {
    if (Array.isArray(args)) {
      const index = parseInt(key, 10)
      if (!isNaN(index) && args[index - 1] !== undefined) {
        return String(args[index - 1])
      }
    } else if (typeof args === 'object' && args !== null && args.hasOwnProperty(key)) {
      return String(args[key])
    }
    return match // If the argument is not found, leave the placeholder as it is.
  })
}
