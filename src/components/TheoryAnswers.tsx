import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronDown, Code, HelpCircle, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  answer: string;
  analogy: string;
  codeSnippet: string;
}

export default function TheoryAnswers() {
  const [activeId, setActiveId] = useState<number | null>(1);

  const questions: Question[] = [
    {
      id: 1,
      question: 'Explain what props are and their read-only nature.',
      answer: 'Props (short for properties) are configuration inputs passed down from a parent component to a child component. They are strictly read-only (immutable). A child component can never modify the props it receives; it must treat them as direct read-only constants.',
      analogy: 'Think of props as a birth certificate or an instruction booklet handed to you. You cannot edit the text written on it, but you can read it and use those details to decide how you act.',
      codeSnippet: `// Parent component passing a prop
<WelcomeMessage username="Alex" />

// Child component reading a read-only prop
function WelcomeMessage({ username }) {
  // ❌ Throws error: username is read-only
  // username = "Modified"; 
  return <h1>Hello, {username}!</h1>;
}`
    },
    {
      id: 2,
      question: 'Explain what state is and how it differs from props.',
      answer: 'State represents the local, dynamic memory of a component. Unlike props (which are passed from outside and cannot be changed by the child), state is initialized, owned, and modified entirely within the component itself. When state changes, React schedules a re-render for that component and its descendants.',
      analogy: 'If props are your birth details (external, fixed), state is your current heart rate or happiness level. It is internal, changes dynamically based on experiences, and changes what you display to the world.',
      codeSnippet: `// Props are external & fixed:
function ProfileCard({ id }) { }

// State is internal & dynamic:
function Counter() {
  const [likes, setLikes] = useState(0); // managed inside
  return <button onClick={() => setLikes(likes + 1)}>{likes} Likes</button>;
}`
    },
    {
      id: 3,
      question: 'Explain the useState Hook and what it returns.',
      answer: 'useState is a special Hook that allows you to add React state to functional components. It is called inside a component and returns a stateful value and a dispatcher function to update it, packed together in an array of exactly two elements (a state tuple).',
      analogy: 'Imagine a physical counter on a desk. Calling useState is like placing that counter on your desk. It gives you a tiny digital display (current value) and a clicker button (the setter function) to change the display.',
      codeSnippet: `// Destructuring the returned array
const [status, setStatus] = useState("Idle");

// 'status' is the read-only state value.
// 'setStatus' is the function that triggers re-rendering with the new value.`
    },
    {
      id: 4,
      question: 'Explain why you must never mutate state directly.',
      answer: 'React uses structural immutability and shallow reference comparison to detect when a state update occurs. If you mutate a state variable directly (e.g., state.count = 5 or list.push(item)), you alter the existing object in-place without creating a new memory reference. React fails to detect any change and will bypass scheduling a re-render.',
      analogy: 'If you repaint your house, neighbors see the change. But if you secretly swap your internal living room chairs without changing the address, someone looking at the outer address registry won\'t know any change occurred until a new registration is filed.',
      codeSnippet: `// ❌ BAD: Direct mutation (No re-render occurs)
const [items, setItems] = useState(['Apple', 'Orange']);
items.push('Banana'); 

// ✅ GOOD: Supply a brand new array/object reference
setItems([...items, 'Banana']);`
    },
    {
      id: 5,
      question: 'Explain the component communication patterns.',
      answer: 'React employs unidirectional data flow with three standard communication strategies: Parent-to-Child (passing data as standard props), Child-to-Parent (passing a callback function via props which the child executes with local arguments), and Siblings (lifting state up to the nearest common ancestor, which then distributes it).',
      analogy: 'Parent-to-child is like a boss sending a letter to an employee. Child-to-parent is like the boss giving the employee a form to fill out and return. Sibling communication is like two employees talking through a shared supervisor.',
      codeSnippet: `// 1. Parent-to-Child
<Child message="Hello" />

// 2. Child-to-Parent
function Parent() {
  const handleAlert = (data) => console.log(data);
  return <Child onAlert={handleAlert} />;
}`
    },
    {
      id: 6,
      question: 'Explain what a controlled component is.',
      answer: 'A controlled component is an input form element (like input, textarea, select) whose value is completely driven by React state, rather than the browser\'s internal DOM state. A combination of the "value" prop and an "onChange" event handler binds the UI input and React state together in a single source of truth.',
      analogy: 'An uncontrolled input is a standard notebook where you can type freely. A controlled input is a electronic drawing pad that only draws pixels if a central computer processes your pen coordinates first.',
      codeSnippet: `const [text, setText] = useState("");

return (
  <input 
    type="text" 
    value={text} 
    onChange={(e) => setText(e.target.value)} 
  />
);`
    },
    {
      id: 7,
      question: 'Explain conditional rendering and the three methods.',
      answer: 'Conditional rendering in React allows you to display different UI layouts depending on specific application states. The three primary methods are: 1. Ternary operators (condition ? trueJSX : falseJSX) for two-way options; 2. Logical AND (condition && trueJSX) for inline conditional inclusions; 3. Standard if/else statements return blocks.',
      analogy: 'Like an electrical relay that redirects current to a red light or a green light based on safety toggles, React returns completely different virtual DOM nodes depending on the conditions.',
      codeSnippet: `// Method 1: Ternary
{isLoggedIn ? <Dashboard /> : <LoginForm />}

// Method 2: Logical AND
{showPromo && <PromoBanner />}

// Method 3: if/else
if (hasError) {
  return <ErrorMessage />;
}`
    },
    {
      id: 8,
      question: 'Explain how to render a list and why keys matter.',
      answer: 'To render a list in React, you traverse an array using the native JavaScript .map() function, returning a React element for each item. Each item must have a unique "key" prop. Keys help React identify which items have been updated, added, or removed during virtual DOM reconciliation.',
      analogy: 'Think of keys like clothing tags in a coat check or custom tickets. If items are reshuffled, the ticket numbers allow the host to find the exact coat instantly, rather than searching and re-identifying each coat from scratch.',
      codeSnippet: `const students = [
  { id: 'st-1', name: 'Alice' },
  { id: 'st-2', name: 'Bob' }
];

return (
  <ul>
    {students.map((st) => (
      <li key={st.id}>{st.name}</li>
    ))}
  </ul>
);`
    },
    {
      id: 9,
      question: 'Explain lifting state up and when you need it.',
      answer: 'Lifting state up is the practice of moving shared state from individual child components to their nearest common parent component. This is required when two or more sibling components need to read, write, or synchronize with the exact same slice of state.',
      analogy: 'Instead of two siblings buying separate thermometers that conflict, they install a single central smart thermostat in the hallway (the parent) so both bedrooms have a synchronized temperature reading.',
      codeSnippet: `function Parent() {
  const [temperature, setTemperature] = useState(72);
  return (
    <>
      <Controller val={temperature} onChange={setTemperature} />
      <Display val={temperature} />
    </>
  );
}`
    },
    {
      id: 10,
      question: 'Explain how today\'s concepts connect to Flutter (props/constructors, state/setState).',
      answer: 'React\'s structural model maps directly to Flutter. React functional components with props are highly analogous to Flutter\'s StatelessWidget where custom variables are passed via the class Constructor. React state and useState/setState match Flutter\'s StatefulWidget where variables reside inside a State object and are updated via setState(() => {}).',
      analogy: 'Both platforms utilize declarative UI state-driven principles. Instead of modifying widgets manually, you modify state, and the framework automatically reconstructs the tree representing the new layout.',
      codeSnippet: `// React:
const [count, setCount] = useState(0);
<button onClick={() => setCount(count + 1)}>{count}</button>

// Flutter Equivalent:
// setState(() { _count++; });
// RaisedButton(onPressed: _increment, child: Text('\$_count'))`
    }
  ];

  return (
    <div id="theory-answers-container" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <BookOpen className="h-6 w-6 text-indigo-600" id="theory-icon" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900" id="theory-title">Part A — Theory Questions</h2>
          <p className="text-sm text-gray-500" id="theory-subtitle">Core architectural principles and declarative paradigm explained</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="theory-grid">
        {/* Left column: Question list */}
        <div className="lg:col-span-5 space-y-2 max-h-[600px] overflow-y-auto pr-2" id="theory-list-col">
          {questions.map((q) => {
            const isActive = activeId === q.id;
            return (
              <button
                key={q.id}
                id={`theory-q-btn-${q.id}`}
                onClick={() => setActiveId(q.id)}
                className={`w-full text-left p-3 rounded-lg text-sm font-medium transition-all duration-200 border flex items-start gap-3 ${
                  isActive
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-900 shadow-sm'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <HelpCircle className={`h-5 w-5 shrink-0 mt-0.5 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
                <span className="flex-1 leading-snug">{q.id}. {q.question}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 mt-1 transition-transform ${isActive ? 'rotate-180 text-indigo-600' : 'text-gray-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Right column: Answer details */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between min-h-[450px]" id="theory-detail-col">
          <AnimatePresence mode="wait">
            {activeId !== null ? (
              <motion.div
                key={activeId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
                id={`theory-active-view-${activeId}`}
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                    Question {activeId}
                  </span>
                  <h3 className="text-lg font-semibold text-gray-900 mt-2">
                    {questions[activeId - 1].question}
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Conceptual Explanation</h4>
                    <p className="text-gray-700 text-sm mt-1 leading-relaxed">
                      {questions[activeId - 1].answer}
                    </p>
                  </div>

                  <div className="bg-amber-50 border-l-4 border-amber-400 p-3.5 rounded-r-lg">
                    <h4 className="text-xs font-semibold text-amber-800 uppercase tracking-wide flex items-center gap-1.5">
                      💡 Practical Analogy
                    </h4>
                    <p className="text-amber-950 text-sm mt-1 leading-relaxed">
                      {questions[activeId - 1].analogy}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide flex items-center gap-1.5 mb-2">
                      <Code className="h-4 w-4 text-indigo-500" /> Declarative Syntax
                    </h4>
                    <pre className="text-xs bg-gray-950 text-indigo-200 p-4 rounded-lg overflow-x-auto font-mono leading-relaxed max-h-[220px]">
                      {questions[activeId - 1].codeSnippet}
                    </pre>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-gray-400">
                <BookOpen className="h-12 w-12 stroke-1 mb-3" />
                <p>Select a theory question to explore architectural concepts and insights.</p>
              </div>
            )}
          </AnimatePresence>

          <div className="border-t border-gray-100 mt-6 pt-4 flex justify-between items-center text-xs text-gray-400">
            <span>React Learning Lab • Day 12 Curriculum</span>
            <span className="flex items-center gap-1"><RefreshCw className="h-3 w-3" /> Declarative UI Paradigm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
