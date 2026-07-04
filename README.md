# React Lab & Learning Hub (Day 12 Assignment Portal)

Welcome to the **React Lab & Learning Hub**, a comprehensive educational and development workspace built to demonstrate deep mastery of core React concepts from the Day 12 curriculum. 

This single-screen, LMS-inspired dashboard consolidates **over 25 React applications, interactive exercises, and research papers** into a beautiful, desktop-grade responsive portal.

---

## 🎨 Visual Identity & Architecture

- **Theme**: Slate Minimalist with vibrant indigo and emerald accents, ample negative space, and smooth layout transitions (`motion/react`).
- **Typography**: Paired **Inter** for clean headings and UI text with **JetBrains Mono** for code and metadata tags.
- **Responsive Fluidity**: Custom sidebar navigation for large desktop workflows, collapsible drawers for tablet viewports, and custom scrollbars.
- **Type-Safety**: Written in **100% strict TypeScript** with complete interfaces for students, products, cart items, and quizzes.

---

## 📂 Project Structure

```text
/
├── README.md                 <- Professional documentation
├── package.json              <- Dependencies (React 19, Motion, Lucide, Tailwind 4)
├── index.html                <- Main mount entry with custom fonts
├── metadata.json             <- AI Studio platform descriptor
├── src/
│   ├── types.ts              <- Shared interfaces for Products, Students, Quiz
│   ├── main.tsx              <- App mounter
│   ├── index.css             <- Tailwind 4 import & custom styles
│   ├── App.tsx               <- Application Shell & Routing Dashboard
│   ├── data/
│   │   ├── students.ts       <- Initial student registry records
│   │   ├── products.ts       <- Mock items with emojis and category metadata
│   │   └── quiz.ts           <- 5 Educational React trivia cards
│   └── components/
│       ├── TheoryAnswers.tsx       <- Interactive Part A Accordions
│       ├── PracticalExercises.tsx  <- Five Part B React Core Drills
│       ├── ComponentChallenges.tsx <- Five Part C Blueprints & Callbacks
│       ├── StateManagement.tsx     <- Five Part D Advanced Sync Tasks
│       ├── StudentDashboard.tsx    <- Part E: Student Management Metrics
│       ├── ShoppingCart.tsx        <- Part E: Interactive Shopping Basket
│       ├── QuizApp.tsx             <- Part E: Concept Quiz Scorecard
│       ├── ColorPicker.tsx         <- Part E: Live Swatch Selector
│       ├── TabbedInterface.tsx     <- Part E: Tabbed Portfolio Showcase
│       └── ResearchDocs.tsx        <- Part F: Five Scientific Research Briefs
```

---

## 🚀 Key Features by Section

### 📚 Part A — Theory Portal
- Complete written answers to 10 fundamental architectural questions.
- Includes **Visual Analogies** and **Declarative Code Blocks** for each concept.

### ⚙️ Part B — Core Drills (Practical Exercises)
- **Props Display**: Receives and formats five distinct datatypes (string, number, boolean, array, object).
- **Counter**: Double-ended counter with state resets.
- **Controlled Input**: Real-time two-way text mirror.
- **Loop Renderer & Empty State**: Adds/removes challenge list items; triggers an empty list banner conditionally.

### 🧩 Part C — Blueprints (Component Challenges)
- **Custom Button**: Accepts variants, icons, and onClick hooks.
- **Card Wrapper**: Renders custom nested layouts via `{children}`.
- **Container-Presentational**: `ProductList` manages records; delegates to `ProductCard` for visual representation.
- **Toggle Switch**: Dual state mode triggers.
- **Child Callback**: Dispatches child inputs back up to the parent console.

### ⚡ Part D — State Tasks (Advanced State Management)
- **To-Do Engine**: Add, complete (toggle cross-through), and delete items with state lists.
- **Heart Pulse**: Fully animated scale transition of a like button.
- **Multi-Input Form**: Handles complex validation and prints the submitted state values.
- **Lifted State Sync**: Synchronizes Sibling A (input slider) with Sibling B (visual gauge meter).
- **Definitions Filter**: Real-time filter matching text inputs against key developer terms.

### 🎓 Part E — Portfolio Projects
- **Student Dashboard V2**: Metric indicators (average grade, roster count, average attendance), real-time search filtering, enrolling new students, updating existing records, and color-coded attendance indexes.
- **Shopping Basket**: Stateful product inventory addition, dynamic tax computations, promo coupons (`REACT10`, `STUDENT50`), and simulated checkouts.
- **React Trivia**: Five multiple-choice questions with answer highlights, explanation sheets, and final scorecard.
- **Swatch Picker**: Choose custom brand colors; adjust opacity using live Tailwind intensity filters.
- **Dynamic Tabs**: Interactive profile page containing Skills matrices and course syllabus tabs.

### 📝 Part F — Research Activities
- Complete scientific digests discussing `useEffect` hooks, global Context distributions, controlled vs uncontrolled elements, PropTypes schema checks, and reconciler VDOM trees.

---

## 🛠️ Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Compile Codebase (Production Pack)**:
   ```bash
   npm run build
   ```
