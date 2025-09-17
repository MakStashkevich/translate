// src/hooks/useTranslate.ts
import { useTranslateModel } from '../model';

/**
 * Хук для получения функции перевода `t`.
 * @returns Функция `t` для перевода строк.
 */
export const useTranslate = () => {
  const t = useTranslateModel((state) => state.t);
  return t;
};