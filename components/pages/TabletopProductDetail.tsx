'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Shield, CheckCircle2, Star, Clock, Users,
  ArrowRight, ArrowLeft, ShoppingBag, Truck, CreditCard,
  Plus, Minus, Trash2, X, BadgeCheck, Check, Package, Share2
} from 'lucide-react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { STORE_PRODUCTS, TabletopProduct, getTabletopProduct } from '@/lib/tabletopProducts';

interface CartItem {
  product: TabletopProduct;
  quantity: number;
}

export default function TabletopProductDetail({ id }: { id: string }) {
  const product = getTabletopProduct(id) || STORE_PRODUCTS[0];
  const relatedProducts = STORE_PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  // Cart & Checkout State
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Checkout inputs
  const [checkoutName, setCheckoutName] = useState('');
  const [checkoutEmail, setCheckoutEmail] = useState('');
  const [checkoutPhone, setCheckoutPhone] = useState('');
  const [checkoutAddress, setCheckoutAddress] = useState('');
  const [checkoutCity, setCheckoutCity] = useState('');
  const [orderPlacedSuccess, setOrderPlacedSuccess] = useState(false);

  const addToCart = (prod: TabletopProduct, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === prod.id);
      if (existing) {
        return prev.map(item => 
          item.product.id === prod.id 
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product: prod, quantity: qty }];
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

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutName || !checkoutEmail || !checkoutPhone || !checkoutAddress) return;
    setOrderPlacedSuccess(true);
  };

  const handleDirectBuy = () => {
    addToCart(product, quantity);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    setOrderPlacedSuccess(false);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="bg-[#faf9f7] min-h-screen text-[#1e1e1e] pt-24 pb-20 font-sans selection:bg-[#F16736]/20">
      
      {/* Navigation Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 pb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/tabletop-games"
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 transition-colors flex items-center gap-1.5 text-xs font-semibold shadow-xs"
          >
            <ArrowLeft size={14} />
            <span>All Board Games</span>
          </Link>
          <Breadcrumbs variant="light" className="text-xs hidden sm:flex" />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-100 text-neutral-700 hover:text-neutral-900 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Share2 size={13} />
            <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="px-4 py-2 bg-[#1e1e1e] hover:bg-black text-white rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer shadow-sm"
          >
            <ShoppingBag size={14} className="text-[#F16736]" />
            <span>Cart ({cartTotalCount})</span>
          </button>
        </div>
      </div>

      {/* Main Product Hero / Overview Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="bg-white rounded-xl p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            
            {/* Left Column: Product Image & Trust Indicators */}
            <div className="lg:col-span-6 space-y-6">
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-neutral-50 shadow-xs">
                <Image
                  src={product.imageSrc}
                  alt={product.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>

              {/* Minimal Trust Indicators */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 bg-neutral-50/80 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-emerald-100/70 text-emerald-600 flex items-center justify-center shrink-0">
                    <BadgeCheck size={18} />
                  </div>
                  <div>
                    <strong className="block text-neutral-900 text-xs font-semibold">100% Genuine</strong>
                    <span className="text-[11px] text-neutral-500">Official boxed packaging</span>
                  </div>
                </div>

                <div className="p-3.5 bg-orange-50/60 rounded-lg flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-orange-100 text-[#F16736] flex items-center justify-center shrink-0">
                    <Truck size={18} />
                  </div>
                  <div>
                    <strong className="block text-neutral-900 text-xs font-semibold">2–3 Weeks Delivery</strong>
                    <span className="text-[11px] text-neutral-500">Nationwide dispatch</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Clean, Intuitive Product Overview & Actions */}
            <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
              <div className="space-y-5">
                
                {/* Category & Ratings Bar */}
                <div className="flex items-center justify-between text-xs">
                  <span className="px-3 py-1 bg-orange-50 text-[#F16736] text-[11px] font-bold uppercase tracking-wider rounded-md">
                    {product.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1.5 text-neutral-700 text-xs font-medium">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star size={13} className="fill-amber-400 text-amber-400" />
                      <span>{product.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-neutral-400">•</span>
                    <span className="text-neutral-500">{product.reviewCount} customer reviews</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 leading-tight tracking-tight">
                    {product.title}
                  </h1>
                  <p className="text-sm text-neutral-600 font-normal leading-relaxed">
                    {product.subtitle}
                  </p>
                </div>

                {/* Clean Price & Stock Row */}
                <div className="flex items-center justify-between py-1">
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-extrabold text-neutral-900 tracking-tight">
                      ₦{product.price.toLocaleString()}
                    </span>
                    <span className="text-xs font-medium text-neutral-500">
                      ({product.priceUsd} USD)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>In Stock</span>
                  </div>
                </div>

                {/* Game Spec Tags */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="px-3 py-1.5 bg-neutral-100/80 text-neutral-700 font-medium rounded-md flex items-center gap-1.5">
                    <Clock size={13} className="text-[#F16736]" />
                    <span>{product.duration}</span>
                  </div>
                  <div className="px-3 py-1.5 bg-neutral-100/80 text-neutral-700 font-medium rounded-md flex items-center gap-1.5">
                    <Users size={13} className="text-[#F16736]" />
                    <span>{product.players}</span>
                  </div>
                  <div className="px-3 py-1.5 bg-neutral-100/80 text-neutral-700 font-medium rounded-md">
                    <span>{product.ageLabel}</span>
                  </div>
                </div>

                {/* Delivery Notice */}
                <div className="p-3.5 bg-orange-50/50 rounded-lg flex items-center justify-between text-xs text-neutral-700">
                  <div className="flex items-center gap-2.5">
                    <Truck size={16} className="text-[#F16736]" />
                    <span>Guaranteed delivery in <strong>2–3 weeks</strong> across Nigeria</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#F16736] bg-white px-2 py-0.5 rounded shadow-2xs">
                    Tracked
                  </span>
                </div>

              </div>

              {/* Purchase Controls */}
              <div className="pt-4 space-y-3">
                <div className="flex items-center gap-3">
                  
                  {/* Quantity Selector */}
                  <div className="flex items-center bg-neutral-100 rounded-lg p-1 shrink-0">
                    <button
                      onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-md flex items-center justify-center text-neutral-600 hover:bg-white hover:shadow-2xs font-bold transition-all cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={13} />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-neutral-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(prev => prev + 1)}
                      className="w-8 h-8 rounded-md flex items-center justify-center text-neutral-600 hover:bg-white hover:shadow-2xs font-bold transition-all cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus size={13} />
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="flex-1 py-3.5 px-5 bg-[#F16736] hover:bg-[#e05423] text-white text-xs font-bold rounded-lg shadow-xs transition-all hover:shadow-md cursor-pointer flex items-center justify-center gap-2 active:scale-98"
                  >
                    <ShoppingBag size={15} />
                    <span>Add to Cart</span>
                  </button>

                  {/* Direct Buy Button */}
                  <button
                    onClick={handleDirectBuy}
                    className="py-3.5 px-6 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-lg transition-all cursor-pointer active:scale-98"
                  >
                    Buy Now
                  </button>

                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Detailed Description, Highlights & Specifications */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="bg-white rounded-xl p-6 sm:p-10 lg:p-12 shadow-sm space-y-10">
          
          {/* Detailed Paragraphs */}
          <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
              Product Overview
            </h2>
            <div className="space-y-3.5 text-sm text-neutral-600 leading-relaxed max-w-4xl">
              {product.fullDescription.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          <div className="space-y-4 pt-6 border-t border-neutral-100">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
              Key Highlights & Inclusions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-neutral-700">
              {product.features.map((feat, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-neutral-50/70">
                  <div className="w-5 h-5 rounded-md bg-orange-100 text-[#F16736] flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="leading-snug">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications Table */}
          <div className="space-y-4 pt-6 border-t border-neutral-100">
            <h2 className="text-lg sm:text-xl font-bold text-neutral-900 tracking-tight">
              Technical Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              {Object.entries(product.specs).map(([k, v], i) => (
                <div key={i} className="p-4 bg-neutral-50/80 rounded-lg space-y-1">
                  <span className="text-[11px] font-semibold text-neutral-400 block uppercase tracking-wide">{k}</span>
                  <span className="font-semibold text-neutral-900 text-xs sm:text-sm">{v}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Related Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-neutral-900 tracking-tight">
            More Board Games
          </h2>
          <Link
            href="/tabletop-games"
            className="text-xs font-semibold text-[#F16736] hover:underline flex items-center gap-1"
          >
            <span>View All Store Sets</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedProducts.map(rel => (
            <Link
              key={rel.id}
              href={`/tabletop-games/${rel.id}`}
              className="bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group p-5 space-y-4"
            >
              <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-neutral-50">
                <Image
                  src={rel.imageSrc}
                  alt={rel.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F16736]">
                  {rel.categoryLabel}
                </span>
                <h3 className="text-sm font-semibold text-neutral-900 line-clamp-1">
                  {rel.title}
                </h3>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="font-bold text-neutral-900">₦{rel.price.toLocaleString()}</span>
                  <span className="text-[11px] text-neutral-400">{rel.deliveryTimeline}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Shopping Cart Drawer */}
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
              <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#F16736] flex items-center justify-center font-bold">
                    <ShoppingBag size={17} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-neutral-900">Your Shopping Cart</h3>
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

              <div className="mx-6 mt-4 p-3.5 bg-orange-50/70 rounded-2xl flex items-center gap-2.5 text-xs text-neutral-800">
                <Truck size={16} className="text-[#F16736] shrink-0" />
                <div>
                  <strong className="block font-bold text-[#F16736]">Estimated Delivery: 2–3 Weeks</strong>
                  <span className="text-[11px] text-neutral-600 font-medium">Direct factory dispatch & tracked shipping</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-16 space-y-3">
                    <p className="text-sm font-bold text-neutral-600">Your cart is currently empty</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div
                      key={item.product.id}
                      className="p-3.5 bg-neutral-50 rounded-2xl flex gap-3.5 items-center"
                    >
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                        <Image
                          src={item.product.imageSrc}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-neutral-900 truncate">
                          {item.product.title}
                        </h4>
                        <span className="text-xs font-bold text-[#F16736] block mt-0.5">
                          ₦{item.product.price.toLocaleString()}
                        </span>

                        <div className="flex items-center gap-3 pt-2">
                          <div className="flex items-center bg-white rounded-lg p-0.5 shadow-2xs">
                            <button
                              onClick={() => updateQuantity(item.product.id, -1)}
                              className="px-2 py-1 text-neutral-600 hover:text-black font-bold text-xs"
                            >
                              <Minus size={11} />
                            </button>
                            <span className="px-2 text-xs font-bold text-neutral-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, 1)}
                              className="px-2 py-1 text-neutral-600 hover:text-black font-bold text-xs"
                            >
                              <Plus size={11} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-neutral-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="p-6 border-t border-[#e8e5e0] space-y-4 bg-white">
                  <div className="flex justify-between text-sm font-black text-neutral-900">
                    <span>Subtotal</span>
                    <span className="text-[#F16736]">₦{cartSubtotal.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                      setOrderPlacedSuccess(false);
                    }}
                    className="w-full py-3.5 bg-gradient-to-r from-[#F16736] to-[#ea580c] hover:from-[#e05423] text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative p-6 sm:p-8 space-y-6"
            >
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-500 hover:text-neutral-900 flex items-center justify-center transition-all cursor-pointer"
              >
                <X size={16} />
              </button>

              {orderPlacedSuccess ? (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-2xl font-bold text-neutral-900">Order Confirmed!</h4>
                  <div className="p-4 bg-orange-50/70 rounded-2xl text-xs text-neutral-800 space-y-1">
                    <p className="font-bold text-[#F16736]">
                      Delivery Timeline: 2–3 Weeks
                    </p>
                    <p className="text-neutral-600">
                      Thank you, <strong>{checkoutName}</strong>. Your order for <strong>{cartTotalCount} items (₦{cartSubtotal.toLocaleString()})</strong> has been logged. Tracking details dispatched to <strong>{checkoutEmail}</strong> and WhatsApp <strong>{checkoutPhone}</strong>.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCart([]);
                      setIsCheckoutOpen(false);
                    }}
                    className="px-8 py-3 bg-[#F16736] text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-50 text-[#F16736] text-[10px] font-bold uppercase tracking-wider">
                      <Truck size={12} />
                      <span>DELIVERY TIMELINE: 2–3 WEEKS</span>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900">
                      Complete Your Order
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Order Total: <strong>₦{cartSubtotal.toLocaleString()}</strong> ({cartTotalCount} Items)
                    </p>
                  </div>

                  <div className="space-y-3 pt-1">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Full Name</label>
                      <input
                        type="text"
                        required
                        value={checkoutName}
                        onChange={(e) => setCheckoutName(e.target.value)}
                        placeholder="e.g. Samuel Adeyemi"
                        className="w-full p-3 bg-neutral-100 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#F16736]/30"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={checkoutEmail}
                          onChange={(e) => setCheckoutEmail(e.target.value)}
                          placeholder="e.g. sam@gmail.com"
                          className="w-full p-3 bg-neutral-100 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#F16736]/30"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">WhatsApp / Phone Number</label>
                        <input
                          type="text"
                          required
                          value={checkoutPhone}
                          onChange={(e) => setCheckoutPhone(e.target.value)}
                          placeholder="e.g. +234 801 234 5678"
                          className="w-full p-3 bg-neutral-100 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#F16736]/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">Delivery Street Address</label>
                      <input
                        type="text"
                        required
                        value={checkoutAddress}
                        onChange={(e) => setCheckoutAddress(e.target.value)}
                        placeholder="e.g. 14 Victoria Island Road, Flat 4B"
                        className="w-full p-3 bg-neutral-100 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#F16736]/30"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-neutral-500 mb-1">City / State</label>
                      <input
                        type="text"
                        value={checkoutCity}
                        onChange={(e) => setCheckoutCity(e.target.value)}
                        placeholder="e.g. Ikeja, Lagos State"
                        className="w-full p-3 bg-neutral-100 rounded-xl text-xs font-medium text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#F16736]/30"
                      />
                    </div>
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3.5 bg-gradient-to-r from-[#F16736] to-[#ea580c] hover:from-[#e05423] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
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
