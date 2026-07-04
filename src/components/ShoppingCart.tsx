import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Plus, Minus, Trash2, ShoppingCart as CartIcon, 
  ArrowRight, ShieldCheck, Tag, Sparkles, CheckCircle2 
} from 'lucide-react';
import { mockProducts } from '../data/products';
import { Product, CartItem } from '../types';

export default function ShoppingCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  // Add Product to Cart
  const handleAddToCart = (product: Product) => {
    const existing = cart.find((item) => item.product.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  // Decrease quantity / remove
  const handleDecreaseQuantity = (productId: string) => {
    const existing = cart.find((item) => item.product.id === productId);
    if (!existing) return;
    if (existing.quantity === 1) {
      setCart(cart.filter((item) => item.product.id !== productId));
    } else {
      setCart(
        cart.map((item) =>
          item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  // Increase quantity
  const handleIncreaseQuantity = (productId: string) => {
    setCart(
      cart.map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Delete product completely
  const handleRemoveProduct = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId));
  };

  // Apply simulated promo code
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'REACT10') {
      setDiscountPercent(10);
      setPromoMessage('Promo Applied: 10% off academic discount!');
    } else if (promoCode.trim().toUpperCase() === 'STUDENT50') {
      setDiscountPercent(50);
      setPromoMessage('Promo Applied: 50% off mega scholarship rate!');
    } else {
      setPromoMessage('Invalid code. Try "REACT10" or "STUDENT50"!');
    }
  };

  // Calculations
  const subtotal = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return (subtotal * discountPercent) / 100;
  }, [subtotal, discountPercent]);

  const tax = useMemo(() => {
    return (subtotal - discountAmount) * 0.08; // 8% sales tax
  }, [subtotal, discountAmount]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount + tax);
  }, [subtotal, discountAmount, tax]);

  const cartCount = useMemo(() => {
    return cart.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [cart]);

  // Simulate checkout
  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setCart([]);
    setDiscountPercent(0);
    setPromoCode('');
    setPromoMessage('');
  };

  return (
    <div className="space-y-6" id="shopping-cart-root">
      {/* Header Banner */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4 justify-between" id="shopping-cart-header">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Interactivity Mart</h2>
            <p className="text-xs text-slate-500 font-medium">Stateful inventory basket with subtotal computations</p>
          </div>
        </div>
        <div className="bg-emerald-900 text-white flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-emerald-800 text-xs font-mono font-bold shadow-sm">
          <CartIcon className="h-4 w-4" /> Basket Count: {cartCount}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="shopping-grid">
        {/* Left column: Catalog items (span 7) */}
        <div className="lg:col-span-7 space-y-4" id="catalog-col">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Catalog</h3>
            <span className="text-[10px] text-slate-400 font-medium">Click card to append item</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3" id="catalog-products-list">
            {mockProducts.map((prod) => (
              <div
                key={prod.id}
                onClick={() => handleAddToCart(prod)}
                className="bg-white border border-slate-200 hover:border-emerald-300 rounded-xl p-4 transition-all duration-150 flex flex-col justify-between hover:shadow-xs group cursor-pointer"
                id={`catalog-product-card-${prod.id}`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl bg-slate-50 p-1.5 rounded-lg border border-slate-100 group-hover:bg-emerald-50 transition-colors">
                      {prod.image}
                    </span>
                    <span className="text-[9px] font-black uppercase tracking-wider bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-mono">
                      {prod.category}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {prod.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 font-mono">${prod.price.toFixed(2)}</span>
                  <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    Add <Plus className="h-3 w-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column: Cart Summary & Taxes (span 5) */}
        <div className="lg:col-span-5 bg-white border border-slate-250 rounded-xl p-5 shadow-sm flex flex-col justify-between min-h-[480px]" id="cart-summary-col">
          <div className="space-y-5">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Your Basket</h3>
              <span className="text-[11px] font-mono text-slate-400">Review Items</span>
            </div>

            {/* Selected Items */}
            <div className="space-y-3 max-h-[180px] overflow-y-auto pr-1">
              <AnimatePresence mode="popLayout">
                {cart.length > 0 ? (
                  cart.map((item) => (
                    <motion.div
                      layout
                      key={item.product.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex items-center justify-between bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs"
                      id={`cart-item-${item.product.id}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl shrink-0">{item.product.image}</span>
                        <div>
                          <h5 className="font-bold text-slate-800 line-clamp-1">{item.product.name}</h5>
                          <span className="text-[10px] text-slate-400 font-mono font-bold">
                            ${item.product.price.toFixed(2)} each
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Quantity controls */}
                        <div className="flex items-center bg-white border border-slate-200 rounded-md">
                          <button
                            onClick={() => handleDecreaseQuantity(item.product.id)}
                            className="p-1 hover:text-rose-600 text-slate-400 cursor-pointer"
                            id={`qty-dec-${item.product.id}`}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="px-1.5 font-mono text-[11px] font-bold text-slate-700 min-w-[12px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleIncreaseQuantity(item.product.id)}
                            className="p-1 hover:text-emerald-600 text-slate-400 cursor-pointer"
                            id={`qty-inc-${item.product.id}`}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Remove item button */}
                        <button
                          onClick={() => handleRemoveProduct(item.product.id)}
                          className="p-1.5 text-slate-300 hover:text-rose-600 rounded hover:bg-rose-50 cursor-pointer"
                          id={`cart-remove-${item.product.id}`}
                          title="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="py-6 text-center text-slate-400 flex flex-col items-center justify-center space-y-1">
                    <CartIcon className="h-8 w-8 text-slate-300 stroke-1 mb-1 animate-pulse" />
                    <h5 className="text-xs font-semibold">Basket is empty</h5>
                    <p className="text-[10px] text-slate-400">Click product cards in the catalog to add items.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Promo Code Form */}
            {cart.length > 0 && (
              <form onSubmit={handleApplyPromo} className="space-y-1.5" id="promo-form">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. REACT10, STUDENT50)"
                    className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-lg p-2 font-mono uppercase focus:outline-hidden focus:ring-1 focus:ring-emerald-500 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="bg-slate-800 hover:bg-slate-700 text-white text-xs px-3 rounded-lg font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Tag className="h-3 w-3" /> Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[10px] font-mono font-bold ${promoMessage.includes('Applied') ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {promoMessage}
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Pricing Ledger breakdown */}
          <div className="space-y-4 border-t border-slate-100 pt-4" id="ledger-details">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal</span>
                <span className="font-mono font-bold">${subtotal.toFixed(2)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold bg-emerald-50/50 p-1 rounded">
                  <span>Discount ({discountPercent}%)</span>
                  <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500">
                <span>Estimated Sales Tax (8.0%)</span>
                <span className="font-mono font-bold">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-800 text-sm font-black border-t border-slate-100 pt-2">
                <span className="flex items-center gap-1">Grand Total <Sparkles className="h-3 w-3 text-emerald-600" /></span>
                <span className="font-mono text-base text-emerald-700">${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Check Out button */}
            <button
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className={`w-full py-2.5 rounded-lg text-xs font-bold text-white flex items-center justify-center gap-1.5 transition-all duration-150 cursor-pointer ${
                cart.length === 0
                  ? 'bg-slate-200 border border-slate-300 text-slate-400 cursor-not-allowed shadow-none'
                  : 'bg-emerald-600 hover:bg-emerald-700 shadow-sm hover:shadow-md'
              }`}
              id="checkout-trigger-btn"
            >
              Secure Checkout <ArrowRight className="h-3.5 w-3.5" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-medium">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-300" /> Fully secure client-side sandbox execution
            </div>
          </div>
        </div>
      </div>

      {/* Checkout success visual prompt */}
      <AnimatePresence>
        {checkoutSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4" id="success-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white border border-slate-200 rounded-xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl"
              id="checkout-success-card"
            >
              <CheckCircle2 className="h-12 w-12 text-emerald-500 stroke-1.5 mx-auto animate-bounce" />
              <div className="space-y-1">
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">Purchase Completed!</h4>
                <p className="text-xs text-slate-500">Your simulated code elements have been dispatched to local processing hubs.</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 font-mono text-[11px] text-slate-600">
                TransID: <span className="font-bold text-slate-800">TX-{Math.random().toString(36).slice(2, 10).toUpperCase()}</span>
              </div>
              <button
                onClick={() => setCheckoutSuccess(false)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-4 py-2 rounded-lg font-bold w-full transition-colors cursor-pointer"
              >
                Return to Shop
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
