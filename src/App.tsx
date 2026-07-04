import React, { useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  GraduationCap, BookOpen, Layers, Box, Sliders, Users, 
  ShoppingBag, HelpCircle, Pipette, Layout, FileText, 
  Menu, X, Calendar, Clock, UserCheck, ShieldCheck 
} from 'lucide-react';

// Component Imports
import TheoryAnswers from './components/TheoryAnswers';
import PracticalExercises from './components/PracticalExercises';
import ComponentChallenges from './components/ComponentChallenges';
import StateManagement from './components/StateManagement';
import StudentDashboard from './components/StudentDashboard';
import ShoppingCart from './components/ShoppingCart';
import QuizApp from './components/QuizApp';
import ColorPicker from './components/ColorPicker';
import TabbedInterface from './components/TabbedInterface';
import ResearchDocs from './components/ResearchDocs';

type TabId = 
  | 'theory' 
  | 'practical' 
  | 'components' 
  | 'state' 
  | 'student' 
  | 'cart' 
  | 'quiz' 
  | 'color' 
  | 'tabs' 
  | 'research';

interface MenuItem {
  id: TabId;
  label: string;
  icon: ReactNode;
  category: 'Academy theory' | 'Practical drills' | 'Interactivity portfolios' | 'Research assets';
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('student');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Live Clock effect
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const menuItems: MenuItem[] = [
    { id: 'theory', label: '1. Theory Questions', icon: <BookOpen className="h-4.5 w-4.5" />, category: 'Academy theory' },
    
    { id: 'practical', label: '2. Part B — Core Drills', icon: <Layers className="h-4.5 w-4.5" />, category: 'Practical drills' },
    { id: 'components', label: '3. Part C — Blueprints', icon: <Box className="h-4.5 w-4.5" />, category: 'Practical drills' },
    { id: 'state', label: '4. Part D — State Tasks', icon: <Sliders className="h-4.5 w-4.5" />, category: 'Practical drills' },
    
    { id: 'student', label: '5. Student Registry', icon: <Users className="h-4.5 w-4.5" />, category: 'Interactivity portfolios' },
    { id: 'cart', label: '6. Shopping Cart', icon: <ShoppingBag className="h-4.5 w-4.5" />, category: 'Interactivity portfolios' },
    { id: 'quiz', label: '7. Concept Quiz App', icon: <HelpCircle className="h-4.5 w-4.5" />, category: 'Interactivity portfolios' },
    { id: 'color', label: '8. Swatch Color Picker', icon: <Pipette className="h-4.5 w-4.5" />, category: 'Interactivity portfolios' },
    { id: 'tabs', label: '9. Dynamic Tabs Demo', icon: <Layout className="h-4.5 w-4.5" />, category: 'Interactivity portfolios' },
    
    { id: 'research', label: '10. Research Papers', icon: <FileText className="h-4.5 w-4.5" />, category: 'Research assets' },
  ];

