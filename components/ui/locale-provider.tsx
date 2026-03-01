"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import en from '../../locales/en.json';
import es from '../../locales/es.json';

type Lang = 'en' | 'es';

type I18nContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => any;
};

const translations: Record<Lang, any> = { en, es };

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

function resolveKey(obj: any, path: string) {
  return path.split('.').reduce((acc: any, part: string) => {
    if (acc && typeof acc === 'object' && part in acc) return acc[part];
    return undefined;
  }, obj);
}

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const stored = typeof window !== 'undefined' ? localStorage.getItem('lang') : null;
      if (stored === 'en' || stored === 'es') return stored;
      if (typeof navigator !== 'undefined') {
        return navigator.language?.startsWith('es') ? 'es' : 'en';
      }
    } catch (e) {}
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem('lang', lang);
    } catch {}
  }, [lang]);

  const t = (key: string) => {
    const val = resolveKey(translations[lang], key);
    if (typeof val !== 'undefined') return val;
    return key;
  };

  const value = useMemo(() => ({ lang, setLang, t }), [lang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
