"use client";

import { useI18n } from './locale-provider';

export default function LanguageToggle() {
  const { lang, setLang, t } = useI18n();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
        className="px-3 py-1 rounded-md border hover:bg-secondary smooth-transition"
        aria-label={t('toggle.language')}
      >
        {lang === 'en' ? 'EN' : 'ES'}
      </button>
    </div>
  );
}
