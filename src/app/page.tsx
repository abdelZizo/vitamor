"use client";

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, X, CheckCircle, Phone, Mail, ShieldCheck, 
  Truck, Star, Zap, Rocket, Activity, Quote, Users, 
  Flame, MousePointerClick, ChevronRight 
} from 'lucide-react';

const ROYAL_OFFER_ID = 3; 

const offers = [
  { 
    id: 1, 
    name: "باقة التجربة (150g)", 
    price: 149, 
    originalPrice: 149,
    perPack: 149,
    totalPacks: 1,
    shipping: 20, 
    image: "/products/pack1.webp",
    tag: "",
    ctaLabel: "جرب الباقة الأولى",
    order: 1 // ترتيب الظهور
  },
  { 
    id: 3, 
    name: "العرض الملكي (3+2 مجاناً)", 
    price: 449, 
    originalPrice: 745,
    perPack: 89,
    totalPacks: 5,
    shipping: 0, 
    image: "/products/pack5.webp",
    tag: "الأكثر طلباً 🔥",
    ctaLabel: "احجز العرض الملكي الآن",
    order: 2 // العرض الملكي في الوسط
  },
  { 
    id: 2, 
    name: "عرض العائلة (2+1 مجاناً)", 
    price: 299, 
    originalPrice: 447,
    perPack: 99,
    totalPacks: 3,
    shipping: 0, 
    image: "/products/pack3.webp",
    tag: "وفر 33% اليوم",
    ctaLabel: "خذ عرض العائلة",
    order: 3 // ترتيب الظهور
  }
];

// ترتيب العروض برمجياً لوضع المعرف رقم 3 في الوسط
const sortedOffers = [...offers].sort((a, b) => a.order - b.order);

