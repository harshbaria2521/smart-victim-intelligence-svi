'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../lib/authContext';
import { translations } from '../lib/translations';
import LanguageSwitcher from './LanguageSwitcher';
import { Shield, PhoneCall, UserCheck, BarChart3, MessageSquare, Lock, LogOut } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, victim, logoutStaff, logoutVictim, lang } = useAuth();
  const t = translations[lang] || translations.en;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gov-border">
      {/* Tricolor Government Top Strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]" />

      {/* Top Official Banner */}
      <div className="bg-gov-navyDark text-slate-100 text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-amber-300 tracking-wide">{t.govIndia}</span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-200">{t.ministry}</span>
          </div>
          <div className="flex items-center gap-3 text-amber-200 font-medium">
            <span className="flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              NHAA: <a href="tel:14566" className="underline font-bold">14566</a>
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline">
              Tele-MANAS: <a href="tel:14416" className="underline font-bold">14416</a>
            </span>
            <span className="hidden md:inline text-slate-400">•</span>
            <span className="hidden md:inline">
              Emergency: <a href="tel:112" className="underline font-bold">112</a>
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/svi_app_icon.jpg"
            alt="SVI Logo"
            className="w-10 h-10 rounded-xl object-cover shadow-sm ring-1 ring-gov-border group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-gov-navy text-lg tracking-tight">SVI</span>
              <span className="text-xs bg-gov-tealSoft text-gov-teal font-semibold px-2 py-0.5 rounded border border-gov-teal/20">
                NHAA 14566
              </span>
            </div>
            <p className="text-xs text-gov-textMuted font-medium hidden sm:block">
              {t.portalSubtitle}
            </p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              pathname === '/'
                ? 'bg-gov-teal text-white'
                : 'text-gov-textMain hover:bg-gov-sand/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden md:inline">{t.navHome}</span>
          </Link>

          <Link
            href="/consent"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              pathname === '/consent'
                ? 'bg-gov-teal text-white'
                : 'text-gov-textMain hover:bg-gov-sand/60'
            }`}
          >
            <Lock className="w-4 h-4" />
            <span className="hidden md:inline">{t.navConsent}</span>
          </Link>

          {/* Counsellor Link */}
          <Link
            href="/counsellor"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              pathname.startsWith('/counsellor')
                ? 'bg-gov-navy text-white'
                : 'text-gov-textMain hover:bg-gov-sand/60'
            }`}
          >
            <UserCheck className="w-4 h-4 text-amber-500" />
            <span className="hidden lg:inline">{t.navCounsellor}</span>
          </Link>

          {/* Admin Link */}
          <Link
            href="/admin"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              pathname === '/admin'
                ? 'bg-gov-navy text-white'
                : 'text-gov-textMain hover:bg-gov-sand/60'
            }`}
          >
            <BarChart3 className="w-4 h-4 text-emerald-600" />
            <span className="hidden lg:inline">{t.navAdmin}</span>
          </Link>

          <div className="h-5 w-px bg-gov-border mx-1" />

          {/* Language Switcher */}
          <LanguageSwitcher />

          {/* User / Staff / Victim Status */}
          {user ? (
            <div className="flex items-center gap-2 pl-1">
              <span className="hidden xl:inline text-xs font-semibold text-gov-navy bg-amber-50 border border-amber-200 px-2 py-1 rounded">
                {user.name} ({user.role})
              </span>
              <button
                onClick={logoutStaff}
                title={t.navLogout}
                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                aria-label="Logout Staff"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : victim ? (
            <div className="flex items-center gap-2 pl-1">
              <Link
                href="/profile"
                className="flex items-center gap-1.5 text-xs font-bold text-gov-navy bg-gov-tealSoft border border-gov-teal/30 px-2.5 py-1 rounded hover:bg-gov-teal hover:text-white transition-colors"
              >
                <span>{victim.name}</span>
                <span className="text-[10px] font-mono opacity-80 font-normal">({victim.id})</span>
              </Link>
              <button
                onClick={logoutVictim}
                title="Logout Profile"
                className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                aria-label="Logout Victim"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-xs font-semibold text-gov-teal border border-gov-teal/40 hover:bg-gov-tealSoft px-2.5 py-1.5 rounded-md transition-colors"
            >
              {t.navLogin}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
