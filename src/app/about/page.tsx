import Link from 'next/link';
import { ArrowRight, Leaf, ShieldCheck, Heart } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] font-sans rtl leading-relaxed" dir="rtl">
      
      {/* رأس الصفحة */}
      <header className="bg-slate-950 text-white py-12 px-6 text-center border-b-4 border-emerald-600">
        <h1 className="text-4xl font-black mb-4">قصة VITAMOR.</h1>
        <p className="text-slate-400 text-lg">أكثر من مجرد فواكه، أسلوب حياة صحي.</p>
      </header>

      {/* المحتوى */}
      <div className="max-w-4xl mx-auto py-16 px-6 space-y-12">
        <section className="space-y-6">
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Leaf className="text-emerald-600 w-8 h-8" /> الانطلاقة من الدار البيضاء
          </h2>
          <p className="text-lg text-slate-600 leading-loose">
            تأسست علامتنا التجارية <span className="font-bold text-slate-900">Vitamor</span> برؤية واضحة: تقديم بديل صحي، لذيذ، وفاخر للحلويات والوجبات الخفيفة المصنعة. لاحظنا في السوق المغربي نقصاً في المنتجات الطبيعية 100% التي تحافظ على قيمتها الغذائية، ومن هنا جاءت فكرة الفواكه المجففة بتقنية التبريد (Freeze-drying).
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
            <Heart className="text-emerald-600 w-8 h-8" /> التزامنا بالجودة
          </h2>
          <p className="text-lg text-slate-600 leading-loose">
            نحن لا نبيع مجرد فواكه، بل نبيع "الصحة والقرمشة". منتجاتنا خالية تماماً من السكر المضاف، المواد الحافظة، أو الألوان الصناعية. بفضل خبرتنا الطويلة في مجال التجارة والتوصيل، نحرص على أن يصلك المنتج بأعلى معايير الجودة والتغليف، أينما كنت في المغرب.
          </p>
        </section>

        <div className="pt-10 border-t border-slate-200">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:text-emerald-900 transition-colors">
            <ArrowRight className="w-5 h-5" /> العودة إلى المتجر
          </Link>
        </div>
      </div>
    </div>
  );
}