export default function VitamorHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBundleId, setSelectedBundleId] = useState<number>(ROYAL_OFFER_ID);

  const selectedOffer = useMemo(
    () => offers.find(o => o.id === selectedBundleId)!,
    [selectedBundleId]
  );

  const totalPrice = useMemo(
    () => selectedOffer.price + selectedOffer.shipping,
    [selectedOffer]
  );

  const openModal = useCallback((offerId: number) => {
    setSelectedBundleId(offerId);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const scrollToOffers = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] font-sans rtl scroll-smooth" dir="rtl">
      
      {/* 1. Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
        <Link href="/" className="text-2xl font-black tracking-tighter text-[#1b4332]">
          VITAMOR<span className="text-emerald-500">.</span>
        </Link>
        <button
          onClick={() => scrollToOffers()}
          className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 border border-emerald-100"
        >
          <Zap className="w-3 h-3 fill-current" /> توصيل فابور لباب دارك
        </button>
      </nav>

      {/* 2. Hero Section */}
      <header className="relative py-12 lg:py-20 px-6 md:px-20 overflow-hidden text-center lg:text-right">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-4 py-1.5 rounded-full">
              <Flame className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-black text-orange-800">+900 طلبية مسلمة بنجاح</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-black leading-tight text-slate-900">
              قرمشة الفاكهة <br/> 
              <span className="text-emerald-800 italic underline decoration-emerald-300">الحقيقية 100%</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-xl mx-auto lg:mx-0">
              فواكه بريميوم مجففة بتقنية التبريد NASA، تحافظ على 97% من الفيتامينات والقرمشة الأصلية.
            </p>
            <button
              onClick={() => scrollToOffers()}
              className="bg-[#1b4332] text-white px-10 py-4 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all"
            >
              اكتشف العروض الحصرية
            </button>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl">
            <img src="/hero/main-mix.webp" alt="Vitamor" className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* 3. Offers Section (تم التعديل هنا ليكون الملكي في الوسط) */}
      <section id="offers-section" className="py-20 px-6 md:px-20 bg-[#f8fafc] border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter">اختر باقتك المفضلة اليوم</h2>
            <p className="text-slate-500 font-bold italic">وفر أكثر مع العروض الكبرى — التوصيل مجاني</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {sortedOffers.map((offer) => {
              const isRoyal = offer.id === ROYAL_OFFER_ID;
              return (
                <div
                  key={offer.id}
                  className={`relative bg-white transition-all duration-500 flex flex-col ${
                    isRoyal 
                    ? 'border-[6px] border-amber-400 shadow-[0_30px_60px_-15px_rgba(245,158,11,0.3)] scale-110 z-20 rounded-[3.5rem] p-10' 
                    : 'border-2 border-emerald-100 shadow-lg rounded-[2.5rem] p-8 lg:opacity-90 hover:opacity-100'
                  }`}
                >
                  {offer.tag && (
                    <div className={`absolute -top-5 left-1/2 -translate-x-1/2 text-white text-xs font-black px-8 py-2 rounded-full shadow-xl z-30 whitespace-nowrap ${
                      isRoyal ? 'bg-amber-500' : 'bg-emerald-600'
                    }`}>
                      {offer.tag}
                    </div>
                  )}

                  <div className="relative h-56 w-full rounded-[2rem] mb-6 overflow-hidden bg-slate-50 flex items-center justify-center">
                    <img src={offer.image} alt={offer.name} className="w-full h-full object-contain p-4" />
                    <div className="absolute bottom-3 right-3 bg-white/95 px-4 py-1.5 rounded-xl shadow border border-slate-50">
                      <p className={`text-xl font-black ${isRoyal ? 'text-amber-600' : 'text-emerald-700'}`}>
                        {offer.price} <span className="text-xs font-bold text-slate-500">درهم</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-center space-y-6">
                    <h3 className={`font-black tracking-tight ${isRoyal ? 'text-2xl text-slate-900' : 'text-xl text-slate-800'}`}>
                      {offer.name}
                    </h3>
                    
                    <ul className="space-y-3 text-sm font-bold text-slate-600 text-right pr-2">
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> {offer.totalPacks} باقات بريميوم</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> {offer.shipping === 0 ? "توصيل فابور مجاني" : "توصيل سريع لباب دارك"}</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" /> الدفع كاش عند الاستلام</li>
                    </ul>

                    <button
                      onClick={() => openModal(offer.id)}
                      className={`w-full py-4 rounded-2xl font-black text-lg transition-all shadow-lg active:scale-95 ${
                        isRoyal
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-200'
                        : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-emerald-100'
                      }`}
                    >
                      {offer.ctaLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Checkout Modal (نفس التصميم الاحترافي السابق) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/90 z-50 flex items-end md:items-center justify-center p-0 md:p-4 backdrop-blur-md">
          <div className="bg-white rounded-t-[3rem] md:rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-full duration-300 max-h-[90vh] overflow-y-auto p-8 space-y-8">
            <div className="flex justify-between items-center border-b pb-6">
              <div className="text-right">
                <h3 className="font-black text-2xl text-slate-900">أكمل طلبك الآن</h3>
                <p className="text-xs font-black text-emerald-600 mt-1 uppercase tracking-widest">الدفع كاش عند الاستلام</p>
              </div>
              <button onClick={closeModal} className="bg-white p-3 rounded-full shadow-lg text-slate-400 hover:text-red-500"><X className="w-6 h-6" /></button>
            </div>

            <div className="bg-slate-950 p-6 rounded-[2.5rem] text-white space-y-2">
              <div className="flex justify-between text-sm font-bold opacity-70"><span>المنتجات:</span><span>{selectedOffer.price} درهم</span></div>
              <div className="flex justify-between text-3xl font-black pt-4 border-t border-slate-800"><span>الإجمالي:</span><span className="text-emerald-500">{totalPrice} درهم</span></div>
            </div>

            <div className="space-y-4">
              <input type="text" placeholder="الاسم والنسب" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none font-black text-lg focus:border-emerald-500" />
              <input type="tel" placeholder="رقم الهاتف" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none font-black text-lg text-left focus:border-emerald-500" dir="ltr" />
              <input type="text" placeholder="المدينة" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none font-black text-lg focus:border-emerald-500" />
            </div>

            <button className={`w-full text-white py-6 rounded-[2.5rem] font-black text-2xl shadow-2xl active:scale-95 transition-all ${
              selectedBundleId === ROYAL_OFFER_ID ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-emerald-700'
            }`}>
              تأكيد الطلب ✓
            </button>
          </div>
        </div>
      )}

      {/* 5. Sticky CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 p-4 z-40 flex justify-center shadow-2xl">
        <button
          onClick={() => openModal(ROYAL_OFFER_ID)}
          className="w-full max-w-md bg-gradient-to-r from-emerald-700 to-[#1b4332] text-white py-4 rounded-[2rem] font-black text-xl shadow-xl flex items-center justify-center gap-3 animate-bounce-slow"
        >
          <MousePointerClick className="w-6 h-6" />
          العرض الملكي — التوصيل مجاني
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
      `}} />
    </div>
  );
}
