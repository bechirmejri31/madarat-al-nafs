import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, User, ShieldCheck, Sparkles, MessageCircle, AlertCircle, Phone, Clock, Loader2, ArrowRight } from 'lucide-react';
import { Translation } from '../translations';
import { db, ensureAuth } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { notifyOwner, NotificationType } from '../services/notifier';

interface ConsultationFormProps {
  t: Translation;
  currentLang: string;
  isRtl: boolean;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({ t, currentLang, isRtl }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('type2'); // default to self-assertiveness
  const [details, setDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !details.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // 1. Ensure user is authenticated anonymizing guest
      try {
        await ensureAuth();
      } catch (authError) {
        console.warn("Anonymous auth skipped or failed during consultation submit:", authError);
      }

      // 2. Map selected type to string representation
      const typeLabel = type === 'type1' 
        ? t.consultationType1 
        : type === 'type2' 
        ? t.consultationType2 
        : t.consultationType3;

      const payload = {
        name: name.trim(),
        email: email.trim(),
        consultationType: typeLabel,
        details: details.trim(),
        submittedAt: serverTimestamp(),
        lang: currentLang,
        platform: "Madarat Al-Nafs"
      };

      // 3. Store in Firestore database (resilient to connection/permissions issues)
      try {
        await addDoc(collection(db, 'consultations'), payload);
        console.log("Consultation saved to Firestore successfully.");
      } catch (dbErr) {
        console.warn("Firestore save failed for consultation, but proceeding with notification alerts:", dbErr);
      }

      // 4. Send real-time notification alerts asynchronously (non-blocking) to Bechir Mejri
      notifyOwner(NotificationType.CONSULTATION, {
        subject: `طلب استشارة جديدة من: ${name}`,
        message: `طلب استشارة سلوكية جديدة عبر المنصة:\n- الاسم: ${name}\n- البريد: ${email}\n- نوع الاستشارة: ${typeLabel}\n- التفاصيل: ${details.substring(0, 150)}...`,
        details: {
          "الاسم": name,
          "البريد الإلكتروني": email,
          "التصنيف": typeLabel,
          "شرح الطلب": details,
          "اللغة": currentLang
        },
        emailHtml: `
          <div style="direction: ${isRtl ? 'rtl' : 'ltr'}; font-family: sans-serif; padding: 20px; border: 1px solid #d4af37; border-radius: 10px; max-width: 600px; margin: auto;">
            <h2 style="color: #d4af37; border-bottom: 1px solid #eee; padding-bottom: 10px; font-family: serif;">🔔 استشارة سلوكية جديدة - مدارات النفس</h2>
            <p style="font-size: 15px;">تلقيت طلباً جديداً للاستشارة والتحليل السلوكي عبر الموقع الإلكتروني.</p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">اسم السائل</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">البريد الإلكتروني</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: bold;">سياق التحليل</td>
                <td style="padding: 10px; border-bottom: 1px solid #eee; color: #d4af37; font-weight: bold;">${typeLabel}</td>
              </tr>
              <tr>
                <td style="padding: 10px; font-weight: bold; vertical-align: top;">تفاصيل الموقف السلوكي</td>
                <td style="padding: 10px; white-space: pre-wrap; line-height: 1.6; background-color: #f9f9f9; border-radius: 5px;">${details}</td>
              </tr>
            </table>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">تم تسجيل وحفظ هذا الطلب في قاعدة البيانات وبثه فورياً لقنوات الإشعار الخاصة بكم.</p>
          </div>
        `
      }).catch(notifErr => {
        console.warn("Notification background dispatch alert:", notifErr);
      });

      setSubmitSuccess(true);
      setName('');
      setEmail('');
      setDetails('');
    } catch (err: any) {
      console.error("Consultation submit error:", err);
      setErrorMessage(currentLang === 'ar' ? 'فشل إرسال طلبكم حالياً بسبب عطل مؤقت في الاتصال. يرجى المحاولة لاحقاً.' : 'Failed to save request due to connection issues. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="consultation" className="py-20 md:py-28 bg-[#070707] border-t border-white/5 relative overflow-hidden">
      {/* Decorative Aura Spotlights */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-gold/5 rounded-full filter blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-10 right-0 w-[250px] h-[250px] bg-gold/5 rounded-full filter blur-[80px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" style={{ direction: isRtl ? 'rtl' : 'ltr' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form Briefing (Left 5 Columns) */}
          <div className="lg:col-span-5 space-y-8 text-center lg:text-right" style={{ textAlign: isRtl ? 'right' : 'left' }}>
            <div className={`inline-flex items-center gap-2.5 px-4_5 py-2 bg-gold/5 border border-gold/15 rounded-full leading-none mx-auto lg:mx-0 ${isRtl ? 'flex-row' : 'flex-row-reverse'}`}>
              <span className="text-[10px] font-black tracking-[0.3em] text-gold uppercase">
                {currentLang === 'ar' ? 'بوابة التوجيه السلوكي' : 'Sovereign Path'}
              </span>
              <Sparkles className="w-3.5 h-3.5 text-gold animate-pulse" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-5xl font-serif text-white italic leading-none">
                {t.consultationTitle}
              </h2>
              <p className="text-white/50 text-base md:text-lg leading-relaxed font-light font-serif">
                {t.consultationSubtitle}
              </p>
            </div>

            {/* Informational Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl space-y-2 hover:border-gold/20 transition-all duration-300">
                <ShieldCheck className="w-6 h-6 text-gold" style={{ marginLeft: isRtl ? 'auto' : '0', marginRight: isRtl ? '0' : 'auto' }} />
                <h4 className="text-white font-medium text-sm font-serif">
                  {currentLang === 'ar' ? 'سرية تامة ومطلقة' : 'Absolute Confidentiality'}
                </h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  {currentLang === 'ar' ? 'تُشفّر البيانات وتُنقل مباشرة إلى بشير لحماية خصوصيتك السلوكية.' : 'Data is encrypted and sent directly to Bechir Mejri to shield your personal details.'}
                </p>
              </div>

              <div className="bg-white/[0.01] border border-white/5 p-5 rounded-2xl space-y-2 hover:border-gold/20 transition-all duration-300">
                <Clock className="w-6 h-6 text-gold" style={{ marginLeft: isRtl ? 'auto' : '0', marginRight: isRtl ? '0' : 'auto' }} />
                <h4 className="text-white font-medium text-sm font-serif">
                  {currentLang === 'ar' ? 'استجابة شخصية دقيقة' : 'Hand-crafted Analysis'}
                </h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  {currentLang === 'ar' ? 'تحليل سلوكي ونفسي منهجي يستند إلى نظريات توكيد الذات الفلسفية.' : 'Each client is handled with deep, peer-reviewed behavioural analysis.'}
                </p>
              </div>
            </div>
            
            <p className="text-[10px] text-white/30 italic font-mono uppercase tracking-widest pt-4">
              {currentLang === 'ar' ? '• مدارات النفس مرخصة ومعايرة للاستشارات السلوكية.' : '• Registered Psy Orbits scientific hub consultation terminal.'}
            </p>
          </div>

          {/* Form Processing Center (Right 7 columns) */}
          <div className="lg:col-span-7 bg-[#0b0b0b] border border-white/5 rounded-3xl p-6 sm:p-10.5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-[0.02] pointer-events-none scale-150">
              <Sparkles className="w-48 h-48 text-gold" />
            </div>

            <AnimatePresence mode="wait">
              {submitSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-20 h-20 rounded-full bg-gold/15 flex items-center justify-center mx-auto border border-gold/35">
                    <ShieldCheck className="w-10 h-10 text-gold" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-serif text-white italic">
                      {currentLang === 'ar' ? 'تم استلام طلبكم بنجاح' : 'Request Received'}
                    </h3>
                    <p className="text-white/60 text-sm max-w-md mx-auto leading-relaxed">
                      {t.consultationSuccessMsg}
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-6 px-8 py-3 bg-white/5 hover:bg-gold hover:text-black rounded-xl text-xs uppercase font-mono border border-white/10 hover:border-transparent transition-all active:scale-95"
                  >
                    {currentLang === 'ar' ? 'تقديم طلب جديد' : 'Submit Another Inquiry'}
                  </button>
                </motion.div>
              ) : (
                <form key="form" onSubmit={handleSubmit} className="space-y-6 relative z-10 text-right sm:text-left">
                  
                  {errorMessage && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-xs">
                      <AlertCircle className="w-5 h-5 shrink-0" />
                      <p>{errorMessage}</p>
                    </div>
                  )}

                  {/* Grid fields for Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2 text-right lg:text-right" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                      <label className="text-xs text-white/50 block font-medium font-serif">
                        {t.consultationNameLabel} <span className="text-gold">*</span>
                      </label>
                      <div className="relative">
                        <User className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 ${isRtl ? 'right-4' : 'left-4'}`} />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder={currentLang === 'ar' ? 'الاسم واللقب...' : 'Your full name...'}
                          className={`w-full bg-white/[0.02] border border-white/5 focus:border-gold/30 rounded-2xl py-4 pr-11 pl-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold/30 ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 text-right lg:text-right" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                      <label className="text-xs text-white/50 block font-medium font-serif">
                        {t.consultationEmailLabel} <span className="text-gold">*</span>
                      </label>
                      <div className="relative">
                        <Mail className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 ${isRtl ? 'right-4' : 'left-4'}`} />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@email.com"
                          className={`w-full bg-white/[0.02] border border-white/5 focus:border-gold/30 rounded-2xl py-4 pr-11 pl-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold/30 ${isRtl ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Consultation Type Radio Grid Selector */}
                  <div className="space-y-3 text-right lg:text-right" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <label className="text-xs text-white/50 block font-medium font-serif">
                      {t.consultationTypeLabel} <span className="text-gold">*</span>
                    </label>
                    <div className="grid grid-cols-1 gap-3.5">
                      {[
                        { id: 'type1', label: t.consultationType1, desc: currentLang === 'ar' ? 'كشف معاني رمشات الأعين وقفل سياق الصوت الكامن.' : 'Unmask micro expressions, blink rates & dynamic breathing triggers.' },
                        { id: 'type2', label: t.consultationType2, desc: currentLang === 'ar' ? 'صقل حدود التقدير الداخلي وثقافة الرد الرصين الودود.' : 'Protect mental capital, configure safe boundary triggers & calm voice.' },
                        { id: 'type3', label: t.consultationType3, desc: currentLang === 'ar' ? 'فنون الصمود وطرق امتصاص النقد العاصف برقي وبلاغة.' : 'Composure under stress. Deflect insults & master regal silence.' }
                      ].map((item) => (
                        <label
                          key={item.id}
                          className={`border p-4.5 rounded-2xl flex items-start gap-4 cursor-pointer transition-all duration-300 ${
                            type === item.id 
                              ? 'bg-gold/[0.02] border-gold/45 shadow-[0_4px_20px_rgba(212,175,55,0.02)]' 
                              : 'bg-white/[0.01] border-white/5 hover:border-white/10 hover:bg-white/[0.02]'
                          }`}
                        >
                          <input
                            type="radio"
                            name="consultationType"
                            checked={type === item.id}
                            onChange={() => setType(item.id)}
                            className="mt-1 accent-gold cursor-pointer"
                          />
                          <div className="space-y-1 text-right lg:text-right" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                            <span className={`text-sm block font-serif transition-colors ${type === item.id ? 'text-gold font-bold' : 'text-white/80'}`}>
                              {item.label}
                            </span>
                            <span className="text-xs text-white/40 block leading-tight font-light">
                              {item.desc}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message/Detail Field */}
                  <div className="space-y-2 text-right lg:text-right" style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <label className="text-xs text-white/50 block font-medium font-serif">
                      {t.consultationDetailsLabel} <span className="text-gold">*</span>
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder={currentLang === 'ar' ? 'يرجى كتابة الموقف السلوكي أو السؤال الذي تود الحصول على تحليل دقيق وموضوعي له من بشير الماجري...' : 'Describe your behavioral concern or query for Bechir Mejri...'}
                      className="w-full bg-white/[0.02] border border-white/5 focus:border-gold/30 rounded-2xl p-5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold/30 line-height-[1.6]"
                    />
                  </div>

                  {/* Submission Trigger */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-5 bg-gold disabled:bg-gold/50 text-black font-black uppercase tracking-[0.2em] text-xs transition-all duration-300 hover:scale-[1.01] active:scale-95 shadow-[0_20px_40px_-10px_rgba(212,175,55,0.3)] rounded-2xl cursor-pointer flex items-center justify-center gap-3"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>{currentLang === 'ar' ? 'جاري بث الطلب...' : 'Submitting Inquiry...'}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4.5 h-4.5 text-black" />
                          <span>{t.consultationSubmitBtn}</span>
                        </>
                      )}
                    </button>
                  </div>

                </form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};
