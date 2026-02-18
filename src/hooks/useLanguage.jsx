import { createContext, useContext, useState, useEffect } from 'react';
import translations from '../data/translations.json';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('learnGerman-lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('learnGerman-lang', lang);
  }, [lang]);

  const t = (key) => translations[lang]?.[key] || translations['en'][key] || key;

  const toggleLang = () => setLang(prev => prev === 'en' ? 'ro' : 'en');

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
