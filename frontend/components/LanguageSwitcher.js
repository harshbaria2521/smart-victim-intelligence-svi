'use client';

import React from 'react';
import { useAuth } from '../lib/authContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
  const { lang, changeLanguage } = useAuth();

  return (
    <div className="flex items-center gap-1.5 bg-gov-cream/80 border border-gov-border px-2.5 py-1 rounded-md text-xs font-medium text-gov-textMain shadow-sm">
      <Globe className="w-3.5 h-3.5 text-gov-teal" />
      <select
        value={lang}
        onChange={(e) => changeLanguage(e.target.value)}
        className="bg-transparent text-gov-textMain focus:outline-none cursor-pointer pr-1"
        aria-label="Select Language"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी (Hindi)</option>
      </select>
    </div>
  );
}
