"use client";

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, X, CheckCircle, Phone, Mail, ShieldCheck, 
  Truck, Star, Zap, Rocket, Activity, Quote, Users, 
  Flame, MousePointerClick, ChevronRight, Loader2, Leaf
} from 'lucide-react';

// --- الثوابت الرئيسية لسهولة التعديل ---
const ROYAL_OFFER_ID = 3; 
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzLeKuoJkZFGTA03uemZxJFYVeSbqyBuo4E7wGZV_td/exec";

// --- بيانات العروض (العرض الملكي في الترتيب الثاني ليظهر في الوسط) ---
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
    order: 1
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
    order: 2 
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
    order: 3
  }
];

const ingredients = [
  { name: "فراولة", icon: "🍓", img: "/fruits/strawberry.webp", benefit: "تعزيز المناعة" },
  { name: "موز", icon: "🍌", img: "/fruits/banana.webp", benefit: "طاقة عضلية" },
  { name: "مانجو", icon: "🥭", img: "/fruits/mango.webp", benefit: "فيتامينات A & C" },
  { name: "تفاح", icon: "🍎", img: "/fruits/apple.webp", benefit: "ألياف هضمية" },
  { name: "كيوي", icon: "🥝", img: "/fruits/kiwi.webp", benefit: "استشفاء عضلي" },
  { name: "تين", icon: "🌿", img: "/fruits/fig.webp", benefit: "معادن أساسية" },
  { name: "تمر أحمر", icon: "🍒", img: "/fruits/red-date.webp", benefit: "حديد وطاقة" },
  { name: "جاك فروت", icon: "🍍", img: "/fruits/jackfruit.webp", benefit: "بروتين نباتي" }
];

const reviews = [
  { id: "rev-amin", name: "أمين. ح", city: "مراكش", avatarColor: "bg-blue-100 text-blue-800", stars: 5, text: "أفضل سناك خديتو للتدريب. خفيف على المعدة وكيعطي طاقة حقيقية بلا سكر.", date: "12 أبريل 2025" },
  { id: "rev-layla", name: "ليلى. ب", city: "طنجة", avatarColor: "bg-rose-100 text-rose-800", stars: 5, text: "ولادي عجبهم بزااف! القرمشة خيالية والمذاق كأنها فاكهة طرية يلاه تقطفات.", date: "28 مارس 2025" },
  { id: "rev-yassin", name: "ياسين. ق", city: "أكادير", avatarColor: "bg-emerald-100 text-emerald-800", stars: 5, text: "توصيل وصل ف 24 ساعة. التغليف محترف بزاف والمذاق بريميوم.", date: "5 مايو 2025" },
];

const sortedOffers = [...offers].sort((a, b) => a.order - b.order);

