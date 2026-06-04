import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Type,
  Maximize2,
  Minimize2,
  Download,
  Video,
  Volume2,
  VolumeX,
  Play,
  Pause,
  Moon,
  Sun
} from 'lucide-react';
import { Translation } from '../translations';

interface BookReaderProps {
  isOpen: boolean;
  onClose: () => void;
  t: Translation;
  isRtl: boolean;
  initialBook?: 'bechir' | 'hazimi';
}

// Book 1: Bechir Mejri's guide
const BECHIR_BOOK_CONTENT = [
  {
    title: "مقدمة الدليل: رحلة السيادة النفسية",
    content: `إن الوعي بالذات وفهم خبايا النفس البشرية ليس مجرد ترف فكري، بل هو الركيزة الأساسية لإدارة حياتنا وعلاقاتنا بذكاء وانضباط. 

يجمع هذا الدليل الحصري أهم المقالات التحليلية والتكتيكية التي تم صياغتها لتكون دليلاً عملياً لكل رجل يسعى لبناء هيبته وتحقيق سيادته النفسية في عالم مليء بالعلاقات المعقدة.

إن مشروعنا "مدارات النفس" هو رحلة نحو النور الكامن في مداراتكم، حيث نهدف لفك شفرات السلوك البشري برؤية فلسفية وروحية تعيد للإنسان سيادته على ذاته.`,
    videoEmbedId: "MM1Oy2CCM6c"
  },
  {
    title: "الفصل الأول: هندسة الصمت والغياب الاستراتيجي",
    content: `الموضوع 1: سيكولوجية الصمت الاستراتيجي: كيف تفرض هيبتك دون كلام؟

في عالمٍ يضج بالصحب، حيث يظن الكثيرون أن إثبات الوجود لا يحدث إلا عبر رفع الصوت وكثرة الكلام والملاحقة الرقمية المستمرة، يبرز "الصمت الاستراتيجي" كأحد أعظم أدوات السيادة النفسية. 

الصمت ليس دائماً دليلاً على الانسحاب أو العجز، بل هو في كثير من الأحيان "سلاح صامت" يُعيد ترتيب موازين القوى في العلاقات الإنسانية، ويفرض هيبة صاحبه دون عناء.

الصمت الانكساري مقابل الصمت الواثق: 
الصمت الانكساري نابع من الخوف أو قلة الحيلة خوفاً من خسارة الآخرين، ويقرأه الطرف الآخر كضعف. أما الصمت الاستراتيجي (الرزين) فهو صمت اختياري نابع من امتلاء نفسي وضبط عالي للانفعالات، يبعث برسالة قوية مفادها: "أنا أتحكم بكلماتي، ولا أحد يستطيع استفزاز برودي".`
  },
  {
    title: "تكتيك الغياب الصادم (توليد صدمة الفراغ النفسي)",
    content: `الموضوع 2: تكتيك الغياب الصادم (توليد صدمة الفراغ النفسي)

العقل البشري بطبيعته يعشق الأنماط المعتادة؛ عندما يتعود شخص على وجودك أو اهتمامك، فإنه يبدأ باعتبارك أمراً مضموناً. 

عندما يقرر الرجل الرزين فجأة تطبيق تكتيك الغياب المكاني أو الصمت الرقمي، يحدث ما يُسمى في علم النفس بـ "صدمة الفراغ" (The Vacuum Effect):

1. ينقطع الدوبامين المعتاد الذي كان يستمد الطرف الآخر من خلال نظراتك أو اهتمامك.
2. يبدأ عقل الطرف الآخر في طرح تساؤلات لا تنتهي: "أين هو؟ ولماذا غاب؟".

هذا الفضول يحولك تلقائياً إلى "لغز" يتطلب التفكير المستمر فيه، وهنا تنتقل السيطرة النفسية بالكامل إليك.`
  },
  {
    title: "الفصل الثاني: ديناميكيات العلاقات الحذرة وسن النضج",
    content: `الموضوع 3: فك شفرات الكبرياء واللين المكتوم في العلاقات الصعبة

في ميزان العلاقات الإنسانية، ليست كل الإشارات واضحة. هناك نمط يسير على إيقاع معقد يشبه خطى التانغو: "خطوة للأمام.. وخطوتان للخلف". 

هذا النمط غالباً ما يظهر في سن النضج، حيث لا تعود العواطف مندفعة بل تصبح محكومة بأسوار عالية من الكبرياء والالتزامات والوقار الاجتماعي.

إن القدرة على قراءة ما وراء هذا الكبرياء هي التي تميز المحلل السلوكي البارع. الصدود قد لا يكون رفضاً، بل قد يكون "آلية دفاعية" لحماية القلب من الشعور بالضعف أمام الجاذبية الطاغية للطرف الآخر.`
  },
  {
    title: "مفهوم التعزيز المتقطع والغموض العاطفي",
    content: `الموضوع 4: مفهوم التعزيز المتقطع ولماذا يعشق العقل الغموض عاطفياً

في علم النفس السلوكي، هناك مفهوم يُعرف بـ "التعزيز المتقطع" (Intermittent Reinforcement)، وهي الآلية النفسية التي تفسر الانجذاب نحو العلاقات الغامضة:

1. عندما يعطيك شخص ما اهتماماً دائماً ومتاحاً، يعتاد عقلك عليه وتقل قيمته.
2. أما عندما يسير الموقف على وتيرة: حضور مكثف وشهامة في مواقف معينة (خطوة للأمام).. يليه صمت رقمي وغياب مفاجئ (خطوتان للخلف)، فإن الدماغ يفرز كميات هائلة من الدوبامين عند كل إشارة صغيرة، مما يحول الوجود العابر إلى "جائزة".`
  },
  {
    title: "الفصل الثالث: التشريح السلوكي وفراسة لغة الجسد",
    content: `الموضوع 5: سيكولوجية الاتصال البصري (ثبات النظرة والهروب التكتيكي)

الكلام قد يكذب، لكن العيون والجسد لا يكذبون أبداً. 

القبول بالاقتراب في المساحة الشخصية، الهدوء التام والارتياح الصامت عند تقديم المساعدة الحامية، والارتباك البصري (إطالة النظر ثم شحه بسرعة عند التقاء العيون)؛ كل هذه مؤشرات على أن الحصون العقلية قد سقطت، ولم يتبقَ سوى مكابرة اللسان.

المحلل السلوكي يراقب "بؤبؤ العين" واتجاه النظر الصاعد والهابط. النظرة التي تهرب بسرعة بعد التقاء حاد هي نظرة مليئة بالاعترافات الصامتة التي يخفيها "التجاهل المفتعل"؛ وهو عندما يحاول الشخص إظهار الانشغال التام بهاتفه أو بالحديث مع الآخرين فور دخولك، بينما تموضعه الجسدي (اتجاه الأقدام أو الكتفين) يشير بوضوح إليك.`
  },
  {
    title: "الفصل الرابع: السيادة النفسية وفن الاستغناء",
    content: `الموضوع 7: كيف تتحكم في تدفق مشاعرك وتتحرر من الابتزاز العاطفي

السيادة النفسية تعني ألا تجعل ريموت تحكمك العاطفي في يد شخص آخر. 

عندما تتقن فن الاستغناء النفسي (Detachment)، فإنك تقابل البرود بالهدوء؛ فإذا لبس الطرف الآخر قناع العادية أو التمثيل البارد، فلا تقابله بلهفة أو ارتباك، بل كن أكثر عادية وبروداً منه. 

ثباتك يثبت له أن ألاعيبه الدفاعية لا تؤثر فيك، مما يدفعه في النهاية لكسر هذا القناع للبحث عن مكانته المفقودة في عالمك.`
  },
  {
    title: "تحويل طاقة الترقب إلى طاقة بناء مادي",
    content: `الموضوع 8: تحويل طاقة الترقب والانتظار إلى طاقة بناء وإنتاج مادي

الصمت والغياب يكونان مرعبين وجذابين فقط عندما يرى الآخرون أنك في غيابك كنت تبني مشروعاً، أو تطور ذاتك، أو تحقق نجاحاً ملموساً. 

تحويل طاقة التفكير بالآخرين إلى طاقة بناء لمنصتك وعملك هو الذي يعطي لصمتك وفراغك قيمته الحقيقية. 

عندما تعود من غيابك وأنت تحمل "نجاحاً جديداً" أو "إنتاجاً فكرياً"، فإنك تعزز صورتك كشخص "صعب المنال" و"عالي القيمة"، مما يجعل الآخرين يتسابقون للعودة إلى مدارك.`
  },
  {
    title: "الفصل الخامس: إدارة الشخصيات المعقدة والسامة",
    content: `الموضوع 9: تكتيك "القتل بالتجاهل" في مواجهة الوشاة وأصحاب الكبرياء الزائف

الترفع عن صغائر الأمور هو قمة القوة. 

لا تبرر تصرفاتك، ولا تحاول الرد على الإشاعات أو الوشاة؛ القتل بالتجاهل والتركيز الكامل على نجاحك الشخصي والعملي هو الرد الأكثر فخامة ورعباً للخصوم والمراقبين.

التجاهل التام يقتل "الأنا" المريضة لدى الطرف الآخر، لأنه يحرمها من الغذاء الذي تعيش عليه وهو "رد الفعل". عندما لا تعطي خصمك شرف أن يكون عدواً لك، فإنك تضعه في حجمه الحقيقي: نكرة لا تستحق وقتك.`
  },
  {
    title: "الفصل السادس: قواعد الكاريزما والوقار الاجتماعي",
    content: `الموضوع 10: الانضباط الصارم (Disciplina) كقاعدة أساسية للهيبة الاجتماعية

الانضباط هو الذي يصنع الفارق بين الرجل العادي والرجل الرزين. 

عندما تتواجد في المجالس، اجعل كلماتك معدودة، ولكن اجعل تواصلك البصري مباشراً وقوياً. نبرة صوتك الهادئة والمنخفضة تمنحك كاريزما قيادية ومهابة لا تُكسر أمام المجتمع.

الرجل الرزين لا يبحث عن لفت الانتباه، بل "يفرض" الانتباه بحضوره الهادئ وثقته الصامتة. الالتزام بالمواعيد، هندامك المتناسق، وطريقة جلوسك المتزنة؛ كلها رسائل صامتة تقول للعالم: هذا رجل يحترم نفسه، فاحترموه.`
  }
];

