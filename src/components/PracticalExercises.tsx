import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Plus, Minus, RotateCcw, AlertCircle, Eye, RefreshCw, Trash2, CheckCircle } from 'lucide-react';

// Subcomponent 1: Five Props Component
interface MultiPropProps {
  stringValue: string;
  numberValue: number;
  booleanValue: boolean;
  arrayValue: string[];
  objectValue: { title: string; difficulty: string; estimationMin: number };
}

function MultiPropDisplay({ stringValue, numberValue, booleanValue, arrayValue, objectValue }: MultiPropProps) {
  return (
    <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm" id="multi-prop-component">
      <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
        <h4 className="text-sm font-semibold text-slate-800">1. Five Props Receiver</h4>
        <span className="text-xs bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full font-mono">Props Demo</span>
      </div>
      <div className="space-y-3 text-xs leading-relaxed">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
            <span className="text-slate-400 font-medium uppercase tracking-wider block text-[10px]">String Prop</span>
            <span className="text-slate-800 font-semibold text-sm">{stringValue}</span>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
            <span className="text-slate-400 font-medium uppercase tracking-wider block text-[10px]">Number Prop</span>
            <span className="text-slate-800 font-mono font-semibold text-sm">{numberValue}</span>
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-slate-400 font-medium uppercase tracking-wider block text-[10px]">Boolean Prop</span>
            <span className="text-slate-800 font-semibold">{booleanValue ? 'True (Active)' : 'False (Inactive)'}</span>
          </div>
          <span className={`h-3.5 w-3.5 rounded-full ${booleanValue ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
          <span className="text-slate-400 font-medium uppercase tracking-wider block text-[10px] mb-1">Array Prop</span>
          <div className="flex flex-wrap gap-1.5 mt-1">
            {arrayValue.map((item, idx) => (
              <span key={idx} className="bg-indigo-50 border border-indigo-100 text-indigo-700 font-medium px-2 py-0.5 rounded-md text-[11px]">
                {item}
              </span>
            ))}
          </div>
        </div>
        <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-xs">
          <span className="text-slate-400 font-medium uppercase tracking-wider block text-[10px] mb-1">Object Prop</span>
          <div className="space-y-1 mt-1 text-[11px]">
            <p className="text-slate-700"><strong className="text-slate-500">Topic:</strong> {objectValue.title}</p>
            <p className="text-slate-700"><strong className="text-slate-500">Level:</strong> {objectValue.difficulty}</p>
            <p className="text-slate-700"><strong className="text-slate-500">Estimate:</strong> {objectValue.estimationMin} Minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PracticalExercises() {
  // States for exercises
  const [count, setCount] = useState<number>(0);
  const [inputText, setInputText] = useState<string>('');
  
  // List objects for exercises 4 & 5
  const [items, setItems] = useState<Array<{ id: string; name: string; priority: 'High' | 'Medium' | 'Low' }>>([
    { id: 'ex-1', name: 'Refactor custom button props', priority: 'High' },
    { id: 'ex-2', name: 'Add PropTypes definition', priority: 'Low' },
    { id: 'ex-3', name: 'Lift state up to App wrapper', priority: 'Medium' },
  ]);

  const [newItemName, setNewItemName] = useState<string>('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const item: { id: string; name: string; priority: 'High' | 'Medium' | 'Low' } = {
      id: `ex-${Date.now()}`,
      name: newItemName,
      priority: ['High', 'Medium', 'Low'][Math.floor(Math.random() * 3)] as 'High' | 'Medium' | 'Low',
    };
    setItems([...items, item]);
    setNewItemName('');
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleResetList = () => {
    setItems([
      { id: 'ex-1', name: 'Refactor custom button props', priority: 'High' },
      { id: 'ex-2', name: 'Add PropTypes definition', priority: 'Low' },
      { id: 'ex-3', name: 'Lift state up to App wrapper', priority: 'Medium' },
    ]);
  };

  return (
    <div id="practical-exercises-container" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <Layers className="h-6 w-6 text-emerald-600" id="practical-icon" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900" id="practical-title">Part B — Practical Exercises</h2>
          <p className="text-sm text-gray-500" id="practical-subtitle">Five standard React drills exploring state transitions and basic reactivity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="practical-grid">
        {/* Left Side: Props Display + Counter */}
        <div className="lg:col-span-5 space-y-6" id="practical-left-col">
          {/* Exercise 1 Component */}
          <MultiPropDisplay
            stringValue="Vite React Engine"
            numberValue={12}
            booleanValue={true}
            arrayValue={['State', 'Props', 'Hooks', 'VDOM']}
            objectValue={{
              title: 'Reconciliation Diffing Algorithm',
              difficulty: 'Advanced Intermediate',
              estimationMin: 45,
            }}
          />

          {/* Exercise 2: Counter */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm" id="counter-component">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h4 className="text-sm font-semibold text-slate-800">2. Interactive State Counter</h4>
              <span className="text-xs bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full font-mono">useState</span>
            </div>
            
            <div className="flex flex-col items-center justify-center bg-white rounded-lg p-5 border border-slate-100 shadow-xs space-y-4">
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Current State</span>
                <h1 className="text-4xl font-extrabold text-indigo-900 font-mono mt-1">{count}</h1>
              </div>

              <div className="flex items-center gap-2 w-full">
                <button
                  id="counter-dec-btn"
                  onClick={() => setCount((prev) => prev - 1)}
                  className="flex-1 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-200 text-slate-700 hover:text-rose-600 p-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" /> Decrement
                </button>
                <button
                  id="counter-reset-btn"
                  onClick={() => setCount(0)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2.5 rounded-lg transition-colors"
                  title="Reset counter to 0"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  id="counter-inc-btn"
                  onClick={() => setCount((prev) => prev + 1)}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" /> Increment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Controlled Inputs + List/Conditional Rendering */}
        <div className="lg:col-span-7 space-y-6" id="practical-right-col">
          {/* Exercise 3: Controlled input */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm" id="controlled-input-component">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h4 className="text-sm font-semibold text-slate-800">3. Controlled Input Live Mirror</h4>
              <span className="text-xs bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full font-mono">Two-Way Binding</span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1.5" htmlFor="controlled-text-input">
                  Type Something below
                </label>
                <input
                  type="text"
                  id="controlled-text-input"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Enter text to see live reactive state replication..."
                  className="w-full text-sm bg-white border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="bg-indigo-950 p-4 rounded-lg flex items-start gap-3">
                <Eye className="h-4.5 w-4.5 text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wide">Live Component State Mirror</span>
                  <div className="text-white text-sm mt-1 font-mono break-all min-h-[1.25rem]">
                    {inputText ? (
                      <span className="bg-indigo-900 border border-indigo-800 px-1.5 py-0.5 rounded text-indigo-200">
                        "{inputText}"
                      </span>
                    ) : (
                      <span className="text-indigo-400/50 italic">Waiting for keyboard input...</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exercises 4 & 5: List rendering and Conditional Empty State */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4 shadow-sm" id="list-exercises-component">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2.5">
              <h4 className="text-sm font-semibold text-slate-800">4 & 5. Loop Render & Empty State Handler</h4>
              <button
                onClick={handleResetList}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1"
                id="reset-list-btn"
              >
                <RefreshCw className="h-3 w-3" /> Reset List
              </button>
            </div>

            {/* Form to add item */}
            <form onSubmit={handleAddItem} className="flex gap-2" id="add-list-item-form">
              <input
                type="text"
                id="new-list-item-input"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                placeholder="Add a new challenge card..."
                className="flex-1 text-xs bg-white border border-slate-200 rounded-lg p-2 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
              <button
                type="submit"
                id="new-list-item-btn"
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3.5 rounded-lg flex items-center gap-1 font-semibold transition-colors"
              >
                <Plus className="h-3.5 w-3.5" /> Add
              </button>
            </form>

            {/* List and conditional render */}
            <div className="space-y-2" id="interactive-rendered-list">
              <AnimatePresence mode="popLayout">
                {items.length > 0 ? (
                  items.map((item) => (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.15 }}
                      className="bg-white border border-slate-100 rounded-lg p-3 flex items-center justify-between shadow-xs hover:border-slate-200"
                      id={`list-item-${item.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="h-4 w-4 text-emerald-500" />
                        <div>
                          <p className="text-xs font-semibold text-slate-800">{item.name}</p>
                          <span className={`text-[9px] font-bold uppercase tracking-wider ${
                            item.priority === 'High' ? 'text-rose-500' : item.priority === 'Medium' ? 'text-amber-500' : 'text-slate-400'
                          }`}>
                            {item.priority} Priority
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        id={`delete-item-${item.id}`}
                        className="p-1 text-slate-400 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                        title="Delete this task"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-rose-50 border border-rose-100 text-rose-700 rounded-xl p-6 text-center space-y-2 flex flex-col items-center justify-center"
                    id="empty-list-warning"
                  >
                    <AlertCircle className="h-8 w-8 text-rose-500 stroke-1.5 animate-bounce" />
                    <h5 className="text-sm font-semibold">Conditional Rendering Triggered</h5>
                    <p className="text-xs text-rose-600 max-w-sm leading-relaxed">
                      "All list elements deleted! The array length is currently <strong>0</strong>, which automatically mounted this fallback banner."
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
