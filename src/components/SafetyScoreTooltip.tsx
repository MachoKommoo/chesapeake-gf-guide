"use client";

import React from "react";

interface SafetyScoreTooltipProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SafetyScoreTooltip({ isOpen, onClose }: SafetyScoreTooltipProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">How We Rate Safety</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center font-bold text-sm">0</span>
            <p className="text-gray-700 text-sm pt-1">No gluten-free information available</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-sm">1</span>
            <p className="text-gray-700 text-sm pt-1">GF menu available</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-sm">2</span>
            <p className="text-gray-700 text-sm pt-1">Staff knowledgeable about GF requirements</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center font-bold text-sm">3</span>
            <p className="text-gray-700 text-sm pt-1">Dedicated GF fryer</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">4</span>
            <p className="text-gray-700 text-sm pt-1">Celiac-safe facility / dedicated GF kitchen</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4 pt-4 border-t">
          Each criterion adds one point. Higher scores indicate safer options for celiac disease and severe gluten sensitivity.
        </p>
      </div>
    </div>
  );
}