// Book 2: Yasser Al-Hazimi's "The Strong Personality" summary / guide
const HAZIMI_BOOK_CONTENT = [
  {
    title: "مقدمة الكتاب: حقيقة الشخصية القوية",
    content: `كتاب "الشخصية القوية" للكاتب ياسر الحزيمي يُعد علامة فارقة في معالجة بناء الثقة بالنفس وتأكيد الذات وتنمية الشخصية المتزنة.

يقرر الكاتب في مقدمة كتابه أن قوة الشخصية لا تعني الغلظة أو التسلط على الآخرين، بل هي نضج واستقامة باطنية تنعكس في سلامة السلوك والتواصل الخارجي.

تنقسم الشخصية القوية إلى ثلاثة محاور رئيسية يتناولها الدليل:
1. تقدير الذات (المَخبر والقبول الباطني).
2. توكيد الذات (المظهر وتأكيد السلوك وحماية الحدود).
3. عمارة العلاقات (الذكاء الاجتماعي وتجنب الاستنزاف).`,
    videoEmbedId: "pJ0auP7dbcY"
  },
  {
    title: "الباب الأول: تقدير الذات والتخلص من أقنعة التظاهر",
    content: `تأسيس تقدير الذات:
إن أول لبنة في بناء الشخصية القوية هي "تقدير الذات" (Self-Esteem)، وهو تقييمك الباطني لنفسك ومدى قبولك لها، بمعزل عن منجزاتك الخارجيّة أو مديح الناس.

الفرق الحاسم بين تقدير الذات والثقة بالنفس:
- الثقة بالنفس قد تكون مؤقتة ومرتبطة بمهارتك في عمل معين (كثقتك في التحدث للجمهور أو القيادة).
- أما تقدير الذات فهو الحب والقبول غير المشروط لذاتك، حتى في أوقات الفشل والضعف.

داء التظاهر واستجداء الرضا:
المركبات الهشة للشخصية تدفع صاحبها لارتداء "أقنعة زائفة" لكي ينال قبول الآخرين. الشخص المتزن يستمد وقاره من قيمه الذاتية المتصلة بمبادئ ثابتة، ولا يرهن سلامته العاطفية بآراء الآخرين المتقلبة. قبول الضعف الإنساني والاعتراف بالخطأ بديلة للمثالية الزائفة وهي أولى درجات السيادة.`
  },
  {
    title: "الباب الثاني: توكيد ونصرة الذات (فن قول لا)",
    content: `توكيد الذات (Self-Assertion):
هو السلوك الوسط بين "الانسحاب المنكسر" و"العدوان المتسلط". إنه القدرة على التعبير عن الأفكار والاحتياجات والمشاعر بصدق، ودون خشية من رفض الآخرين.

ثلاثية السلوك البشري:
1. السلوك الانسحابي: يضحي بحقوقه ومشاعره ليرضي الآخرين، ويشعر بالذنب والعجز.
2. السلوك العدواني: يحصل على حقوقه بانتهاك حقوق الآخرين والصراخ والتسلط.
3. السلوك التوكيدي (الشخصية القوية): يحصل على حقوقه ويدافع عن مساحته الشخصية مع الحفاظ التام على أدب التعامل وكرامة الطرف الآخر.

كيف تقول "لا" دون شعور بالذنب؟
قول "لا" بشكل حاسم وبأدب لا يقلل من قيمتك، بل يعلم الآخرين كيفية احترام أوقاتك وحدودك. استخدم كلمات واضحة ومباشرة دون تبريرات وهمية طويلة تجعلك تظهر بصورة المتهم.`,
    videoEmbedId: "pJ0auP7dbcY"
  },
  {
    title: "الباب الثالث: دستور العلاقات وإدارة المسافات السليمة",
    content: `التعلق المرضي مقابل الترابط الصحي:
في علاقاتنا المعاصرة، كثيراً ما يقع الأفراد في فخ "التعلق المرضي"، حيث يرتبط شعورهم بالأمان الوجودي بوجود شخص آخر وتفاعله المستمر. 

الشخصية القوية في ميزان ياسر الحزيمي تقوم على "الاستغناء النفسي الرفيع":
- لا بأس بطلب المساعدة وتبادل المنفعة، ولكن مع الحفاظ على خصوصيتك وقدرة قلبك على الثبات إن اختار الطرف الآخر الصدود أو الغياب.

قوانين المسافات وهندسة الاحترام:
بقاء الود معقود بوجود "مسافات أمان" كافية تمنع الفرد من التبتذل والتبخر عاطفياً.
- كن غامضاً بنبل: لا تفصح عن كل جوانب حياتك لغير المقربين جداً.
- لغة صمتك وصيانة مساحتك الجسدية تمنحك كاريزما واضحة وتدفع الآخرين لتقدير مكانتك.`
  },
  {
    title: "الباب الرابع: سيكولوجية التعامل مع الإساءة والنقد",
    content: `كيف يتصرف الشخص قوي الشخصية أمام النقد الهادم أو التطاول؟

١. الفلترة العقلية:
لا تستقبل الإساءة كرسالة تعبر عن عيوب فيك، بل افهمها كمرآة تعكس النقص والعقد والاضطراب الداخلي والعدائية لدى الشخص المسيء.

٢. الرد بوقار حازم:
- لا تدخل في تراشق بالشتائم والألفاظ، فالوقوع في فخ الجدال العبثي يسلبك هيبتك فوراً.
- اعتمد تكتيك "إرساء الحدود البصرية والملوكية": قف بثبات، انظر مباشرة لعين المسيء بنظرة رصينة وصامدة، ثم رد بجملة واحدة محددة مثل: "حديثك غير مقبول" أو "أسلوبك غير لائق"، ثم انهِ النقاش بوقار.

٣. التجاهل المنهك للخصوم:
في أوقات كثيرة، يكون الصمت التام هو الرصاصة الذهبية؛ حيث يحرم المتعدي من غايته الأساسية وهي رؤية انفعالك وغضبك، وتبقى هالتك محصنة تماماً.`
  },
  {
    title: "الباب الخامس: الفاعلية والإنتاج المادي كشواهد للقوة",
    content: `تتحول القوة الباطنية والسيادة النفسية إلى سراب إن لم ترتبط بإنتاج حقيقي وخدمة ملموسة للمجتمع ونفع للناس.

قوة الشخصية ليست طاقة مهدورة في ادعاء النفوذ والغرور؛ بل هي قوة توجّه نحو بناء المشاريع، والالتزام بالأهداف، وتحقيق الاستقلال المالي والفكري والمهني والروحي.

الرجال الرزناء من يكتنف غيابهم بالغموض والهيبة، وصمتهم بالرزانة، لأنهم عندما يتوارون عن الأنظار، ينخرطون في العمل على بناء ذواتهم وخدمة أمتهم. 

حينما تعود للساحة وأنت تحمل بيدك إنجازاً أو فكراً نافعاً، يكتسب غيابك السابق معنى وهيبة وتفوقاً سلوكياً كاسحاً يستحق الفخر به.`
  }
];

