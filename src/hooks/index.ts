import { useTranslateModel } from '../model';

export const useLocale = () => {
  return useTranslateModel.use.locale();
};

export const useTranslations = () => {
  return useTranslateModel.use.translations();
};