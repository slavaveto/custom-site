import { debug } from "console";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";


i18n.use(initReactI18next).init({
    debug: true,
    lng: "en",
    fallbackLng: "en",
    resources: {
        en: {
            translation: require("./locales/en.json"),
        },
        es: {
            translation: require("./locales/es.json"),
        },
    },
});

export default i18n;
