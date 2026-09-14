'use client';

import React from 'react';
import AnalyticsCharts from '../../components/AnalyticsCharts';
import { useAuth } from '../../lib/authContext';
import { translations } from '../../lib/translations';
import { BarChart3, ShieldCheck, Lock } from 'lucide-react';

export default function AdminDashboardPage() {
  const { lang } = useAuth();
  const t = translations[lang] || translations.en;

  return (
    <div className="space-y-6">
      {/* Privacy Guarantee Banner */}
      <div className="bg-gov-tealSoft border border-gov-teal/30 p-4 rounded-xl flex items-center justify-between text-xs text-gov-teal">
        <div className="flex items-center gap-2 font-semibold">
          <Lock className="w-4 h-4 text-gov-teal flex-shrink-0" />
          <span>
            Strict Privacy-by-Design: Individual personally identifiable information (PII) is completely excluded from aggregate analytics views.
          </span>
        </div>
        <span className="font-bold bg-white px-2.5 py-1 rounded text-[11px] border border-gov-teal/20">
          DPDP 2023 Compliant
        </span>
      </div>

      {/* Main Charts Component */}
      <AnalyticsCharts />
    </div>
  );
}
