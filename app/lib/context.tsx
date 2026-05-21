'use client';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, type Lang, type Translations } from '../i18n';

type Theme = 'dark' | 'light';

interface AppCtx {
  theme: Theme;
  lang: Lang;
  tr: Translations;
  toggleTheme: () => void;
  toggleLang: () => void;
}

const Ctx = createContext<AppCtx>({} as AppCtx);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Lang>('uk');
  const [mounted, setMounted] = useState(false);

  // Read from localStorage on mount
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('vexor-theme') as Theme | null;
      const savedLang = localStorage.getItem('vexor-lang') as Lang | null;
      if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
      if (savedLang === 'uk' || savedLang === 'en') setLang(savedLang);
    } catch {
      //
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const r = document.documentElement;
    if (theme === 'light') {
      r.style.setProperty('--bg', '#ffffff');
      r.style.setProperty('--bg2', '#f5f5f5');
      r.style.setProperty('--bg3', '#ebebeb');
      r.style.setProperty('--border-c', 'rgba(0,0,0,0.08)');
      r.style.setProperty('--text-primary', '#0a0a0a');
      r.style.setProperty('--text-secondary', '#444444');
      r.style.setProperty('--text-muted', '#888888');
      r.style.setProperty('--scrollbar-thumb', '#cccccc');
      r.style.setProperty('--scrollbar-track', '#f0f0f0');
      r.style.setProperty('--selection-bg', 'rgba(24,95,165,0.25)');
      r.style.setProperty('--selection-color', '#0a0a0a');
      r.style.setProperty('--grid-line', 'rgba(0,0,0,0.05)');
    } else {
      r.style.setProperty('--bg', '#0a0a0a');
      r.style.setProperty('--bg2', '#111111');
      r.style.setProperty('--bg3', '#161616');
      r.style.setProperty('--border-c', 'rgba(255,255,255,0.08)');
      r.style.setProperty('--text-primary', '#f0f0f0');
      r.style.setProperty('--text-secondary', '#aaaaaa');
      r.style.setProperty('--text-muted', '#666666');
      r.style.setProperty('--scrollbar-thumb', '#2a2a2a');
      r.style.setProperty('--scrollbar-track', '#0a0a0a');
      r.style.setProperty('--selection-bg', 'rgba(74,158,255,0.35)');
      r.style.setProperty('--selection-color', '#ffffff');
      r.style.setProperty('--grid-line', 'rgba(255,255,255,0.03)');
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(p => {
      const next = p === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem('vexor-theme', next);
      } catch {
        //
      }
      return next;
    });
  };

  const toggleLang = () => {
    setLang(p => {
      const next = p === 'uk' ? 'en' : 'uk';
      try {
        localStorage.setItem('vexor-lang', next);
      } catch {
        //
      }
      return next;
    });
  };

  const tr = translations[lang];

  return (
    <Ctx.Provider value={{ theme, lang, tr, toggleTheme, toggleLang }}>{children}</Ctx.Provider>
  );
}

export const useApp = () => useContext(Ctx);
