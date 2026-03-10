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
            <span className="text-2xl font-bold tracking-tighter text-[#6F7E57]">Everyday Needs</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setView('products')} className="text-sm font-medium text-zinc-600 hover:text-[#6F7E57] transition-colors">Products</button>
            <button onClick={() => setView('about')} className="text-sm font-medium text-zinc-600 hover:text-[#6F7E57] transition-colors">About</button>
            <button onClick={() => setView('partners')} className="text-sm font-medium text-zinc-600 hover:text-[#6F7E57] transition-colors">Partners</button>
            <button onClick={() => setView('gift-a-box')} className="text-sm font-medium text-zinc-600 hover:text-[#6F7E57] transition-colors">Gift a Box</button>
            <button onClick={() => setView('contact')} className="text-sm font-medium text-zinc-600 hover:text-[#6F7E57] transition-colors">Contact Us</button>

            <div className="h-6 w-px bg-zinc-200 mx-2" />

            <button
              onClick={onOpenCart}
              className="relative p-2 text-zinc-600 hover:text-[#6F7E57] transition-colors group"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#6F7E57] text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
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
                className="bg-[#6F7E57] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#6F7E57]/90 transition-all shadow-sm hover:shadow-md"
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
                <span className="absolute -top-1 -right-1 bg-[#6F7E57] text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
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
              <button onClick={() => { setView('gift-a-box'); setIsOpen(false); }} className="block w-full text-left px-3 py-4 text-base font-medium text-zinc-600">Gift a Box</button>
              <button onClick={() => { setView('contact'); setIsOpen(false); }} className="block w-full text-left px-3 py-4 text-base font-medium text-zinc-600">Contact Us</button>
              {!user && (
                <button onClick={() => { setView('auth'); setIsOpen(false); }} className="mt-4 block w-full text-center bg-[#6F7E57] text-white px-3 py-4 rounded-xl font-medium">Login / Register</button>
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
              <div className="p-2 bg-brand-alt-2/20 text-[#6F7E57] rounded-xl">
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
                  className="bg-[#6F7E57] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#6F7E57]/90 transition-all"
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
                          className="p-1 hover:text-[#6F7E57] transition-colors"
                        >
                          <X size={14} className="rotate-45" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-zinc-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:text-[#6F7E57] transition-colors"
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
                className="w-full bg-[#6F7E57] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#6F7E57]/90 transition-all shadow-lg shadow-brand-primary/10 flex items-center justify-center gap-2 group"
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
)
  ;

const Hero = ({ onStart, setView }: { onStart: () => void, setView: (v: string) => void }) => {
  const [expandedTrustIdx, setExpandedTrustIdx] = useState<number | null>(null);

  const trustItems = [
    {
      label: 'Reliable',
      icon: Truck,
      detail: 'Consistent monthly deliveries scheduled to your preference, ensuring you never run out of home essentials.'
    },
    {
      label: 'Safe',
      icon: ShieldCheck,
      detail: 'Every product is strictly vetted for safety, non-toxicity, and quality before it reaches your doorstep.'
    },
    {
      label: 'Thoughtfully Sourced',
      icon: Heart,
      detail: 'We partner directly with farmers and trusted homegrown brands to ensure freshness and support the local economy.'
    },
    {
      label: 'Trusted',
      icon: CheckCircle2,
      detail: 'Join thousands of modern Nigerian households who rely on our seamless and responsible essential service.'
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col justify-center">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/front page enhanced.jpg"
          alt="Everyday Needs Box"
          className="w-full h-full object-cover object-[80%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F8F0E5] via-[#F8F0E5]/80 to-transparent" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-32 pb-16">
        <div className="max-w-2xl text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-[#6F7E57]/10 text-[#6F7E57] px-4 py-2 rounded-full text-sm font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6F7E57]/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6F7E57]"></span>
              </span>
              <span>Just In Time — Serving Lagos & Port Harcourt</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-black text-zinc-900 leading-[1.1] mb-8 tracking-tight">
              Everything Your <span className="text-[#6F7E57]">Home Needs</span>. Delivered.
            </h1>
            <p className="font-sans text-xl text-zinc-600 mb-3 leading-relaxed max-w-xl">
              From fresh farm produce to pantry essentials, baby care to home supplies — Everyday Needs delivers curated boxes of trusted essentials directly to your doorstep.
            </p>
            <p className="font-sans text-lg font-semibold mb-10 text-[#6F7E57]">
              No stress. No last-minute shopping. Just reliable living.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setView('products')}
                className="bg-[#6F7E57] text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-[#6F7E57]/90 transition-all shadow-xl shadow-brand-primary/10 flex items-center justify-center gap-2 group"
              >
                Start Your Subscription
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => setView('products')}
                className="bg-white/80 backdrop-blur-sm text-zinc-900 border-2 border-zinc-200 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white transition-all flex items-center justify-center gap-2"
              >
                Explore Our Boxes
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Bar Refined */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-12 mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#FAF5EF]/40 backdrop-blur-md rounded-[2.5rem] border border-[#6F7E57]/10 p-4 md:p-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {trustItems.map((item, i) => (
                <div key={i} className="relative">
                  <button
                    onClick={() => setExpandedTrustIdx(expandedTrustIdx === i ? null : i)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all border ${expandedTrustIdx === i
                      ? 'bg-[#6F7E57] border-[#6F7E57] text-white shadow-md'
                      : 'bg-white/60 border-transparent text-[#6F7E57] hover:bg-white hover:border-[#6F7E57]/20 shadow-sm'
                      }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 transition-colors ${expandedTrustIdx === i ? 'bg-white/20' : 'bg-[#6F7E57]/10'
                      }`}>
                      <item.icon size={22} />
                    </div>
                    <div className="flex-grow text-left">
                      <p className="text-sm font-bold tracking-tight">{item.label}</p>
                    </div>
                    <ChevronDown size={18} className={`transition-transform duration-300 ${expandedTrustIdx === i ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {expandedTrustIdx === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden z-20"
                      >
                        <div className="pt-2 px-1">
                          <div className="p-4 bg-white rounded-2xl border border-[#6F7E57]/10 text-[#6F7E57] text-xs font-medium leading-relaxed shadow-sm">
                            {item.detail}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


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
        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold uppercase tracking-wider text-[#6F7E57] rounded-full shadow-sm">
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
      <h3 className="font-serif text-xl font-bold text-zinc-900 mb-2">{product.name}</h3>
      <p className="text-sm text-zinc-500 mb-6 line-clamp-2 flex-grow leading-relaxed">{product.description}</p>
      <div className="flex items-center justify-between mt-auto">
        <div>
          <span className="text-2xl font-bold font-sans text-zinc-900">₦{product.price.toLocaleString()}</span>
          <span className="block text-xs text-[#6F7E57] font-semibold mt-1">Delivered Monthly</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => { e.stopPropagation(); onSelect(product); }}
            className="p-3 bg-zinc-100 text-zinc-900 rounded-2xl hover:bg-[#6F7E57] hover:text-white transition-all"
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
            {[
              '/images/PANTRY PROVISION.jpeg',
              '/images/PROTEIN PRIME CUT.jpeg',
              '/images/SPARKLING SANCTUARY.jpeg'
            ].map((src, i) => (
              <div key={i} className="flex-1 aspect-square rounded-2xl overflow-hidden border border-black/5 cursor-pointer hover:border-[#6F7E57] transition-all">
                <img src={src} alt={`Product view ${i + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-brand-alt-2/20 text-[#6F7E57] text-xs font-bold uppercase tracking-widest rounded-full">
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
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'details' ? 'bg-white shadow-sm text-[#6F7E57]' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              Details
            </button>
            <button
              onClick={() => setActiveTab('subscription')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'subscription' ? 'bg-white shadow-sm text-[#6F7E57]' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              Subscription Plans
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'reviews' ? 'bg-white shadow-sm text-[#6F7E57]' : 'text-zinc-500 hover:text-zinc-900'}`}
            >
              Reviews
            </button>
          </div>

          {activeTab === 'details' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
              <div className="bg-white rounded-3xl border border-black/5 p-8">
                <h3 className="font-serif text-xl font-bold mb-6">What's inside this box?</h3>
                {(() => {
                  const items = product.products || [
                    { name: 'Organic Tomatoes', quantity: 2 },
                    { name: 'Fresh Spinach', quantity: 1 },
                    { name: 'Farm Eggs', quantity: 12 },
                    { name: 'Local Honey', quantity: 1 }
                  ];
                  if (items.length > 2) {
                    return (
                      <div className="space-y-4">
                        <select className="w-full px-6 py-4 bg-[#F8F0E5] border border-zinc-200 rounded-2xl text-sm font-bold font-sans outline-none focus:ring-2 focus:ring-[#6F7E57]/20 transition-all appearance-none cursor-pointer">
                          <option value="">Select an item to view — {items.length} items included</option>
                          {items.map((item: any, i: number) => (
                            <option key={i} value={item.name}>{item.name} (Qty: {item.quantity})</option>
                          ))}
                        </select>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                          {items.map((item: any, i: number) => (
                            <div key={i} className="flex items-center gap-3 p-3 bg-[#F8F0E5] rounded-xl border border-black/5">
                              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm shrink-0">
                                <Package size={16} className="text-[#6F7E57]" />
                              </div>
                              <div>
                                <p className="font-bold text-xs text-zinc-900">{item.name}</p>
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {items.map((item: any, i: number) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-[#F8F0E5] rounded-2xl border border-black/5">
                          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                            <Package size={20} className="text-[#6F7E57]" />
                          </div>
                          <div>
                            <p className="font-bold text-sm text-zinc-900">{item.name}</p>
                            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center bg-zinc-100 rounded-2xl px-6 py-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:text-[#6F7E57] transition-colors"
                  >
                    <Plus size={20} className="rotate-45" />
                  </button>
                  <span className="w-12 text-center text-xl font-bold text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:text-[#6F7E57] transition-colors"
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
                  className="flex-[2] bg-[#6F7E57] text-white py-5 rounded-2xl font-bold hover:bg-[#6F7E57]/90 transition-all shadow-lg shadow-brand-primary/20"
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
                      ? 'border-[#6F7E57] bg-[#6F7E57]/10'
                      : 'border-black/5 bg-white hover:border-zinc-200'
                      }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.id ? 'border-[#6F7E57] bg-[#6F7E57]' : 'border-zinc-300'
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
                        <p className="text-xs text-[#6F7E57] font-bold uppercase tracking-widest">Save {plan.discount}%</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => onSubscribe(selectedPlan)}
                className="w-full bg-zinc-900 text-white py-5 rounded-2xl font-bold hover:bg-[#6F7E57] transition-all shadow-xl flex items-center justify-center gap-2"
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
                <button className="text-sm font-bold text-[#6F7E57] hover:underline">Write a Review</button>
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

      {/* Reference Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          { src: '/images/FARM FRESH PRODUCTS.jpeg', alt: 'Farm Fresh Products' },
          { src: '/images/PANTRY PROVISION (2).jpeg', alt: 'Pantry Provision' },
          { src: '/images/WELLNESS WONDER.jpeg', alt: 'Wellness Products' }
        ].map((img, i) => (
          <div key={i} className="aspect-video rounded-[2.5rem] overflow-hidden border border-black/5 shadow-sm">
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
        ))}
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
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-[#F8F0E5]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl border border-black/5 p-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-alt-2/20 rounded-2xl flex items-center justify-center text-[#6F7E57] mx-auto mb-6">
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
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-[#6F7E57] focus:border-transparent transition-all outline-none"
              placeholder="name@example.com"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">Full Name</label>
              <input
                type="text"
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-[#6F7E57] focus:border-transparent transition-all outline-none"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:ring-2 focus:ring-[#6F7E57] focus:border-transparent transition-all outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={() => onLogin(email || 'user@example.com')}
            className="w-full bg-[#693311] text-white py-4 rounded-2xl font-bold hover:bg-[#693311]/90 transition-all shadow-lg"
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
            className="text-sm font-bold text-[#693311] hover:underline"
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
      color: 'bg-[#6F7E57]/10'
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
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#6F7E57] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
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
                  <CheckCircle2 size={18} className="text-[#6F7E57]" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => onSelect(plan.id)}
              className={`w-full py-4 rounded-2xl font-bold transition-all ${plan.id === 'annual'
                ? 'bg-[#6F7E57] text-white hover:bg-[#6F7E57]/90'
                : 'bg-zinc-900 text-white hover:bg-[#6F7E57]'
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
            <span className="text-sm font-bold text-[#6F7E57]">Step {step} of 2</span>
          </div>
          <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
            <div className={`h-full bg-[#6F7E57] transition-all duration-500 ${step === 1 ? 'w-1/2' : 'w-full'}`} />
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
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57]"
                placeholder="Everyday Farms"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">Business Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57]"
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
                className="flex-[2] bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-[#6F7E57] transition-all"
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
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57]"
                placeholder="RC1234567"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">Business Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57] h-32"
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
                className="flex-[2] bg-[#6F7E57] text-white py-4 rounded-2xl font-bold hover:bg-[#6F7E57]/90 transition-all shadow-lg shadow-brand-primary/20"
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
              ? 'bg-white text-[#6F7E57] shadow-sm'
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
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#6F7E57]/20"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">End Date</label>
              <input
                type="date"
                value={customDates.end}
                onChange={(e) => setCustomDates({ ...customDates, end: e.target.value })}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#6F7E57]/20"
              />
            </div>
            <button
              onClick={() => {
                onFilterChange('custom', customDates);
                setShowDatePicker(false);
              }}
              className="w-full py-2 bg-[#6F7E57] text-white rounded-lg text-xs font-bold hover:bg-[#6F7E57]/90 transition-all"
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
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57]"
                placeholder="Organic Tomato Box"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-zinc-700 mb-2">Price (₦)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57]"
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
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57]"
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
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57]"
                placeholder="100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57] h-32"
              placeholder="Describe your product..."
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-zinc-700 mb-2">Product Images</label>
            <div className="grid grid-cols-4 gap-4">
              <button className="aspect-square bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-zinc-400 hover:border-[#6F7E57]/50 hover:text-[#6F7E57] transition-all">
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
            <button onClick={() => onSubmit(formData)} className="flex-[2] bg-[#6F7E57] text-white py-4 rounded-2xl font-bold hover:bg-[#6F7E57]/90 transition-all shadow-lg shadow-brand-primary/20">
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
          <div className="w-12 h-12 bg-brand-alt-2/20 rounded-2xl flex items-center justify-center text-[#6F7E57]">
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
                <span className="font-bold text-[#6F7E57]">{order.amount}</span>
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
                  ? (s === 'Rejected' ? 'bg-red-600 text-white' : 'bg-[#6F7E57] text-white')
                  : 'bg-zinc-100 text-zinc-500 hover:bg-zinc-200'
                  }`}
              >
                {s}
              </button>
            ))}
          </div>

          {status === 'On Transit' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-[#6F7E57]/10 rounded-2xl border border-[#6F7E57]/20 animate-in fade-in slide-in-from-top-2">
              <div>
                <label className="block text-xs font-bold text-[#6F7E57] uppercase tracking-widest mb-1.5">Tracking Code</label>
                <input
                  type="text"
                  value={transitDetails.trackingCode}
                  onChange={(e) => setTransitDetails({ ...transitDetails, trackingCode: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-[#6F7E57]/20 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F7E57]/20"
                  placeholder="TRK-123456"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#6F7E57] uppercase tracking-widest mb-1.5">Courier Phone</label>
                <input
                  type="text"
                  value={transitDetails.phone}
                  onChange={(e) => setTransitDetails({ ...transitDetails, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-[#6F7E57]/20 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F7E57]/20"
                  placeholder="+234..."
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#6F7E57] uppercase tracking-widest mb-1.5">Company Name</label>
                <input
                  type="text"
                  value={transitDetails.company}
                  onChange={(e) => setTransitDetails({ ...transitDetails, company: e.target.value })}
                  className="w-full px-4 py-2 bg-white border border-[#6F7E57]/20 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F7E57]/20"
                  placeholder="GIG Logistics"
                />
              </div>
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button onClick={onClose} className="flex-1 py-4 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 transition-all">Close</button>
            <button
              onClick={() => onUpdateStatus(order.id, status, status === 'On Transit' ? transitDetails : null)}
              className="flex-[2] bg-zinc-900 text-white py-4 rounded-2xl font-bold hover:bg-[#6F7E57] transition-all"
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
                    ? 'border-[#6F7E57]/50 bg-[#6F7E57]/10'
                    : 'border-zinc-200 hover:border-[#6F7E57]/20'
                    }`}
                >
                  <span className="text-sm font-bold text-zinc-900">{plan} Plan</span>
                  {selectedPlan === plan && <div className="w-4 h-4 bg-[#6F7E57]/100 rounded-full flex items-center justify-center"><Check size={10} className="text-white" /></div>}
                </button>
              ))}
            </div>
            <div className="flex gap-4 pt-4">
              <button onClick={() => setView('main')} className="flex-1 py-4 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50">Back</button>
              <button onClick={() => { alert('Plan updated! Notification sent to user.'); setView('main'); }} className="flex-[2] bg-[#6F7E57] text-white py-4 rounded-2xl font-bold hover:bg-[#6F7E57]/90 transition-all">Update Plan</button>
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
              <button onClick={() => { alert('Subscription cancelled! Notification sent to user.'); setView('main'); onClose(); }} className="flex-[2] bg-[#6F7E57] text-white py-4 rounded-2xl font-bold hover:bg-[#6F7E57]/90 transition-all">Confirm Cancellation</button>
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
                <span className="px-3 py-1 bg-brand-alt-2/20 text-[#6F7E57] text-xs font-bold rounded-full uppercase tracking-wider">Active</span>
                <span className="text-sm font-bold text-zinc-900">{subscription.plan || 'Monthly'} Plan</span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <button onClick={() => setView('change-plan')} className="w-full flex items-center justify-between p-4 bg-white border border-zinc-200 rounded-2xl hover:border-[#6F7E57] transition-all group">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-brand-alt-2/20 text-[#6F7E57] rounded-lg group-hover:bg-[#6F7E57] group-hover:text-white transition-colors">
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
            <button onClick={onClose} className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-[#6F7E57] transition-all mt-4">Done</button>
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

  const getTheme = () => {
    switch (user.role) {
      case 'seller': return { primary: '#693311', secondary: '#f7ebc3' };
      case 'admin': return { primary: '#575B44', secondary: '#F8F0E5' };
      case 'buyer':
      default: return { primary: '#6F7E57', secondary: '#FAF5EF' };
    }
  };
  const theme = getTheme();

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ backgroundColor: theme.primary }}>
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-zinc-200 flex flex-col h-full transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'w-20' : 'w-[240px]'
          }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-zinc-100 shrink-0">
          {!isSidebarCollapsed && (
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
              <div className="w-8 h-8 bg-[#6F7E57] rounded-lg flex items-center justify-center text-white font-bold">E</div>
              <span className="text-lg font-bold tracking-tight text-zinc-900">Everyday</span>
            </div>
          )}
          {isSidebarCollapsed && (
            <div className="w-8 h-8 bg-[#6F7E57] rounded-lg flex items-center justify-center text-white font-bold mx-auto">E</div>
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
                      ? 'bg-brand-alt-2/20 text-[#6F7E57]'
                      : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900'
                      }`}
                  >
                    <item.icon size={18} className={activeTab === item.id ? 'text-[#6F7E57]' : 'text-zinc-400 group-hover:text-zinc-900'} />
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
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[#6F7E57] bg-brand-alt-2/20 hover:bg-brand-alt-2/30 transition-all group mb-2"
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
                    <p className="text-xs font-bold text-zinc-900 group-hover:text-[#6F7E57] transition-colors">{user.name}</p>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{user.role}</p>
                  </div>
                  <div className="w-9 h-9 bg-brand-alt-2/20 rounded-xl flex items-center justify-center text-[#6F7E57] font-bold text-sm hover:bg-brand-alt-2/30 transition-colors">
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
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${user.role === 'buyer' ? 'bg-brand-alt-2/20 text-[#6F7E57]' : 'text-zinc-600 hover:bg-zinc-50'}`}
                      >
                        <Users size={14} />
                        Buyer Mode
                      </button>
                      <button
                        onClick={() => { onSwitchRole('seller'); setIsUserMenuOpen(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${user.role === 'seller' ? 'bg-brand-alt-2/20 text-[#6F7E57]' : 'text-zinc-600 hover:bg-zinc-50'}`}
                      >
                        <ShoppingBag size={14} />
                        Seller Mode
                      </button>
                      <button
                        onClick={() => { onSwitchRole('admin'); setIsUserMenuOpen(false); }}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold transition-colors ${user.role === 'admin' ? 'bg-brand-alt-2/20 text-[#6F7E57]' : 'text-zinc-600 hover:bg-zinc-50'}`}
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
        <div className="flex-grow overflow-y-auto" style={{ backgroundColor: theme.secondary }}>
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
                { label: 'Active Subscriptions', value: subscriptions.length.toString(), color: 'text-[#6F7E57]', icon: Package, bg: 'bg-brand-alt-2/20' },
                { label: 'Next Delivery', value: subscriptions.length > 0 ? 'Mar 25' : 'N/A', color: 'text-brand-alt-1', icon: Truck, bg: 'bg-brand-alt-1/10' },
                { label: 'Total Saved', value: '₦12,400', color: 'text-brand-secondary', icon: Wallet, bg: 'bg-brand-secondary/10' },
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
                <button className="text-xs font-bold text-[#6F7E57] hover:underline">View All</button>
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
                    <p className="text-sm text-zinc-500 ">No recent activity found.</p>
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
              <button onClick={() => setView('products')} className="bg-[#6F7E57] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#6F7E57]/90 transition-all">Add New</button>
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
                            <span className="text-xs font-bold text-[#6F7E57] uppercase tracking-widest">
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
                        <span className="px-2 py-1 bg-brand-alt-2/20 text-xs font-bold uppercase tracking-wider text-[#6F7E57] rounded-lg">
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
                    className="bg-[#6F7E57] text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-[#6F7E57]/90 transition-all"
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
                <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-1.5 bg-zinc-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#6F7E57]/20 w-48" />
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
                        <span className="px-2 py-1 bg-brand-alt-2/20 text-xs font-bold uppercase tracking-wider text-[#6F7E57] rounded-lg">
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
                  <button className="mt-2 text-xs font-bold text-[#6F7E57] hover:underline">Upload New</button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Full Name</label>
                  <input type="text" defaultValue={user.name} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F7E57]/20" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Email Address</label>
                  <input type="email" defaultValue={user.email} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F7E57]/20" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Delivery Address</label>
                <textarea className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F7E57]/20 h-24" placeholder="Enter your delivery address..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Phone Number</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F7E57]/20" placeholder="+234..." />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">City</label>
                  <input type="text" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F7E57]/20" placeholder="Lagos" />
                </div>
              </div>

              <button className="bg-zinc-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#6F7E57] transition-all">Save Changes</button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Notifications</h3>
              <button className="text-xs font-bold text-[#6F7E57]">Mark all as read</button>
            </div>
            <div className="divide-y divide-zinc-100">
              {[
                { title: 'Subscription Renewed', time: '2 days ago', icon: Package, color: 'text-[#6F7E57]', bg: 'bg-brand-alt-2/20' },
                { title: 'New Product Suggestion', time: '1 week ago', icon: ShoppingBag, color: 'text-brand-alt-1', bg: 'bg-brand-alt-1/10' },
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
                { label: 'Total Sales', value: '₦450,000', trend: '+15%', icon: Wallet, color: 'text-[#6F7E57]', bg: 'bg-brand-alt-2/20' },
                { label: 'Active Orders', value: '12', trend: '+2', icon: ClipboardList, color: 'text-brand-alt-1', bg: 'bg-brand-alt-1/10' },
                { label: 'Products', value: '8', trend: 'Stable', icon: ShoppingBag, color: 'text-brand-secondary', bg: 'bg-brand-secondary/10' },
                { label: 'Store Rating', value: '4.8/5', trend: 'Top 5%', icon: Star, color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map((stat, i) => (
                <div key={i} className="p-5 bg-white rounded-xl border border-zinc-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 ${stat.bg} ${stat.color} rounded-lg`}>
                      <stat.icon size={20} />
                    </div>
                    <div className="text-xs font-bold text-[#6F7E57]">{stat.trend}</div>
                  </div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-0.5">{stat.label}</p>
                  <p className="text-xl font-bold text-zinc-900">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-zinc-900">Recent Orders</h3>
                <button className="text-xs font-bold text-[#6F7E57] hover:underline">View All</button>
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
                              'bg-brand-alt-2/20 text-[#6F7E57]'
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
                  <input type="text" placeholder="Search my products..." className="pl-9 pr-4 py-1.5 bg-zinc-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#6F7E57]/20 w-48" />
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="bg-[#6F7E57] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#6F7E57]/90 transition-all flex items-center gap-2"
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
                    <span className="text-sm font-bold text-[#6F7E57]">₦15,000</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingProduct({ id: i, name: `Fresh Produce Box #${i}`, price: 15000, category: 'Fresh Farm', image_url: `https://picsum.photos/seed/seller-prod-${i}/400/300` });
                          setIsProductModalOpen(true);
                        }}
                        className="text-xs font-bold text-zinc-400 hover:text-[#6F7E57] transition-colors"
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
                  <button className="mt-2 text-xs font-bold text-[#6F7E57] hover:underline">Upload Logo</button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Store Name</label>
                <input type="text" defaultValue={`${user.name}'s Farm`} className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F7E57]/20" />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Store Description</label>
                <textarea className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F7E57]/20 h-24" placeholder="Tell customers about your store..."></textarea>
              </div>

              <div className="pt-4 border-t border-zinc-100">
                <h4 className="text-xs font-bold text-zinc-900 mb-4">Pickup Location</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Address</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F7E57]/20" placeholder="Farm Address" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Contact Phone</label>
                    <input type="text" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F7E57]/20" placeholder="+234..." />
                  </div>
                </div>
              </div>

              <button className="bg-zinc-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#6F7E57] transition-all">Save Store Info</button>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-zinc-900">Notifications</h3>
              <button className="text-xs font-bold text-[#6F7E57]">Mark all as read</button>
            </div>
            <div className="divide-y divide-zinc-100">
              {[
                { title: 'New Order Received', time: '2 mins ago', icon: ShoppingBag, color: 'text-[#6F7E57]', bg: 'bg-brand-alt-2/20' },
                { title: 'Payout Successful', time: '1 day ago', icon: Wallet, color: 'text-brand-alt-1', bg: 'bg-brand-alt-1/10' },
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
                <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-1.5 bg-zinc-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#6F7E57]/20 w-48" />
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
                            'bg-brand-alt-2/20 text-[#6F7E57]'
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
                { label: 'Available Balance', value: '₦120,500', icon: Wallet, color: 'text-[#6F7E57]', bg: 'bg-brand-alt-2/20' },
                { label: 'Pending Clearance', value: '₦45,000', icon: History, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Total Earned', value: '₦850,000', icon: BarChart3, color: 'text-brand-alt-1', bg: 'bg-brand-alt-1/10' },
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
                <button className="text-xs font-bold text-[#6F7E57] bg-brand-alt-2/20 px-4 py-2 rounded-lg hover:bg-brand-alt-2/30 transition-colors">Withdraw Funds</button>
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
                        <td className={`px-4 text-sm font-bold ${tx.type === 'credit' ? 'text-[#6F7E57]' : 'text-zinc-900'}`}>{tx.amount}</td>
                        <td className="px-4">
                          <span className="px-2 py-1 bg-brand-alt-2/20 text-xs font-bold uppercase tracking-wider text-[#6F7E57] rounded-lg">
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
              <div className="h-[300px] w-full bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 ">
                Seller Analytics Chart Visualization
              </div>
            </div>
          </div>
        );
      default:
        return <div className="p-20 text-center text-zinc-400 ">Section coming soon...</div>;
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
  const COLORS = ['#704723', '#283d45', '#7495ad'];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Monthly Revenue', value: '₦4.2M', trend: '+12.5%', icon: Wallet, color: 'text-[#6F7E57]', bg: 'bg-brand-alt-2/20' },
                { label: 'Active Subscribers', value: '1,240', trend: '+8.2%', icon: Users, color: 'text-brand-alt-1', bg: 'bg-brand-alt-1/10' },
                { label: 'Pending Orders', value: '42', trend: '-3.1%', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
                { label: 'Inventory Alerts', value: '5', trend: 'Critical', icon: Package, color: 'text-red-600', bg: 'bg-red-50' },
              ].map((stat, i) => (
                <div key={i} className="p-5 bg-white rounded-xl border border-zinc-200 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2 ${stat.bg} ${stat.color} rounded-lg`}>
                      <stat.icon size={20} />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend.startsWith('+') ? 'text-[#6F7E57]' : 'text-red-500'}`}>
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
                  <button className="text-xs font-bold text-[#6F7E57] hover:underline">Download Report</button>
                </div>
                <div className="h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#704723" stopOpacity={0.1} />
                          <stop offset="95%" stopColor="#704723" stopOpacity={0} />
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
                      <Area type="monotone" dataKey="value" stroke="#704723" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
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
                <button className="text-xs font-bold text-[#6F7E57] hover:underline">View All Orders</button>
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
                              'bg-brand-alt-2/20 text-[#6F7E57]'
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
                  <input type="text" placeholder="Search orders..." className="pl-9 pr-4 py-1.5 bg-zinc-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#6F7E57]/20 w-48" />
                </div>
                <button className="px-3 py-1.5 bg-zinc-100 rounded-lg text-xs font-bold text-zinc-600 flex items-center gap-2 hover:bg-zinc-200 transition-all">
                  <Filter size={14} />
                  Filter
                </button>
                <button className="px-3 py-1.5 bg-[#6F7E57] rounded-lg text-xs font-bold text-white hover:bg-[#6F7E57]/90 transition-all">Export</button>
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
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-brand-alt-2/20 text-[#6F7E57]' :
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
              { name: 'Monthly Plan', users: 450, growth: '+12%', color: 'border-[#6F7E57]' },
              { name: 'Quarterly Plan', users: 320, growth: '+5%', color: 'border-brand-alt-1' },
              { name: 'Annual Plan', users: 180, growth: '+20%', color: 'border-brand-alt-2' },
            ].map((plan, i) => (
              <div key={i} className={`p-6 bg-white rounded-xl border-l-4 ${plan.color} shadow-sm`}>
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{plan.name}</h4>
                <p className="text-2xl font-bold text-zinc-900">{plan.users}</p>
                <p className="text-xs text-[#6F7E57] font-bold mt-2">{plan.growth} growth</p>
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
                      <div className="w-10 h-10 bg-brand-alt-2/20 rounded-lg flex items-center justify-center text-[#6F7E57] font-bold">U</div>
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
                      className="text-xs font-bold text-[#6F7E57] hover:underline"
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
                  <input type="text" placeholder="Search products..." className="pl-9 pr-4 py-1.5 bg-zinc-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#6F7E57]/20 w-48" />
                </div>
              </div>
              <button
                onClick={() => {
                  setEditingProduct(null);
                  setIsProductModalOpen(true);
                }}
                className="bg-[#6F7E57] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#6F7E57]/90 transition-all flex items-center gap-2"
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
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${item.status === 'Healthy' ? 'bg-brand-alt-2/20 text-[#6F7E57]' :
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
                    <span className="text-xs font-bold text-[#6F7E57]">4.9 Rating</span>
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
                <input type="text" placeholder="Search payments..." className="pl-9 pr-4 py-1.5 bg-zinc-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#6F7E57]/20 w-48" />
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
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${trx.status === 'Successful' ? 'bg-brand-alt-2/20 text-[#6F7E57]' :
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
                <input type="text" placeholder="Search customers..." className="pl-9 pr-4 py-1.5 bg-zinc-100 rounded-lg text-xs outline-none focus:ring-2 focus:ring-[#6F7E57]/20 w-64" />
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
                      <p className="text-sm font-bold text-[#6F7E57]">₦{150 + i * 20},000</p>
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
                      <button className="p-1.5 bg-white border border-zinc-200 rounded-lg text-zinc-500 hover:text-[#6F7E57] transition-colors">
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
                      <button className="p-1.5 bg-white border border-zinc-200 rounded-lg text-zinc-500 hover:text-[#6F7E57] transition-colors">
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
                <div className="flex items-center gap-1 text-xs font-bold text-[#6F7E57] mt-1">
                  <TrendingUp size={12} />
                  +0.5% from last month
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-sm">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Average Order Value</h4>
                <p className="text-2xl font-bold text-zinc-900">₦18,500</p>
                <div className="flex items-center gap-1 text-xs font-bold text-[#6F7E57] mt-1">
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
              <div className="h-[300px] w-full bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-400 ">
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
                className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#6F7E57]/90 transition-all flex items-center gap-2"
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
                        <span className={`px-2 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${admin.status === 'Active' ? 'bg-brand-alt-2/20 text-[#6F7E57]' : 'bg-zinc-100 text-zinc-500'
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
              <button className="text-xs font-bold text-[#6F7E57]">Mark all as read</button>
            </div>
            <div className="divide-y divide-zinc-100">
              {[
                { title: 'New Order Received', time: '2 mins ago', icon: ShoppingBag, color: 'text-[#6F7E57]', bg: 'bg-brand-alt-2/20' },
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
                  <input type="text" defaultValue="Everyday Needs" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F7E57]/20" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1.5">Support Email</label>
                  <input type="email" defaultValue="support@everydayneeds.ng" className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6F7E57]/20" />
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
              <button className="bg-zinc-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#6F7E57]/90 transition-all">Save Settings</button>
            </div>
          </div>
        );
      default:
        return <div className="p-20 text-center text-zinc-400 ">Admin section coming soon...</div>;
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
              <div className="w-12 h-12 bg-brand-alt-2/20 rounded-2xl flex items-center justify-center text-[#6F7E57]">
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
                  <p className="text-sm font-bold text-[#6F7E57]">{selectedPayment.amount}</p>
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
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${selectedPayment.status === 'Successful' ? 'bg-brand-alt-2/20 text-[#6F7E57]' :
                  selectedPayment.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                  {selectedPayment.status}
                </span>
              </div>
              <button onClick={() => setIsPaymentModalOpen(false)} className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-[#6F7E57]/90 transition-all">Close</button>
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
                <input type="text" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57]" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57]" placeholder="admin@everydayneeds.ng" />
              </div>
              <div>
                <label className="block text-sm font-bold text-zinc-700 mb-2">Role</label>
                <select className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57]">
                  <option>Super Admin</option>
                  <option>Editor</option>
                  <option>Support</option>
                </select>
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={() => setIsAdminUserModalOpen(false)} className="flex-1 py-4 border border-zinc-200 rounded-2xl font-bold hover:bg-zinc-50 transition-all">Cancel</button>
                <button onClick={() => setIsAdminUserModalOpen(false)} className="flex-[2] bg-[#6F7E57] text-white py-4 rounded-2xl font-bold hover:bg-[#6F7E57]/90 transition-all">
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
  { id: 1, name: "Pantry Provisions Box", description: "Core pantry essentials. Rice, cereals, pasta, canned goods, cooking basics.", price: 65400, image_url: "/images/PANTRY PROVISION.jpeg", category: "Pantry Essentials" },
  { id: 2, name: "Farm Fresh Harvest Box", description: "Fresh vegetables and fruits sourced directly from trusted farmers.", price: 156200, image_url: "/images/FARM FRESH PRODUCTS.jpeg", category: "Fresh Farm" },
  { id: 3, name: 'Prime Cuts Box', description: 'Quality meats and protein essentials.', image_url: '/images/PROTEIN PRIME CUT.jpeg', price: 22000, category: 'Prime Protein' },
  { id: 4, name: "Morning Essentials Box", description: "Breakfast staples including cereals, beverages, oats, and spreads.", price: 56200, image_url: "/images/SUNRISE ESSENTIALS.jpeg", category: "Pantry Essentials" },
  { id: 5, name: "Pure Bliss Pamper Kit", description: "Personal hygiene, toiletries, and care essentials.", price: 73400, image_url: "/images/Radiant Glow Kit.jpeg", category: "Beauty & Wellness" },
  { id: 6, name: "Little Bundle of Joy", description: "Baby care essentials including diapers, wipes, and baby toiletries.", price: 136000, image_url: "/images/LITTLE BUNDLE OF JOY.jpeg", category: "Baby & Kids" },
  { id: 7, name: "Sparkling Sanctuary Solutions", description: "Home cleaning and sanitation essentials.", price: 40900, image_url: "/images/SPARKLING SANCTUARY.jpeg", category: "Home Care" },
  { id: 8, name: "Zen Wellness Wonders", description: "Health and wellness products for vitality.", price: 25000, image_url: "/images/WELLNESS WONDER.jpeg", category: "Beauty & Wellness" },
  { id: 9, name: "Gourmet Pleasure Box", description: "Exclusive selection of gourmet delights and premium treats.", price: 230000, image_url: "/images/GOURMET PLEASURE BOX.jpeg", category: "Gourmet" },
  { id: 10, name: "Radiant Glow Kit", description: "Premium beauty and skincare essentials for a healthy glow.", price: 77000, image_url: "/images/Radiant Glow Kit.jpeg", category: "Beauty & Wellness" },
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
  const [pendingAction, setPendingAction] = useState<{ type: 'buy' | 'subscribe', payload: any } | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [view, selectedProduct]);

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
      setPendingAction({ type: 'buy', payload: { product, amount } });
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

    if (pendingAction) {
      if (pendingAction.type === 'buy') {
        handleBuyNow(pendingAction.payload.product, pendingAction.payload.amount);
      } else if (pendingAction.type === 'subscribe') {
        handleSubscribe(pendingAction.payload.plan);
      }
      setPendingAction(null);
    }
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
      setPendingAction({ type: 'subscribe', payload: { plan } });
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
    <div className="min-h-screen bg-white font-sans text-zinc-900 selection:bg-brand-alt-2 selection:text-[#6F7E57]">
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
            <div className="w-8 h-8 bg-[#6F7E57] rounded-lg flex items-center justify-center">
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

              {/* Our Difference Section - Inverted: cream bg, green text */}
              <section className="py-24 bg-[#F8F0E5] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-6xl font-black tracking-tight mb-4 text-[#6F7E57]">Our Difference</h2>
                    <p className="font-sans text-xl text-zinc-600 mt-4 max-w-2xl mx-auto leading-relaxed">Thoughtfully sourced. Reliably delivered. Designed for real homes.</p>
                  </div>

                  {/* Feature cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {[
                      { title: 'Farm Partnerships', desc: 'Sourced directly from farmers for superior freshness.', icon: Truck },
                      { title: 'Non-Toxic Priority', desc: 'Every product is vetted for safety and environmental impact.', icon: ShieldCheck },
                      { title: 'Subscription Reliability', desc: 'Never run out of essentials with our automated delivery system.', icon: Calendar },
                      { title: 'Woman-Driven Insight', desc: 'Built with a deep understanding of household management.', icon: Heart },
                    ].map((feature, i) => (
                      <div key={i} className="p-8 bg-[#6F7E57]/10 rounded-[2.5rem] border border-[#6F7E57]/15 hover:bg-[#6F7E57]/15 transition-colors group">
                        <div className="w-14 h-14 bg-[#6F7E57]/15 rounded-2xl flex items-center justify-center text-[#6F7E57] shadow-sm mb-6 group-hover:bg-[#6F7E57] group-hover:text-white transition-colors">
                          <feature.icon size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-[#6F7E57]">{feature.title}</h3>
                        <p className="text-sm text-zinc-600 leading-relaxed font-sans">{feature.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Main body: text + image side by side */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-white rounded-[3rem] border border-[#6F7E57]/10 shadow-sm p-10 lg:p-16">
                    {/* Text column */}
                    <div className="space-y-6">
                      <h3 className="font-serif text-2xl font-bold text-[#6F7E57]">Everyday Needs is built differently.</h3>
                      <p className="font-sans text-base text-zinc-700 leading-relaxed text-justify">
                        We partner directly with farmers, trusted manufacturers, and quality suppliers to deliver superior, safer, and fresher essentials into your home.
                      </p>
                      <p className="font-sans text-base text-zinc-700 leading-relaxed text-justify font-semibold">We prioritize:</p>
                      <ul className="space-y-3">
                        {[
                          'Farm-fresh produce sourced directly from farmers',
                          'Homegrown Nigerian brands and products',
                          'Non-toxic and safer home and personal care products',
                          'High-quality pantry and household essentials',
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-[#6F7E57] text-lg font-bold shrink-0">✓</span>
                            <span className="font-sans text-base text-zinc-700 leading-relaxed text-justify">{item}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="font-sans text-base text-zinc-700 leading-relaxed text-justify">
                        Every product is selected with care, intention, and responsibility. Because what enters your home matters. We prioritize safer, non-toxic, and wellness-aligned products wherever possible. Everyday Needs is not just convenient. It is responsible.
                      </p>
                    </div>
                    {/* Image column */}
                    <div className="relative">
                      <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl">
                        <img
                          src="/images/Thoughtful Sourcing. Superior Living2.jpeg"
                          alt="Thoughtful sourcing at Everyday Needs"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Female-Driven Insight Section */}
              <section className="py-24 bg-brand-secondary overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <span className="text-[#F8F0E5]/60 font-bold uppercase tracking-[0.3em] text-sm mb-12 block">Female-Driven Insight</span>
                  <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                      <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-8 text-[#F8F0E5]">Built by Women Who Understand Real Homes</h2>
                      <div className="space-y-6 text-lg text-[#F8F0E5]/80 leading-relaxed">
                        <p className="text-[#F8F0E5]">Everyday Needs is proudly woman-driven.</p>
                        <p className="text-[#F8F0E5]/80">Created from real household experience, Everyday Needs understands the daily realities of running homes, managing families, balancing careers, and caring for loved ones.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
                          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                            <p className="text-[#F8F0E5] font-bold">We know what runs out.</p>
                          </div>
                          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                            <p className="text-[#F8F0E5] font-bold">We know what gets forgotten.</p>
                          </div>
                          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-center">
                            <p className="text-[#F8F0E5] font-bold">We know what homes truly need.</p>
                          </div>
                        </div>
                        <p className="pt-6 font-medium text-[#F8F0E5]">This insight shapes everything we deliver. Not guesswork. Real understanding.</p>
                      </div>
                    </div>
                    <div className="lg:w-1/2 relative">
                      <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl transition-transform hover:scale-[1.02] duration-700">
                        <img src="/images/Women in the kitchen.JPG" alt="Woman-driven insight" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* How It Works */}
              <section className="py-24 bg-[#FAF5EF] overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                  <span className="text-zinc-600 font-bold uppercase tracking-[0.3em] text-sm mb-12 block">How It Works</span>
                  <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2">
                      <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-8 text-zinc-900">Simple. Reliable. Seamless.</h2>
                      <div className="space-y-12">
                        {[
                          { step: '01', title: 'Choose Your Box', desc: 'Select from our curated essential boxes based on your lifestyle and needs.' },
                          { step: '02', title: 'Subscribe', desc: 'Choose monthly, quarterly, or annual delivery plans.' },
                          { step: '03', title: 'We Deliver', desc: 'Your Everyday Needs box arrives at your doorstep.' },
                          { step: '04', title: 'Live Better', desc: 'Enjoy convenience, peace of mind, and uninterrupted home living.' },
                        ].map((step, i) => (
                          <div key={i} className="flex gap-6">
                            <span className="text-4xl font-bold text-[#6F7E57] opacity-60 font-mono">{step.step}</span>
                            <div>
                              <h3 className="text-xl font-bold mb-2 text-zinc-900">{step.title}</h3>
                              <p className="text-zinc-700 leading-relaxed">{step.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => setView('products')}
                        className="mt-12 bg-[#6F7E57] text-[#F8F0E5] px-8 py-4 rounded-full font-bold hover:bg-[#6F7E57]/90 transition-all shadow-lg"
                      >
                        Subscribe Now
                      </button>
                    </div>
                    <div className="lg:w-1/2 relative">
                      <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3">
                        <img src="/images/harvest_box_classic.jpeg" alt="Delivery" className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Our Boxes Section */}
              <section className="py-24 bg-[#F8F0E5]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
                    <div className="max-w-xl">
                      <h2 className="font-serif text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 mb-4">Curated Boxes for Every Essential Need</h2>
                      <p className="text-lg text-zinc-500">Quality, reliability, and peace of mind delivered in every box.</p>
                    </div>
                    <button
                      onClick={() => setView('products')}
                      className="bg-[#6F7E57] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#6F7E57]/90 transition-all shadow-lg"
                    >
                      View All Boxes
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {MOCK_BOXES.slice(0, 4).map((product) => (
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
                </div>
              </section>

              {/* Our Sourcing Promise Section */}
              <section className="py-24 bg-[#6F7E57]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <span className="text-[#F8F0E5]/60 font-bold uppercase tracking-[0.3em] text-sm mb-12 block">Our Sourcing Promise</span>
                  <div className="grid lg:grid-cols-2 gap-16 items-start">
                    <div className="space-y-10">
                      <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-[#F8F0E5] leading-tight">Thoughtful Sourcing. Superior Living.</h2>
                      <div className="space-y-6">
                        <p className="text-xl text-[#F8F0E5] leading-relaxed font-sans">
                          Our sourcing model is our strength. We work directly with:
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                          {[
                            'Farmers',
                            'Trusted manufacturers',
                            'Homegrown Nigerian brands',
                            'Verified suppliers'
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-[#F8F0E5] rounded-full" />
                              <span className="font-bold text-[#F8F0E5] font-sans">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-6 bg-white/5 p-8 rounded-[2rem] border border-white/10">
                        <p className="font-bold text-[#F8F0E5] text-lg font-sans">This ensures:</p>
                        <div className="grid grid-cols-2 gap-6">
                          {[
                            'Fresher products',
                            'Safer ingredients',
                            'Reliable quality',
                            'Stronger local economic support'
                          ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-[#F8F0E5]/90">
                              <CheckCircle2 size={18} className="text-[#F8F0E5]" />
                              <span className="font-sans font-medium">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-lg font-sans text-[#F8F0E5]/90 leading-relaxed">
                        We prioritize safer, non-toxic, and wellness-aligned products wherever possible. Everyday Needs is not just convenient. It is responsible.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-8 items-stretch pt-12 lg:pt-0">
                      <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl bg-zinc-100 transition-transform hover:scale-[1.02] duration-500">
                        <img
                          src="/images/sourcing.JPG"
                          alt="Farm Fresh"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl bg-zinc-100 transition-transform hover:scale-[1.02] duration-500 mt-12">
                        <img
                          src="/images/sourcing 2.JPG"
                          alt="Quality Brands"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Why Customers Choose Section */}
              <section className="py-24 bg-[#F8F0E5]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4 text-zinc-900">The Smarter Way to Supply Your Home</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {[
                      { title: 'Convenience', desc: 'No more emergency store runs.', icon: ShoppingCart },
                      { title: 'Reliability', desc: 'Never run out of essentials.', icon: Calendar },
                      { title: 'Safety & Quality', desc: 'Trusted sourcing standards.', icon: ShieldCheck },
                      { title: 'Time Saving', desc: 'Focus on what matters most.', icon: Truck },
                      { title: 'Cost Efficiency', desc: 'Bundled value and savings.', icon: Wallet },
                      { title: 'Peace of Mind', desc: 'Your home runs smoothly.', icon: Heart }
                    ].map((reason, i) => (
                      <div key={i} className="p-8 bg-white rounded-[2rem] border border-black/5 hover:border-[#6F7E57]/20 transition-all text-center group">
                        <div className="w-12 h-12 bg-[#F8F0E5] rounded-2xl flex items-center justify-center text-[#6F7E57] mx-auto mb-6 group-hover:bg-[#6F7E57] group-hover:text-white transition-colors shadow-sm">
                          <reason.icon size={20} />
                        </div>
                        <h4 className="font-bold text-zinc-900 mb-2 font-sans">{reason.title}</h4>
                        <p className="text-sm text-zinc-500 leading-relaxed font-sans">{reason.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Testimonial Section */}
              <section className="py-24 bg-[#693311] overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <h2 className="font-serif text-3xl font-bold text-center mb-16 text-[#F8F0E5]">Trusted by Modern Households</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                      { quote: "Everyday Needs has removed the stress of managing my household supplies.", author: "Ada, Lagos" },
                      { quote: "This service saves me valuable time every month.", author: "Tunde, Abuja" },
                      { quote: "The quality and reliability are unmatched.", author: "Chioma, Port Harcourt" }
                    ].map((t, i) => (
                      <div key={i} className="relative p-10 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-colors">
                        <div className="flex gap-1 mb-6">
                          {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className="fill-amber-400 text-amber-400" />)}
                        </div>
                        <p className="text-xl font-medium leading-relaxed mb-8 text-[#F8F0E5] font-sans">"{t.quote}"</p>
                        <p className="text-[#f7ebc3] font-bold uppercase tracking-widest text-sm font-sans">— {t.author}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Call to Action Section */}
              <section className="py-24 bg-[#F8F0E5]">
                <div className="max-w-4xl mx-auto text-center px-4">
                  <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-8">Simplify Your Home Today</h2>
                  <p className="text-xl text-zinc-500 mb-10 leading-relaxed font-sans">Join thousands of households using Everyday Needs.</p>
                  <button
                    onClick={() => setView('products')}
                    className="bg-[#575B44] text-white px-12 py-5 rounded-2xl font-bold text-lg hover:bg-[#575B44]/90 transition-all shadow-xl shadow-black/10"
                  >
                    Start Your Subscription
                  </button>
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
                  <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#693311] mb-4">Explore Our Boxes</h2>
                  <p className="text-lg text-zinc-500 leading-relaxed">Carefully curated essentials for every Nigerian home. Choose a box that fits your lifestyle.</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  <div className="relative flex-grow sm:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      className="w-full pl-12 pr-6 py-4 bg-white border border-black/5 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57]/20 transition-all shadow-sm"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button className="flex items-center justify-center gap-2 px-6 py-4 bg-white border border-black/5 rounded-2xl font-bold text-zinc-600 hover:text-[#6F7E57] transition-all shadow-sm">
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
                      ? 'bg-[#575B44] border-[#575B44] text-white shadow-lg shadow-black/10'
                      : 'bg-white border-zinc-200 text-zinc-500 hover:border-[#6F7E57] hover:text-[#6F7E57]'
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
              className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#F8F0E5]"
            >
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h3 className="font-serif text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 mb-6">Our Story</h3>
                  <p className="text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed font-sans">
                    Born from the reality of busy Nigerians, Everyday Needs was created to solve the "last-minute store run" stress.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-2xl font-bold mb-4" style={{ color: '#69701d' }}>Our Mission</h3>
                      <p className="text-lg text-zinc-600 leading-relaxed">
                        To simplify household management through curated, reliable, and safe essential boxes.
                      </p>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-4" style={{ color: '#69701d' }}>Our Vision</h3>
                      <p className="text-lg text-zinc-600 leading-relaxed">
                        To be the most reliable household partner in Africa, empowering families to live better through seamless supply.
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
                      <img src="/images/FARM FRESH PRODUCTS.jpeg" alt="Our Mission" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-5 -right-5 w-36 h-36 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                      <img src="/images/Built by Women Who Understand Real Homes.png" alt="Our Vision" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                <div className="mb-24">
                  <h3 className="text-3xl font-bold text-center mb-12 text-[#6F7E57]">The Everyday Needs Advantage</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                      { title: 'Farm-to-Table Freshness', desc: 'Eliminating middlemen to ensure the freshest produce reaches you.', icon: Truck },
                      { title: 'Non-Toxic Focus', desc: 'Prioritizing personal and home care products that are safe for your family.', icon: ShieldCheck },
                      { title: 'Predictable Convenience', desc: 'Predictive delivery so you never have to think about "running out" again.', icon: Calendar },
                    ].map((item, i) => (
                      <div key={i} className="p-10 bg-white rounded-[2.5rem] border border-[#6F7E57]/10 hover:border-[#6F7E57]/30 transition-all group shadow-sm text-center">
                        <div className="w-14 h-14 bg-[#FAF5EF] rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:bg-[#6F7E57] group-hover:text-white transition-colors shadow-sm" style={{ color: '#6F7E57' }}>
                          <item.icon size={28} />
                        </div>
                        <h4 className="text-xl font-bold text-zinc-900 mb-4 font-sans">{item.title}</h4>
                        <p className="text-zinc-600 leading-relaxed font-sans">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-brand-secondary rounded-[3rem] p-12 lg:p-20 text-white text-center">
                  <h3 className="text-3xl font-bold mb-6">Designed for Real Homes</h3>
                  <p className="text-[#F8F0E5]/80 text-lg leading-relaxed max-w-3xl mx-auto mb-10">
                    Everyday Needs is built with a deep understanding of household management. We know that a home isn't just a place—it's an ecosystem that requires care, safety, and reliability.
                  </p>
                  <button onClick={() => setView('products')} className="bg-white text-[#6F7E57] px-10 py-4 rounded-2xl font-bold hover:bg-[#F8F0E5] transition-all shadow-lg">Start Your Journey</button>
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
                <p className="text-zinc-500 max-w-2xl mx-auto ">Scale your impact with a partner that values quality and reliability.</p>
              </div>

              {/* Partners banner image */}
              <div className="relative h-64 rounded-[2.5rem] overflow-hidden mb-16 shadow-xl">
                <img
                  src="/images/Thoughtful Sourcing. Superior Living..jpeg"
                  alt="Partner with Everyday Needs"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#6F7E57]/70 to-transparent flex items-center px-12">
                  <p className="text-white font-serif text-2xl md:text-3xl font-bold max-w-md leading-snug">
                    Growing together with Nigeria's finest farmers and brands.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-8">
                  <div className="bg-white p-10 rounded-[2.5rem] border border-black/5 shadow-sm">
                    <h3 className="text-2xl font-bold mb-6 text-[#6F7E57]">Why Partner With Everyday Needs?</h3>
                    <ul className="space-y-4">
                      {[
                        'Consistent demand and reliable volume',
                        'Streamlined logistics and fulfillment',
                        'Direct connection to modern households',
                        'Marketing and visibility for your brand'
                      ].map((benefit, i) => (
                        <li key={i} className="flex items-start gap-4">
                          <CheckCircle2 size={24} className="text-[#6F7E57] mt-1 shrink-0" />
                          <span className="text-zinc-700 font-medium text-lg">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="bg-[#6F7E57] rounded-[3rem] p-12 text-white shadow-2xl shadow-brand-primary/10">
                  <h3 className="text-3xl font-bold mb-6">Partner Application</h3>
                  <p className="mb-10 leading-relaxed text-lg" style={{ color: '#F8F0E5' }}>
                    Are you a farmer, a manufacturer of homegrown goods, or a supplier of quality home essentials? Let's grow together.
                  </p>
                  <button className="w-full bg-white text-[#6F7E57] py-5 rounded-2xl font-bold text-lg hover:bg-brand-alt-2 transition-all shadow-lg">
                    Submit Partnership Inquiry
                  </button>
                  <div className="mt-8 pt-8 border-t border-white/10 text-center">
                    <p className="text-sm opacity-80 mb-2">Our team typically responds within 3-5 business days.</p>
                    <p className="font-bold">partners@everydayneeds.ng</p>
                  </div>
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
              className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#F8F0E5] rounded-[3rem] mt-12 mb-12 shadow-sm border border-[#575B44]/10"
            >
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-zinc-900">Get In Touch</h3>
                  <p className="text-zinc-500 ">We're here to support your home management journey.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
                  {[
                    { title: 'Customer Support', value: 'support@everydayneeds.com', icon: Mail },
                    { title: 'Partnerships', value: 'partners@everydayneeds.com', icon: Users },
                    { title: 'Investments', value: 'investors@everydayneeds.com', icon: TrendingUp },
                    { title: 'Phone', value: '+234 803 565 7616', icon: User },
                  ].map((item, i) => (
                    <div key={i} className="p-8 bg-white rounded-[2.5rem] border border-[#575B44]/20 text-center group hover:bg-[#6F7E57] hover:text-white transition-all shadow-md">
                      <div className="w-12 h-12 bg-[#F8F0E5] rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white group-hover:text-[#6F7E57] transition-colors shadow-sm" style={{ color: '#6F7E57' }}>
                        <item.icon size={20} />
                      </div>
                      <h4 className="font-bold mb-2">{item.title}</h4>
                      <p className="text-sm opacity-80 break-words font-medium">{item.value}</p>
                    </div>
                  ))}
                </div>
                <p className="text-center text-zinc-400 text-sm">Response time is usually within 24 hours.</p>

                <div className="mt-16 bg-[#f7ebc3] rounded-[3rem] border border-[#575B44]/20 p-12 shadow-lg">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">Name</label>
                        <input type="text" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57]/20 transition-all font-medium" placeholder="Your Name" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-zinc-700 mb-2">Email</label>
                        <input type="email" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57]/20 transition-all font-medium" placeholder="Your Email" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-zinc-700 mb-2">Message</label>
                      <textarea className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl outline-none focus:ring-2 focus:ring-[#6F7E57]/20 transition-all font-medium h-40" placeholder="How can we help?"></textarea>
                    </div>
                    <button className="w-full bg-[#575B44] text-white py-4 rounded-2xl font-bold hover:bg-[#6F7E57] transition-all shadow-xl">Send Message</button>
                  </form>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'gift-a-box' && (
            <motion.div
              key="gift-a-box"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Hero Banner */}
              <div className="relative h-72 md:h-96 overflow-hidden">
                <img
                  src="/images/Everyday essentials in organized boxes.png"
                  alt="Gift a Box Hero"
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#6F7E57]/60 to-[#6F7E57]/80" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                  <h2 className="font-serif text-4xl md:text-6xl font-black text-white mb-4 drop-shadow-lg">
                    Gift a Box
                  </h2>
                  <p className="text-white/90 text-lg md:text-xl max-w-2xl font-sans">
                    Spread joy, love, and care — one box at a time.
                  </p>
                </div>
              </div>

              {/* Main Content */}
              <section className="py-20 bg-[#F8F0E5]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                    {/* Description Text */}
                    <div className="space-y-6">
                      <span className="inline-block text-[#6F7E57] font-bold uppercase tracking-[0.3em] text-sm">
                        The Joy of Giving
                      </span>
                      <h3 className="font-serif text-3xl md:text-4xl font-bold text-zinc-900 leading-tight">
                        Make Someone's Day Extraordinary
                      </h3>
                      <p className="font-sans text-lg text-zinc-700 leading-relaxed text-justify">
                        At Everyday Needs we believe in the joy of giving! Our Gift a Box section allows you to send a thoughtful surprise to your favourite orphanage, show appreciation to your staff, celebrate birthdays, or simply spread kindness in your community.
                      </p>
                      <p className="font-sans text-lg text-zinc-700 leading-relaxed text-justify">
                        Whether it's a token of appreciation, an act of kindness, or a celebration, each box is filled with love and care, making every moment special. Join us in making a difference today!
                      </p>
                      <div className="pt-4 flex flex-col sm:flex-row gap-4">
                        <button
                          onClick={() => setView('products')}
                          className="bg-[#6F7E57] text-white px-10 py-4 rounded-2xl font-bold text-base hover:bg-[#6F7E57]/90 transition-all shadow-lg flex items-center justify-center gap-2 group"
                        >
                          <Heart size={18} />
                          Select a Gift Box
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button
                          onClick={() => setView('contact')}
                          className="bg-white text-[#6F7E57] border-2 border-[#6F7E57]/30 px-10 py-4 rounded-2xl font-bold text-base hover:border-[#6F7E57] transition-all"
                        >
                          Custom Gifting Enquiry
                        </button>
                      </div>
                    </div>

                    {/* Featured Gift Box Image */}
                    <div className="relative">
                      <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl">
                        <img
                          src="/images/Everyday essentials in labeled box A.png"
                          alt="Everyday Needs Gift Box"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -bottom-6 -left-6 w-32 h-32 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                        <img
                          src="/images/Everyday essentials in labeled box D.png"
                          alt="Gift Box Detail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Occasions Grid */}
                  <div className="mb-20">
                    <h3 className="font-serif text-3xl font-bold text-center text-zinc-900 mb-12">
                      Perfect for Every Occasion
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {[
                        { title: 'Orphanage Donations', desc: 'Bring smiles to children in need with a box full of essential joy.', icon: Heart },
                        { title: 'Staff Appreciation', desc: 'Celebrate your team with thoughtful, curated boxes of quality essentials.', icon: Users },
                        { title: 'Birthday Celebrations', desc: 'Make birthdays memorable with a premium gift box delivered to their door.', icon: Star },
                        { title: 'Random Acts of Kindness', desc: 'Spread love in your community with a simple, heartfelt gesture.', icon: ShieldCheck },
                      ].map((occasion, i) => (
                        <div key={i} className="p-8 bg-white rounded-[2rem] border border-[#6F7E57]/10 hover:border-[#6F7E57]/30 hover:shadow-md transition-all text-center group">
                          <div className="w-14 h-14 bg-[#F8F0E5] rounded-2xl flex items-center justify-center text-[#6F7E57] mx-auto mb-5 group-hover:bg-[#6F7E57] group-hover:text-white transition-colors shadow-sm">
                            <occasion.icon size={24} />
                          </div>
                          <h4 className="font-bold text-zinc-900 mb-3 text-base">{occasion.title}</h4>
                          <p className="text-sm text-zinc-500 leading-relaxed">{occasion.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3 Gallery Images */}
                  <div className="mb-16">
                    <h3 className="font-serif text-3xl font-bold text-center text-zinc-900 mb-12">
                      Inside Every Gift Box
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {[
                        { src: '/images/Everyday essentials in labeled box B.png', caption: 'Pantry Essentials Box', desc: 'A curated selection of premium pantry staples.' },
                        { src: '/images/Everyday essentials in labeled box C.png', caption: 'Family Needs Box', desc: 'Everything a home needs, beautifully packaged.' },
                        { src: '/images/Everyday essentials in labeled box E.png', caption: 'Wellness & Care Box', desc: 'Non-toxic, quality products for body and home.' },
                      ].map((img, i) => (
                        <div key={i} className="group cursor-pointer">
                          <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-lg mb-4 border border-black/5">
                            <img
                              src={img.src}
                              alt={img.caption}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <h4 className="font-bold text-zinc-900 text-center mb-1">{img.caption}</h4>
                          <p className="text-sm text-zinc-500 text-center">{img.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Banner */}
                  <div className="bg-[#6F7E57] rounded-[3rem] p-12 lg:p-16 text-center">
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-6">Ready to Gift a Box?</h3>
                    <p className="text-white/80 text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
                      Choose from our curated boxes or contact us for a fully customised gifting experience tailored to your occasion.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <button
                        onClick={() => setView('products')}
                        className="bg-white text-[#6F7E57] px-10 py-4 rounded-2xl font-bold text-lg hover:bg-[#F8F0E5] transition-all shadow-lg"
                      >
                        Browse Gift Boxes
                      </button>
                      <button
                        onClick={() => setView('contact')}
                        className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
                      >
                        Contact Us
                      </button>
                    </div>
                  </div>
                </div>
              </section>
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
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-zinc-900">Investor Relations</h3>
                  <p className="text-zinc-500 max-w-2xl mx-auto ">Building a legacy of reliability and efficiency in African retail.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 mb-24">
                  <div className="bg-brand-secondary text-white p-12 rounded-[3.5rem] shadow-2xl">
                    <h3 className="text-3xl font-bold mb-8 ">Our Vision for Growth</h3>
                    <p className="text-lg text-zinc-300 leading-relaxed mb-8">Everyday Needs is more than a delivery service; it is a data-driven infrastructure company built to own the relationship with the modern Nigerian household.</p>
                    <div className="space-y-4">
                      {[
                        'Scalable direct-to-consumer model',
                        'Optimized regional sourcing network',
                        'Proprietary household demand data',
                        'Long-term customer retention focus'
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <CheckCircle2 size={20} className="text-brand-alt-2" />
                          <span className="font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-8 py-8">
                    <h3 className="text-3xl font-bold text-zinc-900">Investment Fundamentals</h3>
                    <p className="text-lg text-zinc-600 leading-relaxed">We focus on high-frequency, essential consumption categories, ensuring consistent cash flow and strong defensive characteristics in any economic climate.</p>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="p-6 bg-zinc-50 rounded-3xl border border-black/5">
                        <p className="text-[#6F7E57] font-black text-2xl mb-1">Reliability</p>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">The Core Metric</p>
                      </div>
                      <div className="p-6 bg-zinc-50 rounded-3xl border border-black/5">
                        <p className="text-[#6F7E57] font-black text-2xl mb-1">Efficiency</p>
                        <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Operational Edge</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center p-16 bg-zinc-100 rounded-[3.5rem] border border-black/5">
                  <h3 className="text-2xl font-bold mb-6">Explore the Future of Everyday Needs</h3>
                  <p className="text-zinc-500 mb-10 max-w-xl mx-auto text-lg leading-relaxed">For professional inquiries, pitch decks, and performance data, please contact our investment relations team.</p>
                  <button className="bg-[#6F7E57] text-white px-10 py-5 rounded-2xl font-extrabold text-lg hover:bg-brand-secondary transition-all shadow-xl">Contact Investment Team</button>
                  <p className="mt-8 font-bold text-sm">legacy@everydayneeds.ng</p>
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
              <span className="text-2xl font-bold tracking-tighter text-[#6F7E57] mb-2 block">Everyday Needs</span>
              <p className="text-zinc-600 font-serif  text-lg mb-6">Everything Your Home Needs. Delivered.</p>
              <p className="text-zinc-500 max-w-sm leading-relaxed">
                Nigeria's most trusted essentials subscription platform. Delivering quality, reliability, and peace of mind to your doorstep.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-zinc-400 uppercase tracking-widest text-xs mb-6">Company</h4>
              <ul className="space-y-4 text-sm font-medium text-zinc-600">
                <li><button onClick={() => setView('home')} className="hover:text-[#6F7E57]">Home</button></li>
                <li><button onClick={() => setView('about')} className="hover:text-[#6F7E57]">About Us</button></li>
                <li><button onClick={() => setView('products')} className="hover:text-[#6F7E57]">Our Boxes</button></li>
                <li><button onClick={() => setView('products')} className="hover:text-[#6F7E57]">Subscribe</button></li>
                <li><button onClick={() => setView('gift-a-box')} className="hover:text-[#6F7E57]">Gift a Box</button></li>
                <li><button onClick={() => setView('partners')} className="hover:text-[#6F7E57]">Partners</button></li>
                <li><button onClick={() => setView('investors')} className="hover:text-[#6F7E57]">Investors</button></li>
                <li><button onClick={() => setView('contact')} className="hover:text-[#6F7E57]">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-zinc-400 uppercase tracking-widest text-xs mb-6">Legal</h4>
              <ul className="space-y-4 text-sm font-medium text-zinc-600">
                <li><button onClick={() => setView('privacy')} className="hover:text-[#6F7E57]">Privacy Policy</button></li>
                <li><button onClick={() => setView('terms')} className="hover:text-[#6F7E57]">Terms of Service</button></li>
                <li><button onClick={() => setView('delivery')} className="hover:text-[#6F7E57]">Delivery Policy</button></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-zinc-400">© 2026 Everyday Needs. All rights reserved designed by airealcom.</p>
            <div className="flex items-center space-x-6">
              <a href="#" className="w-10 h-10 bg-white rounded-full border border-black/5 flex items-center justify-center text-zinc-400 hover:text-[#6F7E57] hover:border-[#6F7E57] transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full border border-black/5 flex items-center justify-center text-zinc-400 hover:text-[#6F7E57] hover:border-[#6F7E57] transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 bg-white rounded-full border border-black/5 flex items-center justify-center text-zinc-400 hover:text-[#6F7E57] hover:border-[#6F7E57] transition-all">
                <MessageSquare size={18} />
              </a>
              <a href="mailto:hello@everydayneeds.ng" className="w-10 h-10 bg-white rounded-full border border-black/5 flex items-center justify-center text-zinc-400 hover:text-[#6F7E57] hover:border-[#6F7E57] transition-all">
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
