'use client';

import React, { useState } from 'react';
import { useAuth } from '../lib/authContext';
import { translations } from '../lib/translations';
import { aggregateAnalytics } from '../lib/mockData';
import { BarChart3, Download, ShieldCheck, Clock, AlertTriangle, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AnalyticsCharts() {
  const { lang } = useAuth();
  const t = translations[lang] || translations.en;
  const [downloading, setDownloading] = useState(false);

  const handleExportCsv = () => {
    setDownloading(true);
    setTimeout(() => {
      const csvContent = "data:text/csv;charset=utf-8," 
        + "Metric,Value\n"
        + `Total Triaged Cases,${aggregateAnalytics.totalTriaged}\n`
        + `Avg Response Time,${aggregateAnalytics.avgResponseTimeSec}s\n`
        + `High/Critical Cases,${aggregateAnalytics.highRiskCount}\n`
        + `Human Override Rate,${aggregateAnalytics.overridePct}%\n`
        + `Resolution Rate,${aggregateAnalytics.resolutionRatePct || 83}%\n`;
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", `SVI_MoSJE_Compliance_Report_${new Date().toISOString().slice(0,10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Export */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-gov-border shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-gov-teal" />
            <h2 className="font-bold text-base sm:text-lg text-gov-navy">{t.adminTitle}</h2>
          </div>
          <p className="text-xs text-gov-textMuted mt-0.5">{t.adminSubtitle}</p>
        </div>

        <button
          onClick={handleExportCsv}
          disabled={downloading}
          className="flex items-center gap-2 px-4 py-2 bg-gov-navy hover:bg-gov-teal text-white text-xs font-bold rounded-lg shadow-sm transition-colors disabled:opacity-50"
        >
          <Download className="w-4 h-4 text-amber-300" />
          <span>{downloading ? "Generating..." : t.exportCsv}</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Total Cases */}
        <div className="bg-white p-4 rounded-xl border border-gov-border shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-gov-textMuted">
            <span>{t.totalCases}</span>
            <ShieldCheck className="w-4 h-4 text-gov-teal" />
          </div>
          <div className="text-2xl font-bold text-gov-navy">{aggregateAnalytics.totalTriaged}</div>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
            <span>↑ 14% from last week</span>
          </div>
        </div>

        {/* Avg Response Time */}
        <div className="bg-white p-4 rounded-xl border border-gov-border shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-gov-textMuted">
            <span>{t.avgResponseTime}</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-bold text-gov-navy">{aggregateAnalytics.avgResponseTimeSec}s</div>
          <div className="text-[11px] text-emerald-700 font-semibold">
            <span>Triage latency: 1.4s</span>
          </div>
        </div>

        {/* High Risk Ratio */}
        <div className="bg-white p-4 rounded-xl border border-gov-border shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-gov-textMuted">
            <span>{t.highRiskRatio}</span>
            <AlertTriangle className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl font-bold text-red-700">
            {aggregateAnalytics.highRiskPct}% <span className="text-xs text-gov-textMuted font-normal">({aggregateAnalytics.highRiskCount})</span>
          </div>
          <div className="text-[11px] text-amber-700 font-semibold">
            <span>Prioritized in queue</span>
          </div>
        </div>

        {/* Human Override Rate */}
        <div className="bg-white p-4 rounded-xl border border-gov-border shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-gov-textMuted">
            <span>{t.overrideRate}</span>
            <RefreshCw className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-gov-navy">{aggregateAnalytics.overridePct}%</div>
          <div className="text-[11px] text-slate-500 font-medium">
            <span>93.6% AI-Officer Sync</span>
          </div>
        </div>

        {/* Resolution Rate (5th Metric) */}
        <div className="bg-white p-4 rounded-xl border border-gov-border shadow-sm space-y-1">
          <div className="flex items-center justify-between text-xs text-gov-textMuted">
            <span>Resolution Rate</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-700">{aggregateAnalytics.resolutionRatePct || 83}%</div>
          <div className="text-[11px] text-slate-500 font-medium">
            <span>{aggregateAnalytics.resolvedCount || 1185} Cases closed</span>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Risk Level Distribution */}
        <div className="bg-white p-5 rounded-xl border border-gov-border shadow-sm space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gov-navy">
            Risk Severity Distribution (Anonymized)
          </h3>
          <div className="space-y-3">
            {aggregateAnalytics.riskDistribution.map((item) => (
              <div key={item.level} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-gov-textMain">
                  <span>{item.level} Risk</span>
                  <span>{item.percentage}% ({item.count} cases)</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      item.level === 'Critical' ? 'bg-red-700' :
                      item.level === 'High' ? 'bg-rose-500' :
                      item.level === 'Moderate' ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-gov-border shadow-sm space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gov-navy">
            Channel Inflow Distribution
          </h3>
          <div className="space-y-3">
            {aggregateAnalytics.channelDistribution.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-gov-textMain">
                  <span>{item.name}</span>
                  <span>{item.percentage}% ({item.count})</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-gov-teal rounded-full transition-all duration-500"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Case Volume Trend */}
        <div className="bg-white p-5 rounded-xl border border-gov-border shadow-sm space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gov-navy">
            Weekly Triage Volume & High-Risk Spike Trend
          </h3>
          <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
            {aggregateAnalytics.weeklyTrend.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full max-w-[28px] flex flex-col items-center justify-end h-full gap-0.5">
                  <div
                    className="w-full bg-red-500 rounded-t-sm"
                    style={{ height: `${(day.highRisk / 250) * 100}%` }}
                    title={`High Risk: ${day.highRisk}`}
                  />
                  <div
                    className="w-full bg-gov-navy rounded-t-sm"
                    style={{ height: `${((day.total - day.highRisk) / 250) * 100}%` }}
                    title={`Total: ${day.total}`}
                  />
                </div>
                <span className="text-[11px] font-bold text-gov-textMuted">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center gap-4 text-xs pt-2 border-t border-gov-border">
            <span className="flex items-center gap-1 text-gov-textMuted font-medium">
              <span className="w-3 h-3 bg-gov-navy rounded-sm" /> Standard Volume
            </span>
            <span className="flex items-center gap-1 text-gov-textMuted font-medium">
              <span className="w-3 h-3 bg-red-500 rounded-sm" /> High-Risk Priority
            </span>
          </div>
        </div>

        {/* Language Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-gov-border shadow-sm space-y-4">
          <h3 className="font-bold text-xs uppercase tracking-wider text-gov-navy">
            Language Inflow Demographics
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {aggregateAnalytics.languageBreakdown.map((item) => (
              <div key={item.lang} className="p-3 bg-gov-cream/70 rounded-lg border border-gov-border">
                <div className="text-xs text-gov-textMuted font-medium">{item.lang}</div>
                <div className="text-lg font-bold text-gov-navy mt-0.5">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
