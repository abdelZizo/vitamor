"use client";

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, X, CheckCircle, Phone, Mail, ShieldCheck, 
  Truck, Star, Zap, Rocket, Activity, Quote, Users, 
  Flame, MousePointerClick, ChevronRight, Loader2, MapPin, User
} from 'lucide-react';

// --- الثوابت ---
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
  { id: "rev-amin", name: "أمين. ح", city: "مراكش", avatarColor: "bg-blue-100 text-blue-800", stars: 5, text: "أفضل سناك خديتو للتدريب. خفيف على المعدة وكيعطي طاقة حقيقية بلا سكر. أنصح به بشدة.", date: "12 أبريل 2026" },
  { id: "rev-layla", name: "ليلى. ب", city: "طنجة", avatarColor: "bg-rose-100 text-rose-800", stars: 5, text: "ولادي عجبهم بزااف! القرمشة خيالية والمذاق كأنها فاكهة طرية يلاه تقطفات. ديما كنطلب العرض الملكي.", date: "28 مارس 2026" },
  { id: "rev-yassin", name: "ياسين. ق", city: "أكادير", avatarColor: "bg-emerald-100 text-emerald-800", stars: 5, text: "توصيل وصل ف 24 ساعة. التغليف محترف بزاف والمذاق بريميوم. القيمة مقابل السعر ممتازة جداً.", date: "5 مايو 2026" },
];

const sortedOffers = [...offers].sort((a, b) => a.order - b.order);

const isRoyalOffer = (id: number) => id === ROYAL_OFFER_ID;

