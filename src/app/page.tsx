"use client";

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { 
  ShoppingCart, X, CheckCircle, Phone, Mail, ShieldCheck, 
  Truck, Star, Zap, Rocket, Activity, Quote, Users, 
  Flame, MousePointerClick, ChevronRight, Loader2
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
  { id: "rev-amin", name: "أمين. ح", city: "مراكش", avatarColor: "bg-blue-100 text-blue-800", stars: 5, title: "أحسن سناك جربتو في حياتي", text: "أفضل سناك خديتو للتدريب. خفيف على المعدة وكيعطي طاقة حقيقية بلا سكر. دابا مكنقدرش نتخيل التمرين بلاه.", date: "12 أبريل 2025", product: "العرض الملكي — 5 باقات", verified: true, helpful: 34, badge: "مشترٍ متكرر" },
  { id: "rev-layla", name: "ليلى. ب", city: "طنجة", avatarColor: "bg-rose-100 text-rose-800", stars: 5, title: "ولادي ماشيين يطلبو منو كل أسبوع", text: "ولادي عجبهم بزااف! القرمشة خيالية والمذاق كأنها فاكهة طرية يلاه تقطفات. الآن هو السناك الرسمي ديال الدار.", date: "28 مارس 2025", product: "عرض العائلة — 3 باقات", verified: true, helpful: 21, badge: null },
  { id: "rev-yassin", name: "ياسين. ق", city: "أكادير", avatarColor: "bg-emerald-100 text-emerald-800", stars: 5, title: "جودة عالية وتوصيل فائق السرعة", text: "توصيل وصل ف 24 ساعة. التغليف محترف بزاف. عرض 5 باقات هو الأفضل من ناحية الثمن — كل باقة بـ 89 درهم فقط.", date: "5 مايو 2025", product: "العرض الملكي — 5 باقات", verified: true, helpful: 18, badge: "أفضل مراجعة" },
];

const comparisonRows = [
  { label: "المواد الحافظة", vitamor: "0% — طبيعي 100%", other: "كثيرة جداً" },
  { label: "الفيتامينات", vitamor: "97% محفوظة", other: "تفقد 50%" },
  { label: "السكر المضاف", vitamor: "لا يوجد نهائياً", other: "كميات عالية" },
];

const sortedOffers = [...offers].sort((a, b) => a.order - b.order);

const isRoyalOffer = (id: number) => id === ROYAL_OFFER_ID;

const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>, fallback: string) => {
  e.currentTarget.src = fallback;
};

