import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import tj from "./locales/tj.json";
import ru from "./locales/ru.json";
import en from "./locales/en.json";

export const LANGS = [
  { code: "tj", label: "ТҶ", name: "Тоҷикӣ" },
  { code: "ru", label: "РУ", name: "Русский" },
  { code: "en", label: "EN", name: "English" },
] as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      tj: { translation: tj },
      ru: { translation: ru },
      en: { translation: en },
    },
    fallbackLng: "tj",
    supportedLngs: ["tj", "ru", "en"],
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"],
      lookupLocalStorage: "fastcart-lang",
    },
  });

export default i18n;
