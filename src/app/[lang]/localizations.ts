type Locale = 'en' | 'bg'; // Define a union type for allowed locales

const dictionaries: Record<Locale, () => Promise<any>> = {
  en: () => import('../localization/en.json').then((module) => module.default),
  bg: () => import('../localization/bg.json').then((module) => module.default),
};

export const getLocalization = async (locale: string) => {
  if (!dictionaries[locale]) {
    throw new Error(`No dictionary found for locale: ${locale}`);
  }
  return dictionaries[locale]();
};