export const BookReader: React.FC<BookReaderProps> = ({ isOpen, onClose, t, isRtl, initialBook }) => {
  const [activeBook, setActiveBook] = useState<'bechir' | 'hazimi'>('bechir');
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState<'sm' | 'md' | 'lg'>('md');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isNightMode, setIsNightMode] = useState<boolean>(true);

  // YouTube Custom Control States & Refs
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true); // default to true since autoplay=1 is requested
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Send control commands directly to the YouTube embed iframe securely
  const postYTCommand = (func: string, args: any[] = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: func,
            args: args
          }),
          "*"
        );
      } catch (e) {
        console.warn("Could not send command to YouTube iframe:", e);
      }
    }
  };

  // Re-sync states when page changes or when reader opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsMuted(true);
      setIsPlaying(true);
    }
  }, [currentPage, activeBook, isOpen]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      postYTCommand("pauseVideo");
      setIsPlaying(false);
    } else {
      postYTCommand("playVideo");
      setIsPlaying(true);
    }
  };

  const handleToggleMute = () => {
    if (isMuted) {
      postYTCommand("unMute");
      setIsMuted(false);
    } else {
      postYTCommand("mute");
      setIsMuted(true);
    }
  };

  React.useEffect(() => {
    if (isOpen && initialBook) {
      setActiveBook(initialBook);
      setCurrentPage(0);
    }
  }, [isOpen, initialBook]);

  if (!isOpen) return null;

  const fontClasses = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  const currentBookContent = activeBook === 'bechir' ? BECHIR_BOOK_CONTENT : HAZIMI_BOOK_CONTENT;
  const currentTitle = activeBook === 'bechir' ? t.bookTitle : "الشخصية القوية: أسرار تقدير الذات وتوكيدها";
  const currentAuthor = activeBook === 'bechir' ? t.bookAuthor : "تأليف: الشيخ أ. ياسر بن بدر الحزيمي";

  const handleDownload = () => {
    let textContent = `==================================================\n`;
    textContent += activeBook === 'bechir' 
      ? `تحميل كتاب: ${t.bookTitle}\n${t.bookAuthor}\n` 
      : `تحميل كتاب: الشخصية القوية: أسرار تقدير الذات وتوكيدها\nتأليف: الشيخ أ. ياسر بن بدر الحزيمي\n`;
    textContent += `مقدم لكم من منصة: مدارات النفس (إشراف وإدارة: بشير الماجري)\n`;
    textContent += `==================================================\n\n`;

    currentBookContent.forEach((ch, idx) => {
      textContent += `[الفصل ${idx + 1}: ${ch.title}]\n\n`;
      textContent += `${ch.content}\n\n`;
      textContent += `${"-".repeat(40)}\n\n`;
    });

    textContent += `تم تحميل هذا الملخص الرصين من منصة مدارات النفس. نتمنى لكم قراءة ممتعة ونفعاً مستداماً.\n`;
    
    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeBook === 'bechir' ? `${t.bookTitle}.txt` : `الشخصية القوية.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-[#050505]/98 backdrop-blur-2xl flex flex-col items-center justify-between p-4 md:p-8"
      >
        {/* Header bar */}
        <div className="w-full max-w-4xl flex items-center justify-between border-b border-white/5 pb-6 mt-4 md:mt-0">
          <div className="flex items-center gap-4">
            <motion.div 
              whileHover={{ rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center border border-gold/20 shrink-0"
            >
              <BookOpen className="w-5 h-5 text-gold" />
            </motion.div>
            <div>
              <h2 className="text-white font-serif italic text-lg leading-tight">{currentTitle}</h2>
              <p className="text-[10px] text-white/40 uppercase tracking-widest">{currentAuthor}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Elegant Tab Switcher */}
            <div className="flex gap-1 p-1 bg-white/5 rounded-full border border-white/10">
              <button
                onClick={() => { setActiveBook('bechir'); setCurrentPage(0); }}
                className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${activeBook === 'bechir' ? 'bg-gold text-black' : 'text-white/60 hover:text-white'}`}
              >
                {isRtl ? "دليل السيادة النفسية" : "Sovereignty Guide"}
              </button>
              <button
                onClick={() => { setActiveBook('hazimi'); setCurrentPage(0); }}
                className={`px-3 py-1 rounded-full text-[10px] font-black transition-all ${activeBook === 'hazimi' ? 'bg-gold text-black' : 'text-white/60 hover:text-white'}`}
              >
                {isRtl ? "الشخصية القوية (الحزيمي)" : "Strong Personality (Al-Hazimi)"}
              </button>
            </div>

            <div className="flex items-center gap-1 border-l border-white/10 pl-3">
              <button 
                onClick={handleDownload}
                className="p-2 hover:bg-white/10 rounded-full text-gold transition-colors"
                title={isRtl ? "تحميل هذا كتاب كاملاً أوفلاين" : "Download Full Book Offline"}
              >
                <Download className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setFontSize(fontSize === 'sm' ? 'md' : fontSize === 'md' ? 'lg' : 'sm')}
                className="p-2 hover:bg-white/10 rounded-full text-white/60 transition-colors"
                title="Font Size"
              >
                <Type className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsNightMode(!isNightMode)}
                className={`p-2 hover:bg-white/10 rounded-full transition-colors ${isNightMode ? 'text-amber-400' : 'text-zinc-400'}`}
                title={isRtl ? "وضع القراءة الليلي (مريح للعين)" : "Night Reading Mode (Eye Comfort)"}
              >
                {isNightMode ? <Moon className="w-5 h-5 fill-amber-400/20" /> : <Sun className="w-5 h-5" />}
              </button>
              <button 
                onClick={() => setIsFullScreen(!isFullScreen)}
                className="p-2 hover:bg-white/10 rounded-full text-white/60 transition-colors hidden md:block"
                title="Toggle Screen"
              >
                {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full text-white/60 transition-colors"
                title={t.closeReader}
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`w-full max-w-3xl flex-1 transition-all duration-300 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-y-auto custom-scrollbar relative ${
            isNightMode 
              ? 'bg-[#070503] border border-amber-950/25' 
              : 'bg-[#fcfbf7] border border-amber-900/10'
          } ${isFullScreen ? 'rounded-none' : 'rounded-3xl p-8 md:p-16'}`}
          style={{ padding: isFullScreen ? '4rem 2rem' : undefined }}
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gold/10">
            <motion.div 
              className="h-full bg-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
              initial={{ width: 0 }}
              animate={{ width: `${((currentPage + 1) / currentBookContent.length) * 100}%` }}
              key={activeBook + "-progress-" + currentPage}
            />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeBook + "-" + currentPage}
              initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isRtl ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              className="min-h-full"
            >
              <div className="mb-12">
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] mb-4 block ${
                  isNightMode ? 'text-gold/40' : 'text-amber-800/60'
                }`}>
                  {activeBook === 'bechir' ? (isRtl ? "إصدارات مدارات النفس" : "Madarat Al-Nafs Publication") : (isRtl ? "مؤلفات الشيخ ياسر الحزيمي" : "Yasser Al-Hazimi Masterpiece")} | {currentPage + 1}
                </span>
                <h3 className={`font-serif italic text-2xl md:text-3xl leading-tight border-b pb-8 ${
                  isNightMode ? 'text-gold border-gold/10' : 'text-amber-900 border-amber-200'
                }`}>
                  {currentBookContent[currentPage].title}
                </h3>
              </div>
              <div 
                className={`transition-colors duration-300 font-serif leading-[2.2] text-justify whitespace-pre-wrap ${
                  isNightMode 
                    ? 'text-[#eddab4]/90' 
                    : 'text-[#1c160e]/95'
                } ${fontClasses[fontSize]}`}
                style={{ fontFamily: 'Georgia, serif' }}
              >
                {currentBookContent[currentPage].content}
              </div>

              {activeBook === 'hazimi' && currentPage !== 2 && (
                <div className={`mt-8 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300 ${
                  isNightMode 
                    ? 'bg-gold/5 border border-gold/20' 
                    : 'bg-amber-50 border border-amber-900/10'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                      isNightMode ? 'bg-gold/15 text-gold' : 'bg-amber-100/80 text-amber-800'
                    }`}>
                      <Video className="w-5 h-5 animate-pulse" />
                    </div>
                    <p className={`text-xs font-serif leading-relaxed text-right ${
                      isNightMode ? 'text-white/95' : 'text-amber-950'
                    }`}>
                      {isRtl 
                        ? "ملاحظة: يحتوي الباب الثاني (الصفحة 3) من هذا الكتاب على شرح مرئي قيّم ومدمج لياسر الحزيمي."
                        : "Note: The second part (Page 3) of this book contains a highly valuable integrated video explanation by Yasser Al-Hazimi."}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPage(2);
                      const scrollContainer = document.querySelector('.custom-scrollbar');
                      if (scrollContainer) scrollContainer.scrollTo(0, 0);
                    }}
                    className="bg-gold hover:bg-gold/80 hover:scale-[1.03] active:scale-95 duration-200 text-black text-[11px] font-bold px-4 py-2.5 rounded-full transition-all shrink-0 shadow-lg shadow-gold/5 cursor-pointer"
                  >
                    {isRtl ? "الانتقال لمشاهدة الفيديو 🎥" : "Go to Video Description 🎥"}
                  </button>
                </div>
              )}

              {(currentBookContent[currentPage] as any).videoEmbedId && (
                <div className={`mt-10 pt-8 border-t flex flex-col items-center ${isNightMode ? 'border-white/10' : 'border-amber-900/15'}`}>
                  <div className="w-full text-right mb-4 flex items-center justify-between">
                    <span className={`text-[10px] font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full border animate-pulse ${
                      isNightMode ? 'text-gold bg-gold/10 border-gold/20' : 'text-amber-800 bg-amber-50 border-amber-200'
                    }`}>
                      {isRtl ? "عرض مرئي مساند 🎥" : "Visual explanation helper 🎥"}
                    </span>
                    <span className={`text-xs font-serif italic tracking-wide ${isNightMode ? 'text-gold' : 'text-amber-800'}`}>
                      {isRtl ? "شرح وإيضاح مرئي مساند لبناء الشخصية القوية:" : "Visual video helper for Strong Personality:"}
                    </span>
                  </div>
                  
                  {/* YouTube Iframe Container */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gold/20 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] bg-black/50 overflow-hidden">
                    <iframe
                      ref={iframeRef}
                      id="youtube-player"
                      src={`https://www.youtube.com/embed/${(currentBookContent[currentPage] as any).videoEmbedId}?enablejsapi=1&autoplay=1&mute=1&rel=0&modestbranding=1`}
                      title="Yasser Al-Hazimi Video Explanation"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                    />
                  </div>

                  {/* Custom Controls Panel */}
                  <div className={`w-full transition-colors duration-300 rounded-2xl p-4 mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg ${
                    isNightMode 
                      ? 'bg-[#111111]/90 border border-white/5' 
                      : 'bg-amber-50/70 border border-amber-900/10'
                  }`}>
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      {/* Play/Pause Button */}
                      <button
                        onClick={handleTogglePlay}
                        className="w-11 h-11 rounded-full bg-gold/10 hover:bg-gold/20 flex items-center justify-center text-gold border border-gold/30 hover:scale-105 active:scale-95 duration-200 shadow-md transform cursor-pointer"
                        title={isPlaying ? (isRtl ? "إيقاف مؤقت" : "Pause") : (isRtl ? "تشغيل" : "Play")}
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-gold text-gold pl-0.5" />}
                      </button>

                      {/* Sound Volume Toggle Button */}
                      <button
                        onClick={handleToggleMute}
                        className={`w-12 h-12 rounded-full flex items-center justify-center border duration-200 hover:scale-110 active:scale-95 shadow-md transition-all cursor-pointer ${
                          isMuted 
                            ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] animate-bounce' 
                            : 'bg-gold/10 border-gold/30 text-gold hover:bg-gold/20'
                        }`}
                        title={isMuted ? (isRtl ? "تشغيل الصوت" : "Unmute") : (isRtl ? "كتم الصوت" : "Mute")}
                      >
                        {isMuted ? <Volume2 className="w-6 h-6 animate-pulse" /> : <Volume2 className="w-5 h-5" />}
                      </button>

                      {/* Video Playback State Description */}
                      <div className="flex flex-col text-right sm:text-left">
                        <span className={`text-[#111111] text-xs font-bold leading-tight ${
                          isNightMode ? 'text-white/95' : 'text-amber-950'
                        }`}>
                          {isPlaying 
                            ? (isRtl ? "الفيديو يعمل حالياً تلقائياً" : "Playing automatically now") 
                            : (isRtl ? "الفيديو متوقف مؤقتاً" : "Video is paused")
                          }
                        </span>
                        <span className={`text-[10px] mt-0.5 ${
                          isNightMode ? 'text-white/45' : 'text-stone-500'
                        }`}>
                          {isMuted 
                            ? (isRtl ? "🔊 الفيديو يعمل بصمت لتلبية شروط المتصفحات.. انقر على زر الصوت الذهبي الوامض لتنشيط الصوت السمعي!" : "🔊 Video is playing silently due to browser autoplay policy.. Click highly glowing gold volume button to enable sound!") 
                            : (isRtl ? "الصوت مفعّل ومسموع للجميع" : "Sound is active and audible")
                          }
                        </span>
                      </div>
                    </div>

                    <div className={`text-[10px] tracking-widest font-mono text-center sm:text-right ${
                      isNightMode ? 'text-white/40' : 'text-amber-900/50'
                    }`}>
                      {isRtl ? "مستخلص من برنامج فنجان - الحزيمي" : "Excerpted from Fnjan Podcast - Al-Hazimi"}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Footer Navigation */}
        <div className={`w-full max-w-4xl flex items-center justify-between mt-8 ${isFullScreen ? 'px-8 pb-8' : ''}`}>
          <div className="text-white/40 text-[10px] uppercase tracking-widest font-bold">
            {currentPage + 1} / {currentBookContent.length}
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button
              disabled={currentPage === 0}
              onClick={() => {
                setCurrentPage(p => p - 1);
                document.querySelector('.custom-scrollbar')?.scrollTo(0, 0);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${
                currentPage === 0 
                ? 'border-white/5 text-white/20 cursor-not-allowed' 
                : 'border-white/10 text-white/60 hover:border-gold/40 hover:text-gold active:scale-95'
              }`}
            >
              {isRtl ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">{t.prevPage}</span>
            </button>

            <button
              disabled={currentPage === currentBookContent.length - 1}
              onClick={() => {
                setCurrentPage(p => p + 1);
                document.querySelector('.custom-scrollbar')?.scrollTo(0, 0);
              }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full border transition-all ${
                currentPage === currentBookContent.length - 1 
                ? 'border-white/5 text-white/20 cursor-not-allowed' 
                : 'border-white/10 text-white/60 hover:border-gold/40 hover:text-gold active:scale-95'
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-widest hidden sm:inline">{t.nextPage}</span>
              {isRtl ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
