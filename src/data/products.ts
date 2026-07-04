import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Mechanical Keyboard (Tenkeyless)',
    price: 89.99,
    description: 'Anodized aluminum frame with hot-swappable tactile switches and double-shot PBT keycaps.',
    category: 'Peripherals',
    image: '⌨️',
  },
  {
    id: 'prod-2',
    name: 'Ergonomic Wireless Mouse',
    price: 59.99,
    description: 'Sculpted design with customizable thumb controls, high-precision optical tracking, and dual-mode wireless.',
    category: 'Peripherals',
    image: '🖱️',
  },
  {
    id: 'prod-3',
    name: 'Active Noise Cancelling Headphones',
    price: 189.99,
    description: 'Immersive sound with hybrid active noise cancellation, custom equalizers, and 40-hour battery life.',
    category: 'Audio',
    image: '🎧',
  },
  {
    id: 'prod-4',
    name: 'Full HD Portable Monitor 15.6"',
    price: 149.99,
    description: 'Ultra-slim IPS screen with dual USB-C and HDMI inputs, ideal for multi-screen coding productivity.',
    category: 'Displays',
    image: '🖥️',
  },
  {
    id: 'prod-5',
    name: 'Minimalist Desk Mat (Extra Large)',
    price: 24.99,
    description: 'Premium vegan leather surface with non-slip backing, spill-resistant coating, and stitched borders.',
    category: 'Office',
    image: '📏',
  },
];
