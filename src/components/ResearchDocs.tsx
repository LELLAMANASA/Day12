import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Search, Code, CheckCircle, GraduationCap, ShieldAlert, Zap } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: React.ReactNode;
}

export default function ResearchDocs() {
  const [selectedId, setSelectedId] = useState('res-1');

  const articles: Article[] = [
    {
      id: 'res-1',
      title: '1. Side Effects & the useEffect Hook',
      category: 'Hooks API',
      summary: 'Learn what side effects are and how React schedules synchronization with external physical systems.',
      content: (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            In React, a component\'s primary task is to calculate a Virtual DOM tree based on <strong>Props</strong> and <strong>State</strong>. Any action that happens outside this standard rendering flow is called a <strong>Side Effect</strong>.
          </p>
          <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-lg text-xs text-amber-950">
            <strong>Common Examples of Side Effects:</strong>
            <ul className="list-disc pl-4 mt-1 space-y-1">
              <li>Fetching data from an external HTTP API.</li>
              <li>Manually manipulating the raw browser document DOM.</li>
              <li>Setting up intervals, timeouts, or WebSocket subscriptions.</li>
              <li>Writing logging telemetry records to servers.</li>
            </ul>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            The <code className="bg-slate-100 p-1 rounded font-mono text-[10px] text-indigo-600">useEffect</code> hook provides a unified declarative boundary to execute these effects safely after rendering completes, ensuring they don\'t block the main paint thread.
          </p>
          <pre className="text-xs bg-slate-900 text-indigo-200 p-3.5 rounded-lg font-mono overflow-x-auto leading-relaxed">
{`// useEffect anatomy:
useEffect(() => {
  console.log("Component mounted / updated!");
  
  // Cleanup function: runs before re-running or unmounting
  return () => {
    console.log("Cleanup active intervals...");
  };
}, [dependencyArray]);`}
          </pre>
        </div>
      ),
    },
    {
      id: 'res-2',
      title: '2. React Context API & Prop Drilling',
      category: 'Global State',
      summary: 'How to bypass prop drilling to distribute data blocks down complex tree scopes.',
      content: (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            In standard React applications, data is passed top-down via props. However, when a deep grandchild component requires values from a root ancestor, passing props through 10 intermediate layers that don\'t care about that data is called <strong>Prop Drilling</strong>.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            The <strong>React Context API</strong> solves this. It establishes an overlay broadcast channel. A <code className="text-indigo-600">Provider</code> component encapsulates a section of the tree, allowing any descendant node to consume those state variables directly.
          </p>
          <div className="bg-indigo-50 border border-indigo-150 p-3 rounded-lg text-xs text-slate-700 space-y-1.5">
            <strong>The Context Lifecycle:</strong>
            <ol className="list-decimal pl-4 space-y-1">
              <li>Create context via <code className="bg-white px-1 border rounded">const UserContext = createContext();</code></li>
              <li>Wrap ancestors in <code className="bg-white px-1 border rounded">&lt;UserContext.Provider value={'{...}'}&gt;</code></li>
              <li>Consume inside grandchildren via <code className="bg-white px-1 border rounded">const user = useContext(UserContext);</code></li>
            </ol>
          </div>
        </div>
      ),
    },
    {
      id: 'res-3',
      title: '3. Controlled vs. Uncontrolled Elements',
      category: 'Forms',
      summary: 'Differentiating state-controlled inputs from standard raw DOM text boxes.',
      content: (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            Form inputs in React can be categorized based on who holds the source of truth for the active text string.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <th className="p-2 font-bold">Feature</th>
                  <th className="p-2 font-bold">Controlled</th>
                  <th className="p-2 font-bold">Uncontrolled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px] text-slate-600">
                <tr>
                  <td className="p-2 font-bold">Source of Truth</td>
                  <td className="p-2 text-indigo-600 font-semibold">React State (useState)</td>
                  <td className="p-2">Physical Browser DOM</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">Value Access</td>
                  <td className="p-2">Read instantly from state variable</td>
                  <td className="p-2">Via ref pointer (e.g. inputRef.current.value)</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">Validation</td>
                  <td className="p-2 text-emerald-600 font-semibold">Real-time (on every keypress)</td>
                  <td className="p-2">Only upon submitting/extracting</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">Re-renders</td>
                  <td className="p-2">Re-renders component on every change</td>
                  <td className="p-2 text-rose-600">Bypasses re-rendering (faster on huge forms)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: 'res-4',
      title: '4. PropTypes & Type Validation',
      category: 'Type Safety',
      summary: 'Before TypeScript, how did React compile runtime assertions to protect props contracts?',
      content: (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            In JavaScript-based React codebases, there are no static type checkers (like TypeScript). Components can receive anything in props, leading to runtime failures.
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>PropTypes</strong> is a library that allows you to declare contracts for component inputs. During development, if a parent passes a string instead of a required number, React emits a warning to the console.
          </p>
          <pre className="text-xs bg-slate-900 text-indigo-200 p-3 rounded-lg font-mono overflow-x-auto leading-relaxed">
{`import PropTypes from 'prop-types';

function StudentCard({ name, attendance }) {
  return <div>{name}: {attendance}%</div>;
}

StudentCard.propTypes = {
  name: PropTypes.string.isRequired,
  attendance: PropTypes.number
};`}
          </pre>
          <p className="text-[11px] text-slate-500 italic">
            Note: While modern React developments heavily favor TypeScript for static compile-time checking, PropTypes remains highly useful for validating dynamically fetched JSON schemas during execution.
          </p>
        </div>
      ),
    },
    {
      id: 'res-5',
      title: '5. Keys & React Reconciliation',
      category: 'Internal Engine',
      summary: 'Deep dive into Day 11\'s diffing algorithm and why stable index keys are paramount.',
      content: (
        <div className="space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            During updates, React\'s <strong>Reconciliation</strong> engine compares the old Virtual DOM with the new Virtual DOM (a process called <strong>Diffing</strong>).
          </p>
          <p className="text-xs text-slate-600 leading-relaxed">
            When rendering arrays, React assumes siblings can shift. If you do not specify a unique <code className="text-rose-600">key</code>, React falls back to using the array <strong>index</strong> as the default key.
          </p>
          <div className="bg-rose-50 border border-rose-150 p-3 rounded-lg text-xs text-rose-950 space-y-1.5">
            <strong>⚠️ Why Array Indexes are Dangerous Keys:</strong>
            <p className="leading-relaxed">
              If you delete or insert an item in the middle of a list, all subsequent items have their indexes changed. React thinks the state of index 2 was mutated to index 3, causing input field content leaks, state mismatches, and sluggish visual updates.
            </p>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Using a stable, globally unique database identifier (like <code className="font-mono bg-slate-100 px-1 border text-[10px] rounded">student.id</code>) ensures React matches the element correctly across renders, keeping input states perfectly bound.
          </p>
        </div>
      ),
    }
  ];

  const currentArticle = articles.find((a) => a.id === selectedId) || articles[0];

  return (
    <div id="research-docs-container" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <GraduationCap className="h-6 w-6 text-indigo-600" id="research-icon" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900" id="research-title">Part F — Research Activities</h2>
          <p className="text-sm text-gray-500" id="research-subtitle">Detailed research briefs analyzing hooks, state contexts, and reconcilers</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="research-grid">
        {/* Left selector menu */}
        <div className="lg:col-span-4 space-y-2 max-h-[500px] overflow-y-auto pr-1" id="research-menu-col">
          {articles.map((art) => {
            const isSelected = art.id === selectedId;
            return (
              <button
                key={art.id}
                onClick={() => setSelectedId(art.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-1.5 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-slate-950 text-white shadow-md'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
                id={`research-article-btn-${art.id}`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    isSelected ? 'bg-indigo-600 text-indigo-100' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {art.category}
                  </span>
                </div>
                <h4 className="text-xs font-bold leading-snug">{art.title}</h4>
                <p className={`text-[10px] line-clamp-2 ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                  {art.summary}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right Article display viewer */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col justify-between min-h-[480px]" id="research-viewer-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedId}
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
              id="research-active-article-viewport"
            >
              <div className="border-b border-slate-100 pb-3 flex justify-between items-start gap-4">
                <div>
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">
                    {currentArticle.category} • Scientific Digest
                  </span>
                  <h3 className="text-base font-bold text-slate-800 mt-1">{currentArticle.title}</h3>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                  <BookOpen className="h-4 w-4 text-slate-300" /> Articles Complete
                </div>
              </div>

              <div id="active-article-content-wrapper">
                {currentArticle.content}
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="border-t border-slate-100 pt-4 mt-6 flex justify-between items-center text-[10px] text-slate-400 font-bold font-mono">
            <span>REACT INTERACTIVE LAB PORTAL</span>
            <span className="flex items-center gap-1 text-emerald-600"><CheckCircle className="h-3.5 w-3.5" /> VERIFIED SCIENTIFIC ACCURACY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
