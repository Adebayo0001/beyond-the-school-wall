'use client';

import { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Shield, Trophy, CheckCircle2, Star, Clock, Users,
  Search, X, School, ArrowRight, Sparkles,
  Package, Truck, CreditCard, ShoppingBag,
  Plus, Minus, Trash2, BadgeCheck
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { STORE_PRODUCTS, TabletopProduct } from '@/lib/tabletopProducts';

const TRUSTED_SCHOOLS = [
  'Floral College', 'EnnyDave College', 'Victory School International', 
  'Zenith International School', 'The Hill Private School', 'Nature trail School',
  'Isaac Newton School', 'Kelsther International School'
];

interface CartItem {
  product: TabletopProduct;
  quantity: number;
}

export default function TabletopGames() {
  const catalogRef = useRef<HTMLDivElement>(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutCity, setCheckoutCity] = useState('');
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false);

  // Cart helper functions
  const addToCart = (product: TabletopProduct, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const cartTotalCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  }, [cart]);

  const filteredProducts = useMemo(() => {
    return STORE_PRODUCTS.filter(prod => {
      if (activeCategory !== 'all' && prod.category !== activeCategory) return false;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return prod.title.toLowerCase().includes(q) || 
               prod.subtitle.toLowerCase().includes(q) || 
               prod.skills.some(s => s.toLowerCase().includes(q));
      }
      return true;
    });
  }, [activeCategory, searchQuery]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutEmail || !checkoutPhone || !checkoutAddress) return;
    setOrderPlacedSuccess(true);
  };

  return (
    <div className="bg-[#faf9f7] min-h-screen text-[#1e1e1e] pt-24 pb-20 font-sans selection:bg-[#F16736]/20">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: 16:9 LANDSCAPE TABLETOP & BOARD GAMES BANNER              */}
      {/* ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-8">
        <div className="relative rounded-xl bg-[#141118] border border-orange-500/20 shadow-xl p-6 sm:p-8 lg:p-10 overflow-hidden text-white">
          
          {/* Ambient Background Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#F16736]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-amber-500/10 rounded-full blur-[110px] pointer-events-none" />

          {/* Top Bar: Breadcrumb + Cart Button */}
          <div className="relative z-10 flex items-center justify-between gap-4 pb-5 border-b border-white/10">
            <Breadcrumbs variant="dark" className="text-xs" />
            
            <button
              onClick={() => setIsCartOpen(true)}
              className="px-3.5 py-1.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg text-xs font-bold text-amber-300 flex items-center gap-2 transition-all cursor-pointer"
            >
              <ShoppingBag size={14} className="text-[#F16736]" />
              <span>Cart ({cartTotalCount})</span>
            </button>
          </div>

          {/* Main Hero Row */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-6">
            
            {/* Left Column: Simple, High-Impact Copy */}
            <div className="lg:col-span-6 space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-[#F16736] to-orange-500">
                Official Tabletop & Board Game Store
              </h1>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed max-w-lg font-normal">
                Direct store order for tournament chess sets, classic Monopoly, strategy board games, chemistry STEM sets, and financial literacy games.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="px-7 py-3.5 bg-gradient-to-r from-[#F16736] via-[#ea580c] to-amber-500 hover:from-[#e05423] hover:to-orange-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg shadow-lg shadow-orange-500/25 transition-all hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-2.5 border border-orange-400/30"
                >
                  <ShoppingBag size={15} />
                  <span>Start Shopping</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Right Column: 16:9 Landscape Tabletop Board Games Visual */}
            <div className="lg:col-span-6">
              <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden border border-white/10 shadow-xl group">
                <Image
                  src="/images/tabletop_board_games_hero.jpg"
                  alt="Official Tabletop Board Games, Chess Sets and Strategy Games"
                  fill
                  priority
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />
              </div>
            </div>

          </div>

          {/* Minimal 3-Point Guarantee Bar */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-3 pt-5 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2.5 text-neutral-300">
              <Truck size={16} className="text-amber-400 shrink-0" />
              <span><strong>2–3 Weeks Delivery:</strong> Nationwide dispatch</span>
            </div>

            <div className="flex items-center gap-2.5 text-neutral-300">
              <Shield size={16} className="text-emerald-400 shrink-0" />
              <span><strong>100% Genuine:</strong> Factory sealed boxed sets</span>
            </div>

            <div className="flex items-center gap-2.5 text-neutral-300">
              <CreditCard size={16} className="text-[#F16736] shrink-0" />
              <span><strong>Direct Checkout:</strong> Instant receipts & invoices</span>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PARTNER SCHOOLS TRUST RIBBON (INFINITE SCROLLING LOOP)                */}
      {/* ========================================================================= */}
      <section className="border-y border-[#e8e5e0] bg-white py-4 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-4 md:gap-8">
          
          <div className="shrink-0 flex items-center gap-2 pr-0 md:pr-4 md:border-r border-[#e8e5e0]">
            <span className="w-2 h-2 rounded-full bg-[#F16736] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#F16736] whitespace-nowrap">
              Game-board Adopted by
            </span>
          </div>

          <div className="relative w-full overflow-hidden flex-1 py-1">
            <div className="absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            <div className="animate-marquee flex items-center gap-8 hover:[animation-play-state:paused] cursor-default">
              {[...TRUSTED_SCHOOLS, ...TRUSTED_SCHOOLS].map((school, i) => (
                <span
                  key={i}
                  className="text-xs font-extrabold text-neutral-700 flex items-center gap-2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-[#faf9f7] border border-[#e8e5e0] hover:border-[#F16736]/40 hover:text-[#F16736] transition-colors"
                >
                  <School size={13} className="text-[#F16736] shrink-0" />
                  <span>{school}</span>
                </span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ECOMMERCE CATALOG: CLEAN & SIMPLE PRODUCT OVERVIEW                     */}
      {/* ========================================================================= */}
      <section ref={catalogRef} id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        
        {/* Controls Header */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-neutral-900">
                Available Board Game Sets
              </h2>
            </div>

            {/* Search Bar */}
            <div className="relative w-full md:w-80">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search board games, rules, skills..."
                className="w-full pl-9 pr-8 py-2.5 bg-white border border-[#e8e5e0] rounded-xl text-xs font-semibold text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-[#F16736]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  <X size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#e8e5e0]">
            <div className="flex flex-wrap gap-1.5 bg-white p-1 rounded-xl border border-[#e8e5e0] shadow-xs">
              {[
                { id: 'all', label: `All Games (${STORE_PRODUCTS.length})` },
                { id: 'chess', label: 'Tournament Chess' },
                { id: 'business', label: 'Business & Real Estate' },
                { id: 'strategy', label: '4X Strategy (CATAN)' },
                { id: 'stem', label: 'STEM & Chemistry' },
                { id: 'finance', label: 'Financial Literacy' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#1e1e1e] text-white shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="text-xs text-neutral-500 font-bold flex items-center gap-1.5">
              <Package size={14} className="text-[#F16736]" />
              <span>Showing {filteredProducts.length} Products</span>
            </div>
          </div>
        </div>

        {/* Clean, Simple 6-Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white border border-[#e8e5e0] rounded-lg overflow-hidden shadow-sm hover:shadow-md hover:border-[#F16736]/40 transition-all flex flex-col justify-between group"
            >
              {/* 1. CLEAN PRODUCT IMAGE - Zero text/badges overlay */}
              <Link
                href={`/tabletop-games/${product.id}`}
                className="block relative aspect-[4/3] w-full bg-neutral-100 overflow-hidden"
              >
                <Image
                  src={product.imageSrc}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </Link>

              {/* 2. SIMPLE, CLEAN BODY */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#F16736]">
                      {product.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-semibold text-[11px]">
                      <Star size={11} className="fill-amber-400" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  {/* Title linking to dedicated product page */}
                  <Link href={`/tabletop-games/${product.id}`} className="block">
                    <h3 className="text-sm sm:text-base font-semibold text-neutral-900 line-clamp-2 leading-snug">
                      {product.title}
                    </h3>
                  </Link>

                  {/* Delivery & Availability */}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] font-medium text-neutral-500 flex items-center gap-1.5">
                      <Truck size={13} className="text-[#F16736]" /> {product.deliveryTimeline}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      In Stock
                    </span>
                  </div>

                </div>

                {/* 3. ONLY ONE BUTTON: Clean, not-too-big 'Add to Cart' */}
                <div className="pt-2 border-t border-neutral-100">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-full py-2.5 px-4 bg-[#F16736] hover:bg-[#e05423] text-white text-xs font-bold rounded-md shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                  >
                    <ShoppingBag size={14} />
                    <span>Add to Cart</span>
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 4. FLOATING CART TOGGLE BUTTON                                            */}
      {/* ========================================================================= */}
      {cartTotalCount > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsCartOpen(true)}
            className="px-6 py-3.5 bg-gradient-to-r from-[#F16736] to-[#ea580c] hover:from-[#e05423] hover:to-[#c2410c] text-white font-black text-xs uppercase tracking-wider rounded-2xl shadow-2xl shadow-orange-500/40 transition-all hover:scale-105 active:scale-95 flex items-center gap-3 cursor-pointer border border-white/20"
          >
            <div className="relative">
              <ShoppingBag size={18} />
              <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-white text-[#F16736] text-[10px] font-black flex items-center justify-center shadow">
                {cartTotalCount}
              </span>
            </div>
            <span>View Cart • ₦{cartSubtotal.toLocaleString()}</span>
          </button>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. SHOPPING CART SLIDE-OVER DRAWER                                        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between relative"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-[#e8e5e0] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#fff1eb] text-[#F16736] flex items-center justify-center font-bold">
                    <ShoppingBag size={16} />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-neutral-900">Your Shopping Cart</h3>
                    <span className="text-xs text-neutral-500">{cartTotalCount} Items Selected</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Delivery Timeline Notice in Cart */}
              <div className="mx-6 mt-4 p-3 bg-[#fff1eb] border border-[#F16736]/30 rounded-xl flex items-center gap-2.5 text-xs text-neutral-800">
                <Truck size={16} className="text-[#F16736] shrink-0" />
                <div>
                  <strong className="block font-black text-[#F16736]">Estimated Delivery: 2–3 Weeks</strong>
                  <span className="text-[11px] text-neutral-600 font-medium">Direct factory dispatch & tracked shipping</span>
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mx-auto">
                      <ShoppingBag size={28} />
                    </div>
                    <p className="text-sm font-bold text-neutral-600">Your cart is currently empty</p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-5 py-2 bg-[#F16736] text-white text-xs font-bold rounded-lg shadow-sm cursor-pointer"
                    >
                      Browse Store Catalog
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3.5 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl flex gap-3.5 items-center"
                    >
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-900 shrink-0 border border-[#e8e5e0]">
                        <Image
                          src={item.product.imageSrc}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-black text-neutral-900 truncate">
                          {item.product.title}
                        </h4>
                        <span className="text-xs font-extrabold text-[#F16736] block">
                          ₦{item.product.price.toLocaleString()}
                        </span>

                        <div className="flex items-center gap-3 pt-1.5">
                          <div className="flex items-center border border-[#e8e5e0] rounded-lg bg-white">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="px-2 py-0.5 text-neutral-600 hover:text-black font-bold text-xs"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="px-2 text-xs font-black text-neutral-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="px-2 py-0.5 text-neutral-600 hover:text-black font-bold text-xs"
                            >
                              <Plus size={11} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer & Checkout Button */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-[#e8e5e0] space-y-4 bg-white">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-neutral-500">
                      <span>Subtotal</span>
                      <span className="font-bold text-neutral-800">₦{cartSubtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm font-black text-neutral-900 pt-2 border-t border-neutral-100">
                      <span>Total</span>
                      <span className="text-[#F16736]">₦{cartSubtotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                      setOrderPlacedSuccess(false);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-[#F16736] to-[#ea580c] hover:from-[#e05423] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Direct Checkout</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 6. COMPLETE ECOMMERCE CHECKOUT MODAL                                      */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-[#e8e5e0] shadow-2xl relative p-6 sm:p-8 space-y-6"
            >
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={16} />
              </button>

              {orderPlacedSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full border border-emerald-200 flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-2xl font-black text-neutral-900">Order Confirmed!</h4>
                  <div className="p-4 bg-[#fff1eb] border border-[#F16736]/25 rounded-xl text-xs text-neutral-800 space-y-1">
                    <p className="font-extrabold text-[#F16736]">
                      Delivery Timeline: 2–3 Weeks
                    </p>
                    <p className="text-neutral-600">
                      Thank you, <strong>{checkoutName}</strong>. Your order for <strong>{cartTotalCount} board game items (₦{cartSubtotal.toLocaleString()})</strong> has been logged. Tracking details dispatched to <strong>{checkoutEmail}</strong> and WhatsApp <strong>{checkoutPhone}</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCart([]);
                      setIsCheckoutOpen(false);
                    }}
                    className="px-8 py-3 bg-[#F16736] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fff1eb] text-[#F16736] text-[10px] font-black uppercase tracking-wider">
                      <Truck size={12} />
                      <span>DELIVERY TIMELINE: 2–3 WEEKS</span>
                    </div>
                    <h3 className="text-xl font-black text-neutral-900">
                      Complete Your Order
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Order Total: <strong>₦{cartSubtotal.toLocaleString()}</strong> ({cartTotalCount} Items)
                    </p>
                  </div>

                  {/* Order Summary */}
                  <div className="p-3 bg-[#faf9f7] rounded-xl border border-[#e8e5e0] space-y-2 text-xs">
                    <span className="font-bold text-neutral-700 block">Order Items:</span>
                    {cart.map(item => (
                      <div key={item.product.id} className="flex justify-between text-neutral-600">
                        <span>{item.quantity}x {item.product.title}</span>
                        <span className="font-bold text-neutral-900">₦{(item.product.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={checkoutName}
                        onChange={(e) => setCheckoutName(e.target.value)}
                        placeholder="e.g. Samuel Adeyemi"
                        className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:border-[#F16736]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={checkoutEmail}
                          onChange={(e) => setCheckoutEmail(e.target.value)}
                          placeholder="e.g. sam@gmail.com"
                          className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:border-[#F16736]"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1">WhatsApp / Phone Number</label>
                        <input
                          type="text"
                          required
                          value={checkoutPhone}
                          onChange={(e) => setCheckoutPhone(e.target.value)}
                          placeholder="e.g. +234 801 234 5678"
                          className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:border-[#F16736]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1">Delivery Street Address</label>
                      <input
                        type="text"
                        required
                        value={checkoutAddress}
                        onChange={(e) => setCheckoutAddress(e.target.value)}
                        placeholder="e.g. 14 Victoria Island Road, Flat 4B"
                        className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:border-[#F16736]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-black uppercase text-neutral-500 mb-1">City / State / School Note</label>
                      <input
                        type="text"
                        value={checkoutCity}
                        onChange={(e) => setCheckoutCity(e.target.value)}
                        placeholder="e.g. Ikeja, Lagos State / Floral College"
                        className="w-full p-3 bg-[#faf9f7] border border-[#e8e5e0] rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:border-[#F16736]"
                      />
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-4 bg-gradient-to-r from-[#F16736] to-[#ea580c] hover:from-[#e05423] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={16} />
                      <span>Confirm Order (2–3 Weeks Delivery)</span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
