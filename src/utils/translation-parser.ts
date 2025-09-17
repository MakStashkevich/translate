// src/utils/translation-parser.ts

/**
 * Рекурсивно извлекает значение из объекта по ключу с точечной нотацией.
 * @param obj Объект, содержащий переводы.
 * @param key Ключ перевода (например, "one.two.three").
 * @returns Найденное значение или undefined, если ключ не найден.
 */
export function getNestedTranslation(obj: Record<string, any>, key: string): string | undefined {
  const parts = key.split('.');
  let current: any = obj;

  for (const part of parts) {
    if (current === null || typeof current !== 'object' || !current.hasOwnProperty(part)) {
      return undefined;
    }
    current = current[part];
  }

  if (typeof current === 'string') {
    return current;
  }

  return undefined; // Возвращаем undefined, если найденное значение не является строкой
}