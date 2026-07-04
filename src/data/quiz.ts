import { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Why are React props considered "read-only"?',
    options: [
      'To prevent the child component from ever rendering again.',
      'To maintain a predictable, unidirectional data flow where only the parent controls the data.',
      'Because they are stored in a read-only area of the system memory.',
      'So that TypeScript can automatically validate them without errors.',
    ],
    correctAnswer: 'To maintain a predictable, unidirectional data flow where only the parent controls the data.',
    explanation: 'React maintains a unidirectional data flow. By forcing props to be read-only (immutable), it ensures that child components cannot unexpectedly modify their parent\'s state, preventing fragile and hard-to-debug side effects.',
  },
  {
    id: 2,
    question: 'What does the useState hook return?',
    options: [
      'A single state object representing all states in the component.',
      'A callback function that automatically binds to local storage.',
      'An array containing the current state value and a function to update it.',
      'A reference to the physical DOM element associated with the state.',
    ],
    correctAnswer: 'An array containing the current state value and a function to update it.',
    explanation: 'useState returns a state tuple as an array with exactly two elements: the current state value (e.g., state) and the dispatcher function (e.g., setState) used to enqueue re-renders.',
  },
  {
    id: 3,
    question: 'Which of the following is a key difference between props and state?',
    options: [
      'State is passed in from outside, while props are initialized internally.',
      'Props trigger component re-renders, while changes to state do not.',
      'Props are read-only and passed down by parents; state is managed locally and can change over time.',
      'State is used in functional components, while props can only be used in class components.',
    ],
    correctAnswer: 'Props are read-only and passed down by parents; state is managed locally and can change over time.',
    explanation: 'Props act as arguments passed down to a component by its parent, making them immutable to the receiver. State acts as local memory owned and modified internally by the component itself.',
  },
  {
    id: 4,
    question: 'Why must you never mutate state directly (e.g., state.count = 5)?',
    options: [
      'React will immediately crash and throw a fatal compilation error.',
      'It violates ECMAScript strict mode standards.',
      'React determines when to re-render by comparing object references (shallow comparison); direct mutations bypass this detection.',
      'It deletes the history records inside the browser\'s session storage.',
    ],
    correctAnswer: 'React determines when to re-render by comparing object references (shallow comparison); direct mutations bypass this detection.',
    explanation: 'React relies on structural immutability and reference equality (shallow comparison) to detect state changes. Direct mutation updates the value in-place without changing the memory reference, meaning React will fail to recognize that the state changed and will not schedule a re-render.',
  },
  {
    id: 5,
    question: 'What is the purpose of the "key" prop when rendering a list of items?',
    options: [
      'To provide unique CSS class names to style individual list items.',
      'To help React uniquely identify which items have changed, been added, or been removed during reconciliation.',
      'To encrypt the listed data so that it cannot be intercepted in the DOM.',
      'To enable keyboard shortcuts for list items automatically.',
    ],
    correctAnswer: 'To help React uniquely identify which items have changed, been added, or been removed during reconciliation.',
    explanation: 'Keys provide a stable identity for elements across renders. During the diffing (reconciliation) process, React uses these keys to match children of the old tree with children of the new tree, avoiding unnecessary DOM destruction and reconstruction.',
  },
];
