// src/utils/argument-replacer.ts

type Args = Record<string, string | number> | (string | number)[];

/**
 * Заменяет плейсхолдеры в строке перевода на соответствующие аргументы.
 * Поддерживает плейсхолдеры вида {1} (для массивов/списков) и {argName} (для объектов).
 * Если аргумент не найден, плейсхолдер остается в тексте.
 * @param translationString Строка перевода с плейсхолдерами.
 * @param args Аргументы для замены (массив или объект).
 * @returns Строка с замененными аргументами.
 */
export function replaceArguments(translationString: string, args?: Args): string {
  if (!args) {
    return translationString;
  }

  return translationString.replace(/\{(\w+)\}/g, (match, key) => {
    if (Array.isArray(args)) {
      const index = parseInt(key, 10);
      if (!isNaN(index) && args[index - 1] !== undefined) {
        return String(args[index - 1]);
      }
    } else if (typeof args === 'object' && args !== null && args.hasOwnProperty(key)) {
      return String(args[key]);
    }
    return match; // Если аргумент не найден, оставляем плейсхолдер как есть
  });
}