export default function VitamorHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBundleId, setSelectedBundleId] = useState<number>(ROYAL_OFFER_ID);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const selectedOffer = useMemo(() => offers.find(o => o.id === selectedBundleId)!, [selectedBundleId]);
  const totalPrice = useMemo(() => selectedOffer.price + selectedOffer.shipping, [selectedOffer]);

  const openModal = useCallback((offerId: number) => {
    setSelectedBundleId(offerId);
    setOrderSuccess(false);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => setIsModalOpen(false), []);

  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerCity) return;
    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ name: customerName, phone: customerPhone, city: customerCity, bundleName: selectedOffer.name, totalPrice: totalPrice }),
      });
      setOrderSuccess(true);
    } catch (error) {
      alert("حدث خطأ، يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] font-sans rtl scroll-smooth" dir="rtl">
      
      {/* 1. Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
        <Link href="/" className="text-2xl font-black tracking-tighter text-[#1b4332]">VITAMOR<span className="text-emerald-500">.</span></Link>
        <div className="hidden md:flex gap-8 text-sm font-bold text-slate-600">
          <a href="#nasa-section" className="hover:text-emerald-600 transition">تقنية NASA</a>
          <a href="#offers-section" className="hover:text-emerald-600 transition">العروض</a>
          <a href="#reviews" className="hover:text-emerald-600 transition">آراء الزبناء</a>
        </div>
        <button onClick={() => document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 border border-emerald-100">
          <Zap className="w-3 h-3 fill-current" /> توصيل فابور لباب دارك
        </button>
      </nav>

      {/* 2. Hero Section */}
      <header className="relative py-12 lg:py-24 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-right relative z-10">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-4 py-2 rounded-full">
              <Flame className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-black text-orange-800">+900 طلبية مسلمة بنجاح هاد الشهر</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black leading-[1.1] text-slate-900 tracking-tight">قرمشة الفاكهة <br/> <span className="text-emerald-800 italic underline decoration-emerald-300 underline-offset-8">الحقيقية 100%</span></h1>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">استمتع بمزيج 8 فواكه عالمية مجففة بتقنية التبريد NASA، تحافظ على 97% من الفيتامينات والقرمشة الأصلية.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
              <button onClick={() => document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' })} className="group bg-[#1b4332] text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-black transition-all flex items-center gap-3 active:scale-95">اختار عرضك واستلم غداً <ChevronRight className="w-5 h-5 group-hover:translate-x-[-5px] transition-transform" /></button>
            </div>
          </div>
          <div className="relative group cursor-pointer" onClick={() => openModal(ROYAL_OFFER_ID)}>
            <div className="absolute inset-0 bg-emerald-400/20 rounded-[3rem] blur-3xl group-hover:bg-emerald-400/30 transition-all animate-pulse"></div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[10px] border-white aspect-square">
              <img src="/hero/main-mix.webp" alt="Vitamor Mix" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur px-6 py-3 rounded-2xl shadow-2xl border border-slate-100"><p className="text-xs font-black text-emerald-900 uppercase">طبيعي 100% • تقنية وكالة NASA</p></div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. NASA Section */}
      <section id="nasa-section" className="bg-slate-950 py-24 px-6 md:px-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full"><Rocket className="w-5 h-5 text-emerald-500" /><span className="text-xs font-black text-emerald-400 uppercase">تكنولوجيا وكالة NASA</span></div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">ليست مجرد فواكه مجففة.. إنها طعام المستقبل</h2>
            <p className="text-xl text-slate-400 leading-relaxed">تقنية التجفيف بالتبريد (Lyophilization) هي الطريقة الوحيدة التي تضمن سحب الماء من الفاكهة مع الحفاظ على هيكلها الخلوي وقيمتها الغذائية.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800"><Activity className="w-8 h-8 text-emerald-500 mb-4" /><h4 className="font-black text-xl mb-2">97% فيتامينات</h4><p className="text-slate-500 text-sm">الحفاظ الكامل على الفوائد الصحية.</p></div>
              <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800"><ShieldCheck className="w-8 h-8 text-emerald-500 mb-4" /><h4 className="font-black text-xl mb-2">قرمشة طبيعية</h4><p className="text-slate-500 text-sm">بدون قلي أو إضافات كيميائية.</p></div>
            </div>
          </div>
          <div className="order-2 lg:order-1 relative rounded-[3rem] overflow-hidden border-2 border-slate-800 aspect-video lg:aspect-square shadow-2xl">
            <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-60" alt="Space Tech" />
          </div>
        </div>
      </section>

      {/* 4. Athlete Nutrition */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase">الوقود النظيف للرياضيين</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">مزيج مدروس يوفر الكربوهيدرات النظيفة، المعادن، ومضادات الأكسدة — قبل وبعد التمرين.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {ingredients.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[3rem] border-2 border-slate-50 shadow-sm hover:border-emerald-200 transition-all text-center group cursor-default">
              <div className="w-24 h-24 bg-slate-50 rounded-full mx-auto mb-6 flex items-center justify-center text-5xl shadow-inner group-hover:scale-110 transition-transform"><img src={item.img} alt={item.name} className="w-16 h-14 object-contain" onError={(e) => e.currentTarget.style.display='none'} /><span className="absolute group-hover:opacity-0 transition-opacity">{item.icon}</span></div>
              <h4 className="font-black text-xl mb-2">{item.name}</h4>
              <p className="text-[10px] font-black text-emerald-700 bg-emerald-50 py-1 px-4 rounded-full inline-block">{item.benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Offers Section (تحديث تكبير الصور والترتيب) */}
      <section id="offers-section" className="py-24 px-6 md:px-20 bg-[#f8fafc] border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter">وفر أكثر، كلما طلبتي أكثر</h2>
            <p className="text-lg text-slate-500 font-bold italic">التوصيل مجاني من باقتين — الدفع كاش عند الاستلام</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {sortedOffers.map((offer) => {
              const isRoyal = offer.id === ROYAL_OFFER_ID;
              return (
                <div key={offer.id} className={`relative bg-white transition-all duration-500 flex flex-col ${isRoyal ? 'border-[8px] border-amber-400 shadow-2xl lg:scale-110 z-20 rounded-[4rem] p-10' : 'border-2 border-emerald-100 shadow-xl rounded-[3rem] p-8 lg:opacity-95 hover:opacity-100'}`}>
                  {offer.tag && <div className={`absolute -top-6 left-1/2 -translate-x-1/2 text-white text-xs font-black px-10 py-2.5 rounded-full shadow-xl z-30 whitespace-nowrap ${isRoyal ? 'bg-amber-500' : 'bg-[#1b4332]'}`}>{offer.tag}</div>}
                  <div className={`relative w-full rounded-[2.5rem] mb-10 overflow-hidden bg-slate-50 flex items-center justify-center border-4 border-white shadow-inner ${isRoyal ? 'h-[350px] md:h-[450px]' : 'h-[280px] md:h-[350px]'}`}>
                    <img src={offer.image} alt={offer.name} className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 cursor-pointer" onClick={() => openModal(offer.id)} />
                    <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white">
                      <p className={`text-4xl font-black tracking-tighter ${isRoyal ? 'text-amber-600' : 'text-emerald-800'}`}>{offer.price} <span className="text-lg font-bold text-slate-500">درهم</span></p>
                    </div>
                  </div>
                  <div className="text-center flex-grow flex flex-col">
                    <h3 className={`font-black tracking-tight mb-8 ${isRoyal ? 'text-3xl text-slate-900' : 'text-2xl text-slate-800'}`}>{offer.name}</h3>
                    <ul className="space-y-4 mb-10 text-base font-bold text-slate-600 text-right pr-4">
                      <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" /> {offer.totalPacks} باقات بريميوم</li>
                      <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" /> {offer.shipping === 0 ? "توصيل فابور مجاني" : "توصيل سريع لباب دارك"}</li>
                      <li className="flex items-center gap-3"><CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" /> الدفع كاش عند الاستلام</li>
                    </ul>
                    <button onClick={() => openModal(offer.id)} className={`w-full py-6 rounded-[2.5rem] font-black text-2xl transition-all shadow-xl active:scale-95 mt-auto ${isRoyal ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-200' : 'bg-slate-900 text-white hover:bg-black'}`}>{offer.ctaLabel}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Social Proof */}
      <section id="reviews" className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="text-right space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900">عائلتنا كيكبروا..</h2>
            <p className="text-xl text-slate-500 font-bold italic">أكثر من 900 مغربي ومغربية استافدوا من عروضنا هاد الشهر.</p>
          </div>
          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 text-center shadow-inner">
            <p className="text-5xl font-black text-emerald-700">4.9/5</p>
            <div className="flex text-yellow-400 my-2 justify-center"><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/><Star className="w-5 h-5 fill-current"/></div>
            <p className="text-[10px] font-black text-emerald-900 uppercase tracking-widest">متوسط تقييمات الزبناء</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-white border-2 border-slate-50 p-12 rounded-[3.5rem] shadow-sm relative group hover:shadow-xl transition-all">
              <Quote className="absolute top-8 left-8 w-12 h-12 text-slate-100 group-hover:text-emerald-50 transition-colors" />
              <p className="text-xl text-slate-700 font-medium leading-relaxed mb-10 italic relative z-10">"{rev.text}"</p>
              <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl shadow-inner ${rev.avatarColor}`}>{rev.name.charAt(0)}</div>
                <div><h4 className="font-black text-xl text-slate-900">{rev.name}</h4><p className="text-xs font-bold text-slate-400 flex items-center gap-1"><CheckCircle className="w-4 h-4 text-emerald-500" /> زبون من {rev.city}</p></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 px-6 md:px-20 border-t-8 border-emerald-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-slate-800 pb-20">
          <div className="space-y-6 text-center md:text-right">
            <h3 className="text-4xl font-black text-white tracking-tighter">VITAMOR<span className="text-emerald-500">.</span></h3>
            <p className="text-sm leading-relaxed">العلامة المغربية الأولى للفواكه المجففة بتكنولوجيا NASA. جودة بريميوم، صحة، وقرمشة حقيقية لباب دارك.</p>
          </div>
          <div className="space-y-6 text-center md:text-right">
            <h4 className="text-white text-lg font-black uppercase tracking-widest">تصفح الموقع</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><button onClick={() => document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-emerald-400 transition">جميع العروض المتاحة</button></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition">من نحن</Link></li>
              <li><Link href="/refund" className="hover:text-emerald-400 transition">سياسة الاستبدال</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition">سياسة الخصوصية</Link></li>
            </ul>
          </div>
          <div className="space-y-6 text-center md:text-right">
            <h4 className="text-white text-lg font-black uppercase tracking-widest">تواصل معنا</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li className="flex items-center gap-4 justify-center md:justify-start text-white"><Phone className="w-5 h-5 text-emerald-500" /> <span dir="ltr">+212 600 000 000</span></li>
              <li className="flex items-center gap-4 justify-center md:justify-start"><Mail className="w-5 h-5 text-emerald-500" /> <span>contact@vitamor.ma</span></li>
            </ul>
          </div>
          <div className="bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-800 space-y-6">
            <h4 className="text-white text-lg font-black uppercase tracking-widest">ضماناتنا</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li className="flex items-center gap-4"><ShieldCheck className="w-6 h-6 text-emerald-500" /> <span>جودة طبيعية 100% مضمونة</span></li>
              <li className="flex items-center gap-4"><Truck className="w-6 h-6 text-emerald-500" /> <span>توصيل خلال 24-48 ساعة</span></li>
            </ul>
          </div>
        </div>
        <p className="text-center pt-10 text-[10px] font-black uppercase tracking-[0.3em]">© {new Date().getFullYear()} VITAMOR PREMIUM FRUITS. ALL RIGHTS RESERVED.</p>
      </footer>

      {/* 8. Sticky Bottom CTA */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 p-4 z-40 flex justify-center shadow-2xl">
        <button onClick={() => openModal(ROYAL_OFFER_ID)} className="w-full max-w-md bg-gradient-to-r from-emerald-600 to-[#1b4332] text-white py-5 rounded-[2.5rem] font-black text-xl shadow-2xl flex items-center justify-center gap-3 active:scale-95 animate-bounce-slow">
          <MousePointerClick className="w-6 h-6" /> العرض الملكي — التوصيل مجاني
        </button>
      </div>

      {/* 9. Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/90 z-50 flex items-end md:items-center justify-center p-0 md:p-4 backdrop-blur-md">
          <div className="bg-white rounded-t-[3.5rem] md:rounded-[3.5rem] w-full max-w-xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-full duration-300 max-h-[95vh] overflow-y-auto">
            <div className="p-8 bg-[#f8fafc] border-b flex justify-between items-center sticky top-0 z-10">
              <div className="text-right">
                <h3 className="font-black text-2xl text-slate-900">{orderSuccess ? "تم استلام طلبك! 🎉" : "أكمل طلبك الآن"}</h3>
                {!orderSuccess && <p className="text-xs font-black text-emerald-600 mt-1 uppercase tracking-widest">الدفع كاش عند الاستلام</p>}
              </div>
              <button onClick={closeModal} className="bg-white p-3 rounded-full shadow-lg text-slate-400 hover:text-red-500 transition-colors"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-8">
              {orderSuccess ? (
                <div className="text-center py-10 space-y-6">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle className="w-12 h-12 text-emerald-600" /></div>
                  <h2 className="text-3xl font-black text-slate-900">شكراً لك، {customerName}!</h2>
                  <p className="text-lg text-slate-600 font-bold">تم تسجيل طلبك بنجاح. سنتصل بك قريباً على الرقم <span className="font-black text-emerald-700">{customerPhone}</span> لتأكيد موعد التوصيل.</p>
                  <button onClick={closeModal} className="w-full py-6 bg-[#1b4332] text-white rounded-[2rem] font-black text-xl shadow-xl">العودة للمتجر</button>
                </div>
              ) : (
                <form onSubmit={submitOrder} className="space-y-8">
                  <div className="bg-slate-950 p-6 rounded-[2.5rem] text-white space-y-3">
                    <div className="flex justify-between text-sm font-bold opacity-70"><span>ثمن الباقة:</span><span>{selectedOffer.price} درهم</span></div>
                    {selectedOffer.shipping > 0 && <div className="flex justify-between text-sm font-bold opacity-70"><span>التوصيل:</span><span>{selectedOffer.shipping} درهم</span></div>}
                    <div className="flex justify-between text-4xl font-black pt-4 border-t border-slate-800"><span>الإجمالي:</span><span className="text-emerald-500">{totalPrice} درهم</span></div>
                  </div>
                  <div className="space-y-4">
                    <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="الاسم والنسب" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 outline-none font-black text-lg focus:border-emerald-500" />
                    <input type="tel" required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="رقم الهاتف" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 outline-none font-black text-lg text-left" dir="ltr" />
                    <input type="text" required value={customerCity} onChange={(e) => setCustomerCity(e.target.value)} placeholder="المدينة" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 outline-none font-black text-lg focus:border-emerald-500" />
                  </div>
                  <button disabled={isSubmitting} className={`w-full text-white py-6 rounded-[2.5rem] font-black text-2xl flex items-center justify-center gap-3 shadow-2xl transition-all ${isRoyalOffer(selectedBundleId) ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-emerald-700'} ${isSubmitting ? 'opacity-70' : 'active:scale-95 hover:scale-[1.02]'}`}>
                    {isSubmitting ? <Loader2 className="w-8 h-8 animate-spin" /> : "تأكيد طلبي الآن ✓"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
      `}} />
    </div>
  );
}
