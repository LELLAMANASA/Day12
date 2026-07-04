import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, Heart, CheckSquare, Square, Trash2, Send, Share2, Search, ArrowRight, CheckCircle2 } from 'lucide-react';

// Subcomponents for Task 4: Lift State Up
interface SliderInputProps {
  val: number;
  onValChange: (n: number) => void;
}
function SliderInput({ val, onValChange }: SliderInputProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Child A (Input Controller)</span>
        <span className="text-[11px] font-mono font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{val}%</span>
      </div>
      <p className="text-[11px] text-slate-500">Slide to emit state parameters directly to the parent node:</p>
      <input
        type="range"
        min="0"
        max="100"
        value={val}
        onChange={(e) => onValChange(Number(e.target.value))}
        className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        id="lifted-state-slider"
      />
    </div>
  );
}

interface VisualDisplayProps {
  val: number;
}
function VisualDisplay({ val }: VisualDisplayProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-3.5 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Child B (Visual Monitor)</span>
        <span className="text-[11px] font-mono text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded font-bold">Observer</span>
      </div>
      <p className="text-[11px] text-slate-500 mb-2">Renders live virtual elements driven by lifted sibling values:</p>
      
      {/* Visual meter bar */}
      <div className="space-y-1.5">
        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200 relative">
          <motion.div
            className="h-full bg-linear-to-r from-indigo-500 to-emerald-400"
            style={{ width: `${val}%` }}
            layout
          />
          <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-slate-700 font-mono">
            {val}% POWER
          </span>
        </div>
        <div className="flex justify-between text-[9px] font-bold text-slate-400 font-mono">
          <span>0% MIN</span>
          <span>100% MAX</span>
        </div>
      </div>
    </div>
  );
}