export default function VitamorHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBundleId, setSelectedBundleId] = useState<number>(ROYAL_OFFER_ID);

  // Form States
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCity, setCustomerCity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  // ⚠️ تم دمج رابط Google Apps Script الخاص بك بنجاح ⚠️
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzqmXPEs-25FOkYn36JA0g6jKW9BsW2XbO2qY4XjpBldS-cZa12Vx1nTcHoXIC4XyQdOQ/exec";

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
    setOrderSuccess(false);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setOrderSuccess(false);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerCity("");
  }, []);

  const scrollToOffers = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    document.getElementById('offers-section')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // دالة إرسال الطلب إلى Google Sheets
  const submitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerCity) {
      alert("المرجاء ملء جميع المعلومات لتأكيد الطلب");
      return;
    }

    setIsSubmitting(true);

    const orderData = {
      name: customerName,
      phone: customerPhone,
      city: customerCity,
      bundleName: selectedOffer.name,
      totalPrice: totalPrice
    };

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(orderData),
      });
      
      setOrderSuccess(true);
    } catch (error) {
      alert("حدث خطأ أثناء إرسال الطلب، المرجو المحاولة مرة أخرى أو الاتصال بنا.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] font-sans rtl scroll-smooth selection:bg-emerald-100" dir="rtl">
      
      <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-white/80 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100">
        <Link href="/" className="text-2xl font-black tracking-tighter text-[#1b4332]">
          VITAMOR<span className="text-emerald-500">.</span>
        </Link>
        <div className="hidden md:flex gap-8 text-sm font-bold text-slate-600">
          <a href="#nasa-section" className="hover:text-emerald-600 transition">تقنية NASA</a>
          <a href="#offers-section" className="hover:text-emerald-600 transition">العروض</a>
          <a href="#reviews" className="hover:text-emerald-600 transition">آراء الزبناء</a>
        </div>
        <button onClick={() => scrollToOffers()} className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 border border-emerald-100 hover:bg-emerald-100 transition">
          <Zap className="w-3 h-3 fill-current" /> التوصيل مجاني اليوم لباب دارك
        </button>
      </nav>

      <header className="relative py-16 lg:py-24 px-6 md:px-20 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center lg:text-right relative z-10">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 px-4 py-2 rounded-full">
              <Flame className="w-4 h-4 text-orange-600" />
              <span className="text-xs font-black text-orange-800">+900 طلبية مسلمة بنجاح هاد الشهر</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black leading-[1.1] text-slate-900 tracking-tight">
              اكتشف سر <br/> 
              <span className="text-emerald-800 italic underline decoration-emerald-300 underline-offset-8">القرمشة الفضائية</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              فواكه طبيعية 100% مجففة بتقنية التبريد (Freeze-Drying). نحافظ على 97% من الفيتامينات — بدون إضافة غرام واحد من السكر.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-4">
              <button onClick={() => scrollToOffers()} className="group bg-[#1b4332] text-white px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:bg-black transition-all flex items-center gap-3 active:scale-95">
                اختار عرضك واستلم غداً <ChevronRight className="w-5 h-5 group-hover:translate-x-[-5px] transition-transform" />
              </button>
            </div>
          </div>

          <div className="relative group" onClick={() => openModal(ROYAL_OFFER_ID)}>
            <div className="absolute inset-0 bg-emerald-400/20 rounded-[3rem] blur-3xl group-hover:bg-emerald-400/30 transition-all animate-pulse"></div>
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-[10px] border-white bg-white aspect-square cursor-pointer">
              <img 
                src="/hero/main-mix.webp" 
                alt="Vitamor Mix"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                onError={(e) => handleImgError(e, "https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?auto=format&fit=crop&w=800")}
              />
              <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur px-6 py-3 rounded-2xl shadow-2xl border border-slate-100">
                <p className="text-xs font-black text-emerald-900 uppercase">طبيعي 100% • تقنية وكالة NASA</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* NASA Section */}
      <section id="nasa-section" className="bg-slate-950 py-24 px-6 md:px-20 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full">
              <Rocket className="w-5 h-5 text-emerald-500" />
              <span className="text-xs font-black text-emerald-400 uppercase tracking-widest">تكنولوجيا وكالة NASA</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black leading-tight">ليست مجرد فواكه مجففة.. إنها طعام المستقبل</h2>
            <p className="text-xl text-slate-400 leading-relaxed">
              تقنية <strong>التجفيف بالتبريد (Lyophilization)</strong> هي الطريقة الوحيدة التي تضمن سحب الماء من الفاكهة مع الحفاظ على هيكلها الخلوي.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="bg-slate-900 p-3 rounded-xl"><Activity className="w-6 h-6 text-emerald-500" /></div>
                <div>
                  <h4 className="font-black text-xl">تركيز غذائي عالي</h4>
                  <p className="text-slate-500">تحتوي الحصة الواحدة على فوائد تعادل 5 أضعاف وزنها من الفاكهة الطرية.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-slate-900 p-3 rounded-xl"><ShieldCheck className="w-6 h-6 text-emerald-500" /></div>
                <div>
                  <h4 className="font-black text-xl">قرمشة تدوم طويلاً</h4>
                  <p className="text-slate-500">بدون زيوت أو قلي — قرمشة طبيعية 100% بفضل سحب الرطوبة بالضغط.</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800">
              <h3 className="text-2xl font-black text-emerald-500 mb-8 text-center italic">لماذا Vitamor؟</h3>
              <div className="space-y-4">
                {comparisonRows.map((row) => (
                  <div key={row.label} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                    <span className="text-[10px] text-red-400 line-through font-bold w-24 text-center">{row.other}</span>
                    <span className="text-xs font-black text-slate-400 uppercase">{row.label}</span>
                    <span className="text-sm font-black text-emerald-400 w-24 text-center">{row.vitamor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Athlete Nutrition */}
      <section className="py-24 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 uppercase">الوقود النظيف للرياضيين</h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">مزيج مدروس يوفر الكربوهيدرات النظيفة، المعادن، ومضادات الأكسدة — قبل وبعد التمرين.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {ingredients.map((item) => (
            <div key={item.name} className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:border-emerald-200 transition-all text-center group cursor-default">
              <div className="w-20 h-20 bg-slate-50 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl shadow-inner group-hover:scale-110 transition-transform relative">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-14 h-14 object-contain"
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                />
                <span className="absolute group-hover:opacity-0 transition-opacity">{item.icon}</span>
              </div>
              <h4 className="font-black text-lg mb-1">{item.name}</h4>
              <p className="text-[10px] font-black text-emerald-700 bg-emerald-50 py-1 px-3 rounded-full inline-block">{item.benefit}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="offers-section" className="py-24 px-6 md:px-20 bg-[#f8fafc] border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">وفر أكثر، كلما طلبتي أكثر</h2>
            <p className="text-lg text-slate-500 font-bold italic">التوصيل مجاني من باقتين — الدفع كاش عند الاستلام</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            {sortedOffers.map((offer) => {
              const isRoyal = isRoyalOffer(offer.id);
              return (
                <div key={offer.id} className={`relative bg-white transition-all duration-500 flex flex-col ${isRoyal ? 'border-[6px] border-amber-400 shadow-[0_30px_60px_-15px_rgba(245,158,11,0.3)] lg:scale-110 z-20 rounded-[3.5rem] p-10' : 'border-2 border-emerald-100 shadow-lg rounded-[2.5rem] p-8 lg:opacity-90 hover:opacity-100'}`}>
                  {offer.tag && (
                    <div className={`absolute -top-5 left-1/2 -translate-x-1/2 text-white text-xs font-black px-8 py-2 rounded-full shadow-xl z-30 whitespace-nowrap ${isRoyal ? 'bg-amber-500' : 'bg-emerald-600'}`}>
                      {offer.tag}
                    </div>
                  )}

                  <div className={`relative w-full rounded-[2.5rem] mb-8 overflow-hidden bg-slate-50 flex items-center justify-center border-4 border-white shadow-inner transition-all ${isRoyal ? 'h-[320px] md:h-[380px]' : 'h-[280px] md:h-[320px]'}`}>
                    <img 
                      src={offer.image} 
                      alt={offer.name} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 cursor-pointer"
                      onClick={() => openModal(offer.id)}
                    />
                    <div className={`absolute inset-0 pointer-events-none bg-gradient-to-t ${isRoyal ? 'from-amber-900/60 via-amber-900/10' : 'from-[#1b4332]/60 via-[#1b4332]/10'} to-transparent`} />
                    <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-white">
                      <p className={`text-3xl font-black tracking-tighter ${isRoyal ? 'text-amber-600' : 'text-emerald-800'}`}>
                        {offer.price} <span className="text-base font-bold text-slate-500">درهم</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-center flex-grow flex flex-col">
                    <h3 className={`font-black tracking-tight mb-6 ${isRoyal ? 'text-2xl text-slate-900' : 'text-xl text-slate-800'}`}>
                      {offer.name}
                    </h3>
                    
                    <ul className="space-y-4 mb-10 text-sm font-bold text-slate-600 text-right pr-2">
                      <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> {offer.totalPacks} باقات بريميوم</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> {offer.shipping === 0 ? "توصيل فابور مجاني" : "توصيل سريع لباب دارك"}</li>
                      <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" /> الدفع كاش عند الاستلام</li>
                    </ul>

                    <button onClick={() => openModal(offer.id)} className={`w-full py-5 rounded-[2rem] font-black text-xl transition-all shadow-xl active:scale-95 mt-auto ${isRoyal ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-200' : 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-emerald-100'}`}>
                      {offer.ctaLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-24 px-6 md:px-20 bg-[#f8fafc] border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-14 gap-8">
            <div className="space-y-2 text-right">
              <h2 className="text-3xl md:text-5xl font-black text-slate-900">ماذا يقول زبناؤنا?</h2>
              <p className="text-base text-slate-500 font-semibold">+900 مراجعة حقيقية من زبناء مغاربة موثقين</p>
            </div>
            <div className="flex items-center gap-6 bg-white border border-slate-200 rounded-2xl px-8 py-5 shadow-sm shrink-0">
              <div className="text-center">
                <p className="text-5xl font-black text-slate-900 leading-none">4.9</p>
                <div className="flex text-yellow-400 my-1.5 justify-center">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">من 5 نجوم</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shrink-0 ${rev.avatarColor}`}>
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-900">{rev.name}</p>
                      <p className="text-[11px] text-slate-400 font-medium">{rev.city}، المغرب</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5 text-yellow-400">
                    {Array.from({ length: rev.stars }).map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">{rev.date}</span>
                </div>
                <p className="font-black text-sm text-slate-900 leading-snug">{rev.title}</p>
                <p className="text-sm text-slate-600 leading-relaxed flex-1">{rev.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 pt-24 pb-12 px-6 md:px-20 border-t-8 border-emerald-600">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-slate-800 pb-20">
          <div className="space-y-6 text-center md:text-right">
            <h3 className="text-4xl font-black text-white tracking-tighter">VITAMOR<span className="text-emerald-500">.</span></h3>
            <p className="text-sm leading-relaxed">العلامة المغربية الأولى للفواكه المجففة بتكنولوجيا NASA — جودة بريميوم، طبيعية 100%، لباب دارك.</p>
          </div>
          <div className="space-y-6 text-center md:text-right">
            <h4 className="text-white text-lg font-black uppercase tracking-widest">تصفح الموقع</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li><a href="#offers-section" onClick={scrollToOffers} className="hover:text-emerald-400 transition cursor-pointer">جميع العروض المتاحة</a></li>
              <li><a href="#nasa-section" className="hover:text-emerald-400 transition">تكنولوجيا التبريد</a></li>
              <li><Link href="/refund" className="hover:text-emerald-400 transition">سياسة الاستبدال</Link></li>
              <li><Link href="/about" className="hover:text-emerald-400 transition">من نحن</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-400 transition">سياسة الخصوصية</Link></li>
            </ul>
          </div>
          <div className="space-y-6 text-center md:text-right">
            <h4 className="text-white text-lg font-black uppercase tracking-widest">تواصل معنا</h4>
            <ul className="space-y-4 text-sm font-bold">
              <li className="flex items-center gap-4 justify-center md:justify-start text-white">
                <Phone className="w-5 h-5 text-emerald-500" />
                <span dir="ltr">+212 600 000 000</span>
              </li>
              <li className="flex items-center gap-4 justify-center md:justify-start">
                <Mail className="w-5 h-5 text-emerald-500" />
                <span>contact@vitamor.ma</span>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-center pt-10 text-[10px] font-black uppercase tracking-[0.3em]">© {new Date().getFullYear()} VITAMOR PREMIUM FRUITS. ALL RIGHTS RESERVED.</p>
      </footer>

      {/* Checkout Modal with Form Submission */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-950/90 z-50 flex items-end md:items-center justify-center p-0 md:p-4 backdrop-blur-md">
          <div className="bg-white rounded-t-[3rem] md:rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-full duration-300 max-h-[90vh] overflow-y-auto">
            
            <div className="p-8 bg-[#f8fafc] border-b flex justify-between items-center sticky top-0 z-10">
              <div className="text-right">
                <h3 className="font-black text-2xl text-slate-900">{orderSuccess ? "تم استلام طلبك! 🎉" : "أكمل طلبك الآن"}</h3>
                {!orderSuccess && <p className="text-xs font-black text-emerald-600 mt-1 uppercase tracking-widest">الدفع كاش عند الاستلام</p>}
              </div>
              <button onClick={closeModal} className="bg-white p-3 rounded-full shadow-lg text-slate-400 hover:text-red-500"><X className="w-6 h-6" /></button>
            </div>

            <div className="p-8">
              {orderSuccess ? (
                <div className="text-center space-y-6 py-10">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <CheckCircle className="w-12 h-12 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900">شكراً لك، {customerName}!</h2>
                  <p className="text-lg text-slate-600">تم تسجيل طلبك بنجاح. سنتصل بك قريباً على الرقم <span className="font-bold">{customerPhone}</span> لتأكيد الطلب وتحديد موعد التوصيل.</p>
                  <button onClick={closeModal} className="mt-8 bg-[#1b4332] text-white px-10 py-4 rounded-2xl font-black text-lg w-full">العودة للمتجر</button>
                </div>
              ) : (
                <form onSubmit={submitOrder} className="space-y-8">
                  <div className="bg-slate-950 p-6 rounded-[2.5rem] text-white space-y-2">
                    <div className="flex justify-between text-sm font-bold opacity-70"><span>المنتجات:</span><span>{selectedOffer.price} درهم</span></div>
                    {selectedOffer.shipping > 0 && <div className="flex justify-between text-sm font-bold opacity-70"><span>التوصيل:</span><span>{selectedOffer.shipping} درهم</span></div>}
                    <div className="flex justify-between text-3xl font-black pt-4 border-t border-slate-800"><span>الإجمالي:</span><span className="text-emerald-500">{totalPrice} درهم</span></div>
                  </div>

                  <div className="space-y-4">
                    <input 
                      type="text" 
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="الاسم والنسب" 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none font-black text-lg focus:border-emerald-500" 
                    />
                    <input 
                      type="tel" 
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="رقم الهاتف" 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none font-black text-lg text-left focus:border-emerald-500" 
                      dir="ltr" 
                    />
                    <input 
                      type="text" 
                      required
                      value={customerCity}
                      onChange={(e) => setCustomerCity(e.target.value)}
                      placeholder="المدينة" 
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none font-black text-lg focus:border-emerald-500" 
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className={`w-full text-white py-6 rounded-[2.5rem] font-black text-2xl shadow-2xl flex items-center justify-center gap-3 transition-all ${
                    selectedBundleId === ROYAL_OFFER_ID ? 'bg-gradient-to-r from-amber-500 to-orange-600' : 'bg-emerald-700'
                  } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}`}>
                    {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : "تأكيد الطلب ✓"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="fixed bottom-0 left-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 p-4 z-40 flex justify-center shadow-2xl">
        <button onClick={() => openModal(ROYAL_OFFER_ID)} className="w-full max-w-md bg-gradient-to-r from-emerald-700 to-[#1b4332] text-white py-4 rounded-[2rem] font-black text-xl shadow-xl flex items-center justify-center gap-3 animate-bounce-slow">
          <MousePointerClick className="w-6 h-6" /> العرض الملكي — التوصيل مجاني
        </button>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-bounce-slow { animation: bounce-slow 4s infinite ease-in-out; }
      `}} />
    </div>
  );
}