  const categories = Array.from(new Set(menuItems.map(item => item.category)));

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'theory': return <TheoryAnswers />;
      case 'practical': return <PracticalExercises />;
      case 'components': return <ComponentChallenges />;
      case 'state': return <StateManagement />;
      case 'student': return <StudentDashboard />;
      case 'cart': return <ShoppingCart />;
      case 'quiz': return <QuizApp />;
      case 'color': return <ColorPicker />;
      case 'tabs': return <TabbedInterface />;
      case 'research': return <ResearchDocs />;
    }
  };

  const getTabFileName = (tab: TabId) => {
    switch (tab) {
      case 'theory': return 'TheoryAnswers.tsx';
      case 'practical': return 'PracticalExercises.tsx';
      case 'components': return 'ComponentChallenges.tsx';
      case 'state': return 'StateManagement.tsx';
      case 'student': return 'StudentDashboard.tsx';
      case 'cart': return 'ShoppingCart.tsx';
      case 'quiz': return 'QuizApp.tsx';
      case 'color': return 'ColorPicker.tsx';
      case 'tabs': return 'TabbedInterface.tsx';
      case 'research': return 'ResearchDocs.tsx';
      default: return 'App.tsx';
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex p-0 md:p-3 lg:p-4 font-sans text-slate-800" id="app-workspace-root">
      {/* Outer Geometric Frame Wrapper */}
      <div className="w-full flex flex-col md:border-8 md:border-slate-200 bg-white shadow-2xl relative overflow-hidden flex-1 rounded-none md:rounded-lg">
        
        {/* WORKSPACE LAYOUT */}
        <div className="flex flex-1 relative overflow-hidden" id="workspace-layout-container">
          
          {/* SIDEBAR NAVIGATION PANEL */}
          <aside 
            className={`absolute lg:static inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 border-r border-slate-800 z-30 transform lg:transform-none transition-transform duration-250 flex flex-col justify-between ${
              sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'
            }`}
            id="workspace-sidebar"
          >
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-indigo-400" /> React Day 12
                </h1>
                <p className="text-slate-400 text-[9px] mt-1 font-mono uppercase tracking-widest">Submission Hub</p>
              </div>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-slate-800 rounded text-slate-400 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-4 space-y-5 overflow-y-auto flex-1">
              {categories.map((cat) => (
                <div key={cat} className="space-y-1.5" id={`sidebar-category-${cat.replace(/\s+/g, '-')}`}>
                  <h3 className="text-[9px] font-bold text-slate-500 uppercase tracking-widest pl-2">
                    {cat}
                  </h3>
                  
                  <div className="space-y-0.5">
                    {menuItems
                      .filter(item => item.category === cat)
                      .map((item) => {
                        const isSelected = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            id={`sidebar-btn-${item.id}`}
                            onClick={() => {
                              setActiveTab(item.id);
                              setSidebarOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-xs rounded font-medium flex items-center justify-between transition-all duration-150 cursor-pointer ${
                              isSelected
                                ? 'bg-indigo-600 text-white font-semibold'
                                : 'text-slate-400 hover:text-white hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-2 truncate">
                              {isSelected ? (
                                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0" />
                              ) : (
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-700 shrink-0" />
                              )}
                              <span className="truncate leading-normal">{item.label}</span>
                            </div>
                            {item.id === 'student' || item.id === 'research' || item.id === 'theory' ? (
                              <span className={`text-[8px] px-1 rounded font-mono ${isSelected ? 'bg-indigo-700 text-indigo-200' : 'bg-slate-800 text-slate-500'}`}>
                                DONE
                              </span>
                            ) : null}
                          </button>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer of Sidebar */}
            <div className="p-5 border-t border-slate-800 bg-slate-950/40 text-[9px] text-slate-500 uppercase tracking-widest font-mono space-y-1" id="sidebar-footer">
              <div className="flex items-center gap-1.5 text-slate-400">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Vite + JSX</span>
              </div>
              <div className="text-[8px] text-slate-600 pl-3 font-mono">
                Build: #2026-07-R12
              </div>
            </div>
          </aside>

          {/* MOBILE SIDEBAR BACKGROUND OVERLAY */}
          {sidebarOpen && (
            <div 
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-slate-900/30 backdrop-blur-xs z-20 lg:hidden"
              id="mobile-sidebar-overlay"
            />
          )}

          {/* RIGHT CONTAINER: HEADER + MAIN + FOOTER */}
          <div className="flex-1 flex flex-col min-w-0 bg-white overflow-hidden">
            
            {/* Header / Top Bar */}
            <header className="h-16 border-b border-slate-200 flex items-center justify-between px-6 sm:px-8 bg-white shrink-0" id="global-navbar">
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="lg:hidden p-1.5 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer mr-2"
                  aria-label="Toggle Navigation Sidebar"
                  id="mobile-nav-toggle"
                >
                  {sidebarOpen ? <X className="h-5 w-5 text-slate-800" /> : <Menu className="h-5 w-5 text-slate-800" />}
                </button>
                <span className="text-slate-400 font-mono text-xs italic hidden sm:inline">src / components / </span>
                <span className="text-slate-800 font-bold text-sm uppercase tracking-wide font-mono" id="header-filename">{getTabFileName(activeTab)}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="h-8 px-4 bg-indigo-50 text-indigo-700 text-xs font-bold flex items-center rounded border border-indigo-200 font-mono">
                  {activeTab === 'student' || activeTab === 'research' || activeTab === 'theory' ? '92% COMPLETE' : '92% COMPLETE'}
                </div>
                <div className="hidden md:flex items-center gap-3 text-[11px] text-slate-400 font-mono border-l border-slate-200 pl-4" id="header-clock">
                  <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5 text-indigo-500 animate-pulse" /> {currentTime || '00:00:00'} UTC</span>
                </div>
              </div>
            </header>

            {/* Scrollable Workspace Viewport */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50" id="workspace-main-viewport">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.15 }}
                  className="max-w-7xl mx-auto space-y-6"
                  id="active-tab-motion-wrapper"
                >
                  {renderActiveComponent()}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Footer / Bottom Info Bar */}
            <footer className="h-12 border-t border-slate-200 px-6 sm:px-8 flex items-center justify-between text-[11px] font-medium tracking-tight text-slate-500 shrink-0 bg-white" id="global-footer">
              <div className="flex space-x-6">
                <span className="flex items-center text-slate-500"><div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-2"></div> GitHub Repo Active</span>
                <span className="flex items-center text-slate-500"><div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mr-2"></div> Day 12 Complete</span>
              </div>
              <div className="font-mono uppercase text-[10px] tracking-wider hidden sm:block">
                Assignment Reference: Day_12_Commit_R12
              </div>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
}
