export interface Student {
  id: string;
  name: string;
  email: string;
  rollNumber: string;
  course: string;
  attendance: number; // percentage, e.g. 85
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
  status: 'Active' | 'Inactive';
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}
