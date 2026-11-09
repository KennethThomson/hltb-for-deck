import { useState } from 'react';
import languages from '../languages';

export type LocalizationKey = keyof typeof languages['en'];

function getCurrentLanguage(): keyof typeof languages {
    const steamLang = window.LocalizationManager.m_rgLocalesToUse[0];
    const lang = steamLang.replace(/-([a-z])/g, (_, letter: string) =>
        letter.toUpperCase()
    ) as keyof typeof languages;
    return languages[lang] ? lang : 'en';
}

function translateFor(
    lang: keyof typeof languages,
    key: LocalizationKey
): string {
    if (languages[lang]?.[key]?.length) {
        return languages[lang]?.[key];
    } else if (languages.en?.[key]?.length) {
        return languages.en?.[key];
    } else {
        return key;
    }
}

// For code outside React components, such as the store page patch.
export function translate(key: LocalizationKey): string {
    return translateFor(getCurrentLanguage(), key);
}

export default function useLocalization() {
    const [lang] = useState(getCurrentLanguage());
    return function (key: LocalizationKey): string {
        return translateFor(lang, key);
    };
}