export default function StateManagement() {
  // Task 1: To-Do List State
  const [todos, setTodos] = useState<Array<{ id: string; text: string; done: boolean }>>([
    { id: 'todo-1', text: 'Study React Component Lifecycle', done: true },
    { id: 'todo-2', text: 'Build modular state architecture', done: false },
    { id: 'todo-3', text: 'Perform compile-time verification', done: false }
  ]);
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    setTodos([...todos, { id: `todo-${Date.now()}`, text: newTodoText, done: false }]);
    setNewTodoText('');
  };

  const handleToggleTodo = (id: string) => {
    setTodos(todos.map((t) => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  // Task 2: Like Button state
  const [likes, setLikes] = useState(24);
  const [liked, setLiked] = useState(false);

  const handleLikeToggle = () => {
    setLiked(!liked);
    setLikes((prev) => liked ? prev - 1 : prev + 1);
  };

  // Task 3: Multi-Input Form
  const [formData, setFormData] = useState({
    username: '',
    useremail: '',
    role: 'Student',
    newsletter: true,
  });
  const [formSubmittedData, setFormSubmittedData] = useState<typeof formData | null>(null);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmittedData(formData);
    // Auto-clear success message after 5s
    setTimeout(() => {
      setFormSubmittedData(null);
    }, 5000);
  };

  // Task 4: Shared State
  const [liftedPercentage, setLiftedPercentage] = useState<number>(45);

  // Task 5: Search Filter
  const [searchTerm, setSearchTerm] = useState('');
  const techTerms = [
    { title: 'JSX (JavaScript XML)', category: 'Core Syntax', desc: 'Allows writing XML-like elements inside JavaScript code.' },
    { title: 'Virtual DOM (VDOM)', category: 'Architecture', desc: 'In-memory representation of physical DOM trees for diffing.' },
    { title: 'Reconciliation', category: 'Internal Engine', desc: 'React\'s algorithm to update the DOM with minimal insertions.' },
    { title: 'Prop Drilling', category: 'Patterns', desc: 'Passing state through multiple intermediary layers that don\'t need it.' },
    { title: 'Strict Mode', category: 'Debugging', desc: 'Double-invokes renders in development to flush out side effects.' },
    { title: 'Unidirectional Flow', category: 'Architecture', desc: 'Data flows strictly top-down to keep render results predictable.' },
    { title: 'Hooks API', category: 'State Management', desc: 'Functions allowing local state and side effects in function components.' },
  ];

  const filteredTerms = techTerms.filter((term) =>
    term.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    term.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="state-management-container" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <Sliders className="h-6 w-6 text-indigo-600" id="state-mgmt-icon" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900" id="state-mgmt-title">Part D — State Management Tasks</h2>
          <p className="text-sm text-gray-500" id="state-mgmt-subtitle">Explorations in complex component synchronization and form management</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6" id="state-mgmt-grid">
        {/* LEFT COLUMN: Todo List & Forms (Lg: col-span-7) */}
        <div className="xl:col-span-7 space-y-6" id="state-mgmt-left-col">
          
          {/* Task 1: To-Do list */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4" id="task-todolist">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">1. Declarative To-Do Engine</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">CRUD state flow: push items, map keys, splice elements</p>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono font-semibold">
                Tasks: {todos.length} ({todos.filter(t => t.done).length} done)
              </span>
            </div>

            <form onSubmit={handleAddTodo} className="flex gap-2" id="todo-state-form">
              <input
                type="text"
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                placeholder="Enter a new learning sprint goal..."
                className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                id="todo-state-input"
              />
              <button
                type="submit"
                id="todo-state-submit-btn"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 rounded-lg font-bold flex items-center gap-1 cursor-pointer"
              >
                Create Task
              </button>
            </form>

            <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
              <AnimatePresence mode="popLayout">
                {todos.map((todo) => (
                  <motion.div
                    layout
                    key={todo.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className={`flex items-center justify-between p-3 rounded-lg border text-xs transition-colors ${
                      todo.done ? 'bg-slate-50 border-slate-100 text-slate-400' : 'bg-white border-slate-200 text-slate-700'
                    }`}
                    id={`todo-card-${todo.id}`}
                  >
                    <button
                      onClick={() => handleToggleTodo(todo.id)}
                      className="flex-1 text-left flex items-start gap-3"
                      id={`todo-toggle-btn-${todo.id}`}
                    >
                      <span className="shrink-0 mt-0.5 cursor-pointer text-indigo-600 hover:scale-115 transition-transform">
                        {todo.done ? <CheckSquare className="h-4 w-4" /> : <Square className="h-4 w-4" />}
                      </span>
                      <span className={`font-medium select-none ${todo.done ? 'line-through' : ''}`}>
                        {todo.text}
                      </span>
                    </button>
                    <button
                      onClick={() => handleDeleteTodo(todo.id)}
                      id={`todo-delete-btn-${todo.id}`}
                      className="text-slate-300 hover:text-rose-600 p-1 rounded-md hover:bg-rose-50 transition-colors"
                      title="Remove task"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Task 3: Controlled inputs Form */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4" id="task-multiform">
            <div className="border-b border-slate-100 pb-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">3. Multi-Input controlled form</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Capturing values, validating state object, rendering submission records</p>
            </div>

            <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4" id="multi-form">
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">User Full Name</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    required
                    placeholder="Enter full name"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Academy Email</label>
                  <input
                    type="email"
                    name="useremail"
                    value={formData.useremail}
                    onChange={handleFormChange}
                    required
                    placeholder="Enter contact email"
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-3 flex flex-col justify-between">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Course Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleFormChange}
                    className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                  >
                    <option value="Student">Student Explorer</option>
                    <option value="Facilitator">Facilitator / Coach</option>
                    <option value="Reviewer">Academic Reviewer</option>
                  </select>
                </div>

                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-150 p-2.5 rounded-lg">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleFormChange}
                    id="form-newsletter-check"
                    className="h-4 w-4 text-indigo-600 border-gray-350 rounded-sm focus:ring-indigo-500"
                  />
                  <label htmlFor="form-newsletter-check" className="text-[11px] text-slate-600 select-none">
                    Subscribe to React reconciliation alerts
                  </label>
                </div>
              </div>

              <div className="md:col-span-2 pt-2 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  className="bg-slate-950 hover:bg-slate-800 text-white text-xs px-4 py-2 rounded-lg font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  Submit Form <Send className="h-3 w-3" />
                </button>
              </div>
            </form>

            {/* Submission logger panel */}
            <AnimatePresence>
              {formSubmittedData && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 space-y-2"
                >
                  <div className="flex items-center gap-1.5 text-emerald-800 text-xs font-bold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>State Submission Dispatched Successfully!</span>
                  </div>
                  <pre className="text-[10px] bg-slate-900 text-emerald-200 p-3 rounded-md font-mono overflow-x-auto leading-relaxed">
                    {JSON.stringify(formSubmittedData, null, 2)}
                  </pre>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* RIGHT COLUMN: Like button, Lifted state, Search filter (Lg: col-span-5) */}
        <div className="xl:col-span-5 space-y-6" id="state-mgmt-right-col">
          
          {/* Task 2: Like Button */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3" id="task-likebutton">
            <div className="border-b border-slate-100 pb-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">2. Pulse Like Button</h4>
              <p className="text-[11px] text-slate-500 mt-0.5">Micro-interactions and local counter dispatch</p>
            </div>

            <div className="flex items-center justify-between bg-slate-50 border border-slate-200/60 p-4 rounded-xl">
              <div>
                <span className="text-xs text-slate-600 block font-semibold">Do you like this workspace?</span>
                <span className="text-[10px] text-slate-400">Updates state count dynamically</span>
              </div>
              
              <button
                id="interactive-like-btn"
                onClick={handleLikeToggle}
                className={`relative px-4 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 transition-all duration-200 transform active:scale-90 border cursor-pointer ${
                  liked
                    ? 'bg-rose-50 border-rose-200 text-rose-600 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Heart className={`h-4.5 w-4.5 transition-transform duration-250 ${liked ? 'fill-rose-500 text-rose-500 scale-120' : ''}`} />
                <span className="font-mono font-bold text-sm">{likes}</span>
              </button>
            </div>
          </div>

          {/* Task 4: Shared State / Lifting state up */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4" id="task-liftstate">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">4. Lift State Up Synchronization</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Synchronizing sibling nodes via closest common parent memory</p>
              </div>
              <Share2 className="h-4 w-4 text-indigo-500" />
            </div>

            <div className="grid grid-cols-1 gap-3" id="lifted-state-grid">
              <SliderInput val={liftedPercentage} onValChange={setLiftedPercentage} />
              <VisualDisplay val={liftedPercentage} />
            </div>
          </div>

          {/* Task 5: Filter List */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-3" id="task-filterlist">
            <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">5. Real-Time Tech Term Filter</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Filtering datasets locally via input queries</p>
              </div>
              <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full font-bold font-mono">
                Match: {filteredTerms.length}
              </span>
            </div>

            {/* Search Input bar */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search definitions (e.g. JSX, DOM)..."
                className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-indigo-500 focus:bg-white"
                id="tech-search-input"
              />
            </div>

            {/* Render matched terms */}
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
              <AnimatePresence mode="popLayout">
                {filteredTerms.length > 0 ? (
                  filteredTerms.map((term, index) => (
                    <motion.div
                      layout
                      key={term.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-slate-50/50 hover:bg-slate-50 border border-slate-100 p-2.5 rounded-lg text-[11px] leading-relaxed"
                      id={`tech-term-card-${index}`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <h6 className="font-bold text-slate-800">{term.title}</h6>
                        <span className="text-[9px] bg-slate-200 text-slate-600 px-1.5 py-0.2 rounded font-medium">
                          {term.category}
                        </span>
                      </div>
                      <p className="text-slate-500">{term.desc}</p>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-4 text-slate-400 text-xs italic">
                    No vocabulary matches "{searchTerm}". Try another term.
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
