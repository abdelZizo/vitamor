import Link from 'next/link';
import { ArrowRight, RefreshCcw } from 'lucide-react';

export default function RefundPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] font-sans rtl leading-relaxed" dir="rtl">
      
      <header className="bg-slate-950 text-white py-12 px-6 text-center border-b-4 border-emerald-600">
        <h1 className="text-4xl font-black mb-4">سياسة الاستبدال والاسترجاع</h1>
        <p className="text-slate-400 text-lg">رضاكم هو هدفنا الأول.</p>
      </header>

      <div className="max-w-4xl mx-auto py-16 px-6 space-y-10">
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex items-start gap-4">
          <RefreshCcw className="text-emerald-700 w-8 h-8 shrink-0 mt-1" />
          <p className="text-emerald-900 font-bold leading-relaxed">
            في Vitamor، نضمن لك جودة منتجاتنا. بما أن منتجاتنا غذائية (فواكه مجففة)، فإن سياسة الاسترجاع تخضع لشروط صارمة لضمان السلامة الصحية لجميع زبائننا.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900">شروط الاستبدال والاسترجاع:</h2>
          <ul className="list-disc list-inside space-y-4 text-lg text-slate-600">
            <li>يحق للزبون فحص الطلبية والتأكد منها وقت الاستلام أمام الموزع (Livreur).</li>
            <li>في حالة وجود خطأ في الطلبية أو تلف في التغليف الأصلي، يحق للزبون رفض الاستلام أو طلب الاستبدال الفوري مجاناً.</li>
            <li>بمجرد فتح الغلاف الداخلي للمنتج، <span className="font-bold text-red-600">لا يمكن استرجاعه أو استبداله</span> لدواعي صحية (منتج غذائي).</li>
            <li>في حالة قبول الاسترجاع (العلبة مغلقة تماماً وفي حالتها الأصلية)، يتم إرجاع المبلغ كاملاً خلال 3 أيام عمل.</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900">كيفية تقديم طلب:</h2>
          <p className="text-lg text-slate-600 leading-loose">
            تواصل معنا عبر الواتساب على الرقم <strong>0600000000</strong> أو عبر البريد الإلكتروني <strong>contact@vitamor.ma</strong> مع إرفاق صورة للمنتج وسنقوم بمعالجة طلبك في أسرع وقت.
          </p>
        </div>

        <div className="pt-10 border-t border-slate-200">
          <Link href="/" className="inline-flex items-center gap-2 text-emerald-700 font-bold hover:text-emerald-900 transition-colors">
            <ArrowRight className="w-5 h-5" /> العودة إلى المتجر
          </Link>
        </div>
      </div>
    </div>
  );
}