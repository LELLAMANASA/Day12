import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Box, Sparkles, Sliders, ToggleLeft, ToggleRight, ArrowRight, DollarSign, ListFilter } from 'lucide-react';
import { mockProducts } from '../data/products';
import { Product } from '../types';

// Challenge 1: Reusable Button Component
interface CustomButtonProps {
  text: string;
  color?: 'indigo' | 'emerald' | 'rose' | 'amber' | 'slate';
  onClick: () => void;
  icon?: ReactNode;
  disabled?: boolean;
}

function CustomButton({ text, color = 'indigo', onClick, icon, disabled = false }: CustomButtonProps) {
  const colorClasses = {
    indigo: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 text-white',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500 text-white',
    rose: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500 text-white',
    amber: 'bg-amber-500 hover:bg-amber-600 focus:ring-amber-500 text-white',
    slate: 'bg-slate-700 hover:bg-slate-800 focus:ring-slate-500 text-white',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3.5 py-2 rounded-lg text-xs font-semibold shadow-xs hover:shadow-sm focus:outline-hidden focus:ring-2 focus:ring-offset-2 transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer ${
        disabled ? 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200' : colorClasses[color]
      }`}
    >
      {icon && <span className="h-4 w-4 shrink-0">{icon}</span>}
      {text}
    </button>
  );
}

// Challenge 2: Card Wrapper Component using children
interface CardWrapperProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  badge?: string;
  badgeColor?: 'indigo' | 'emerald' | 'amber';
}

function CardWrapper({ title, subtitle, children, badge, badgeColor = 'indigo' }: CardWrapperProps) {
  const badgeClasses = {
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-full hover:border-indigo-200 transition-colors">
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between gap-2">
        <div>
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">{title}</h4>
          {subtitle && <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{subtitle}</p>}
        </div>
        {badge && (
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 border rounded-md ${badgeClasses[badgeColor]}`}>
            {badge}
          </span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

// Challenge 3: Presentational ProductCard
interface ProductCardProps {
  product: Product;
  onSelect: (p: Product) => void;
  selected: boolean;
  key?: string;
}

function ProductCard({ product, onSelect, selected }: ProductCardProps) {
  return (
    <div
      onClick={() => onSelect(product)}
      className={`border rounded-lg p-3 cursor-pointer transition-all flex flex-col justify-between h-full hover:shadow-xs group ${
        selected
          ? 'border-indigo-500 bg-indigo-50/30 ring-1 ring-indigo-500'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xl">{product.image}</span>
          <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
            {product.category}
          </span>
        </div>
        <div>
          <h5 className="text-xs font-bold text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition-colors">
            {product.name}
          </h5>
          <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
      </div>
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-800">${product.price.toFixed(2)}</span>
        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
          selected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
        }`}>
          {selected ? 'Selected' : 'Click to Select'}
        </span>
      </div>
    </div>
  );
}

// Challenge 5: Callback Child Component
interface CallbackChildProps {
  onFeedback: (emoji: string, comment: string) => void;
}

function CallbackChild({ onFeedback }: CallbackChildProps) {
  const [comment, setComment] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🎓');

  const emojis = ['🎓', '⚡', '🌟', '🛡️', '🧠'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    onFeedback(selectedEmoji, comment);
    setComment('');
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Child Component</span>
        <span className="text-[9px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono">CallbackChild.tsx</span>
      </div>
      <p className="text-xs text-slate-600 leading-normal">
        I am a child receiving a function prop called <code className="bg-slate-200 px-1 rounded text-rose-600 text-[10px]">onFeedback</code>. Enter a message and select an badge to send to my parent!
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Select Active Icon</label>
          <div className="flex gap-2">
            {emojis.map((em) => (
              <button
                key={em}
                type="button"
                onClick={() => setSelectedEmoji(em)}
                className={`text-base p-1.5 rounded-md border transition-all ${
                  selectedEmoji === em ? 'border-indigo-600 bg-white scale-110 shadow-xs' : 'border-slate-200 bg-slate-100 opacity-60 hover:opacity-100'
                }`}
              >
                {em}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">Comment</label>
          <div className="flex gap-1.5">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Type message for parent..."
              className="flex-1 text-xs bg-white border border-slate-200 rounded-lg p-2 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 rounded-lg font-semibold flex items-center gap-1 shrink-0"
            >
              Send Callback <ArrowRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default function ComponentChallenges() {
  // State for Reusable Button Challenge
  const [btnActionLogs, setBtnActionLogs] = useState<string[]>([]);
  
  // State for Toggle Challenge
  const [isToggled, setIsToggled] = useState<boolean>(false);

  // State for ProductList Container
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(mockProducts[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');

  // State for Parent-Child Callback Demo
  const [callbackReceipts, setCallbackReceipts] = useState<Array<{ id: string; emoji: string; text: string; time: string }>>([
    { id: '1', emoji: '⚡', text: 'Initial callback connection tested successfully!', time: '12:00:00' }
  ]);

  const addButtonLog = (color: string) => {
    const time = new Date().toLocaleTimeString();
    setBtnActionLogs((prev) => [`[${time}] Clicked ${color} button!`, ...prev.slice(0, 4)]);
  };

  const handleApplyDiscount = () => {
    // 20% discount mutation
    const discounted = products.map((p) => ({
      ...p,
      price: Math.max(5.00, p.price * 0.8),
    }));
    setProducts(discounted);
    // update current selection reference too
    if (selectedProduct) {
      const match = discounted.find((p) => p.id === selectedProduct.id);
      if (match) setSelectedProduct(match);
    }
  };

  const handleFeedbackReceived = (emoji: string, comment: string) => {
    const time = new Date().toLocaleTimeString();
    setCallbackReceipts((prev) => [
      { id: Date.now().toString(), emoji, text: comment, time },
      ...prev
    ]);
  };

  const categories = ['All', ...Array.from(new Set(mockProducts.map((p) => p.category)))];
  const filteredProducts = categoryFilter === 'All'
    ? products
    : products.filter((p) => p.category === categoryFilter);

  return (
    <div id="component-challenges-container" className="space-y-6">
      <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
        <Box className="h-6 w-6 text-indigo-600" id="component-challenges-icon" />
        <div>
          <h2 className="text-xl font-semibold text-gray-900" id="component-challenges-title">Part C — Component Challenges</h2>
          <p className="text-sm text-gray-500" id="component-challenges-subtitle">Reusable blueprints, container-presentational setups, and event callbacks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6" id="challenges-grid">
        {/* Left Hand: Reusable Button & Card Wrapper & Toggle switch */}
        <div className="space-y-6" id="challenges-left-col">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Challenge 1 & 2: Custom Buttons in a Card Wrapper */}
            <CardWrapper
              title="1 & 2. Button Variant System"
              subtitle="Card Wrapper displaying reusable custom button instances receiving dynamic onClick callbacks."
              badge="Wrapper Pattern"
              badgeColor="indigo"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2.5">
                  <CustomButton text="Primary" color="indigo" onClick={() => addButtonLog('Indigo')} />
                  <CustomButton text="Success" color="emerald" onClick={() => addButtonLog('Emerald')} />
                  <CustomButton text="Danger" color="rose" onClick={() => addButtonLog('Rose')} />
                  <CustomButton text="Warning" color="amber" onClick={() => addButtonLog('Amber')} />
                  <CustomButton text="Secondary" color="slate" onClick={() => addButtonLog('Slate')} />
                </div>

                <div className="bg-slate-900 p-3 rounded-lg text-xs font-mono text-slate-300 space-y-1 h-[110px] overflow-y-auto">
                  <div className="text-[10px] font-bold text-indigo-400 border-b border-slate-800 pb-1 mb-1.5 uppercase">
                    Action Event Console
                  </div>
                  {btnActionLogs.length > 0 ? (
                    btnActionLogs.map((log, idx) => (
                      <p key={idx} className="text-[11px] truncate">{log}</p>
                    ))
                  ) : (
                    <span className="text-slate-500 italic">Click any button above to send custom callback events...</span>
                  )}
                </div>
              </div>
            </CardWrapper>

            {/* Challenge 4: Toggle Component */}
            <CardWrapper
              title="4. Two-State Toggle Switch"
              subtitle="Dual state switcher component representing controlled visual parameters."
              badge="Switch State"
              badgeColor="amber"
            >
              <div className="flex flex-col items-center justify-center p-3 bg-slate-50 rounded-lg border border-slate-200/60 flex-1 space-y-4">
                <div className="flex items-center gap-4">
                  <span className={`text-xs font-bold transition-colors ${!isToggled ? 'text-indigo-600' : 'text-slate-400'}`}>
                    Developer Mode
                  </span>
                  
                  <button
                    id="challenge-toggle-switch"
                    onClick={() => setIsToggled(!isToggled)}
                    className="focus:outline-hidden transition-transform duration-150 active:scale-95"
                    aria-label="Toggle Mode"
                  >
                    {isToggled ? (
                      <ToggleRight className="h-10 w-10 text-emerald-500 stroke-1" />
                    ) : (
                      <ToggleLeft className="h-10 w-10 text-slate-400 stroke-1" />
                    )}
                  </button>

                  <span className={`text-xs font-bold transition-colors ${isToggled ? 'text-emerald-600' : 'text-slate-400'}`}>
                    Production Mode
                  </span>
                </div>

                <div className="text-center p-2 rounded bg-white border border-slate-100 shadow-2xs w-full">
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Local Toggle Variable: <strong className="font-mono text-indigo-600">{isToggled ? 'TRUE' : 'FALSE'}</strong>
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1 italic">
                    {isToggled ? '✅ Code is bundled & optimized for CDN.' : '⚙️ Logs & live hot-reloads are enabled.'}
                  </p>
                </div>
              </div>
            </CardWrapper>

          </div>

          {/* Challenge 5: Parent to Child and back */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm space-y-4" id="callback-explorer">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">5. Child-to-Parent Event Loop</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Passing references downward; returning arguments upward</p>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full font-mono">Callback API</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CallbackChild onFeedback={handleFeedbackReceived} />
              
              <div className="bg-slate-900 rounded-lg p-4 text-white flex flex-col justify-between" id="parent-callback-terminal">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-1.5 mb-2">
                    <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Parent Dispatch Terminal</span>
                    <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded font-mono">App.tsx State</span>
                  </div>
                  <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                    {callbackReceipts.map((rcpt) => (
                      <div key={rcpt.id} className="text-[11px] bg-slate-800/60 p-2 rounded-md border border-slate-800 space-y-0.5 animate-fadeIn">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-indigo-300">Feedback: {rcpt.emoji}</span>
                          <span className="text-[9px] text-slate-500 font-mono">{rcpt.time}</span>
                        </div>
                        <p className="text-slate-300 italic font-mono leading-relaxed">"{rcpt.text}"</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 pt-3 border-t border-slate-800 mt-2">
                  Parent holds state Array <code className="text-slate-300">callbackReceipts</code>. Child appends live values.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Hand: Challenge 3 - ProductList and ProductCard */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm flex flex-col justify-between" id="product-container-system">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">3. Container-Presentational Pattern</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">ProductList (State Container) hosting ProductCard components (Visual presentation)</p>
              </div>
              <div className="flex items-center gap-2">
                <CustomButton
                  text="Apply 20% Discount"
                  color="emerald"
                  icon={<DollarSign className="h-3 w-3" />}
                  onClick={handleApplyDiscount}
                />
              </div>
            </div>

            {/* List filter and details */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/60 p-2 rounded-lg text-xs justify-between">
              <div className="flex items-center gap-1 text-slate-600 font-medium">
                <ListFilter className="h-3.5 w-3.5 text-slate-400" /> Category
              </div>
              <div className="flex gap-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      categoryFilter === cat ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grid of Product Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
              {filteredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  selected={selectedProduct?.id === p.id}
                  onSelect={setSelectedProduct}
                />
              ))}
            </div>
          </div>

          {/* Detailed visual overlay of active selection */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mt-4" id="selection-details">
            <div className="flex justify-between items-start border-b border-slate-200 pb-2 mb-2">
              <h5 className="text-xs font-bold text-slate-700">Detailed Spec Explorer</h5>
              <span className="text-[10px] text-slate-400 font-mono">Presentational Read</span>
            </div>
            {selectedProduct ? (
              <div className="flex gap-3 items-start">
                <span className="text-3xl bg-white p-2 rounded-lg border border-slate-200/60">{selectedProduct.image}</span>
                <div className="space-y-1">
                  <h6 className="text-xs font-bold text-slate-900">{selectedProduct.name}</h6>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{selectedProduct.description}</p>
                  <div className="flex gap-3 text-[10px] font-mono pt-1">
                    <span className="text-indigo-600 font-bold">Price: ${selectedProduct.price.toFixed(2)}</span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-500">ID: {selectedProduct.id}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic text-center py-2">Select a product card above to display granular metadata details.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
