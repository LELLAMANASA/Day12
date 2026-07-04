import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layout, User, Code2, Link, Sparkles, Star, Terminal, BookOpen } from 'lucide-react';

export default function TabbedInterface() {
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'resources'>('profile');

  const tabs = [
    { id: 'profile' as const, label: 'Student Bio', icon: <User className="h-4 w-4" /> },
    { id: 'skills' as const, label: 'Skill Matrix', icon: <Code2 className="h-4 w-4" /> },
    { id: 'resources' as const, label: 'Curriculum', icon: <Link className="h-4 w-4" /> },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm max-w-2xl mx-auto space-y-6" id="tab-demo-component">
      {/* Header Banner */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-3.5" id="tab-demo-header">
        <div className="p-2.5 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600">
          <Layout className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Dynamic Tabbed Portal</h3>
          <p className="text-[10px] text-slate-500 font-medium">Render content conditionally using state filters and motion boundaries</p>
        </div>
      </div>

      {/* Tabs navigation list */}
      <div className="flex bg-slate-100 p-1.5 rounded-xl border border-slate-200/50" id="tabs-navigation-rail">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-semibold rounded-lg transition-all duration-150 relative cursor-pointer ${
                isSelected ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-800 hover:bg-white/40'
              }`}
              id={`tab-navigation-btn-${tab.id}`}
            >
              {tab.icon}
              {tab.label}
              {isSelected && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-indigo-600 rounded-full"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Conditionally rendered tab panels */}
      <div className="bg-slate-50/50 border border-slate-150 rounded-xl p-5 min-h-[180px]" id="tab-panels-viewport">
        <AnimatePresence mode="wait">
          {activeTab === 'profile' && (
            <motion.div
              key="profile-tab"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-3"
              id="panel-profile"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🎓</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Junior Developer Profile</h4>
                  <p className="text-[11px] text-slate-400">Class of 2026 • Front-End Engineering</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Currently specializing in building responsive Single-Page Applications (SPAs) with standard React, Vite, and Tailwind CSS. Obsessed with declarative state patterns, component-based architectures, and maintaining immutable state vectors.
              </p>
              <div className="flex gap-4 pt-2">
                <div className="text-[11px] text-slate-500">
                  <strong className="text-indigo-600 font-mono">10+</strong> Small Labs
                </div>
                <div className="text-[11px] text-slate-500">
                  <strong className="text-indigo-600 font-mono">5+</strong> Portfolio Challenges
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'skills' && (
            <motion.div
              key="skills-tab"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-4"
              id="panel-skills"
            >
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1">
                <Terminal className="h-4 w-4 text-indigo-500" /> Active Technology Stack
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/60 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">React Core / Hooks</span>
                  <span className="flex text-amber-400"><Star className="h-3 w-3 fill-amber-400" /><Star className="h-3 w-3 fill-amber-400" /><Star className="h-3 w-3 fill-amber-400" /></span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/60 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">TypeScript Type-Safety</span>
                  <span className="flex text-amber-400"><Star className="h-3 w-3 fill-amber-400" /><Star className="h-3 w-3 fill-amber-400" /><Star className="h-3 w-3" /></span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/60 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Tailwind Utility Design</span>
                  <span className="flex text-amber-400"><Star className="h-3 w-3 fill-amber-400" /><Star className="h-3 w-3 fill-amber-400" /><Star className="h-3 w-3 fill-amber-400" /></span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-slate-200/60 flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Vite Build Engine</span>
                  <span className="flex text-amber-400"><Star className="h-3 w-3 fill-amber-400" /><Star className="h-3 w-3 fill-amber-400" /><Star className="h-3 w-3" /></span>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'resources' && (
            <motion.div
              key="resources-tab"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="space-y-3"
              id="panel-resources"
            >
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1">
                <BookOpen className="h-4 w-4 text-emerald-500" /> Standard Syllabus Checklist
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-2 bg-white rounded-lg border border-slate-150 flex items-center gap-2">
                  <span className="bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">Day 11</span>
                  <span className="text-slate-700">DOM diffing and React virtual reconciliation mechanics</span>
                </div>
                <div className="p-2 bg-white rounded-lg border border-slate-150 flex items-center gap-2">
                  <span className="bg-indigo-50 text-indigo-700 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">Day 12</span>
                  <span className="text-slate-700">Standard props, state, event callback loops and form controls</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
