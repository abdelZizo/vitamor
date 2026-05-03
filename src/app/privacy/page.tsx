import Link from 'next/link';
import { ArrowRight, Lock, ShieldCheck, Eye, Server } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#1a1a1a] font-sans rtl leading-relaxed" dir="rtl">
      
      {/* رأس الصفحة (Header) */}
      <header className="bg-slate-950 text-white py-16 px-6 text-center border-b-4 border-emerald-600">
        <div className="max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center justify-center bg-slate-900 p-3 rounded-full mb-4">
            <Lock className="w-8 h-8 text-emerald-500" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">سياسة الخصوصية</h1>
          <p className="text-slate-400 text-lg font-medium">معلوماتك الشخصية في أمان تام ومحمية بأعلى المعايير.</p>
        </div>
      </header>

      {/* محتوى السياسة */}
      <div className="max-w-4xl mx-auto py-16 px-6 space-y-12">
        
        <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-3xl flex flex-col md:flex-row items-start gap-6 shadow-sm">
          <ShieldCheck className="text-emerald-700 w-12 h-12 shrink-0" />
          <p className="text-emerald-900 font-bold text-lg leading-relaxed">
            في <span className="font-black">VITAMOR</span>، نعتبر خصوصية زوارنا وزبائننا أولوية قصوى. تشرح هذه الوثيقة أنواع المعلومات الشخصية التي نتلقاها ونجمعها وكيفية استخدامها لحمايتك وتقديم أفضل خدمة ممكنة لك.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 border-b pb-4">
            <Eye className="w-6 h-6 text-emerald-600" /> 1. المعلومات التي نجمعها
          </h2>
          <p className="text-lg text-slate-600 leading-loose">
            بما أننا نعتمد نظام <strong>"الدفع عند الاستلام" (COD)</strong>، فنحن لا نطلب أي معلومات بنكية أو بطاقات ائتمان. نجمع فقط المعلومات الأساسية الضرورية لتوصيل طلبيتك، وهي:
          </p>
          <ul className="list-none space-y-3 text-lg text-slate-700 font-medium">
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> الاسم والنسب.</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> رقم الهاتف للتواصل وتأكيد الطلب.</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> العنوان والمدينة لتوصيل الطلبية.</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 border-b pb-4">
            <Server className="w-6 h-6 text-emerald-600" /> 2. كيف نستخدم معلوماتك؟
          </h2>
          <p className="text-lg text-slate-600 leading-loose">
            المعلومات التي تقدمها لنا تُستخدم للأغراض التالية حصراً:
          </p>
          <ul className="list-none space-y-3 text-lg text-slate-700 font-medium">
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> الاتصال بك هاتفياً لتأكيد طلبيتك قبل شحنها.</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> تزويد شركة التوصيل (Livreur) بالعنوان ورقم الهاتف لإيصال المنتج لباب منزلك.</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> تحسين تجربة تصفحك للموقع عبر ملفات تعريف الارتباط (Cookies).</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3 border-b pb-4">
            <Lock className="w-6 h-6 text-emerald-600" /> 3. حماية البيانات ومشاركتها
          </h2>
          <p className="text-lg text-slate-600 leading-loose">
            نحن نلتزم التزاماً كاملاً بعدم بيع، أو تأجير، أو مشاركة معلوماتك الشخصية مع أي أطراف خارجية لأغراض تسويقية. يتم مشاركة البيانات <strong>فقط</strong> مع شركائنا في خدمة التوصيل المعتمدة لدينا، وذلك لغرض وحيد هو شحن وتسليم طلبيتك بنجاح.
          </p>
        </div>

        <div className="pt-12 border-t border-slate-200 text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-emerald-700 transition-colors shadow-lg active:scale-95">
            <ArrowRight className="w-6 h-6" /> العودة إلى الصفحة الرئيسية
          </Link>
        </div>
        
      </div>
    </div>
  );
}