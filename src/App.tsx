import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  Truck,
  ShieldCheck,
  Heart,
  ChevronRight,
  Menu,
  X,
  User,
  Package,
  Calendar,
  Settings,
  LogOut,
  ArrowRight,
  Star,
  CheckCircle2,
  RefreshCw,
  LayoutDashboard,
  ClipboardList,
  CreditCard,
  Plus,
  Search,
  Filter,
  ShoppingCart,
  Heart as HeartIcon,
  MessageSquare,
  Bell,
  ChevronDown,
  Layout,
  Users,
  BarChart3,
  Shield,
  History,
  CreditCard as Wallet,
  PanelLeftClose,
  MoreVertical,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Database,
  Mail,
  Check,
  Pause,
  Trash2,
  Camera,
  Download,
  UserPlus,
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Product, User as UserType, Subscription } from './type';

// Components
const Navbar = ({ user, onLogin, onLogout, setView, currentView, cartCount, onOpenCart }: {
  user: UserType | null,
  onLogin: () => void,
  onLogout: () => void,
  setView: (view: string) => void,
  currentView: string,
  cartCount: number,
  onOpenCart: () => void
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Hide navbar in authenticated dashboard views
  if (currentView === 'dashboard' || currentView === 'seller-dashboard' || currentView === 'admin-dashboard') return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setView('home')}>
            <span className="text-2xl font-bold tracking-tighter text-emerald-600">Everyday Needs</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setView('products')} className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Products</button>
            <button onClick={() => setView('about')} className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">About</button>
            <button onClick={() => setView('partners')} className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Partners</button>
            <button onClick={() => setView('contact')} className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Contact Us</button>

            <div className="h-6 w-px bg-zinc-200 mx-2" />

            <button
              onClick={onOpenCart}
              className="relative p-2 text-zinc-600 hover:text-emerald-600 transition-colors group"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <button onClick={() => setView('dashboard')} className="flex items-center space-x-2 text-sm font-medium text-zinc-900 bg-zinc-100 px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors">
                  <User size={16} />
                  <span>Dashboard</span>
                </button>
                <button onClick={onLogout} className="text-zinc-400 hover:text-red-500 transition-colors">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setView('auth')}
                className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md"
              >
                Login / Register
              </button>
            )}
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={onOpenCart}
              className="relative p-2 text-zinc-600"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-black/5 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <button onClick={() => { setView('products'); setIsOpen(false); }} className="block w-full text-left px-3 py-4 text-base font-medium text-zinc-600">Products</button>
              <button onClick={() => { setView('about'); setIsOpen(false); }} className="block w-full text-left px-3 py-4 text-base font-medium text-zinc-600">About</button>
              <button onClick={() => { setView('partners'); setIsOpen(false); }} className="block w-full text-left px-3 py-4 text-base font-medium text-zinc-600">Partners</button>
              <button onClick={() => { setView('contact'); setIsOpen(false); }} className="block w-full text-left px-3 py-4 text-base font-medium text-zinc-600">Contact Us</button>
              {!user && (
                <button onClick={() => { setView('auth'); setIsOpen(false); }} className="mt-4 block w-full text-center bg-emerald-600 text-white px-3 py-4 rounded-xl font-medium">Login / Register</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const CartDrawer = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  total,
  onCheckout
}: {
  isOpen: boolean,
  onClose: () => void,
  items: CartItem[],
  onUpdateQuantity: (id: number, delta: number) => void,
  onRemove: (id: number) => void,
  total: number,
  onCheckout: () => void
}) => (
  <AnimatePresence>
    {isOpen && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
        />
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
        >
          <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                <ShoppingCart size={20} />
              </div>
              <h3 className="text-xl font-bold text-zinc-900">Your Cart</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-400 transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-20 h-20 bg-zinc-50 rounded-full flex items-center justify-center text-zinc-300">
                  <ShoppingBag size={40} />
                </div>
                <div>
                  <p className="text-lg font-bold text-zinc-900">Your cart is empty</p>
                  <p className="text-zinc-500">Looks like you haven't added anything yet.</p>
                </div>
                <button
                  onClick={onClose}
                  className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 group">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden bg-zinc-100 shrink-0">
                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-zinc-900 truncate pr-4">{item.name}</h4>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-zinc-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <p className="text-sm text-zinc-500 mb-3">₦{item.price.toLocaleString()}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center bg-zinc-100 rounded-lg px-2 py-1">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:text-emerald-600 transition-colors"
                        >
                          <X size={14} className="rotate-45" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-zinc-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:text-emerald-600 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-bold text-zinc-900">₦{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-100 bg-zinc-50/50 space-y-4">
              <div className="flex justify-between items-center text-zinc-500">
                <span className="text-sm font-medium">Subtotal</span>
                <span className="text-lg font-bold text-zinc-900">₦{total.toLocaleString()}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 group"
              >
                Checkout Now
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-center text-xs text-zinc-400">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          )}
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const Hero = ({ onStart, setView }: { onStart: () => void, setView: (v: string) => void }) => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-sm font-bold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Just In Time — Serving Lagos & Port Harcourt</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-zinc-900 leading-[1.1] mb-8 tracking-tight">
            Everything your <span className="text-emerald-600">Home Needs</span>, Delivered.
          </h1>
          <p className="text-xl text-zinc-500 mb-10 leading-relaxed max-w-xl">
            From farm-fresh produce to premium pantry essentials, we deliver curated boxes of everything you need, exactly when you need it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setView('products')}
              className="bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-2 group"
            >
              Shop Collection
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setView('about')}
              className="bg-white text-zinc-900 border-2 border-zinc-100 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-zinc-50 transition-all flex items-center justify-center gap-2"
            >
              Our Story
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
            <img
              src="/images/hero_main.jpeg"
              alt="Everyday Needs Box"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10" />
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-zinc-100 rounded-full blur-3xl opacity-50 -z-10" />

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 top-20 bg-white p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 border border-zinc-100"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
              <Star size={24} fill="currentColor" />
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Top Rated</p>
              <p className="text-sm font-bold text-zinc-900">4.9/5 Happy Homes</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-zinc-100 pt-12"
      >
        {[
          { label: 'Reliable', icon: Truck },
          { label: 'Safe', icon: ShieldCheck },
          { label: 'Thoughtfully Sourced', icon: Heart },
          { label: 'Trusted', icon: CheckCircle2 },
        ].map((item, i) => (
          <div key={i} className="flex flex-col items-center space-y-2">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
              <item.icon size={24} />
            </div>
            <span className="text-sm font-medium text-zinc-500">{item.label}</span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);


const ProductCard: React.FC<{
  product: Product,
  onSelect: (product: Product) => any,
  onLike: (e: React.MouseEvent, product: Product) => void,
  isLiked: boolean
}> = ({ product, onSelect, onLike, isLiked }) => (
  <motion.div
    whileHover={{ y: -8 }}
    onClick={() => onSelect(product)}
    className="bg-white rounded-[2.5rem] border border-black/5 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full cursor-pointer group"
  >
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={product.image_url}
        alt={product.name}
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-4 left-4">
        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-emerald-600 rounded-full shadow-sm">
          {product.category}
        </span>
      </div>
      <button
        onClick={(e) => onLike(e, product)}
        className={`absolute top-4 right-4 p-2.5 rounded-2xl backdrop-blur-md transition-all ${isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-zinc-400 hover:text-red-500'
          }`}
      >
        <HeartIcon size={18} fill={isLiked ? 'currentColor' : 'none'} />
      </button>
    </div>
    <div className="p-8 flex flex-col flex-grow">
      <h3 className="text-xl font-bold text-zinc-900 mb-2">{product.name}</h3>
      <p className="text-sm text-zinc-500 mb-6 line-clamp-2 flex-grow leading-relaxed">{product.description}</p>
      <div className="flex items-center justify-between mt-auto">
        <div>
          <span className="text-xs text-zinc-400 block uppercase tracking-widest font-bold mb-1">Price</span>
          <span className="text-2xl font-extrabold text-zinc-900">₦{product.price.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(product); }}
            className="p-3 bg-zinc-100 text-zinc-900 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  </motion.div>
);

const ProductDetail = ({
  product,
  onSubscribe,
  onAddToCart,
  onBuyNow,
  onBack,
  suggestions,
  onSelectProduct,
  isLiked,
  onLike
}: {
  product: any,
  onSubscribe: (plan: string) => void,
  onAddToCart: (p: any, q?: number) => void,
  onBuyNow: (p: any, amount?: number) => void,
  onBack: () => void,
  suggestions: Product[],
  onSelectProduct: (p: Product) => void,
  isLiked: boolean,
  onLike: (product: any) => void
}) => {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [activeTab, setActiveTab] = useState('details');
  const [quantity, setQuantity] = useState(1);

  const plans = [
    { id: 'monthly', name: 'Monthly', discount: 0, period: 'month' },
    { id: 'quarterly', name: 'Quarterly', discount: 5, period: '3 months' },
    { id: 'annual', name: 'Annual', discount: 15, period: 'year' },
  ];

  const calculatePrice = (planId: string) => {
    const plan = plans.find(p => p.id === planId);
    if (!plan) return product.price;
    return product.price * (1 - plan.discount / 100);
  };

  const reviews = [
    { user: 'Bisi A.', rating: 5, comment: 'Absolutely love the freshness of the produce. Highly recommended!', date: '2 days ago' },
    { user: 'Emeka O.', rating: 4, comment: 'Great service, but delivery was slightly delayed this time.', date: '1 week ago' },
    { user: 'Fatima K.', rating: 5, comment: 'The non-toxic home supplies are a game changer for my family.', date: '3 weeks ago' },
  ];

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button onClick={onBack} className="flex items-center space-x-2 text-zinc-500 hover:text-zinc-900 mb-8 transition-colors group">
        <ArrowRight size={20} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-bold">Back to Products</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        <div className="space-y-8">
          <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl relative group">
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <button
              onClick={() => onLike(product)}
              className={`absolute top-6 right-6 p-4 rounded-3xl backdrop-blur-md transition-all shadow-xl ${isLiked ? 'bg-red-500 text-white' : 'bg-white/80 text-zinc-400 hover:text-red-500'
                }`}
            >
              <HeartIcon size={24} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
          </div>

          <div className="flex gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex-1 aspect-square rounded-2xl overflow-hidden border border-black/5 cursor-pointer hover:border-emerald-600 transition-all">
                <img src={`https://picsum.photos/seed/prod-thumb-${i}/200/200`} alt="Thumb" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star size={14} fill="currentColor" />
                <span className="text-xs font-bold text-zinc-900">4.8 (124 Reviews)</span>
              </div>
            </div>
            <h3 className="text-4xl md:text-5xl font-extrabold text-zinc-900 mb-4 leading-tight">{product.name}</h3>
            <p className="text-lg text-zinc-500 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center gap-4 p-1 bg-zinc-100 rounded-2xl w-fit">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'details' ? 'bg-white shadow-sm text-emerald-600' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'subscription' ? 'bg-white shadow-sm text-emerald-600' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              Subscription Plans
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'reviews' ? 'bg-white shadow-sm text-emerald-600' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              Reviews
            </button>
          </div>

          {activeTab === 'details' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="bg-white rounded-3xl border border-black/5 p-8">
                <h3 className="text-xl font-bold mb-6">What's inside this product?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(product.products || [
                    { name: 'Organic Tomatoes', quantity: 2 },
                    { name: 'Fresh Spinach', quantity: 1 },
                    { name: 'Farm Eggs', quantity: 12 },
                    { name: 'Local Honey', quantity: 1 }
                  ]).map((item: any, i: number) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl border border-black/5">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                        <Package size={20} className="text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-zinc-900">{item.name}</p>
                        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center bg-zinc-100 rounded-2xl px-6 py-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:text-emerald-600 transition-colors"
                  >
                    <Plus size={20} className="rotate-45" />
                  </button>
                  <span className="w-12 text-center text-xl font-bold text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:text-emerald-600 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <button
                  onClick={() => {
                    onAddToCart(product, quantity);
                    setQuantity(1);
                  }}
                  className="flex-[2] bg-zinc-900 text-white py-5 rounded-2xl font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button
                  onClick={() => onBuyNow(product, calculatePrice(selectedPlan) * quantity)}
                  className="flex-[2] bg-emerald-600 text-white py-5 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                >
                  Buy Now — ₦{(calculatePrice(selectedPlan) * quantity).toLocaleString()}
                </button>
              </div>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="grid grid-cols-1 gap-4">
                {plans.map((plan) => (
                  <button
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${selectedPlan === plan.id
                      ? 'border-emerald-600 bg-emerald-50/50'
                      : 'border-black/5 bg-white hover:border-zinc-200'
                      }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id ? 'border-emerald-600 bg-emerald-600' : 'border-zinc-300'
                        }`}>
                        {selectedPlan === plan.id && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-zinc-900">{plan.name}</p>
                        <p className="text-xs text-zinc-500">Delivered every {plan.period}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-zinc-900 text-lg">₦{calculatePrice(plan.id).toLocaleString()}</p>
                      {plan.discount > 0 && (
                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Save {plan.discount}%</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => onSubscribe(selectedPlan)}
                className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold hover:bg-emerald-600 transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <Calendar size={20} />
                Start Subscription Plan
              </button>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-zinc-900">Customer Reviews</h3>
                <button className="text-sm font-bold text-emerald-600 hover:underline">Write a Review</button>
              </div>
              <div className="space-y-4">
                {reviews.map((rev, i) => (
                  <div key={i} className="p-6 bg-white rounded-3xl border border-black/5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center text-xs font-bold">{rev.user[0]}</div>
                        <p className="font-bold text-sm text-zinc-900">{rev.user}</p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, j) => <Star key={j} size={12} fill="currentColor" />)}
                      </div>
                    </div>
                    <p className="text-sm text-zinc-600 leading-relaxed mb-2">{rev.comment}</p>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{rev.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggestions */}
      <div className="border-t border-black/5 pt-24">
        <h3 className="text-3xl font-extrabold text-zinc-900 mb-12">You might also like</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {suggestions.slice(0, 4).map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onSelect={onSelectProduct}
              onLike={(e) => { e.stopPropagation(); onLike(p); }}
              isLiked={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Auth = ({ onLogin, onBack }: { onLogin: (email: string) => void, onBack: () => void }) => {
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-zinc-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl border border-black/5 p-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-6">
            <ShoppingBag size={32} />
          </div>
          <h2 className="text-3xl font-bold text-zinc-900">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-zinc-500 mt-2">Join Nigeria's most trusted essentials platform</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
              placeholder="name@example.com"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={() => onLogin(email || 'demo@example.com')}
            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold text-zinc-400 bg-white px-4">Or continue with</div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 py-3 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors">
              <span className="text-sm font-bold">Google</span>
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-zinc-200 rounded-xl hover:bg-zinc-50 transition-colors">
              <span className="text-sm font-bold">Apple</span>
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm font-bold text-emerald-600 hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Pricing = ({ onSelect, onBack }: { onSelect: (plan: string) => void, onBack: () => void }) => {
  const plans = [
    {
      name: 'Monthly',
      price: '₦0',
      desc: 'Pay as you go. No long-term commitment.',
      features: ['Standard delivery', 'Basic support', 'Cancel anytime'],
      id: 'monthly',
      color: 'bg-zinc-50'
    },
    {
      name: 'Quarterly',
      price: '5% OFF',
      desc: 'Save more with a 3-month commitment.',
      features: ['Priority delivery', 'Standard support', 'Flexible pausing', '5% discount'],
      id: 'quarterly',
      popular: true,
      color: 'bg-emerald-50'
    },
    {
      name: 'Annual',
      price: '15% OFF',
      desc: 'The best value for serious households.',
      features: ['Free express delivery', '24/7 VIP support', 'Annual gift box', '15% discount'],
      id: 'annual',
      color: 'bg-zinc-900 text-white'
    }
  ];

  return (
    <div className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-zinc-900">Simple, Transparent Pricing</h3>
        <p className="text-zinc-500 max-w-2xl mx-auto">Choose the plan that fits your household needs. Save more with longer commitments.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className={`p-10 rounded-[3rem] border border-black/5 flex flex-col h-full relative ${plan.color}`}
          >
            {plan.popular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Most Popular
              </span>
            )}
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">{plan.price}</span>
              {plan.id === 'monthly' && <span className="text-zinc-500 text-sm ml-2">base price</span>}
            </div>
            <p className={`text-sm mb-8 ${plan.id === 'annual' ? 'text-zinc-400' : 'text-zinc-500'}`}>{plan.desc}</p>

            <ul className="space-y-4 mb-10 flex-grow">
              {plan.features.map((f, j) => (
                <li key={j} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onSelect(plan.id)}
              className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.id === 'annual'
                ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                : 'bg-zinc-900 text-white hover:bg-emerald-600'
                }`}
            >
              Select {plan.name}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const KYCModal = ({ isOpen, onClose, onSubmit }: { isOpen: boolean, onClose: () => void, onSubmit: (data: any) => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: '',
    cacNumber: '',
    address: '',
    category: 'Farmer',
    idType: 'NIN'
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[3rem] shadow-2xl border border-black/5 p-12 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 p-2 text-zinc-400 hover:text-zinc-900 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="mb-10">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-3xl font-bold text-zinc-900">Seller Verification</h3>
            <span className="text-sm font-bold text-emerald-600">Step {step} of 2</span>
          </div>
          <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
            <div className={`h-full bg-emerald-600 transition-all duration-500 ${step === 1 ? 'w-1/2' : 'w-full'}`} />
          </div>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">Business / Farm Name</label>
              <input
                type="text"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Green Pastures Farm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">Business Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Farmer</option>
                <option>Manufacturer</option>
                <option>Distributor</option>
                <option>Wholesaler</option>
              </select>
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={onClose}
                className="flex-1 py-4 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep(2)}
                className="flex-[2] bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all"
              >
                Continue
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">CAC Registration Number (Optional)</label>
              <input
                type="text"
                value={formData.cacNumber}
                onChange={(e) => setFormData({ ...formData, cacNumber: e.target.value })}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="RC1234567"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">Business Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 h-32"
                placeholder="123 Farm Road, Lagos"
              />
            </div>
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 transition-all"
              >
                Back
              </button>
              <button
                onClick={() => onSubmit(formData)}
                className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200"
              >
                Submit Verification
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

const DashboardFilter = ({ onFilterChange }: { onFilterChange: (filter: string, dates?: { start: string, end: string }) => void }) => {
  const [activeFilter, setActiveFilter] = useState('monthly');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [customDates, setCustomDates] = useState({ start: '', end: '' });

  const filters = [
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <div className="flex items-center gap-4 relative">
      <div className="flex items-center gap-2 p-1 bg-zinc-100 rounded-xl w-fit">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              setActiveFilter(f.id);
              if (f.id === 'custom') {
                setShowDatePicker(true);
              } else {
                setShowDatePicker(false);
                onFilterChange(f.id);
              }
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${activeFilter === f.id
              ? 'bg-white text-emerald-600 shadow-sm'
              : 'text-zinc-500 hover:text-zinc-900'
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {showDatePicker && (
        <div className="absolute top-full right-0 mt-2 p-4 bg-white rounded-2xl shadow-xl border border-zinc-100 z-[60] w-64">
          <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">Custom Range</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Start Date</label>
              <input
                type="date"
                value={customDates.start}
                onChange={(e) => setCustomDates({ ...customDates, start: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">End Date</label>
              <input
                type="date"
                value={customDates.end}
                onChange={(e) => setCustomDates({ ...customDates, end: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <button
              onClick={() => {
                onFilterChange('custom', customDates);
                setShowDatePicker(false);
              }}
              className="w-full py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all"
            >
              Apply Range
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ProductFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = null
}: {
  isOpen: boolean,
  onClose: () => void,
  onSubmit: (data: any) => void,
  initialData?: any
}) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    price: '',
    category: 'Fresh Farm',
    description: '',
    stock: '',
    images: []
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-black/5 p-10 relative overflow-y-auto max-h-[90vh]"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-zinc-900 mb-8">{initialData ? 'Edit Product' : 'Add New Product'}</h2>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="Organic Tomato Box"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">Price (₦)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="15000"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>Fresh Farm</option>
                <option>Pantry Essentials</option>
                <option>Home Care</option>
                <option>Baby & Kids</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">Stock Level</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 h-32"
              placeholder="Describe your product..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2">Product Images</label>
            <div className="grid grid-cols-4 gap-4">
              <button className="aspect-square bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-zinc-400 hover:border-emerald-500 hover:text-emerald-600 transition-all">
                <Plus size={24} />
                <span className="text-xs font-bold mt-1 uppercase tracking-widest">Add Image</span>
              </button>
              {initialData?.image_url && (
                <div className="aspect-square rounded-2xl overflow-hidden border border-zinc-100">
                  <img src={initialData.image_url} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 py-4 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 transition-all">Cancel</button>
            <button onClick={() => onSubmit(formData)} className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all">
              {initialData ? 'Save Changes' : 'Add Product'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const OrderDetailsModal = ({
  isOpen,
  onClose,
  order,
  onUpdateStatus
}: {
  isOpen: boolean,
  onClose: () => void,
  order: any,
  onUpdateStatus: (id: string, status: string, details?: any) => void
}) => {
  const [status, setStatus] = useState(order?.status || 'Pending');
  const [transitDetails, setTransitDetails] = useState({
    trackingCode: '',
    phone: '',
    company: ''
  });

  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl border border-black/5 p-10 relative overflow-y-auto max-h-[90vh]"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
          <X size={24} />
        </button>

        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
            <ClipboardList size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-zinc-900">Order {order.id}</h2>
            <p className="text-sm text-zinc-500">Placed on Feb 24, 2024</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Customer Details</h3>
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
              <p className="text-sm font-bold text-zinc-900">{order.customer}</p>
              <p className="text-xs text-zinc-500">customer@example.com</p>
              <p className="text-xs text-zinc-500 mt-2">123 Victoria Island, Lagos</p>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Order Summary</h3>
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-zinc-500">{order.product}</span>
                <span className="font-bold text-zinc-900">{order.amount}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-zinc-200">
                <span className="font-bold text-zinc-900">Total</span>
                <span className="font-bold text-emerald-600">{order.amount}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Manage Status</h3>
          <div className="flex flex-wrap gap-2">
            {['Pending', 'Accepted', 'On Transit', 'Delivered', 'Rejected'].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${status === s
                  ? (s === 'Rejected' ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white')
                  : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>

          {status === 'On Transit' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 animate-in fade-in slide-in-from-top-2">
              <div>
                <label className="block text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1.5">Tracking Code</label>
                <input
                  type="text"
                  value={transitDetails.trackingCode}
                  onChange={(e) => setTransitDetails({ ...transitDetails, trackingCode: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-emerald-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="TRK-123456"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1.5">Courier Phone</label>
                <input
                  type="text"
                  value={transitDetails.phone}
                  onChange={(e) => setTransitDetails({ ...transitDetails, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-emerald-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="+234..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-emerald-700 uppercase tracking-widest mb-1.5">Company Name</label>
                <input
                  type="text"
                  value={transitDetails.company}
                  onChange={(e) => setTransitDetails({ ...transitDetails, company: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-emerald-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="GIG Logistics"
                />
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 py-4 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 transition-all">Close</button>
            <button
              onClick={() => onUpdateStatus(order.id, status, status === 'On Transit' ? transitDetails : null)}
              className="flex-[2] bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all"
            >
              Update Order
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const SubscriptionManagementModal = ({ isOpen, onClose, subscription }: { isOpen: boolean, onClose: () => void, subscription: Subscription | null }) => {
  const [view, setView] = useState<'main' | 'change-plan' | 'pause' | 'cancel'>('main');
  const [selectedPlan, setSelectedPlan] = useState(subscription?.plan || 'Monthly');

  if (!isOpen || !subscription) return null;

  const renderContent = () => {
    switch (view) {
      case 'change-plan':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900">Change Plan</h2>
            <p className="text-sm text-zinc-500">Select a new billing cycle for your subscription.</p>
            <div className="space-y-3">
              {['Monthly', 'Quarterly', 'Annual'].map((plan) => (
                <button
                  key={plan}
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full p-4 rounded-2xl border transition-all flex items-center justify-between ${selectedPlan === plan
                    ? 'border-emerald-500 bg-emerald-50'
                    : 'border-zinc-200 hover:border-emerald-200'
                    }`}
                >
                  <span className="text-sm font-bold text-zinc-900">{plan} Plan</span>
                  {selectedPlan === plan && <div className="w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center"><Check size={10} className="text-white" /></div>}
                </button>
              ))}
            </div>
            <div className="flex gap-4 pt-4">
              <button onClick={() => setView('main')} className="flex-1 py-4 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50">Back</button>
              <button onClick={() => { alert('Plan updated! Notification sent to user.'); setView('main'); }} className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700">Update Plan</button>
            </div>
          </div>
        );
      case 'pause':
        return (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto">
              <Pause size={32} />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-zinc-900">Pause Subscription</h2>
              <p className="text-sm text-zinc-500 mt-2">Are you sure you want to pause this subscription? Deliveries will stop until you resume.</p>
            </div>
            <div className="flex gap-4 pt-4">
              <button onClick={() => setView('main')} className="flex-1 py-4 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50">Cancel</button>
              <button onClick={() => { alert('Subscription paused! Notification sent to user.'); setView('main'); }} className="flex-[2] bg-amber-600 text-white py-4 rounded-2xl font-bold hover:bg-amber-700">Confirm Pause</button>
            </div>
          </div>
        );
      case 'cancel':
        return (
          <div className="space-y-6">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle size={32} />
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-zinc-900 text-red-600">Cancel Subscription</h2>
              <p className="text-sm text-zinc-500 mt-2">This action cannot be undone. All future deliveries and benefits will be terminated immediately.</p>
            </div>
            <div className="flex gap-4 pt-4">
              <button onClick={() => setView('main')} className="flex-1 py-4 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 transition-all">Go Back</button>
              <button onClick={() => { alert('Subscription cancelled! Notification sent to user.'); setView('main'); onClose(); }} className="flex-[2] bg-red-600 text-white py-4 rounded-2xl font-bold hover:bg-red-700 transition-all">Confirm Cancellation</button>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-zinc-900">Manage Subscription</h2>
            <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
              <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Current Status</p>
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase tracking-wider">Active</span>
                <span className="text-sm font-bold text-zinc-900">{subscription.plan || 'Monthly'} Plan</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button onClick={() => setView('change-plan')} className="w-full flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-2xl hover:border-emerald-500 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Calendar size={18} />
                  </div>
                  <span className="text-sm font-bold text-zinc-700">Change Billing Plan</span>
                </div>
                <ChevronRight size={18} className="text-zinc-400" />
              </button>

              <button onClick={() => setView('pause')} className="w-full flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-2xl hover:border-amber-500 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-amber-50 text-amber-600 rounded-lg group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <Pause size={18} />
                  </div>
                  <span className="text-sm font-bold text-zinc-700">Pause Subscription</span>
                </div>
                <ChevronRight size={18} className="text-zinc-400" />
              </button>

              <button onClick={() => setView('cancel')} className="w-full flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-2xl hover:border-red-500 transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg group-hover:bg-red-600 group-hover:text-white transition-colors">
                    <Trash2 size={18} />
                  </div>
                  <span className="text-sm font-bold text-zinc-700">Cancel Subscription</span>
                </div>
                <ChevronRight size={18} className="text-zinc-400" />
              </button>
            </div>
            <button onClick={onClose} className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all mt-4">Done</button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border border-black/5 p-10 relative"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
          <X size={24} />
        </button>

        {renderContent()}
      </motion.div>
    </div>
  );
};

const DashboardLayout = ({
  user,
  children,
  activeTab,
  setActiveTab,
  onLogout,
  onSwitchRole,
  setView
}: {
  user: UserType,
  children: React.ReactNode,
  activeTab: string,
  setActiveTab: (tab: string) => void,
  onLogout: () => void,
  onSwitchRole: (role: 'buyer' | 'seller' | 'admin') => void,
  setView: (v: string) => void
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const adminSidebarGroups = [
    {
      title: 'Main',
      items: [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'orders', label: 'Orders', icon: ClipboardList },
        { id: 'subscriptions', label: 'Subscriptions', icon: Package },
        { id: 'products', label: 'Products', icon: ShoppingBag },
        { id: 'inventory', label: 'Inventory', icon: Database },
      ]
    },
    {
      title: 'Business',
      items: [
        { id: 'suppliers', label: 'Suppliers', icon: Truck },
        { id: 'users', label: 'Customers', icon: Users },
        { id: 'payments', label: 'Payments', icon: Wallet },
      ]
    },
    {
      title: 'Insights',
      items: [
        { id: 'reports', label: 'Reports', icon: History },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      ]
    },
    {
      title: 'System',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'admin-users', label: 'Admin Users', icon: Shield },
      ]
    }
  ];

  const sellerSidebarGroups = [
    {
      title: 'Main',
      items: [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'orders', label: 'Orders', icon: ClipboardList },
        { id: 'products', label: 'My Products', icon: ShoppingBag },
      ]
    },
    {
      title: 'Insights',
      items: [
        { id: 'earnings', label: 'Earnings', icon: Wallet },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
      ]
    },
    {
      title: 'System',
      items: [
        { id: 'settings', label: 'Store Settings', icon: Settings },
      ]
    }
  ];

  const buyerSidebarGroups = [
    {
      title: 'Main',
      items: [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'subscriptions', label: 'My Subscriptions', icon: Package },
        { id: 'orders', label: 'Order History', icon: History },
      ]
    },
    {
      title: 'System',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
      ]
    }
  ];

  const sidebarGroups = user.role === 'admin' ? adminSidebarGroups :
    user.role === 'seller' ? sellerSidebarGroups :
      buyerSidebarGroups;

  return (
    <div className="flex h-screen bg-[#F4F7FE] overflow-hidden font-sans">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-zinc-200 flex flex-col h-full transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-[240px]'
          }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-100 shrink-0">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">E</div>
              <span className="text-lg font-bold tracking-tight text-zinc-900">Everyday</span>
            </div>
          )}
          {isSidebarCollapsed && (
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold mx-auto">E</div>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`p-1.5 hover:bg-zinc-100 rounded-lg text-zinc-500 transition-colors ${isSidebarCollapsed ? 'hidden' : ''}`}
          >
            <PanelLeftClose size={18} />
          </button>
        </div>

        <nav className="flex-grow py-6 overflow-y-auto no-scrollbar">
          {sidebarGroups.map((group, gIdx) => (
            <div key={group.title} className={gIdx !== 0 ? 'mt-6' : ''}>
              {!isSidebarCollapsed && (
                <p className="px-6 text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
                  {group.title}
                </p>
              )}
              <div className="space-y-1 px-3">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group ${activeTab === item.id
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                      }`}
                  >
                    <item.icon size={18} className={activeTab === item.id ? 'text-emerald-600' : 'text-zinc-400 group-hover:text-zinc-900'} />
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-zinc-100 space-y-2">
          {user.role === 'seller' && !isSidebarCollapsed && (
            <button
              onClick={() => onSwitchRole('buyer')}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all group mb-2"
            >
              <Users size={18} />
              <span>Switch to Buyer</span>
            </button>
          )}
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all group`}
          >
            <LogOut size={18} className="text-red-400 group-hover:text-red-500" />
            {!isSidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col min-w-0 overflow-hidden">
        {/* Top Nav */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6 shrink-0 z-10">
          <div className="flex items-center gap-4">
            {isSidebarCollapsed && (
              <button
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500 transition-colors"
              >
                <PanelLeftClose size={20} className="rotate-180" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('notifications')}
                className="p-2 hover:bg-zinc-100 rounded-lg text-zinc-500 relative"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>

              <div className="relative">
                <div
                  className="flex items-center gap-3 pl-2 border-l border-zinc-200 ml-2 cursor-pointer group"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                >
                  <div className="text-right hidden lg:block">
                    <p className="text-xs font-bold text-zinc-900 group-hover:text-emerald-600 transition-colors">{user.name}</p>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{user.role}</p>
                  </div>
                  <div className="w-9 h-9 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 font-bold text-sm hover:bg-emerald-200 transition-colors">
                    {user.name[0]}
                  </div>
                </div>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-zinc-100 py-2 z-50">
                    <div className="px-4 py-3 border-b border-zinc-50 mb-2">
                      <p className="text-xs font-bold text-zinc-900">{user.name}</p>
                      <p className="text-xs text-zinc-500">{user.email}</p>
                    </div>

                    <div className="px-2 space-y-1">
                      <button
                        onClick={() => { onSwitchRole('buyer'); setIsUserMenuOpen(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${user.role === 'buyer' ? 'bg-emerald-50 text-emerald-600' : 'text-zinc-600 hover:bg-zinc-50'}`}
                      >
                        <Users size={14} />
                        Buyer Mode
                      </button>
                      <button
                        onClick={() => { onSwitchRole('seller'); setIsUserMenuOpen(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${user.role === 'seller' ? 'bg-emerald-50 text-emerald-600' : 'text-zinc-600 hover:bg-zinc-50'}`}
                      >
                        <ShoppingBag size={14} />
                        Seller Mode
                      </button>
                      <button
                        onClick={() => { onSwitchRole('admin'); setIsUserMenuOpen(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${user.role === 'admin' ? 'bg-emerald-50 text-emerald-600' : 'text-zinc-600 hover:bg-zinc-50'}`}
                      >
                        <Shield size={14} />
                        Admin Mode
                      </button>
                    </div>

                    <div className="mt-2 pt-2 border-t border-zinc-50 px-2">
                      <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={14} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-grow overflow-y-auto bg-[#F4F7FE]">
          <div className="max-w-[1200px] mx-auto px-6 py-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

const Dashboard = ({ user, setView, onSwitchRole, onLogout, activeTab, setActiveTab }: {
  user: UserType,
  setView: (v: string) => void,
  onSwitchRole: (role: 'buyer' | 'seller' | 'admin') => void,
  onLogout: () => void,
  activeTab: string,
  setActiveTab: (t: string) => void
}) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);

  useEffect(() => {
    fetch(`/api/subscriptions?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setSubscriptions(data);
        setLoading(false);
      })
      .catch(() => {
        console.log('Using mock subscriptions');
        setSubscriptions(Storage.getSubscriptions(user.id));
        setLoading(false);
      });
  }, [user.id]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { label: 'Active Subscriptions', value: subscriptions.length.toString(), color: 'text-emerald-600', icon: Package, bg: 'bg-emerald-50' },
                { label: 'Next Delivery', value: subscriptions.length > 0 ? 'Mar 25' : 'N/A', color: 'text-blue-600', icon: Truck, bg: 'bg-blue-50' },
                { label: 'Total Saved', value: '₦12,400', color: 'text-purple-600', icon: Wallet, bg: 'bg-purple-50' },
              ].map((stat, i) => (
                <div key={i} className="p-5 bg-white rounded-xl border border-zinc-200 shadow-sm flex items-center gap-4">
                  <div className={`p-3 ${stat.bg} ${stat.color} rounded-lg`}>
                    <stat.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                    <p className={`text-xl font-bold text-zinc-900`}>{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900">Recent Activity</h3>
                <button className="text-xs font-bold text-emerald-600 hover:underline">View All</button>
              </div>
              <div className="divide-y divide-zinc-100">
                {subscriptions.slice(0, 3).map((sub, i) => (
                  <div key={i} className="flex items-center justify-between p-4 hover:bg-zinc-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg overflow-hidden border border-zinc-200">
                        <img src={sub.image_url} alt={sub.box_name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900">{sub.box_name}</p>
                        <p className="text-xs text-zinc-500">Subscription renewed successfully</p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-zinc-400">2 days ago</span>
                  </div>
                ))}
                {subscriptions.length === 0 && (
                  <div className="p-10 text-center">
                    <p className="text-sm text-zinc-500 italic">No recent activity found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'subscriptions':
        return (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">My Subscriptions</h3>
              <button onClick={() => setView('products')} className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all">Add New</button>
            </div>
            <div className="p-5">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2].map(i => <div key={i} className="h-20 bg-zinc-50 animate-pulse rounded-xl border border-zinc-100" />)}
                </div>
              ) : subscriptions.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {subscriptions.map((sub, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-lg overflow-hidden border border-zinc-200">
                          <img src={sub.image_url} alt={sub.box_name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-zinc-900">{sub.box_name}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-zinc-500 flex items-center gap-1">
                              <Calendar size={12} />
                              Next: {new Date(sub.next_delivery_date).toLocaleDateString()}
                            </span>
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                              {sub.plan}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedSub(sub);
                            setIsSubModalOpen(true);
                          }}
                          className="px-3 py-1.5 bg-white border border-zinc-200 rounded-lg text-xs font-bold hover:bg-zinc-100 transition-all"
                        >
                          Manage
                        </button>
                        <span className="px-2 py-1 bg-emerald-100 text-xs font-bold uppercase tracking-wider text-emerald-700 rounded-lg">
                          {sub.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-zinc-50 rounded-full flex items-center justify-center mx-auto mb-4 text-zinc-300">
                    <Package size={32} />
                  </div>
                  <h3 className="text-sm font-bold text-zinc-900 mb-1">No Subscriptions Yet</h3>
                  <p className="text-xs text-zinc-500 mb-6 max-w-[240px] mx-auto">Start your journey by choosing one of our curated essential products.</p>
                  <button
                    onClick={() => setView('products')}
                    className="bg-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all"
                  >
                    Browse Products
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Order History</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-1.5 bg-zinc-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500/20 w-48" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Order ID</th>
                    <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Items</th>
                    <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                    <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {[
                    { id: '#EN-9921', date: 'Feb 12, 2024', items: 'Fresh Farm Box', amount: '₦15,000', status: 'Delivered' },
                    { id: '#EN-9918', date: 'Jan 12, 2024', items: 'Pantry Essentials', amount: '₦22,500', status: 'Delivered' },
                  ].map((order, i) => (
                    <tr key={i} className="h-12 hover:bg-zinc-50 transition-colors">
                      <td className="px-6 text-sm font-bold text-zinc-900">{order.id}</td>
                      <td className="px-6 text-sm text-zinc-600">{order.date}</td>
                      <td className="px-6 text-sm text-zinc-600">{order.items}</td>
                      <td className="px-6 text-sm font-bold text-zinc-900">{order.amount}</td>
                      <td className="px-6">
                        <span className="px-2 py-1 bg-emerald-100 text-xs font-bold uppercase tracking-wider text-emerald-700 rounded-lg">
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-2xl bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100">
              <h3 className="text-sm font-bold text-zinc-900">Account Settings</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-zinc-100">
                <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 relative group cursor-pointer overflow-hidden">
                  <User size={32} />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={20} className="text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">Profile Picture</h4>
                  <p className="text-xs text-zinc-500 mt-1">PNG, JPG up to 5MB</p>
                  <button className="mt-2 text-xs font-bold text-emerald-600 hover:underline">Upload New</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Full Name</label>
                  <input type="text" defaultValue={user.name} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Email Address</label>
                  <input type="email" defaultValue={user.email} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Delivery Address</label>
                <textarea className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 h-24" placeholder="Enter your delivery address..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Phone Number</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="+234..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">City</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="Lagos" />
                </div>
              </div>

              <button className="bg-zinc-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all">Save Changes</button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Notifications</h3>
              <button className="text-xs font-bold text-emerald-600">Mark all as read</button>
            </div>
            <div className="divide-y divide-zinc-100">
              {[
                { title: 'Subscription Renewed', time: '2 days ago', icon: Package, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { title: 'New Product Suggestion', time: '1 week ago', icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
              ].map((n, i) => (
                <div key={i} className="p-4 flex gap-4 hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className={`w-10 h-10 ${n.bg} ${n.color} rounded-xl flex items-center justify-center shrink-0`}>
                    <n.icon size={20} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-zinc-900">{n.title}</p>
                    <p className="text-xs text-zinc-500">You have a new notification regarding your account.</p>
                    <p className="text-xs font-bold text-zinc-400 mt-1 uppercase tracking-widest">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={onLogout}
      onSwitchRole={onSwitchRole}
      setView={setView}
    >
      <SubscriptionManagementModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        subscription={selectedSub}
      />
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 capitalize">
          {activeTab.replace('-', ' ')}
        </h2>
        {['overview', 'orders'].includes(activeTab) && (
          <DashboardFilter onFilterChange={(f) => console.log('Buyer filter changed', f)} />
        )}
      </div>
      {renderContent()}
    </DashboardLayout>
  );
};

const SellerDashboard = ({ user, onSwitchRole, onLogout, activeTab, setActiveTab, setView }: {
  user: UserType,
  onSwitchRole: (role: 'buyer' | 'seller' | 'admin') => void,
  onLogout: () => void,
  activeTab: string,
  setActiveTab: (t: string) => void,
  setView: (v: string) => void
}) => {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Sales', value: '₦450,000', trend: '+15%', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Active Orders', value: '12', trend: '+2', icon: ClipboardList, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Products', value: '8', trend: 'Stable', icon: ShoppingBag, color: 'text-purple-600', bg: 'bg-purple-50' },
                { label: 'Store Rating', value: '4.8/5', trend: 'Top 5%', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map((stat, i) => (
                <div key={i} className="p-5 bg-white rounded-xl border border-zinc-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 ${stat.bg} ${stat.color} rounded-lg`}>
                      <stat.icon size={20} />
                    </div>
                    <div className="text-xs font-bold text-emerald-600">{stat.trend}</div>
                  </div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                  <p className="text-xl font-bold text-zinc-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900">Recent Orders</h3>
                <button className="text-xs font-bold text-emerald-600 hover:underline">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100">
                      <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Order ID</th>
                      <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Customer</th>
                      <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Product</th>
                      <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                      <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      { id: '#ORD-7721', customer: 'Alice Johnson', product: 'Fresh Farm Box', amount: '₦15,000', status: 'Pending' },
                      { id: '#ORD-7722', customer: 'Bob Smith', product: 'Pantry Essentials', amount: '₦22,500', status: 'Shipped' },
                      { id: '#ORD-7723', customer: 'Catherine Lee', product: 'Baby Care Box', amount: '₦18,000', status: 'Delivered' },
                    ].map((order, i) => (
                      <tr key={i} className="h-12 hover:bg-zinc-50 transition-colors">
                        <td className="px-6 text-sm font-bold text-zinc-900">{order.id}</td>
                        <td className="px-6 text-sm text-zinc-600">{order.customer}</td>
                        <td className="px-6 text-sm text-zinc-600">{order.product}</td>
                        <td className="px-6 text-sm font-bold text-zinc-900">{order.amount}</td>
                        <td className="px-6">
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                              'bg-emerald-100 text-emerald-700'
                            }`}>
                            {order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-bold text-zinc-900">My Products</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                  <input type="text" placeholder="Search my products..." className="pl-9 pr-4 py-1.5 bg-zinc-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500/20 w-48" />
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-2"
              >
                <Plus size={14} />
                Add Product
              </button>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-3 border border-zinc-200 rounded-xl space-y-3 hover:shadow-md transition-all">
                  <div className="aspect-video bg-zinc-100 rounded-lg overflow-hidden border border-zinc-100">
                    <img src={`https://picsum.photos/seed/seller-prod-${i}/400/300`} alt="Product" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 truncate">Fresh Produce Box #{i}</h4>
                    <p className="text-xs text-zinc-500">8 orders this week</p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-sm font-bold text-emerald-600">₦15,000</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct({ id: i, name: `Fresh Produce Box #${i}`, price: 15000, category: 'Fresh Farm', image_url: `https://picsum.photos/seed/seller-prod-${i}/400/300` });
                          setIsProductModalOpen(true);
                        }}
                        className="text-xs font-bold text-zinc-400 hover:text-emerald-600 transition-colors"
                      >
                        Edit
                      </button>
                      <button className="text-xs font-bold text-zinc-400 hover:text-red-600 transition-colors">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-2xl bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100">
              <h3 className="text-sm font-bold text-zinc-900">Store Settings</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-6 pb-6 border-b border-zinc-100">
                <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 relative group cursor-pointer overflow-hidden">
                  <Camera size={32} />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs text-white font-bold uppercase">Change</span>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-900">Store Logo</h4>
                  <p className="text-xs text-zinc-500 mt-1">Recommended size: 512x512px</p>
                  <button className="mt-2 text-xs font-bold text-emerald-600 hover:underline">Upload Logo</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Store Name</label>
                <input type="text" defaultValue={`${user.name}'s Farm`} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Store Description</label>
                <textarea className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 h-24" placeholder="Tell customers about your store..."></textarea>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <h4 className="text-xs font-bold text-zinc-900 mb-4">Pickup Location</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Address</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="Farm Address" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Contact Phone</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" placeholder="+234..." />
                  </div>
                </div>
              </div>

              <button className="bg-zinc-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all">Save Store Info</button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Notifications</h3>
              <button className="text-xs font-bold text-emerald-600">Mark all as read</button>
            </div>
            <div className="divide-y divide-zinc-100">
              {[
                { title: 'New Order Received', time: '2 mins ago', icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { title: 'Payout Successful', time: '1 day ago', icon: Wallet, color: 'text-blue-600', bg: 'bg-blue-50' },
              ].map((n, i) => (
                <div key={i} className="p-4 flex gap-4 hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className={`w-10 h-10 ${n.bg} ${n.color} rounded-xl flex items-center justify-center shrink-0`}>
                    <n.icon size={20} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-zinc-900">{n.title}</p>
                    <p className="text-xs text-zinc-500">You have a new notification regarding your store.</p>
                    <p className="text-xs font-bold text-zinc-400 mt-1 uppercase tracking-widest">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Manage Orders</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-1.5 bg-zinc-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500/20 w-48" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Order ID</th>
                    <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Date</th>
                    <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Product</th>
                    <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                    <th className="px-6 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {[
                    { id: '#ORD-7721', date: 'Feb 12, 2024', product: 'Fresh Farm Box', amount: '₦15,000', status: 'Pending' },
                    { id: '#ORD-7722', date: 'Jan 12, 2024', product: 'Pantry Essentials', amount: '₦22,500', status: 'Shipped' },
                  ].map((order, i) => (
                    <tr key={i} className="h-12 hover:bg-zinc-50 transition-colors">
                      <td className="px-6 text-sm font-bold text-zinc-900">{order.id}</td>
                      <td className="px-6 text-sm text-zinc-600">{order.date}</td>
                      <td className="px-6 text-sm text-zinc-600">{order.product}</td>
                      <td className="px-6 text-sm font-bold text-zinc-900">{order.amount}</td>
                      <td className="px-6">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                          order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'earnings':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'Available Balance', value: '₦120,500', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Pending Clearance', value: '₦45,000', icon: History, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Total Earned', value: '₦850,000', icon: BarChart3, color: 'text-blue-600', bg: 'bg-blue-50' },
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-white rounded-xl border border-zinc-200 shadow-sm">
                  <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
                    <stat.icon size={24} />
                  </div>
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</h4>
                  <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-zinc-900">Recent Transactions</h3>
                <button className="text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors">Withdraw Funds</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100">
                      <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Date</th>
                      <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Description</th>
                      <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                      <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      { date: 'Feb 14, 2024', desc: 'Withdrawal to Bank', amount: '-₦50,000', status: 'Completed', type: 'debit' },
                      { date: 'Feb 12, 2024', desc: 'Order #ORD-7721 Settlement', amount: '+₦15,000', status: 'Completed', type: 'credit' },
                      { date: 'Feb 10, 2024', desc: 'Order #ORD-7720 Settlement', amount: '+₦20,000', status: 'Completed', type: 'credit' },
                    ].map((tx, i) => (
                      <tr key={i} className="h-12 hover:bg-zinc-50 transition-colors">
                        <td className="px-4 text-sm text-zinc-600">{tx.date}</td>
                        <td className="px-4 text-sm text-zinc-900">{tx.desc}</td>
                        <td className={`px-4 text-sm font-bold ${tx.type === 'credit' ? 'text-emerald-600' : 'text-zinc-900'}`}>{tx.amount}</td>
                        <td className="px-4">
                          <span className="px-2 py-1 bg-emerald-100 text-xs font-bold uppercase tracking-wider text-emerald-700 rounded-lg">
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <h3 className="text-sm font-bold text-zinc-900 mb-6">Store Performance</h3>
              <div className="h-[300px] w-full bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 italic">
                Seller Analytics Chart Visualization
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-20 text-center text-zinc-400 italic">Section coming soon...</div>;
    }
  };

  return (
    <DashboardLayout
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={onLogout}
      onSwitchRole={onSwitchRole}
      setView={setView}
    >
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        initialData={editingProduct}
        onSubmit={(data) => {
          console.log('Seller product data', data);
          setIsProductModalOpen(false);
        }}
      />
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 capitalize">
          {activeTab.replace('-', ' ')}
        </h2>
        {['overview', 'orders', 'earnings', 'analytics'].includes(activeTab) && (
          <DashboardFilter onFilterChange={(f) => console.log('Seller filter changed', f)} />
        )}
      </div>
      {renderContent()}
    </DashboardLayout>
  );
};

const AdminDashboard = ({ user, onSwitchRole, onLogout, activeTab, setActiveTab, setView }: {
  user: UserType,
  onSwitchRole: (role: 'buyer' | 'seller' | 'admin') => void,
  onLogout: () => void,
  activeTab: string,
  setActiveTab: (t: string) => void,
  setView: (v: string) => void
}) => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isAdminUserModalOpen, setIsAdminUserModalOpen] = useState(false);
  const [editingAdminUser, setEditingAdminUser] = useState<any>(null);

  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 4500 },
    { name: 'May', value: 6000 },
    { name: 'Jun', value: 5500 },
    { name: 'Jul', value: 7000 },
  ];

  const pieData = [
    { name: 'Monthly', value: 400 },
    { name: 'Quarterly', value: 300 },
    { name: 'Annual', value: 300 },
  ];
  const COLORS = ['#10B981', '#3B82F6', '#8B5CF6'];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Monthly Revenue', value: '₦4.2M', trend: '+12.5%', icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { label: 'Active Subscribers', value: '1,240', trend: '+8.2%', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Pending Orders', value: '42', trend: '-3.1%', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Inventory Alerts', value: '5', trend: 'Critical', icon: Package, color: 'text-red-600', bg: 'bg-red-50' },
              ].map((stat, i) => (
                <div key={i} className="p-5 bg-white rounded-xl border border-zinc-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 ${stat.bg} ${stat.color} rounded-lg`}>
                      <stat.icon size={20} />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend.startsWith('+') ? 'text-emerald-600' : 'text-red-500'}`}>
                      {stat.trend.startsWith('+') ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                      {stat.trend}
                    </div>
                  </div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-zinc-900">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-8 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-sm font-bold text-zinc-900">Revenue Overview</h3>
                  <button className="text-xs font-bold text-emerald-600 hover:underline">Download Report</button>
                </div>
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10B981" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#94A3B8' }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: '#94A3B8' }}
                        tickFormatter={(value) => `₦${value}k`}
                      />
                      <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area type="monotone" dataKey="value" stroke="#10B981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-4 bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900 mb-6">Subscription Breakdown</h3>
                <div className="h-[320px] w-full flex flex-col">
                  <div className="flex-grow">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-4">
                    {pieData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                          <span className="text-zinc-500">{item.name}</span>
                        </div>
                        <span className="font-bold text-zinc-900">{item.value} users</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders Table */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900">Recent Orders</h3>
                <button className="text-xs font-bold text-emerald-600 hover:underline">View All Orders</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-zinc-50 border-b border-zinc-100">
                      <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Order ID</th>
                      <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Customer</th>
                      <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Product</th>
                      <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                      <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                      <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest w-20">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100">
                    {[
                      { id: '#ORD-7721', customer: 'Alice Johnson', product: 'Fresh Farm Box', amount: '₦15,000', status: 'Pending' },
                      { id: '#ORD-7722', customer: 'Bob Smith', product: 'Pantry Essentials', amount: '₦22,500', status: 'Shipped' },
                      { id: '#ORD-7723', customer: 'Catherine Lee', product: 'Baby Care Box', amount: '₦18,000', status: 'Delivered' },
                      { id: '#ORD-7724', customer: 'David Okoro', product: 'Home Care Box', amount: '₦12,000', status: 'Delivered' },
                      { id: '#ORD-7725', customer: 'Elena Gilbert', product: 'Fresh Farm Box', amount: '₦15,000', status: 'Pending' },
                    ].map((order, i) => (
                      <tr key={i} className="h-12 hover:bg-zinc-50 transition-colors">
                        <td className="px-4 text-sm font-bold text-zinc-900">{order.id}</td>
                        <td className="px-4 text-sm text-zinc-600">{order.customer}</td>
                        <td className="px-4 text-sm text-zinc-600">{order.product}</td>
                        <td className="px-4 text-sm font-bold text-zinc-900">{order.amount}</td>
                        <td className="px-4">
                          <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                              'bg-emerald-100 text-emerald-700'
                            }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4">
                          <button className="p-1 hover:bg-zinc-200 rounded transition-colors text-zinc-400">
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'orders':
        return (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">All Orders</h3>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                  <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-1.5 bg-zinc-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500/20 w-48" />
                </div>
                <button className="px-3 py-1.5 bg-zinc-100 rounded-lg text-xs font-bold text-zinc-600 flex items-center gap-2 hover:bg-zinc-200 transition-all">
                  <Filter size={14} />
                  Filter
                </button>
                <button className="px-3 py-1.5 bg-emerald-600 rounded-lg text-xs font-bold text-white hover:bg-emerald-700 transition-all">Export</button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Order ID</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Customer</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Date</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {[
                    { id: '#ORD-001', customer: 'Alice Johnson', date: 'Feb 10, 2024', amount: '₦15,000', status: 'Delivered' },
                    { id: '#ORD-002', customer: 'Bob Smith', date: 'Feb 11, 2024', amount: '₦22,500', status: 'Pending' },
                    { id: '#ORD-003', customer: 'Catherine Lee', date: 'Feb 12, 2024', amount: '₦18,000', status: 'On Transit' },
                    { id: '#ORD-004', customer: 'David Okoro', date: 'Feb 13, 2024', amount: '₦12,000', status: 'Delivered' },
                  ].map((order, i) => (
                    <tr
                      key={i}
                      className="h-12 hover:bg-zinc-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsOrderModalOpen(true);
                      }}
                    >
                      <td className="px-4 text-sm font-bold text-zinc-900">{order.id}</td>
                      <td className="px-4 text-sm text-zinc-600">{order.customer}</td>
                      <td className="px-4 text-sm text-zinc-600">{order.date}</td>
                      <td className="px-4 text-sm font-bold text-zinc-900">{order.amount}</td>
                      <td className="px-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                          order.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            order.status === 'On Transit' ? 'bg-blue-100 text-blue-700' :
                              'bg-red-100 text-red-700'
                          }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'subscriptions':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Monthly Plan', users: 450, growth: '+12%', color: 'border-emerald-500' },
              { name: 'Quarterly Plan', users: 320, growth: '+5%', color: 'border-blue-500' },
              { name: 'Annual Plan', users: 180, growth: '+20%', color: 'border-purple-500' },
            ].map((plan, i) => (
              <div key={i} className={`p-6 bg-white rounded-xl border-l-4 ${plan.color} shadow-sm`}>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{plan.name}</h4>
                <p className="text-2xl font-bold text-zinc-900">{plan.users}</p>
                <p className="text-xs text-emerald-600 font-bold mt-2">{plan.growth} growth</p>
              </div>
            ))}
            <div className="md:col-span-3 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-zinc-100">
                <h3 className="text-sm font-bold text-zinc-900">Active Subscriptions</h3>
              </div>
              <div className="p-5 space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-emerald-600 font-bold">U</div>
                      <div>
                        <p className="text-sm font-bold text-zinc-900">User {i}</p>
                        <p className="text-xs text-zinc-500">Monthly Plan • Next delivery: Mar 1{i}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSub({ id: i, user: `User ${i}` });
                        setIsSubModalOpen(true);
                      }}
                      className="text-xs font-bold text-emerald-600 hover:underline"
                    >
                      Manage
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-sm font-bold text-zinc-900">Product Catalog</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                  <input type="text" placeholder="Search products..." className="pl-9 pr-4 py-1.5 bg-zinc-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500/20 w-48" />
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-2"
              >
                <Plus size={14} />
                Add New Product
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <div key={i} className="bg-white p-3 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-all">
                  <div className="aspect-square bg-zinc-100 rounded-lg mb-3 overflow-hidden">
                    <img src={`https://picsum.photos/seed/admin-prod-${i}/300/300`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <h4 className="text-sm font-bold text-zinc-900 truncate">Product Name {i}</h4>
                  <p className="text-xs text-zinc-500 mb-2">Category • ₦15,000</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct({ id: i, name: `Product Name ${i}`, price: 15000, category: 'Fresh Farm', image_url: `https://picsum.photos/seed/admin-prod-${i}/300/300` });
                        setIsProductModalOpen(true);
                      }}
                      className="flex-1 py-1.5 bg-zinc-100 rounded-lg text-xs font-bold hover:bg-zinc-200 transition-all"
                    >
                      Edit
                    </button>
                    <button className="flex-1 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100 transition-all">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'inventory':
        return (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Inventory Status</h3>
              <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-lg">5 Low Stock Items</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Item</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Stock Level</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Last Restocked</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {[
                    { name: 'Fresh Tomatoes', stock: 12, status: 'Low' },
                    { name: 'Brown Rice', stock: 85, status: 'Healthy' },
                    { name: 'Cooking Oil', stock: 4, status: 'Critical' },
                  ].map((item, i) => (
                    <tr key={i} className="h-12 hover:bg-zinc-50 transition-colors">
                      <td className="px-4 text-sm font-bold text-zinc-900">{item.name}</td>
                      <td className="px-4 text-sm text-zinc-600">{item.stock} units</td>
                      <td className="px-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${item.status === 'Healthy' ? 'bg-emerald-100 text-emerald-700' :
                          item.status === 'Low' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-4 text-sm text-zinc-500">Feb 20, 2024</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'suppliers':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm flex items-center gap-6">
                <div className="w-16 h-16 bg-zinc-100 rounded-xl flex items-center justify-center text-zinc-400">
                  <Truck size={32} />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold text-zinc-900">Supplier Name {i}</h4>
                  <p className="text-xs text-zinc-500 mb-2">Fresh Produce • Lagos, Nigeria</p>
                  <div className="flex gap-4">
                    <span className="text-xs font-bold text-emerald-600">4.9 Rating</span>
                    <span className="text-xs font-bold text-zinc-400">124 Deliveries</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-zinc-900 text-white rounded-lg text-xs font-bold">Contact</button>
              </div>
            ))}
          </div>
        );
      case 'payments':
        return (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Payment Transactions</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                <input type="text" placeholder="Search payments..." className="pl-9 pr-4 py-1.5 bg-zinc-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500/20 w-48" />
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Transaction ID</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Customer</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Amount</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Method</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {[
                    { id: '#TRX-9901', customer: 'Alice Johnson', amount: '₦15,000', method: 'Card', status: 'Successful', date: 'Feb 24, 2024', time: '14:30' },
                    { id: '#TRX-9902', customer: 'Bob Smith', amount: '₦22,500', method: 'Transfer', status: 'Successful', date: 'Feb 24, 2024', time: '15:45' },
                    { id: '#TRX-9903', customer: 'Catherine Lee', amount: '₦18,000', method: 'Card', status: 'Pending', date: 'Feb 24, 2024', time: '16:20' },
                    { id: '#TRX-9904', customer: 'David Okoro', amount: '₦12,000', method: 'Card', status: 'Successful', date: 'Feb 23, 2024', time: '09:15' },
                    { id: '#TRX-9905', customer: 'Elena Gilbert', amount: '₦15,000', method: 'Transfer', status: 'Failed', date: 'Feb 23, 2024', time: '11:30' },
                  ].map((trx, i) => (
                    <tr
                      key={i}
                      className="h-12 hover:bg-zinc-50 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedPayment(trx);
                        setIsPaymentModalOpen(true);
                      }}
                    >
                      <td className="px-4 text-sm font-bold text-zinc-900">{trx.id}</td>
                      <td className="px-4 text-sm text-zinc-600">{trx.customer}</td>
                      <td className="px-4 text-sm font-bold text-zinc-900">{trx.amount}</td>
                      <td className="px-4 text-sm text-zinc-500">{trx.method}</td>
                      <td className="px-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${trx.status === 'Successful' ? 'bg-emerald-100 text-emerald-700' :
                          trx.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                          {trx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Customer Directory</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
                <input type="text" placeholder="Search customers..." className="pl-9 pr-4 py-1.5 bg-zinc-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-emerald-500/20 w-64" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-400 font-bold text-lg">
                      {String.fromCharCode(64 + i)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900">Customer Name {i}</h4>
                      <p className="text-xs text-zinc-500">customer{i}@example.com</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 py-4 border-y border-zinc-100 mb-4">
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total Orders</p>
                      <p className="text-sm font-bold text-zinc-900">{10 + i}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Total Spent</p>
                      <p className="text-sm font-bold text-emerald-600">₦{150 + i * 20},000</p>
                    </div>
                  </div>
                  <button className="w-full py-2 bg-zinc-100 text-zinc-900 rounded-lg text-xs font-bold hover:bg-zinc-200 transition-all">View Profile</button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900 mb-4">Sales Reports</h3>
                <div className="space-y-3">
                  {['Daily Sales Summary', 'Monthly Revenue Report', 'Product Performance', 'Category Breakdown'].map((report, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                      <span className="text-xs font-bold text-zinc-700">{report}</span>
                      <button className="p-1.5 bg-white border border-zinc-200 rounded-lg text-zinc-500 hover:text-emerald-600 transition-colors">
                        <Download size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <h3 className="text-sm font-bold text-zinc-900 mb-4">Inventory Reports</h3>
                <div className="space-y-3">
                  {['Stock Level Audit', 'Low Stock Alerts', 'Supplier Performance', 'Inventory Turnover'].map((report, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-zinc-50 rounded-lg border border-zinc-100">
                      <span className="text-xs font-bold text-zinc-700">{report}</span>
                      <button className="p-1.5 bg-white border border-zinc-200 rounded-lg text-zinc-500 hover:text-emerald-600 transition-colors">
                        <Download size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Conversion Rate</h4>
                <p className="text-2xl font-bold text-zinc-900">3.4%</p>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mt-1">
                  <TrendingUp size={12} />
                  +0.5% from last month
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Average Order Value</h4>
                <p className="text-2xl font-bold text-zinc-900">₦18,500</p>
                <div className="flex items-center gap-1 text-xs font-bold text-emerald-600 mt-1">
                  <TrendingUp size={12} />
                  +₦1,200 from last month
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Customer Retention</h4>
                <p className="text-2xl font-bold text-zinc-900">68%</p>
                <div className="flex items-center gap-1 text-xs font-bold text-red-500 mt-1">
                  <TrendingDown size={12} />
                  -2% from last month
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
              <h3 className="text-sm font-bold text-zinc-900 mb-6">User Traffic Analytics</h3>
              <div className="h-[300px] w-full bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 italic">
                Traffic Chart Visualization
              </div>
            </div>
          </div>
        );
      case 'admin-users':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Admin Team</h3>
              <button
                onClick={() => {
                  setEditingAdminUser(null);
                  setIsAdminUserModalOpen(true);
                }}
                className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-emerald-600 transition-all flex items-center gap-2"
              >
                <UserPlus size={14} />
                Add Admin User
              </button>
            </div>
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Name</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Email</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Role</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">Status</th>
                    <th className="px-4 py-3 text-xs font-bold text-zinc-400 uppercase tracking-widest w-20">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {[
                    { name: 'Admin User 1', email: 'admin1@farmly.com', role: 'Super Admin', status: 'Active' },
                    { name: 'Admin User 2', email: 'admin2@farmly.com', role: 'Editor', status: 'Active' },
                    { name: 'Admin User 3', email: 'admin3@farmly.com', role: 'Support', status: 'Inactive' },
                  ].map((admin, i) => (
                    <tr key={i} className="h-12 hover:bg-zinc-50 transition-colors">
                      <td className="px-4 text-sm font-bold text-zinc-900">{admin.name}</td>
                      <td className="px-4 text-sm text-zinc-600">{admin.email}</td>
                      <td className="px-4 text-sm text-zinc-600">{admin.role}</td>
                      <td className="px-4">
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${admin.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-zinc-100 text-zinc-500'
                          }`}>
                          {admin.status}
                        </span>
                      </td>
                      <td className="px-4">
                        <button className="p-1 hover:bg-zinc-200 rounded transition-colors text-zinc-400">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Notifications</h3>
              <button className="text-xs font-bold text-emerald-600">Mark all as read</button>
            </div>
            <div className="divide-y divide-zinc-100">
              {[
                { title: 'New Order Received', time: '2 mins ago', icon: ShoppingBag, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { title: 'Inventory Alert: Low Stock', time: '1 hour ago', icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
                { title: 'New Supplier Application', time: '3 hours ago', icon: Truck, color: 'text-blue-600', bg: 'bg-blue-50' },
                { title: 'System Update Completed', time: '5 hours ago', icon: Settings, color: 'text-zinc-600', bg: 'bg-zinc-50' },
              ].map((n, i) => (
                <div key={i} className="p-4 flex gap-4 hover:bg-zinc-50 transition-colors cursor-pointer">
                  <div className={`w-10 h-10 ${n.bg} ${n.color} rounded-xl flex items-center justify-center shrink-0`}>
                    <n.icon size={20} />
                  </div>
                  <div className="flex-grow">
                    <p className="text-sm font-bold text-zinc-900">{n.title}</p>
                    <p className="text-xs text-zinc-500">You have a new notification regarding your business operations.</p>
                    <p className="text-xs font-bold text-zinc-400 mt-1 uppercase tracking-widest">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="max-w-2xl bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100">
              <h3 className="text-sm font-bold text-zinc-900">System Settings</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Platform Name</label>
                  <input type="text" defaultValue="Everyday Needs" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Support Email</label>
                  <input type="email" defaultValue="support@everydayneeds.ng" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/20" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Platform Maintenance Mode</label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-6 bg-zinc-200 rounded-full relative cursor-pointer group">
                    <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1 group-hover:scale-110 transition-transform"></div>
                  </div>
                  <span className="text-sm text-zinc-600">Off</span>
                </div>
              </div>
              <button className="bg-zinc-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-600 transition-all">Save Settings</button>
            </div>
          </div>
        );
      default:
        return <div className="p-20 text-center text-zinc-400 italic">Admin section coming soon...</div>;
    }
  };

  return (
    <DashboardLayout
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={onLogout}
      onSwitchRole={onSwitchRole}
      setView={setView}
    >
      <OrderDetailsModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        order={selectedOrder}
        onUpdateStatus={(id, status, details) => {
          console.log('Update order', id, status, details);
          setIsOrderModalOpen(false);
        }}
      />
      <ProductFormModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        initialData={editingProduct}
        onSubmit={(data) => {
          console.log('Product data', data);
          setIsProductModalOpen(false);
        }}
      />
      <SubscriptionManagementModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        subscription={selectedSub}
      />

      {/* New Modals for Admin */}
      {isPaymentModalOpen && selectedPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border border-black/5 p-10 relative"
          >
            <button onClick={() => setIsPaymentModalOpen(false)} className="absolute top-8 right-8 p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
              <X size={24} />
            </button>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600">
                <CreditCard size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-zinc-900">Payment Details</h2>
                <p className="text-sm text-zinc-500">{selectedPayment.id}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Customer</p>
                  <p className="text-sm font-bold text-zinc-900">{selectedPayment.customer}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Amount</p>
                  <p className="text-sm font-bold text-emerald-600">{selectedPayment.amount}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Date & Time</p>
                  <p className="text-sm font-bold text-zinc-900">{selectedPayment.date} • {selectedPayment.time}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Method</p>
                  <p className="text-sm font-bold text-zinc-900">{selectedPayment.method}</p>
                </div>
              </div>
              <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Status</p>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${selectedPayment.status === 'Successful' ? 'bg-emerald-100 text-emerald-700' :
                  selectedPayment.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                  {selectedPayment.status}
                </span>
              </div>
              <button onClick={() => setIsPaymentModalOpen(false)} className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-emerald-600 transition-all">Close</button>
            </div>
          </motion.div>
        </div>
      )}

      {isAdminUserModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl border border-black/5 p-10 relative"
          >
            <button onClick={() => setIsAdminUserModalOpen(false)} className="absolute top-8 right-8 p-2 text-zinc-400 hover:text-zinc-900 transition-colors">
              <X size={24} />
            </button>
            <h2 className="text-2xl font-bold text-zinc-900 mb-8">{editingAdminUser ? 'Edit Admin User' : 'Add Admin User'}</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Full Name</label>
                <input type="text" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500" placeholder="admin@farmly.com" />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Role</label>
                <select className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500">
                  <option>Super Admin</option>
                  <option>Editor</option>
                  <option>Support</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={() => setIsAdminUserModalOpen(false)} className="flex-1 py-4 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 transition-all">Cancel</button>
                <button onClick={() => setIsAdminUserModalOpen(false)} className="flex-[2] bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all">
                  {editingAdminUser ? 'Save Changes' : 'Create User'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 capitalize">
          {activeTab.replace('-', ' ')}
        </h2>
        {['overview', 'orders', 'subscriptions', 'payments', 'analytics'].includes(activeTab) && (
          <DashboardFilter onFilterChange={(f) => console.log('Admin filter changed', f)} />
        )}
      </div>
      {renderContent()}
    </DashboardLayout>
  );
};

const MOCK_BOXES: Product[] = [
  { id: 1, name: "Gourmet Pleasure (Beginner)", description: "Premium gourmet treats and artisanal delights.", price: 230000, image_url: "/images/hero_main.jpeg", category: "Gourmet" },
  { id: 2, name: "Pantry Provision Box (Beginner)", description: "Essential pantry staples for a balanced home.", price: 65400, image_url: "/images/pantry_premium.jpeg", category: "Pantry" },
  { id: 3, name: "Farm Fresh Harvest Box", description: "Fresh farm produce delivered directly to you.", price: 156200, image_url: "/images/fresh_harvest.jpeg", category: "Fresh" },
  { id: 4, name: "Sunrise Essentials (Beginner)", description: "Start your day with wholesome breakfast essentials.", price: 56200, image_url: "/images/breakfast_essentials.jpeg", category: "Breakfast" },
  { id: 5, name: "Protein Prime Cut (Classic)", description: "Quality protein selections for your family.", price: 106500, image_url: "/images/meat_prime.jpg", category: "Protein" },
  { id: 6, name: "Pure Bliss Pampers Kit (Beginner)", description: "Self-care and pampering essentials.", price: 73400, image_url: "/images/pamper_kit.jpeg", category: "Personal Care" },
  { id: 7, name: "Little Bundle of Joy (Essentials)", description: "All the basics for your little one's comfort.", price: 55000, image_url: "/images/baby_joy.jpeg", category: "Baby" },
  { id: 8, name: "Radiant Glow (Beginner)", description: "Skincare and beauty essentials for a healthy glow.", price: 77000, image_url: "/images/pampers_mini.jpeg", category: "Skincare" },
  { id: 9, name: "Sparkling Sanctuary (Essentials)", description: "Home cleaning and maintenance supplies.", price: 20900, image_url: "/images/cleaning_sanctuary.jpeg", category: "Home" },
  { id: 10, name: "Zen Wellness Box", description: "Supplements and wellness products for vitality.", price: 25000, image_url: "/images/wellness_box.jpeg", category: "Wellness" },
  { id: 11, name: "Classic Harvest Box", description: "The classic selection of fresh produce.", price: 85000, image_url: "/images/harvest_box_classic.jpeg", category: "Fresh" },
  { id: 12, name: "Luxury Breakfast Essentials", description: "Gourmet breakfast items for a perfect morning.", price: 95000, image_url: "/images/breakfast_luxury.jpeg", category: "Breakfast" },
];

const Storage = {
  getUser: () => {
    const data = localStorage.getItem('edn_user');
    return data ? JSON.parse(data) : null;
  },
  setUser: (user: UserType | null) => {
    if (user) localStorage.setItem('edn_user', JSON.stringify(user));
    else localStorage.removeItem('edn_user');
  },
  getSubscriptions: (userId: number) => {
    const data = localStorage.getItem(`edn_subs_${userId}`);
    return data ? JSON.parse(data) : [];
  },
  addSubscription: (userId: number, sub: any) => {
    const subs = Storage.getSubscriptions(userId);
    const newSub = { ...sub, id: Date.now(), created_at: new Date().toISOString() };
    localStorage.setItem(`edn_subs_${userId}`, JSON.stringify([...subs, newSub]));
    return newSub;
  }
};

export interface CartItem extends Product {
  quantity: number;
}

function App() {
  const [view, setView] = useState('home');
  const [user, setUser] = useState<UserType | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('edn_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Products' || p.category.includes(selectedCategory.split(' ')[0]);
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    setNotification(`${quantity} x ${product.name} added to cart!`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRemoveFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const handleUpdateQuantity = (productId: number, delta: number) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.id === productId) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleLike = (product: any) => {
    if (wishlist.includes(product.id)) {
      setWishlist(wishlist.filter(id => id !== product.id));
    } else {
      setWishlist([...wishlist, product.id]);
    }
  };

  const handleBuyNow = (product: any, amount?: number) => {
    if (!user) {
      setView('auth');
      return;
    }

    const finalAmount = amount || product.price;

    // @ts-ignore
    const handler = window.PaystackPop.setup({
      key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxx', // Replace with real key
      email: user.email,
      amount: finalAmount * 100, // Convert to kobo
      currency: 'NGN',
      metadata: {
        custom_fields: [
          {
            display_name: "Product Name",
            variable_name: "product_name",
            value: product.name
          }
        ]
      },
      callback: function (response: any) {
        alert('Payment successful! Reference: ' + response.reference);
        // Clear cart or handle post-payment logic
      },
      onClose: function () {
        alert('Transaction was not completed.');
      }
    });

    handler.openIframe();
  };

  useEffect(() => {
    localStorage.setItem('edn_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    fetch('/api/boxes')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        console.log('Using mock products');
        setProducts(MOCK_BOXES);
        setLoading(false);
      });

    const savedUser = Storage.getUser();
    if (savedUser) setUser(savedUser);
  }, []);

  const handleLogin = async (email: string = 'user@example.com') => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'password' })
      });
      const data = await res.json();
      setUser(data.user);
      Storage.setUser(data.user);
    } catch (err) {
      console.log('Login fallback');
      const mockUser: UserType = { id: 1, email, name: email.split('@')[0], role: 'buyer' };
      setUser(mockUser);
      Storage.setUser(mockUser);
    }
    if (view === 'home' || view === 'auth') setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    Storage.setUser(null);
    setView('home');
  };

  const handleProductSelect = async (product: Product) => {
    try {
      const res = await fetch(`/api/boxes/${product.id}`);
      const data = await res.json();
      setSelectedProduct(data);
    } catch (err) {
      setSelectedProduct({ ...product, products: [] });
    }
    setView('product-detail');
  };

  const handleSubscribe = async (plan: string) => {
    if (!user) {
      setView('auth');
      return;
    }

    try {
      const res = await fetch('/api/subscriptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          boxId: selectedProduct.id,
          plan
        })
      });
      if (res.ok) setView('dashboard');
    } catch (err) {
      console.log('Subscribe fallback');
      Storage.addSubscription(user.id, {
        user_id: user.id,
        box_id: selectedProduct.id,
        box_name: selectedProduct.name,
        image_url: selectedProduct.image_url,
        plan,
        status: 'active',
        next_delivery_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      });
      setView('dashboard');
    }
  };

  const [isKYCModalOpen, setIsKYCModalOpen] = useState(false);

  const handleKYCSubmit = async (data: any) => {
    if (!user) return;
    try {
      const res = await fetch('/api/auth/kyc', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, kycData: data })
      });
      const result = await res.json();
      setUser(result.user);
      Storage.setUser(result.user);
    } catch (err) {
      const updatedUser = { ...user, is_seller_verified: true, role: 'seller', kyc_data: JSON.stringify(data) } as UserType;
      setUser(updatedUser);
      Storage.setUser(updatedUser);
    }
    setIsKYCModalOpen(false);
    setView('seller-dashboard');
  };

  const handleSwitchRole = async (targetRole: 'buyer' | 'seller' | 'admin') => {
    if (!user) return;

    if (targetRole === 'seller' && !user.is_seller_verified) {
      setIsKYCModalOpen(true);
      return;
    }

    try {
      const res = await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, role: targetRole })
      });
      const data = await res.json();
      setUser(data.user);
      Storage.setUser(data.user);
    } catch (err) {
      const updatedUser = { ...user, role: targetRole } as UserType;
      setUser(updatedUser);
      Storage.setUser(updatedUser);
    }
    setView(targetRole === 'buyer' ? 'dashboard' : targetRole === 'seller' ? 'seller-dashboard' : 'admin-dashboard');

    setActiveTab('overview'); // Reset tab on role switch
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar
        user={user}
        onLogin={() => setView('auth')}
        onLogout={handleLogout}
        setView={setView}
        currentView={view}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        total={cartTotal}
        onCheckout={() => {
          setIsCartOpen(false);
          if (cart.length > 0) {
            handleBuyNow({ name: 'Everyday Needs Cart Bundle' }, cartTotal);
          }
        }}
      />

      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 right-8 z-[100] bg-zinc-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10"
          >
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <Check size={18} />
            </div>
            <p className="font-bold">{notification}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <KYCModal
          isOpen={isKYCModalOpen}
          onClose={() => setIsKYCModalOpen(false)}
          onSubmit={handleKYCSubmit}
        />
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onStart={() => setView('pricing')} setView={setView} />

              {/* Features Section */}
              <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Our Difference</h2>
                    <p className="text-zinc-500 max-w-2xl mx-auto">We're more than just a delivery service. We're your partner in building a better home.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { title: 'Farm Partnerships', desc: 'Direct sourcing from local farmers ensures freshness and fair pricing.', icon: Truck },
                      { title: 'Non-Toxic Priority', desc: 'Every product is vetted for safety and environmental impact.', icon: ShieldCheck },
                      { title: 'Subscription Reliability', desc: 'Never run out of essentials with our automated delivery system.', icon: Calendar },
                      { title: 'Woman-Driven Insight', desc: 'Built with a deep understanding of household management.', icon: Heart },
                    ].map((feature, i) => (
                      <div key={i} className="p-8 bg-zinc-50 rounded-3xl border border-black/5 hover:border-emerald-200 transition-colors group">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                          <feature.icon size={24} />
                        </div>
                        <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* How It Works */}
              <section className="py-24 bg-zinc-900 text-white overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                      <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">How It Works</h2>
                      <div className="space-y-12">
                        {[
                          { step: '01', title: 'Choose Your Box', desc: 'Select from our curated collections of pantry, farm, or home essentials.' },
                          { step: '02', title: 'Subscribe', desc: 'Pick a plan that fits your household needs, from monthly, quarterly, to annual options.' },
                          { step: '03', title: 'We Deliver', desc: 'Our team sources and packs your essentials with care and delivers them to your door.' },
                          { step: '04', title: 'Live Better', desc: 'Enjoy more time with family while we handle the heavy lifting.' },
                        ].map((step, i) => (
                          <div key={i} className="flex gap-6">
                            <span className="text-4xl font-bold text-emerald-500 opacity-50 font-mono">{step.step}</span>
                            <div>
                              <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                              <p className="text-zinc-400 leading-relaxed">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setView('products')}
                        className="mt-12 bg-emerald-600 text-white px-8 py-4 rounded-full font-bold hover:bg-emerald-700 transition-all shadow-lg"
                      >
                        Subscribe Now
                      </button>
                    </div>
                    <div className="lg:w-1/2 relative">
                      <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3">
                        <img src="https://picsum.photos/seed/delivery/800/800" alt="Delivery" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl text-zinc-900 max-w-xs -rotate-3">
                        <div className="flex items-center gap-2 mb-4">
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />)}
                        </div>
                        <p className="text-sm font-medium italic">"Everyday Needs has completely changed how I manage my home. No more last-minute store runs!"</p>
                        <p className="mt-4 text-xs font-bold uppercase tracking-widest text-zinc-400">— Sarah O., Lagos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {view === 'products' && (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
                <div className="max-w-xl">
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-4">Explore Our Products</h2>
                  <p className="text-lg text-zinc-500 leading-relaxed">Carefully curated essentials for every Nigerian home. Choose a box that fits your lifestyle.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  <div className="relative flex-grow sm:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      className="w-full pl-12 pr-6 py-4 bg-white border border-black/5 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-black/5 rounded-2xl font-bold text-zinc-600 hover:text-emerald-600 transition-all shadow-sm">
                    <Filter size={20} />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-8 no-scrollbar">
                {['All Products', 'Fresh Farm', 'Pantry Essentials', 'Home Care', 'Baby & Kids', 'Beauty & Wellness'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-8 py-3 rounded-full text-sm font-bold border transition-all whitespace-nowrap ${selectedCategory === cat
                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100'
                      : 'bg-white border-zinc-200 text-zinc-500 hover:border-emerald-600 hover:text-emerald-600'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="aspect-[4/5] bg-zinc-100 animate-pulse rounded-[2.5rem]" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelect={handleProductSelect}
                      onLike={(e) => {
                        e.stopPropagation();
                        handleLike(product);
                      }}
                      isLiked={wishlist.includes(product.id)}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {view === 'product-detail' && selectedProduct && (
            <motion.div
              key="product-detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ProductDetail
                product={selectedProduct}
                onSubscribe={handleSubscribe}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onBack={() => setView('products')}
                suggestions={products.filter(p => p.id !== selectedProduct.id).sort((a, b) => {
                  if (a.category === selectedProduct.category) return -1;
                  if (b.category === selectedProduct.category) return 1;
                  return 0;
                })}
                onSelectProduct={handleProductSelect}
                isLiked={wishlist.includes(selectedProduct.id)}
                onLike={handleLike}
              />
            </motion.div>
          )}

          {view === 'auth' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Auth onLogin={handleLogin} onBack={() => setView('home')} />
            </motion.div>
          )}

          {view === 'pricing' && (
            <motion.div
              key="pricing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Pricing onSelect={() => setView('products')} onBack={() => setView('home')} />
            </motion.div>
          )}

          {view === 'dashboard' && user && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Dashboard
                user={user}
                setView={setView}
                onSwitchRole={handleSwitchRole}
                onLogout={handleLogout}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </motion.div>
          )}

          {view === 'seller-dashboard' && user && (
            <motion.div
              key="seller-dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SellerDashboard
                user={user}
                onSwitchRole={handleSwitchRole}
                onLogout={handleLogout}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setView={setView}
              />
            </motion.div>
          )}

          {view === 'admin-dashboard' && user && (
            <motion.div
              key="admin-dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AdminDashboard
                user={user}
                onSwitchRole={handleSwitchRole}
                onLogout={handleLogout}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setView={setView}
              />
            </motion.div>
          )}

          {view === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h3 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-6">Our Story & Mission</h3>
                  <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                    Simplifying household management for the modern Nigerian family through curated, reliable, and safe essential boxes.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                  <div className="space-y-6">
                    <h3 className="text-3xl font-bold text-zinc-900">Why We Started</h3>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                      Everyday Needs was born out of a simple observation: managing a household in Nigeria's fast-paced cities is a full-time job. Between traffic, work, and family, the "last-minute store run" was becoming a major stressor for families.
                    </p>
                    <p className="text-lg text-zinc-600 leading-relaxed">
                      We realized that by curating the most essential items—from fresh farm produce to non-toxic home supplies—and delivering them on a predictable schedule, we could give families back their most precious resource: time.
                    </p>
                  </div>
                  <div className="relative">
                    <img src="https://picsum.photos/seed/about-story/800/600" alt="Our Story" className="rounded-[3rem] shadow-2xl rotate-2" referrerPolicy="no-referrer" />
                    <div className="absolute -bottom-6 -right-6 bg-emerald-600 text-white p-8 rounded-3xl shadow-xl max-w-xs -rotate-2">
                      <p className="text-2xl font-bold mb-2">5,000+</p>
                      <p className="text-sm font-medium opacity-90">Households served across Lagos and Abuja.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                  {[
                    { title: 'Quality First', desc: 'We partner directly with farmers and verified manufacturers to ensure every item meets our rigorous safety standards.', icon: ShieldCheck },
                    { title: 'Community Driven', desc: 'Our platform supports local farmers and small-scale manufacturers, keeping the value within our local economy.', icon: Users },
                    { title: 'Sustainable Future', desc: 'We prioritize eco-friendly packaging and non-toxic products to protect both your family and our environment.', icon: Heart },
                  ].map((item, i) => (
                    <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-6">
                        <item.icon size={28} />
                      </div>
                      <h4 className="text-xl font-bold text-zinc-900 mb-4">{item.title}</h4>
                      <p className="text-zinc-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-zinc-900 rounded-[3rem] overflow-hidden">
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/2 p-12 lg:p-20">
                      <h3 className="text-3xl font-bold text-white mb-6">Female-Driven Insight</h3>
                      <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                        Everyday Needs is built with a deep understanding of household management. We know that a home isn't just a place—it's an ecosystem that requires care, safety, and reliability.
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white">EN</div>
                        <div>
                          <p className="text-white font-bold">The Founding Team</p>
                          <p className="text-zinc-500 text-sm">Everyday Needs Nigeria</p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/2 relative min-h-[400px]">
                      <img src="https://picsum.photos/seed/about-team/800/800" alt="Team" className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'partners' && (
            <motion.div
              key="partners"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <div className="text-center mb-16">
                <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-zinc-900">Partner With Us</h3>
                <p className="text-zinc-500 max-w-2xl mx-auto">Join our ecosystem of verified suppliers and farmers to reach thousands of households.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-sm">
                    <h3 className="text-2xl font-bold mb-4">Why Partner With Us?</h3>
                    <ul className="space-y-4">
                      {[
                        'Access to a growing customer base across Nigeria',
                        'Reliable and timely payments',
                        'Logistics and fulfillment handled by our team',
                        'Marketing and brand exposure',
                        'Data-driven insights into customer demand'
                      ].map((benefit, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={20} className="text-emerald-500 mt-1 shrink-0" />
                          <span className="text-zinc-600 font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-zinc-900 text-white p-8 rounded-[2.5rem]">
                    <h3 className="text-2xl font-bold mb-4">Application Requirements</h3>
                    <p className="text-zinc-400 text-sm mb-6">To maintain our quality standards, all partners must provide:</p>
                    <ul className="space-y-3 text-sm text-zinc-300">
                      <li>• Valid business registration (CAC)</li>
                      <li>• Proof of production/farming capacity</li>
                      <li>• Quality certifications (where applicable)</li>
                      <li>• Bank account details for settlements</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-emerald-600 rounded-[3rem] p-12 text-white shadow-2xl shadow-emerald-200">
                  <h3 className="text-3xl font-bold mb-6">Apply as a Partner</h3>
                  <p className="mb-8 text-emerald-100 leading-relaxed">
                    Ready to grow your business with Everyday Needs? Fill out our partnership application form and our team will get back to you within 3-5 business days.
                  </p>
                  <button className="w-full bg-white text-emerald-600 py-4 rounded-2xl font-bold hover:bg-emerald-50 transition-all shadow-lg">
                    Start Application
                  </button>
                  <p className="mt-6 text-center text-xs text-emerald-200">
                    Questions? Email us at partners@everydayneeds.ng
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-zinc-900">Get In Touch</h3>
                  <p className="text-zinc-500">We're here to help with any questions or feedback.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {[
                    { title: 'Email', value: 'hello@everydayneeds.ng', icon: Heart },
                    { title: 'Phone', value: '+234 800 123 4567', icon: Truck },
                    { title: 'Office', value: 'Lagos, Nigeria', icon: ShieldCheck },
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-white rounded-3xl border border-black/5 text-center">
                      <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mx-auto mb-4">
                        <item.icon size={24} />
                      </div>
                      <h4 className="font-bold text-zinc-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-zinc-500">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-[3rem] border border-black/5 p-12 shadow-sm">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">Name</label>
                        <input type="text" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Your Name" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">Email</label>
                        <input type="email" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Your Email" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 mb-2">Message</label>
                      <textarea className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-emerald-500 h-40" placeholder="How can we help?"></textarea>
                    </div>
                    <button className="w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all">Send Message</button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'investors' && (
            <motion.div
              key="investors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <div className="max-w-4xl mx-auto text-center">
                <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-zinc-900">Investor Relations</h3>
                <p className="text-zinc-500 mb-16">Join us in shaping the future of household essentials in Nigeria.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                  <div className="bg-white p-8 rounded-3xl border border-black/5">
                    <h4 className="text-xl font-bold text-zinc-900 mb-4">Financial Highlights</h4>
                    <p className="text-zinc-600 leading-relaxed mb-4">We have maintained a steady 40% quarter-over-quarter growth, expanding our fulfillment centers across major cities.</p>
                    <ul className="space-y-2 text-sm text-zinc-500">
                      <li>• $2M ARR as of Q4 2023</li>
                      <li>• 92% Customer Retention Rate</li>
                      <li>• 5,000+ Active Subscriptions</li>
                    </ul>
                  </div>
                  <div className="bg-white p-8 rounded-3xl border border-black/5">
                    <h4 className="text-xl font-bold text-zinc-900 mb-4">Contact Our Team</h4>
                    <p className="text-zinc-600 leading-relaxed mb-6">For investment inquiries and detailed financial reports, please get in touch with our investor relations team.</p>
                    <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all">
                      Request Pitch Deck
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'privacy' && (
            <motion.div
              key="privacy"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <h3 className="text-4xl font-bold tracking-tight mb-8 text-zinc-900">Privacy Policy</h3>
              <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
                <p>Last updated: October 2024</p>
                <h4 className="text-xl font-bold text-zinc-900">1. Information We Collect</h4>
                <p>We collect information you provide directly to us, such as when you create an account, subscribe to our boxes, or contact customer support. This may include your name, email, phone number, delivery address, and payment information.</p>
                <h4 className="text-xl font-bold text-zinc-900">2. How We Use Your Information</h4>
                <p>We use the information we collect to operate, maintain, and provide the features and functionality of Everyday Needs, as well as to communicate directly with you, such as to send you email messages regarding your subscriptions.</p>
                <h4 className="text-xl font-bold text-zinc-900">3. Data Security</h4>
                <p>We care about the security of your information and use commercially reasonable safeguards to preserve the integrity and security of all information collected through our service.</p>
              </div>
            </motion.div>
          )}

          {view === 'terms' && (
            <motion.div
              key="terms"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <h3 className="text-4xl font-bold tracking-tight mb-8 text-zinc-900">Terms of Service</h3>
              <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
                <p>Last updated: October 2024</p>
                <h4 className="text-xl font-bold text-zinc-900">1. Acceptance of Terms</h4>
                <p>By accessing or using the Everyday Needs platform, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                <h4 className="text-xl font-bold text-zinc-900">2. Subscriptions and Payments</h4>
                <p>By subscribing to our service, you agree to pay the recurring subscription fees at the then-current rate. You may cancel your subscription at any time, subject to our cancellation policy.</p>
                <h4 className="text-xl font-bold text-zinc-900">3. Delivery and Returns</h4>
                <p>We strive to deliver all boxes on your chosen schedule. If you receive damaged items, please contact us within 24 hours of delivery for a replacement or refund.</p>
              </div>
            </motion.div>
          )}

          {view === 'delivery' && (
            <motion.div
              key="delivery"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="pt-32 pb-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
            >
              <h3 className="text-4xl font-bold tracking-tight mb-8 text-zinc-900">Delivery Policy</h3>
              <div className="prose prose-zinc max-w-none text-zinc-600 space-y-6">
                <h4 className="text-xl font-bold text-zinc-900">Delivery Areas</h4>
                <p>We currently deliver directly to households within Lagos and Abuja. We are actively expanding to other major cities in Nigeria.</p>
                <h4 className="text-xl font-bold text-zinc-900">Delivery Schedules</h4>
                <p>Deliveries are made on standard business days between 8:00 AM and 6:00 PM. Weekend deliveries can be arranged for specific subscription tiers.</p>
                <h4 className="text-xl font-bold text-zinc-900">Tracking and Receiving</h4>
                <p>You will receive a notification when your box is out for delivery. Please ensure someone is available at the address to receive perishable items.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-zinc-50 border-t border-black/5 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <span className="text-2xl font-bold tracking-tighter text-emerald-600 mb-6 block">Everyday Needs</span>
              <p className="text-zinc-500 max-w-sm leading-relaxed">
                Nigeria's most trusted essentials subscription platform. Delivering quality, reliability, and peace of mind to your doorstep.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-400 uppercase tracking-widest text-xs mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-medium text-zinc-600">
                <li><button onClick={() => setView('about')} className="hover:text-emerald-600">About Us</button></li>
                <li><button onClick={() => setView('partners')} className="hover:text-emerald-600">Partners</button></li>
                <li><button onClick={() => setView('investors')} className="hover:text-emerald-600">Investors</button></li>
                <li><button onClick={() => setView('contact')} className="hover:text-emerald-600">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-zinc-400 uppercase tracking-widest text-xs mb-6">Legal</h4>
              <ul className="space-y-4 text-sm font-medium text-zinc-600">
                <li><button onClick={() => setView('privacy')} className="hover:text-emerald-600">Privacy Policy</button></li>
                <li><button onClick={() => setView('terms')} className="hover:text-emerald-600">Terms of Service</button></li>
                <li><button onClick={() => setView('delivery')} className="hover:text-emerald-600">Delivery Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-400">© 2026 Everyday Needs. All rights reserved designed by airealcom.</p>
            <div className="flex items-center space-x-6">
              <a href="#" className="w-10 h-10 bg-white rounded-full border border-black/5 flex items-center justify-center text-zinc-400 hover:text-emerald-600 hover:border-emerald-600 transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full border border-black/5 flex items-center justify-center text-zinc-400 hover:text-emerald-600 hover:border-emerald-600 transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full border border-black/5 flex items-center justify-center text-zinc-400 hover:text-emerald-600 hover:border-emerald-600 transition-all">
                <MessageSquare size={18} />
              </a>
              <a href="mailto:hello@everydayneeds.ng" className="w-10 h-10 bg-white rounded-full border border-black/5 flex items-center justify-center text-zinc-400 hover:text-emerald-600 hover:border-emerald-600 transition-all">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
