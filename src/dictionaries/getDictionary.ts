// src/dictionaries/getDictionary.ts

const dictionaries = {
  es: () => import('./es.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;

export const getDictionary = async (locale: Locale) => {
  // Si el idioma no existe o hay un error, por defecto cargamos español
  return dictionaries[locale]?.() ?? dictionaries.es();
};