export default function VitamorHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBundleId, setSelectedBundleId] = useState<number>(ROYAL_OFFER_ID);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // رابط Google Apps Script
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzLeKuoJkZFGTA03uemZxJFYVeSbqyBuo4E7wGZV_td/exec";

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
        body: JSON.stringify({ 
          name: customerName, 
          phone: customerPhone, 
          city: customerCity, 
          bundleName: selectedOffer.name, 
          totalPrice: totalPrice 
        }),
      });
      // إظهار شاشة النجاح مباشرة بعد الإرسال
      setOrderSuccess(true);
      // تنظيف الحقول
      setCustomerName("");
      setCustomerPhone("");
      setCustomerCity("");
    } catch (error) {
      alert("حدث خطأ في الشبكة، يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] font-sans rtl scroll-smooth selection:bg-emerald-200 selection:text-emerald-900" dir="rtl">
      
      {/* 1. Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-white/90 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 shadow-sm">
        <Link href="/" className="text-2xl font-black tracking-tighter text-[#1b4332] flex items-center gap-1">
          VITAMOR<span className="text-emerald-500 w-2 h-2 rounded-full bg-emerald-500 block mt-3"></span>
        </Link>
        <div className="hidden md:flex gap-10 text-sm font-bold text-slate-600">
          <a href="#nasa-section" className="hover:text-emerald-600 transition-colors">تقنية NASA</a>
          <a href="#offers-section" className="hover:text-emerald-600 transition-colors">العروض والتوفير</a>
          <a href="#reviews" className="hover:text-emerald-600 transition-colors">آراء الزبناء</a>
        </div>
        <button onClick={() => document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' })} className="bg-emerald-50 text-emerald-800 px-5 py-2.5 rounded-full text-xs font-black flex items-center gap-2 border border-emerald-200 hover:bg-emerald-100 transition-all shadow-sm">
          <Zap className="w-4 h-4 fill-emerald-600 text-emerald-600" /> التوصيل مجاني اليوم
        </button>
      </nav>

      {/* 2. Hero Section */}
      <header className="relative py-16 lg:py-24 px-6 md:px-20 overflow-hidden bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-right relative z-10">
            <div className="inline-flex items-center gap-2 bg-orange-100/50 border border-orange-200 px-5 py-2 rounded-full shadow-sm">
              <Flame className="w-5 h-5 text-orange-600 animate-pulse" />
              <span className="text-sm font-black text-orange-900">+900 طلبية مسلمة بنجاح هاد الشهر</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black leading-[1.05] text-slate-900 tracking-tight">
              قرمشة الفاكهة <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 to-emerald-500 italic">الحقيقية 100%</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
              استمتع بمزيج <span className="font-bold text-slate-900">8 فواكه عالمية</span> مجففة بتقنية التبريد NASA. نحافظ على 97% من الفيتامينات، بدون إضافة غرام واحد من السكر.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-6">
              <button onClick={() => document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' })} className="group relative overflow-hidden bg-[#1b4332] text-white px-10 py-5 rounded-2xl font-black text-xl shadow-2xl hover:shadow-emerald-900/20 active:scale-95 transition-all flex items-center gap-3 w-full sm:w-auto justify-center">
                <span className="relative z-10 flex items-center gap-2">اختار عرضك واستلم غداً <ChevronRight className="w-6 h-6 group-hover:-translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              </button>
            </div>
          </div>

          <div className="relative group cursor-pointer" onClick={() => openModal(ROYAL_OFFER_ID)}>
            <div className="absolute inset-0 bg-emerald-400/30 rounded-[3rem] blur-3xl group-hover:bg-emerald-400/40 transition-all duration-700 animate-pulse"></div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white bg-white aspect-square flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500">
              <img src="/hero/main-mix.webp" alt="Vitamor Premium Mix" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-5 py-2 rounded-2xl shadow-lg border border-slate-100">
                <p className="text-sm font-black text-emerald-900 uppercase tracking-wide">طبيعي 100%</p>
              </div>
              <div className="absolute bottom-6 left-6 bg-slate-900/90 backdrop-blur-md px-5 py-2 rounded-2xl shadow-lg border border-slate-800">
                <p className="text-sm font-black text-white uppercase tracking-wide flex items-center gap-2"><Rocket className="w-4 h-4 text-emerald-400"/> تقنية NASA</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. NASA Section */}
      <section id="nasa-section" className="bg-slate-950 py-24 px-6 md:px-20 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-900/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="space-y-10 order-1 lg:order-2">
            <div className="inline-flex items-center gap-3 bg-emerald-900/30 border border-emerald-500/30 px-5 py-2.5 rounded-full">
              <Rocket className="w-5 h-5 text-emerald-400" />
              <span className="text-sm font-black text-emerald-300 uppercase tracking-widest">تكنولوجيا الفضاء NASA</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">طعام المستقبل، <br/>الآن بين يديك.</h2>
            <p className="text-xl text-slate-400 leading-relaxed font-medium">
              تقنية التجفيف بالتبريد <span className="text-emerald-400">(Lyophilization)</span> تسحب الماء من الفاكهة وهي مجمدة، مما يحافظ على الهيكل الخلوي والقيمة الغذائية بالكامل، عكس التجفيف الحراري التقليدي.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
                <Activity className="w-10 h-10 text-emerald-400 mb-4" />
                <h4 className="font-black text-2xl mb-2 text-white">97% فيتامينات</h4>
                <p className="text-slate-400 font-medium">حفاظ شبه كامل على الفوائد الصحية الطبيعية.</p>
              </div>
              <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
                <ShieldCheck className="w-10 h-10 text-emerald-400 mb-4" />
                <h4 className="font-black text-2xl mb-2 text-white">قرمشة حقيقية</h4>
                <p className="text-slate-400 font-medium">بدون زيوت، بدون سكر مضاف، فقط فاكهة خالصة.</p>
              </div>
            </div>
          </div>
          <div className="order-2 lg:order-1 relative rounded-[3rem] overflow-hidden border-4 border-slate-800 aspect-square shadow-2xl group">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10"></div>
            <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-1000" alt="NASA Space Tech" />
          </div>
        </div>
      </section>

      {/* 4. Athlete Nutrition */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto bg-white">
        <div className="text-center mb-20 space-y-6">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tight">الوقود النظيف للرياضيين</h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto font-medium">مزيج علمي يوفر الكربوهيدرات سريعة الامتصاص، المعادن، ومضادات الأكسدة التي يحتاجها جسمك للتعافي.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {ingredients.map((item, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-[3rem] border-2 border-slate-100 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all text-center group cursor-default">
              <div className="w-24 h-24 bg-white rounded-full mx-auto mb-6 flex items-center justify-center text-5xl shadow-md group-hover:-translate-y-2 transition-transform duration-300 border border-slate-100">
                <img src={item.img} alt={item.name} className="w-16 h-16 object-contain" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                <span className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.icon}</span>
              </div>
              <h4 className="font-black text-xl mb-3 text-slate-900">{item.name}</h4>
              <p className="text-xs font-black text-emerald-800 bg-emerald-100/80 py-1.5 px-4 rounded-full inline-block">{item.benefit}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Offers Section */}
      <section id="offers-section" className="py-24 px-6 md:px-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 space-y-6">
            <div className="inline-block bg-red-100 text-red-700 px-6 py-2 rounded-full font-black text-sm mb-4 animate-pulse">
              ⚠️ عرض محدود: التوصيل مجاني اليوم فقط
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tighter">استثمر في صحتك اليوم</h2>
            <p className="text-xl text-slate-600 font-bold">الدفع كاش عند الاستلام — بدون أي مخاطرة</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            {sortedOffers.map((offer) => {
              const isRoyal = isRoyalOffer(offer.id);
              return (
                <div key={offer.id} className={`relative bg-white transition-all duration-500 flex flex-col ${isRoyal ? 'border-[6px] border-amber-400 shadow-[0_40px_80px_-20px_rgba(245,158,11,0.3)] lg:scale-110 z-20 rounded-[3.5rem] p-10' : 'border-2 border-slate-200 shadow-xl rounded-[3rem] p-8 lg:opacity-95 hover:opacity-100 hover:border-emerald-200'}`}>
                  
                  {isRoyal && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-black px-8 py-2.5 rounded-full shadow-xl z-30 flex items-center gap-2 whitespace-nowrap border-2 border-white">
                      <Flame className="w-4 h-4" /> الخيار الأذكى والأكثر طلباً
                    </div>
                  )}

                  <div className={`relative w-full rounded-[2.5rem] mb-8 overflow-hidden bg-white flex items-center justify-center border-4 border-slate-50 shadow-inner group cursor-pointer ${isRoyal ? 'h-[360px] md:h-[450px]' : 'h-[280px] md:h-[350px]'}`} onClick={() => openModal(offer.id)}>
                    <img src={offer.image} alt={offer.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    
                    <div className={`absolute inset-0 pointer-events-none bg-gradient-to-t ${isRoyal ? 'from-amber-900/50 via-transparent' : 'from-[#1b4332]/50 via-transparent'} to-transparent`} />
                    
                    <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-[1.5rem] shadow-2xl border border-white">
                      <p className={`text-4xl font-black tracking-tighter ${isRoyal ? 'text-amber-600' : 'text-emerald-800'}`}>
                        {offer.price} <span className="text-lg font-bold text-slate-500">درهم</span>
                      </p>
                      {offer.id !== 1 && (
                        <p className="text-sm text-slate-400 line-through font-bold text-right mt-1">عوض {offer.originalPrice} درهم</p>
                      )}
                    </div>

                    {isRoyal && (
                      <div className="absolute top-6 left-6 bg-red-600 text-white px-4 py-1.5 rounded-full text-xs font-black shadow-lg animate-bounce">
                        باقي 14 باقة فقط!
                      </div>
                    )}
                  </div>

                  <div className="text-center flex-grow flex flex-col">
                    <h3 className={`font-black tracking-tight mb-8 ${isRoyal ? 'text-3xl text-slate-900' : 'text-2xl text-slate-800'}`}>{offer.name}</h3>
                    
                    <ul className="space-y-5 mb-10 text-base font-bold text-slate-600 text-right px-2">
                      <li className="flex items-center gap-4"><CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" /> <span className="text-slate-800">{offer.totalPacks} باقات بريميوم</span> (تكفي لمدة طويلة)</li>
                      <li className="flex items-center gap-4"><Truck className="w-6 h-6 text-emerald-500 shrink-0" /> {offer.shipping === 0 ? <span className="text-emerald-600 font-black">توصيل مجاني لباب الدار</span> : <span>توصيل سريع: 20 درهم</span>}</li>
                      <li className="flex items-center gap-4"><ShieldCheck className="w-6 h-6 text-emerald-500 shrink-0" /> الدفع كاش <span className="text-slate-800 font-black px-1">بعد</span> استلام وتفقد الطلب</li>
                    </ul>

                    <button onClick={() => openModal(offer.id)} className={`w-full py-6 rounded-[2rem] font-black text-2xl transition-all shadow-2xl active:scale-95 mt-auto flex items-center justify-center gap-3 ${isRoyal ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-amber-500/40 hover:scale-[1.02]' : 'bg-slate-900 text-white hover:bg-black shadow-slate-900/20'}`}>
                      {offer.ctaLabel} <MousePointerClick className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Social Proof */}
      <section id="reviews" className="py-24 px-6 md:px-20 max-w-7xl mx-auto bg-white">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="text-right space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight">ماذا يقول زبناؤنا؟</h2>
            <p className="text-xl text-slate-500 font-bold">تجارب حقيقية من أشخاص اختاروا الصحة والقرمشة.</p>
          </div>
          <div className="bg-emerald-50/80 p-8 rounded-[2rem] border border-emerald-100 text-center shadow-sm">
            <p className="text-5xl font-black text-emerald-800">4.9<span className="text-2xl text-emerald-600/50">/5</span></p>
            <div className="flex text-amber-400 my-3 justify-center gap-1"><Star className="w-6 h-6 fill-current"/><Star className="w-6 h-6 fill-current"/><Star className="w-6 h-6 fill-current"/><Star className="w-6 h-6 fill-current"/><Star className="w-6 h-6 fill-current"/></div>
            <p className="text-xs font-black text-emerald-900 uppercase tracking-widest">من إجمالي +900 تقييم</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {reviews.map((rev) => (
            <div key={rev.id} className="bg-slate-50 border-2 border-slate-100 p-10 rounded-[3rem] shadow-sm relative hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <Quote className="absolute top-10 left-10 w-14 h-14 text-slate-200" />
              <p className="text-xl text-slate-700 font-medium leading-relaxed mb-10 italic relative z-10 pt-4">"{rev.text}"</p>
              <div className="flex items-center gap-5 pt-8 border-t border-slate-200/60">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-2xl shadow-inner border-2 border-white ${rev.avatarColor}`}>{rev.name.charAt(0)}</div>
                <div>
                  <h4 className="font-black text-xl text-slate-900">{rev.name}</h4>
                  <p className="text-sm font-bold text-slate-500 flex items-center gap-1.5 mt-1"><CheckCircle className="w-4 h-4 text-emerald-500" /> مشترٍ من {rev.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 px-6 md:px-20 border-t-[12px] border-emerald-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-slate-800 pb-20">
          <div className="space-y-6 text-center md:text-right">
            <h3 className="text-4xl font-black text-white tracking-tighter">VITAMOR<span className="text-emerald-500">.</span></h3>
            <p className="text-base leading-relaxed font-medium">العلامة المغربية الأولى للفواكه المجففة بتكنولوجيا NASA. جودة بريميوم، طبيعية 100%، وقرمشة خيالية لباب دارك.</p>
          </div>
          <div className="space-y-6 text-center md:text-right">
            <h4 className="text-white text-xl font-black uppercase tracking-widest">تصفح الموقع</h4>
            <ul className="space-y-4 text-base font-bold">
              <li><button onClick={() => document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-emerald-400 transition">جميع العروض المتاحة</button></li>
              <li><a href="#nasa-section" className="hover:text-emerald-400 transition">تكنولوجيا التبريد</a></li>
              <li><Link href="/refund" className="hover:text-emerald-400 transition">سياسة الاستبدال</Link></li>
            </ul>
          </div>
          <div className="space-y-6 text-center md:text-right">
            <h4 className="text-white text-xl font-black uppercase tracking-widest">تواصل معنا</h4>
            <ul className="space-y-5 text-base font-bold">
              <li>
                <a href="tel:+212600000000" className="flex items-center gap-4 justify-center md:justify-start text-white hover:text-emerald-400 transition">
                  <div className="bg-emerald-900/50 p-3 rounded-full"><Phone className="w-5 h-5 text-emerald-400" /></div>
                  <span dir="ltr" className="text-xl">+212 600 000 000</span>
                </a>
              </li>
              <li className="flex items-center gap-4 justify-center md:justify-start">
                <div className="bg-emerald-900/50 p-3 rounded-full"><Mail className="w-5 h-5 text-emerald-400" /></div>
                <span>contact@vitamor.ma</span>
              </li>
            </ul>
          </div>
          <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 space-y-6 shadow-xl">
            <h4 className="text-white text-xl font-black uppercase tracking-widest">ضماناتنا الذهبية</h4>
            <ul className="space-y-5 text-base font-bold">
              <li className="flex items-center gap-4"><ShieldCheck className="w-7 h-7 text-emerald-500 shrink-0" /> <span>جودة طبيعية 100% مضمونة</span></li>
              <li className="flex items-center gap-4"><Truck className="w-7 h-7 text-emerald-500 shrink-0" /> <span>توصيل سريع وآمن للطلبيات</span></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between pt-10 gap-6">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">© {new Date().getFullYear()} VITAMOR PREMIUM FRUITS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-8 text-xs font-black uppercase tracking-widest text-slate-500">
            <Link href="/privacy" className="hover:text-white transition">سياسة الخصوصية</Link>
            <Link href="/about" className="hover:text-white transition">من نحن</Link>
          </div>
        </div>
      </footer>

      {/* 8. Sticky Bottom CTA (Mobile Optimized) */}
      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-200 p-4 z-40 flex justify-center shadow-[0_-10px_40px_rgba(0,0,0,0.1)] lg:hidden">
        <button onClick={() => openModal(ROYAL_OFFER_ID)} className="w-full max-w-md bg-gradient-to-r from-amber-500 to-orange-600 text-white py-5 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-amber-500/30 animate-bounce-slow">
          <MousePointerClick className="w-6 h-6" /> أطلب العرض الملكي الآن
        </button>
      </div>

      {/* 9. Checkout Modal (The Ultimate Form UI) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/95 z-50 flex items-end md:items-center justify-center p-0 md:p-6 backdrop-blur-md">
          <div className="bg-white rounded-t-[3.5rem] md:rounded-[3.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-full duration-300 max-h-[95vh] overflow-y-auto flex flex-col">
            
            <div className="p-8 bg-[#f8fafc] border-b border-slate-200 flex justify-between items-center sticky top-0 z-20 shadow-sm">
              <div className="text-right">
                <h3 className="font-black text-3xl text-slate-900">{orderSuccess ? "تم استلام طلبك بنجاح! 🎉" : "أكمل طلبك في ثوانٍ"}</h3>
                {!orderSuccess && <p className="text-sm font-black text-emerald-600 mt-2 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4" /> الدفع كاش عند الاستلام — توصيل آمن</p>}
              </div>
              <button onClick={closeModal} className="bg-white p-3.5 rounded-full shadow-md text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"><X className="w-7 h-7" /></button>
            </div>

            <div className="p-8 md:p-10 bg-white flex-grow">
              {orderSuccess ? (
                <div className="text-center py-12 space-y-8 animate-in fade-in duration-500">
                  <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border-8 border-emerald-50">
                    <CheckCircle className="w-16 h-16 text-emerald-600" />
                  </div>
                  <h2 className="text-4xl font-black text-slate-900">شكراً لك، {customerName}!</h2>
                  <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 max-w-md mx-auto">
                    <p className="text-xl text-slate-700 font-bold leading-relaxed">
                      تم تسجيل طلبك لباقة <span className="text-emerald-700 font-black">{selectedOffer.name}</span> بنجاح.
                    </p>
                    <hr className="my-6 border-slate-200" />
                    <p className="text-lg text-slate-600 font-medium">
                      سيتصل بك فريقنا قريباً على الرقم <br/> <span className="font-black text-2xl text-slate-900 mt-2 block tracking-widest" dir="ltr">{customerPhone}</span> <br/> لتأكيد موعد ومكان التوصيل في <span className="font-black">{customerCity}</span>.
                    </p>
                  </div>
                  <button onClick={closeModal} className="w-full max-w-md mx-auto py-6 bg-slate-900 text-white rounded-[2rem] font-black text-2xl shadow-xl hover:bg-black transition-colors">العودة للمتجر</button>
                </div>
              ) : (
                <form onSubmit={submitOrder} className="space-y-10">
                  
                  {/* Receipt Summary */}
                  <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white space-y-4 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
                    <h4 className="text-lg font-bold text-slate-400 mb-6 border-b border-slate-800 pb-4">ملخص الطلب</h4>
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-slate-300">{selectedOffer.name}</span>
                      <span className="text-white">{selectedOffer.price} درهم</span>
                    </div>
                    {selectedOffer.shipping === 0 ? (
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-slate-300">رسوم التوصيل</span>
                        <span className="text-emerald-400 bg-emerald-900/30 px-3 py-1 rounded-lg">مجاني 🎁</span>
                      </div>
                    ) : (
                      <div className="flex justify-between text-lg font-bold">
                        <span className="text-slate-300">رسوم التوصيل</span>
                        <span className="text-white">{selectedOffer.shipping} درهم</span>
                      </div>
                    )}
                    <div className="flex justify-between text-4xl font-black pt-6 border-t border-slate-800 mt-4">
                      <span>الإجمالي</span>
                      <span className="text-emerald-400">{totalPrice} درهم</span>
                    </div>
                  </div>

                  {/* Input Fields with Icons */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-black text-slate-900">معلومات التوصيل:</h4>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                        <User className="h-6 w-6 text-slate-400" />
                      </div>
                      <input 
                        type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} 
                        placeholder="الاسم والنسب (مثال: محمد بنعلي)" 
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-[2rem] pr-16 pl-6 py-6 outline-none font-black text-xl text-slate-800 focus:border-emerald-500 focus:bg-white transition-all shadow-sm" 
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                        <Phone className="h-6 w-6 text-slate-400" />
                      </div>
                      <input 
                        type="tel" required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} 
                        placeholder="رقم الهاتف (مثال: 0612345678)" 
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-[2rem] pr-16 pl-6 py-6 outline-none font-black text-xl text-slate-800 text-left focus:border-emerald-500 focus:bg-white transition-all shadow-sm tracking-wider" 
                        dir="ltr" 
                      />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 right-0 pr-6 flex items-center pointer-events-none">
                        <MapPin className="h-6 w-6 text-slate-400" />
                      </div>
                      <input 
                        type="text" required value={customerCity} onChange={(e) => setCustomerCity(e.target.value)} 
                        placeholder="المدينة (مثال: الدار البيضاء)" 
                        className="w-full bg-slate-50 border-2 border-slate-200 rounded-[2rem] pr-16 pl-6 py-6 outline-none font-black text-xl text-slate-800 focus:border-emerald-500 focus:bg-white transition-all shadow-sm" 
                      />
                    </div>
                  </div>

                  <button 
                    disabled={isSubmitting} 
                    className={`relative overflow-hidden w-full text-white py-7 rounded-[2.5rem] font-black text-3xl flex items-center justify-center gap-4 shadow-2xl transition-all group ${
                      isRoyalOffer(selectedBundleId) ? 'bg-gradient-to-r from-amber-500 to-orange-600 shadow-orange-500/30 hover:shadow-orange-500/50' : '
