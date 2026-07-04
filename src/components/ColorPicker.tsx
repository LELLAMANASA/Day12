import { useState } from 'react';
import { motion } from 'motion/react';
import { Pipette, Sliders, Sparkles, Check, Heart, Shield } from 'lucide-react';

interface Swatch {
  id: string;
  name: string;
  hex: string;
  tailwindClass: string;
  borderClass: string;
  textClass: string;
  accentClass: string;
}

export default function ColorPicker() {
  const swatches: Swatch[] = [
    { id: 'sw-1', name: 'Royal Indigo', hex: '#4F46E5', tailwindClass: 'bg-indigo-600', borderClass: 'border-indigo-600', textClass: 'text-indigo-600', accentClass: 'bg-indigo-50' },
    { id: 'sw-2', name: 'Emerald Forest', hex: '#059669', tailwindClass: 'bg-emerald-600', borderClass: 'border-emerald-600', textClass: 'text-emerald-600', accentClass: 'bg-emerald-50' },
    { id: 'sw-3', name: 'Rose Sunset', hex: '#E11D48', tailwindClass: 'bg-rose-600', borderClass: 'border-rose-600', textClass: 'text-rose-600', accentClass: 'bg-rose-50' },
    { id: 'sw-4', name: 'Vibrant Amber', hex: '#D97706', tailwindClass: 'bg-amber-500', borderClass: 'border-amber-500', textClass: 'text-amber-500', accentClass: 'bg-amber-50' },
    { id: 'sw-5', name: 'Sky Breeze', hex: '#0284C7', tailwindClass: 'bg-sky-500', borderClass: 'border-sky-500', textClass: 'text-sky-500', accentClass: 'bg-sky-50' },
    { id: 'sw-6', name: 'Deep Violet', hex: '#7C3AED', tailwindClass: 'bg-violet-600', borderClass: 'border-violet-600', textClass: 'text-violet-600', accentClass: 'bg-violet-50' },
    { id: 'sw-7', name: 'Crimson Fury', hex: '#DC2626', tailwindClass: 'bg-red-600', borderClass: 'border-red-600', textClass: 'text-red-600', accentClass: 'bg-red-50' },
    { id: 'sw-8', name: 'Carbon Charcoal', hex: '#4B5563', tailwindClass: 'bg-gray-600', borderClass: 'border-gray-600', textClass: 'text-gray-600', accentClass: 'bg-gray-50' },
  ];

  const [activeSwatch, setActiveSwatch] = useState<Swatch>(swatches[0]);
  const [opacityScale, setOpacityScale] = useState<number>(100); // represents percentage

  // Opacity classes mapping for Tailwind to remain within standard styling
  const getOpacityClass = (opacity: number) => {
    if (opacity >= 90) return 'opacity-100';
    if (opacity >= 80) return 'opacity-90';
    if (opacity >= 70) return 'opacity-80';
    if (opacity >= 60) return 'opacity-70';
    if (opacity >= 50) return 'opacity-60';
    if (opacity >= 45) return 'opacity-50';
    if (opacity >= 30) return 'opacity-40';
    if (opacity >= 20) return 'opacity-30';
    if (opacity >= 10) return 'opacity-20';
    return 'opacity-10';
  };

  return (
    <div className="bg-white border border-slate-250 rounded-xl p-5 shadow-sm max-w-2xl mx-auto space-y-6" id="color-picker-component">
      {/* Header Banner */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3.5" id="color-picker-header">
        <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
          <Pipette className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Live Swatch Color Picker</h3>
          <p className="text-[10px] text-slate-500 font-medium">Stateful canvas renderer matching specific utility classes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="color-picker-grid">
        {/* Swatch Controls Column */}
        <div className="space-y-5" id="swatch-controls-col">
          <div className="space-y-2">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">
              Select Preset Accent
            </label>
            <div className="grid grid-cols-4 gap-2" id="preset-colors-grid">
              {swatches.map((sw) => {
                const isSelected = sw.id === activeSwatch.id;
                return (
                  <button
                    key={sw.id}
                    onClick={() => setActiveSwatch(sw)}
                    className={`h-11 rounded-lg transition-all duration-150 relative flex items-center justify-center cursor-pointer ${sw.tailwindClass} ${
                      isSelected ? 'ring-2 ring-slate-950 scale-105 border border-white' : 'hover:scale-102 hover:shadow-xs'
                    }`}
                    title={sw.name}
                    id={`swatch-btn-${sw.id}`}
                  >
                    {isSelected && (
                      <Check className="h-4.5 w-4.5 text-white stroke-[3.5px] drop-shadow-md" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Intensity/Opacity Sliders */}
          <div className="space-y-2" id="opacity-intensity-box">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                <Sliders className="h-3.5 w-3.5 text-slate-400" /> Color Opacity
              </label>
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded">
                {opacityScale}% Intensity
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="10"
              value={opacityScale}
              onChange={(e) => setOpacityScale(Number(e.target.value))}
              className="w-full accent-slate-800 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer border border-slate-200"
              id="color-intensity-slider"
            />
            <div className="flex justify-between text-[9px] font-mono text-slate-400 font-bold">
              <span>10% FADE</span>
              <span>100% VIBRANT</span>
            </div>
          </div>
        </div>

        {/* Live Preview Column */}
        <div className="flex flex-col justify-between" id="swatch-preview-col">
          {/* Output Display Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center space-y-4 flex-1">
            <div 
              className={`w-full h-28 rounded-lg shadow-inner transition-all duration-150 flex items-center justify-center relative border border-black/5 ${activeSwatch.tailwindClass} ${getOpacityClass(opacityScale)}`}
              id="live-color-canvas-box"
            >
              <Sparkles className="h-7 w-7 text-white/50 mix-blend-overlay animate-pulse" />
            </div>

            <div className="w-full space-y-1 text-center bg-white border border-slate-150 p-2.5 rounded-lg">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Color Vector</span>
              <h4 className="text-xs font-bold text-slate-800">{activeSwatch.name}</h4>
              <div className="flex items-center justify-center gap-1.5 mt-1">
                <span className="text-[11px] font-mono bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md font-bold text-slate-700">
                  {activeSwatch.hex}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-[10px] text-slate-500 font-medium font-mono uppercase">
                  tailwind: {activeSwatch.tailwindClass}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
