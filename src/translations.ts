export type Language = 'ar' | 'en' | 'fr' | string;

export interface Translation {
  navTitle: string;
  navSubTitle: string;
  navItems: { [key: string]: string };
  heroSubtitle: string;
  heroTitle: string;
  heroDescription: string;
  heroCta: string;
  heroSecondaryCta: string;
  pillarsTitle: string;
  pillarsHeading: string;
  pillarsDescription: string;
  latestResearchTitle: string;
  latestResearchHeading: string;
  searchPlaceholder: string;
  readResearch: string;
  globalHubTitle: string;
  globalHubHeading: string;
  globalHubDescription: string;
  globalHubVisit: string;
  aboutFounderTitle: string;
  aboutFounderHeading: string;
  aboutFounderDescription1: string;
  aboutFounderDescription2: string;
  ctaSubtext: string;
  statusBehavior: string;
  statusBehaviorLabel: string;
  statusCases: string;
  statusCasesLabel: string;
  statusPubs: string;
  statusPubsLabel: string;
  gratitudeTitle: string;
  gratitudeText: string;
  gratitudeAuthor: string;
  socialTitle: string;
  socialHeading: string;
  copyright: string;
  tunisia: string;
  by: string;
  consultationCta: string;
  consultationTitle: string;
  consultationSubtitle: string;
  consultationNameLabel: string;
  consultationEmailLabel: string;
  consultationTypeLabel: string;
  consultationType1: string;
  consultationType2: string;
  consultationType3: string;
  consultationDetailsLabel: string;
  consultationSubmitBtn: string;
  consultationSuccessMsg: string;
  globalPerspectiveLabel: string;
  referencesLabel: string;
  interactionTitle: string;
  interactionLikes: string;
  interactionComments: string;
  commentPlaceholderName: string;
  commentPlaceholderContent: string;
  commentSubmit: string;
  commentSubmitting: string;
  noComments: string;
  shareCta: string;
  linkCopied: string;
  downloadArticle: string;
  zenModeCta: string;
  whatsappShare: string;
  recentActivityTitle: string;
  savedItems: string;
  saveCta: string;
  removeSave: string;
  insightTitle: string;
  relatedTitle: string;
  aiAssistantTitle: string;
  aiAssistantGreeting: string;
  aiAssistantWelcome: string;
  aiAssistantPlaceholder: string;
  aiAssistantLoading: string;
  aiAssistantError: string;
  ratingTitle: string;
  ratingSubtitle: string;
  ratingSuccess: string;
  ratingTotal: string;
  promoTitle: string;
  promoQuote: string;
  permissionDenied: string;
  anonAuthNotice: string;
  recommendedResearch: string;
  noResultsFound: string;
  addVideoTitle: string;
  saveVideoBtn: string;
  videoUrlLabel: string;
  videoTitleAr: string;
  videoTitleEn: string;
  videoDescAr: string;
  videoEducationalGuide: string;
  deleteConfirm: string;
  editVideoTitle: string;
  saveChangesBtn: string;
  videoLibraryBtn: string;
  closeLibrary: string;
  videosTitle: string;
  videosSubtitle: string;
  noVideos: string;
  catAdults: string;
  catChildren: string;
  catAll: string;
  videoSelectCategory: string;
  assessmentTitle: string;
  assessmentHeading: string;
  assessmentDescription: string;
  assessmentBtn: string;
  promoSectionTitle: string;
  promoSectionHeading: string;
  promoSectionDescription: string;
  poeticExamples: string[];
  dailyOrbitTitle: string;
  dailyOrbitCta: string;
  dailyOrbits: string[];
  mappingTitle: string;
  mappingHeading: string;
  mappingDescription: string;
  mappingPlaceholder: string;
  mappingAnalyzeBtn: string;
  mappingResultTitle: string;
  mappingWait: string;
  manifestoHeading: string;
  manifestoText: string;
  manifestoSignature: string;
  ctaTitle: string;
  ctaHeading: string;
  ctaDescription: string;
  ctaInputPlaceholder: string;
  ctaButton: string;
  readingRoomTitle: string;
  readingRoomSubTitle: string;
  readCta: string;
  bookTitle: string;
  bookAuthor: string;
  bookDescription: string;
  closeReader: string;
  nextPage: string;
  prevPage: string;
  quotes: { text: string; author: string }[];
}

export const translations: Record<Language, Translation> = {
  ar: {
    navTitle: "مدارات النفس",
    navSubTitle: "إشراف وإدارة: بشير الماجري",
    navItems: {
      "بحوث": "بحوث",
      "دراسات": "دراسات",
      "عنا": "عن المؤسس",
      "assessment": "المقياس",
      "soul-caliber": "معاير الوقار",
      "consultation": "الاستشارات"
    },
    heroSubtitle: "فن فهم الذات والتعامل مع الآخرين",
    heroTitle: "استكشف عمق النفس الإنسانية وسر السلوك",
    heroDescription: "مدارات النفس هي منصة بحثية رائدة تهدف إلى تمكين الأفراد من فهم آليات العقل البشري وتحسين مهارات التواصل الاجتماعي بناءً على دراسات علمية حديثة.",
    heroCta: "تصفح أحدث البحوث",
    heroSecondaryCta: "عن المختبر السلوكي",
    pillarsTitle: "محاور علم النفس",
    pillarsHeading: "دليل التعامل مع الذات والآخرين",
    pillarsDescription: "نقدم أبحاثاً تخصصية في لغة الجسد، التواصل الفعال، والذكاء الوجداني لمساعدتك على فك شفرات السلوك البشري.",
    latestResearchTitle: "الأبحاث المختارة",
    latestResearchHeading: "أحدث الدراسات البحثية المحكمة",
    searchPlaceholder: "ابحث عن موضوع معين...",
    readResearch: "قراءة البحث",
    globalHubTitle: "رادار البحث العالمي",
    globalHubHeading: "ابحث في مراكز علم النفس الدولية",
    globalHubDescription: "نحن نؤمن بأن المعرفة لا تعرف حدوداً. لذلك، نوفر لك بوابة مباشرة لأرقى الدوريات العلمية والمؤسسات البحثية العالمية لمتابعة أحدث الاكتشافات في علم النفس السلوكي والعصبي.",
    globalHubVisit: "زيارة الموقع",
    aboutFounderTitle: "عن المؤسس",
    aboutFounderHeading: "رؤية بشير الماجري لتطوير الوعي النفسي (إشراف وإدارة)",
    aboutFounderDescription1: "تأسست \"مدارات النفس\" برؤية من بشير الماجري لتكون جسراً بين الأبحاث الأكاديمية المعقدة وبين حياتنا اليومية. نحن نؤمن بأن فهم النفس ليس ترفاً فكرياً، بل هو ضرورة حتمية لبناء مجتمعات متماسكة وعلاقات إنسانية ناجحة.",
    aboutFounderDescription2: "من خلال خبرته، يسعى بشير الماجري (إشراف وإدارة) لتوفير بحوث رصينة بلغة عربية عصرية، تجمع بين دقة العلم وجمال الطرح، لتكون مرجعاً لكل من يسعى لتطوير ذكائه الاجتماعي وفهم لغة الجسد وأسرار السلوك البشري بعيداً عن التنميط السطحي.",
    ctaSubtext: "انضم إلى أكثر من ٢٥,٠٠٠ مهتم بعلم النفس السلوكي",
    statusBehavior: "تحليل أسرار التعامل",
    statusBehaviorLabel: "بحوث السلوك",
    statusCases: "تطبيق عملي للنظريات",
    statusCasesLabel: "دراسات حالة",
    statusPubs: "كتب ومقالات بحثية",
    statusPubsLabel: "إصدارات المختبر",
    gratitudeTitle: "كلمة شكر",
    gratitudeText: "\"أوجه خالص شكري وتقديري لعائلتي التي كانت السند الدائم لي في كل خطوة، وإلى كل الداعمين والمؤمنين بهذا المشروع البحثي. بفضلكم نستمر في استكشاف أعماق النفس الإنسانية.\"",
    gratitudeAuthor: "بشير الماجري - إشراف وإدارة",
    socialTitle: "تواصل مباشر",
    socialHeading: "ابقَ على اتصال دائم",
    copyright: "مدارات النفس - إشراف وإدارة: بشير الماجري",
    tunisia: "تونس",
    by: "بواسطة",
    consultationCta: "طلب استشارة بحثية",
    consultationTitle: "الاستشارات السلوكية والوجدانية الحصرية",
    consultationSubtitle: "احجز جلسة استشارة بحوث سلوكية ونفسية مباشرة تحت إشراف وإدارة بشير الماجري لتفكيك الدوافع، رسم الحدود وحماية كاريزما الوقار الخاصة بك.",
    consultationNameLabel: "الاسم الكامل",
    consultationEmailLabel: "البريد الإلكتروني",
    consultationTypeLabel: "بؤرة الاستشارة السلوكية",
    consultationType1: "تحليل لغة جسد وفك الشفرات السلوكية",
    consultationType2: "توكيد الذات، رسم الحدود وعُرى وقار النفس",
    consultationType3: "التماسك الوجداني، الصمود والذكاء العاطفي أمام المثيرات",
    consultationDetailsLabel: "شرح الموقف بالتفصيل أو المسألة السلوكية المراد تفكيكها",
    consultationSubmitBtn: "إرسال طلب الاستشارة والتحليل السلوكي",
    consultationSuccessMsg: "تم إرسال طلب استشارتك بنجاح! تم إشعار بشير الماجري، وسوف يتواصل معك شخصياً عبر البريد قريباً.",
    globalPerspectiveLabel: "المنظور العالمي (Global Perspective)",
    referencesLabel: "المراجع والمصادر البحثية",
    interactionTitle: "تعليقات الباحثين والزوار",
    interactionLikes: "تفاعل",
    interactionComments: "تعليق",
    commentPlaceholderName: "اسمك المستعار...",
    commentPlaceholderContent: "اكتب انطباعك أو قراءتك لهذا البحث...",
    commentSubmit: "إرسال التعليق",
    commentSubmitting: "جاري الإرسال...",
    noComments: "كن أول من يترك انطباعاً حول هذا البحث...",
    shareCta: "مشاركة الرابط",
    linkCopied: "تم نسخ الرابط بنجاح!",
    downloadArticle: "تحميل البحث للقراءة أوفلاين",
    zenModeCta: "وضع القراءة الهادئ",
    whatsappShare: "زيارة الموقع (واتساب)",
    recentActivityTitle: "نشاط حي",
    savedItems: "البحوث المحفوظة",
    saveCta: "حفظ البحث",
    removeSave: "إلغاء الحفظ",
    insightTitle: "ومضة نفسية",
    relatedTitle: "بحوث ذات صلة",
    aiAssistantTitle: "المرشد الحكيم (الذكاء الاصطناعي)",
    aiAssistantGreeting: "هل لديك سؤال نفسي؟ أنا هنا للمساعدة",
    aiAssistantWelcome: "أهلاً بك في فضاء مدارات النفس. أنا مرشدك الذكي، كيف يمكنني مساعدتك في فهم أغوار النفس البشرية اليوم؟",
    aiAssistantPlaceholder: "اسأل عن أي مفهوم نفسي أو بحث...",
    aiAssistantLoading: "جاري استحضار الحكمة...",
    aiAssistantError: "عذراً، حدث اضطراب في الاتصال. يرجى المحاولة لاحقاً.",
    ratingTitle: "كيف تقيم تجربتك البحثية؟",
    ratingSubtitle: "رأيك يساهم في تطوير مختبر مدارات النفس",
    ratingSuccess: "شكراً لتقييمك! نسعى دائماً للأفضل.",
    ratingTotal: "إجمالي التقييمات",
    promoQuote: "استقم بنفسك يستقم بك غيرك، فكيف يستقيم الظل والعود أعوج؟",
    promoTitle: "استقم بنفسك",
    permissionDenied: "عذراً، لا تملك صلاحية القيام بهذا الإجراء. قد يكون السبب عدم تفعيل خاصية الزوار في قاعدة البيانات.",
    anonAuthNotice: "تنبيه: هذه الميزة تتطلب تفعيل 'Anonymous Auth' في إعدادات Firebase من قبل مطور المنصة.",
    recommendedResearch: "بحوث قد تهمك",
    noResultsFound: "عذراً، لم يتم العثور على بحوث تطابق بحثك...",
    addVideoTitle: "إضافة مقطع إرشادي جديد",
    saveVideoBtn: "حفظ ونشر المقطع",
    videoUrlLabel: "رابط الفيديو (YouTube/TikTok)",
    videoTitleAr: "العنوان (بالعربية)",
    videoTitleEn: "Title (English)",
    videoDescAr: "الوصف (بالعربية)",
    videoEducationalGuide: "دليل إرشادي",
    deleteConfirm: "هل أنت متأكد من حذف هذا المقطع؟",
    editVideoTitle: "تعديل المقطع الإرشادي",
    saveChangesBtn: "حفظ التغييرات",
    videoLibraryBtn: "المكتبة المرئية",
    closeLibrary: "إغلاق المكتبة",
    videosTitle: "مقاطع فيديو للإرشاد النفسي",
    videosSubtitle: "مكتبة مرئية للتوعية والتطوير الذاتي",
    noVideos: "لا توجد مقاطع فيديو متاحة حالياً.",
    catAdults: "للكبار",
    catChildren: "للأطفال",
    catAll: "الكل",
    videoSelectCategory: "اختر الفئة المستهدفة",
    assessmentTitle: "مقياس مدارات النفس",
    assessmentHeading: "اختبار التوازن النفسي والاجتماعي",
    assessmentDescription: "مقياس علمي مبسط يساعدك على فهم حالتك النفسية الحالية ومدى توازن علاقاتك الاجتماعية عبر تحليل استجابتك لمواقف حياتية مختلفة.",
    assessmentBtn: "ابدأ المقياس الآن",
    ctaTitle: "المكتبة الرقمية",
    ctaHeading: "انضم إلى مدارات المعرفة\nحصرياً للأعضاء",
    ctaDescription: "احصل على وصول كامل لجميع البحوث والدراسات والمقاطع الحصرية.",
    ctaInputPlaceholder: "بريدك الإلكتروني",
    ctaButton: "سجل الآن مجاناً",
    readingRoomTitle: "مكتبة المدارات",
    readingRoomSubTitle: "انغمس في أعمق البحوث النفسية بمنظور معاصر",
    readCta: "ابدأ القراءة",
    bookTitle: "دليل الرجل الرزين في إدارة المسافات والعلاقات",
    bookAuthor: "إعداد وتحليل: بشير الماجري (إشراف وإدارة)",
    bookDescription: "دليل عملي وتكتيكي يجمع أهم المقالات والبحوث في السيادة النفسية وفهم لغة الجسد وإدارة العلاقات المعقدة بنضج ووقار.",
    closeReader: "إغلاق المكتبة",
    nextPage: "الصفحة التالية",
    prevPage: "الصفحة السابقة",
    promoSectionTitle: "الإشهار الروحي | مداد الأرواح",
    promoSectionHeading: "تجسيد لمدارات النفس العميقة",
    promoSectionDescription: "من خلال هذا التعبير البصري، نسعى لفك شفرات الرحلة البشرية في بحثها المستمر عن التوازن، السكينة، والنور الكامن في أعماق كل ذات.",
    poeticExamples: [],
    dailyOrbitTitle: "مدار اليوم",
    dailyOrbitCta: "تأمل هذه البصيرة",
    dailyOrbits: [
      "النفس كالقمر، لها جانب مظلم لا يراه إلا من أراد أن يفهم سر الضياء.",
      "أعطم انتصار هو أن تكون في سلام مع عيوبك قبل محاسن الآخرين.",
      "الصمت ليس غياباً للكلمات، بل هو حضور طاغٍ للمعنى في مدارات الذات.",
      "من يتقن فن الرصانة، يمتلك مفاتيح العقول دون أن يطرق أبوابها.",
      "مدارات النفس ليست دوائر مغلقة، بل هي رحلة صعود نحو النور الكامن."
    ],
    mappingTitle: "برمجية مدارات الذكاء",
    mappingHeading: "رسم الخرائط الذهنية النفسية",
    mappingDescription: "قم بوصف حالتك أو شعورك أو موقفاً يمر بك، وسيقوم نظام مدارات النفس بتحليل 'مدار' هذا الشعور ورسم خريطة نفسية مبدئية لك.",
    mappingPlaceholder: "مثال: أشعر بتردد كبير تجاه قرار مهني جديد وأميل للعزلة...",
    mappingAnalyzeBtn: "تحليل المدار النفسي",
    mappingResultTitle: "تحليل المدار الخاص بك",
    mappingWait: "جاري سبر أغوار النفس...",
    manifestoHeading: "بيان مدارات النفس",
    manifestoText: "نحن هنا لفك شفرات السلوك البشري، ليس فقط من منظور علمي جاف، بل برؤية فلسفية وروحية تعيد للإنسان سيادته على ذاته. إن مشروعنا هو رحلة نحو النور الكامن في مداراتكم.",
    manifestoSignature: "إشراف وإدارة: بشير الماجري",
    quotes: [
      { text: "من ينظر إلى الخارج يحلم، ومن ينظر إلى الداخل يستيقظ.", author: "كارل يونغ" },
      { text: "السعادة ليست شيئاً جاهزاً، إنها تأتي من أفعالك الخاصة.", author: "دالاي لاما" },
      { text: "الذكاء هو القدرة على التكيف مع التغيير.", author: "ستيفن هوكينج" },
      { text: "الجرح هو المكان الذي يدخل منه النور إليك.", author: "جلال الدين الرومي" },
      { text: "ما تسعى إليه، يسعى إليك.", author: "جلال الدين الرومي" },
      { text: "الوعي هو الجسر الوحيد الذي يربط بين واقعك المشتت وحقيقتك الجوهرية.", author: "بشير الماجري" },
      { text: "لا يمكنك تغيير الرياح، ولكن يمكنك تعديل أشرعتك.", author: "أرسطو" },
      { text: "أعظم اكتشاف في جيلنا هو أن الإنسان يمكنه تغيير حياته عبر تغيير مواقفه العقلية.", author: "ويليام جيمس" },
      { text: "التغيير الحقيقي يبدأ بقرار صادق بالنظر في المرآة قبل النظر في عيون الآخرين.", author: "بشير الماجري" },
      { text: "في وسط الصعوبة تكمن الفرصة.", author: "ألبرت أينشتاين" },
      { text: "نحن ما نكرر فعله، التميز إذاً ليس فعلاً بل عادة.", author: "أرسطو" },
      { text: "القلب الذي ينبض بالوعي لا يضل الطريق مهما اشتدت العواصف.", author: "بشير الماجري" }
    ]
  },
  en: {
    navTitle: "Psych Orbits",
    navSubTitle: "Supervision & Management: Bechir Mejri",
    navItems: {
      "بحوث": "Research",
      "دراسات": "Studies",
      "عنا": "About Founder",
      "assessment": "Assessment",
      "soul-caliber": "Poise Calibrator",
      "consultation": "Consultations"
    },
    heroSubtitle: "The Art of Self-Understanding and Social Interaction",
    heroTitle: "Explore the Depths of the Human Soul and Behavior",
    heroDescription: "Madarat al-Nafs (Psych Orbits) is a leading research platform aimed at empowering individuals to understand the mechanisms of the human mind and improve social communication skills based on modern scientific studies.",
    heroCta: "Browse Latest Research",
    heroSecondaryCta: "About Behavioral Lab",
    pillarsTitle: "Psychology Pillars",
    pillarsHeading: "Guide to Dealing with Self and Others",
    pillarsDescription: "We provide specialized research in body language, effective communication, and emotional intelligence to help you decode human behavior.",
    latestResearchTitle: "Featured Research",
    latestResearchHeading: "Latest Peer-Reviewed Research Studies",
    searchPlaceholder: "Search for a specific topic...",
    readResearch: "Read Research",
    globalHubTitle: "Global Research Radar",
    globalHubHeading: "Search International Psychology Centers",
    globalHubDescription: "We believe that knowledge knows no borders. Therefore, we provide a direct gateway to the most prestigious scientific journals and global research institutions to follow the latest discoveries in behavioral and neurological psychology.",
    globalHubVisit: "Visit Site",
    aboutFounderTitle: "About Founder",
    aboutFounderHeading: "Bechir Mejri's Vision for Awareness (Supervision & Management)",
    aboutFounderDescription1: "Madarat al-Nafs was established with a vision by Bechir Mejri to be a bridge between complex academic research and our daily lives. We believe that understanding the soul is not an intellectual luxury, but an essential necessity for building cohesive societies and successful human relationships.",
    aboutFounderDescription2: "Through his experience, Bechir Mejri seeks to provide rigorous research in a modern Arabic language, combining scientific precision with beautiful presentation, to be a reference for everyone seeking to develop their social intelligence and understand body language and the secrets of human behavior.",
    ctaSubtext: "Join more than 25,000 behavioral psychology enthusiasts",
    statusBehavior: "Analyzing Interaction Secrets",
    statusBehaviorLabel: "Behavioral Research",
    statusCases: "Practical Application of Theories",
    statusCasesLabel: "Case Studies",
    statusPubs: "Research Books & Articles",
    statusPubsLabel: "Lab Publications",
    gratitudeTitle: "Word of Thanks",
    gratitudeText: "\"I extend my sincere thanks and appreciation to my family, who have been my constant support in every step, and to all the supporters and believers in this research project. Thanks to you, we continue to explore the depths of the human soul.\"",
    gratitudeAuthor: "Bechir Mejri - Supervision & Management",
    socialTitle: "Direct Contact",
    socialHeading: "Stay Permanently Connected",
    copyright: "Psych Orbits - Supervision & Management: Bechir Mejri",
    tunisia: "Tunisia",
    by: "By",
    consultationCta: "Request Research Consultation",
    consultationTitle: "Exclusive Behavioral & Introspective Consultations",
    consultationSubtitle: "Book a direct behavioral and psychological consultation with Bechir Mejri to analyze motives, draw personal boundaries, and master your sovereign poise.",
    consultationNameLabel: "Full Name",
    consultationEmailLabel: "Email Address",
    consultationTypeLabel: "Consultation Focus Area",
    consultationType1: "Body Language & Micro-Expression Decoding",
    consultationType2: "Self-Assertiveness, Boundaries & Sovereign Poise",
    consultationType3: "Emotional Resilience, Calm & Composure Under Conflict",
    consultationDetailsLabel: "Describe your situation or the behavioral challenge in detail",
    consultationSubmitBtn: "Submit Consultation & Analysis Request",
    consultationSuccessMsg: "Your consultation request has been successfully submitted! Bechir Mejri has been notified and will reach out to you personally via email soon.",
    globalPerspectiveLabel: "Global Perspective",
    referencesLabel: "References and Research Sources",
    interactionTitle: "Comments from Researchers and Visitors",
    interactionLikes: "Interactions",
    interactionComments: "Comments",
    commentPlaceholderName: "Your alias...",
    commentPlaceholderContent: "Write your impression or reading of this research...",
    commentSubmit: "Submit Comment",
    commentSubmitting: "Submitting...",
    noComments: "Be the first to leave an impression on this research...",
    shareCta: "Share Link",
    linkCopied: "Link copied successfully!",
    downloadArticle: "Download for Offline Reading",
    zenModeCta: "Zen Reading Mode",
    whatsappShare: "Share via WhatsApp",
    recentActivityTitle: "Live Activity",
    savedItems: "Saved Research",
    saveCta: "Save Article",
    removeSave: "Remove Save",
    insightTitle: "Psychological Insight",
    relatedTitle: "Related Research",
    aiAssistantTitle: "The Soul Guide (AI)",
    aiAssistantGreeting: "Have a psychological question? I'm here to help",
    aiAssistantWelcome: "Welcome to Psych Orbits. I am your AI guide. How can I help you understand the depths of the human soul today?",
    aiAssistantPlaceholder: "Ask about any psychological concept...",
    aiAssistantLoading: "Summoning wisdom...",
    aiAssistantError: "Sorry, a connection disturbance occurred. Please try again later.",
    ratingTitle: "How would you rate your experience?",
    ratingSubtitle: "Your feedback helps develop Psych Orbits",
    ratingSuccess: "Thank you for your rating! We strive for the best.",
    ratingTotal: "Total Ratings",
    promoQuote: "Straighten yourself up, and others will straighten up with you. For how can a shadow be straight when the wood is crooked?",
    promoTitle: "Be Righteous Yourself",
    permissionDenied: "Permission denied. Guest access might be disabled in the database rules.",
    anonAuthNotice: "Notice: This feature requires 'Anonymous Auth' to be enabled in Firebase settings.",
    recommendedResearch: "Recommended Research",
    noResultsFound: "Sorry, no research found matching your search...",
    addVideoTitle: "Add New Guidance Video",
    saveVideoBtn: "Save and Publish Video",
    videoUrlLabel: "Video Link (YouTube/TikTok)",
    videoTitleAr: "Title (Arabic)",
    videoTitleEn: "Title (English)",
    videoDescAr: "Description (Arabic)",
    videoEducationalGuide: "Educational Guide",
    deleteConfirm: "Are you sure you want to delete this video?",
    editVideoTitle: "Edit Guidance Video",
    saveChangesBtn: "Save Changes",
    videoLibraryBtn: "Video Library",
    closeLibrary: "Close Library",
    videosTitle: "Psychological Guidance Videos",
    videosSubtitle: "A visual library for awareness and self-development",
    noVideos: "No videos available at the moment.",
    catAdults: "Adults",
    catChildren: "Children",
    catAll: "All",
    videoSelectCategory: "Select Target Audience",
    assessmentTitle: "Psych Orbits Assessment",
    assessmentHeading: "Psychological & Social Balance Test",
    assessmentDescription: "A simplified scientific scale that helps you understand your current psychological state and the balance of your social relationships by analyzing your responses to different life situations.",
    assessmentBtn: "Start Assessment Now",
    ctaTitle: "Digital Library",
    ctaHeading: "Join Knowledge Orbits\nExclusively for Members",
    ctaDescription: "Get full access to all research, studies and exclusive clips.",
    ctaInputPlaceholder: "Your email address",
    ctaButton: "Register Now for Free",
    readingRoomTitle: "Orbits Library",
    readingRoomSubTitle: "Immerse yourself in deep psychological research with a modern perspective",
    readCta: "Start Reading",
    bookTitle: "The Resilient Man's Guide to Distances and Relationships",
    bookAuthor: "Prepared by: Bechir Mejri (Supervision & Management)",
    bookDescription: "A practical and tactical guide gathering the most important articles in psychological sovereignty, body language analysis, and managing complex relationships with maturity.",
    closeReader: "Close Library",
    nextPage: "Next Page",
    prevPage: "Previous Page",
    promoSectionTitle: "Spiritual Promotion | Soul Essence",
    promoSectionHeading: "Embodiment of Deep Soul Orbits",
    promoSectionDescription: "Through this visual expression, we seek to decode the human journey in its constant quest for balance, serenity, and the light hidden within every self.",
    poeticExamples: [],
    dailyOrbitTitle: "Daily Orbit",
    dailyOrbitCta: "Contemplate this insight",
    dailyOrbits: [
      "The soul is like the moon, it has a dark side that only those who want to understand the secret of light see.",
      "The greatest victory is to be at peace with your flaws before judging others' virtues.",
      "Silence is not an absence of words, but an overwhelming presence of meaning in the self's orbits.",
      "He who masters the art of sobriety holds the keys to minds without knocking on their doors.",
      "The soul's orbits are not closed circles, but a journey of ascent towards the latent light."
    ],
    mappingTitle: "Intelligence Orbits Engine",
    mappingHeading: "Psychological Mental Mapping",
    mappingDescription: "Describe your state, feeling, or a situation you are going through, and the Psych Orbits system will analyze the 'orbit' of this feeling and draw a preliminary psychological map for you.",
    mappingPlaceholder: "Example: I feel a lot of hesitation towards a new career decision and tend to isolate...",
    mappingAnalyzeBtn: "Analyze Psychological Orbit",
    mappingResultTitle: "Your Orbit Analysis",
    mappingWait: "Sonding the soul's depths...",
    manifestoHeading: "Psych Orbits Manifesto",
    manifestoText: "We are here to decode human behavior, not just from a dry scientific perspective, but with a philosophical and spiritual vision that restores man's sovereignty over himself. Our project is a journey towards the latent light within your orbits.",
    manifestoSignature: "Supervision & Management: Bechir Mejri",
    quotes: [
      { text: "He who looks outside, dreams; he who looks inside, awakes.", author: "Carl Jung" },
      { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
      { text: "Intelligence is the ability to adapt to change.", author: "Stephen Hawking" },
      { text: "The wound is the place where the light enters you.", author: "Rumi" }
    ]
  },
  fr: {
    navTitle: "Orbites Psy",
    navSubTitle: "Supervision et Gestion : Bechir Mejri",
    navItems: {
      "بحوث": "Recherche",
      "دراسات": "Études",
      "عنا": "À Propos",
      "assessment": "Évaluation",
      "soul-caliber": "Calibrateur",
      "consultation": "Consultations"
    },
    heroSubtitle: "L'Art de se Comprendre et d'Interagir avec les Autres",
    heroTitle: "Explorez les Profondeurs de l'Âme Humaine et du Comportement",
    heroDescription: "Madarat al-Nafs est une plateforme de recherche de premier plan visant à donner aux individus les moyens de comprendre les mécanismes de l'esprit humain et d'améliorer les compétences de communication sociale basées sur des études scientifiques modernes.",
    heroCta: "Parcourir les Recherches",
    heroSecondaryCta: "À Propos du Labo",
    pillarsTitle: "Piliers de la Psychologie",
    pillarsHeading: "Guide pour Composer avec Soi-même et les Autres",
    pillarsDescription: "Nous proposons des recherches spécialisées en langage corporel, communication efficace et intelligence émotionnelle pour vous aider à décoder le comportement humain.",
    latestResearchTitle: "Recherche en Vedette",
    latestResearchHeading: "Dernières Études de Recherche Évaluées par les Pairs",
    searchPlaceholder: "Rechercher un sujet précis...",
    readResearch: "Lire la Recherche",
    globalHubTitle: "Radar de Recherche Mondial",
    globalHubHeading: "Rechercher dans les Centres de Psychologie Internationaux",
    globalHubDescription: "Nous croyons que le savoir ne connaît pas de frontières. C'est pourquoi nous offrons une porte d'entrée directe vers les revues scientifiques les plus prestigieuses et les instituts de recherche mondiaux pour suivre les dernières découvertes.",
    globalHubVisit: "Visiter le Site",
    aboutFounderTitle: "Le Fondateur",
    aboutFounderHeading: "Vision de Bechir Mejri pour le Réveil Psychologique (Supervision et Gestion)",
    aboutFounderDescription1: "Madarat al-Nafs a été créé avec la vision de Bechir Mejri pour être un pont entre la recherche académique complexe et notre vie quotidienne. Nous croyons que comprendre l'âme n'est pas un luxe intellectuel, mais une nécessité essentielle.",
    aboutFounderDescription2: "À travers son expérience, Bechir Mejri cherche à fournir des recherches rigoureuses dans une langue moderne, alliant précision scientifique et présentation soignée, pour être une référence pour tous ceux qui cherchent à développer leur intelligence sociale.",
    ctaSubtext: "Rejoignez plus de 25 000 passionnés de psychologie comportementale",
    statusBehavior: "Analyser les Secrets de l'Interaction",
    statusBehaviorLabel: "Recherche Comportementale",
    statusCases: "Application Pratique des Théories",
    statusCasesLabel: "Études de Cas",
    statusPubs: "Livres & Articles de Recherche",
    statusPubsLabel: "Publications du Labo",
    gratitudeTitle: "Mot de Remerciement",
    gratitudeText: "\"J'adresse mes sincères remerciements et ma gratitude à ma famille, qui a été mon soutien constant à chaque étape, et à tous les sympathisants de ce projet de recherche. Grâce à vous, nous continuons d'explorer l'âme humaine.\"",
    gratitudeAuthor: "Bechir Mejri - Supervision et Gestion",
    socialTitle: "Contact Direct",
    socialHeading: "Restez Connecté",
    copyright: "Madarat al-Nafs - Supervision et Gestion : Bechir Mejri",
    tunisia: "Tunisie",
    by: "Par",
    consultationCta: "Demander une Consultation",
    consultationTitle: "Consultations Comportementales & Introspectives Exclusives",
    consultationSubtitle: "Réservez une séance de consultation comportementale et psychologique directe avec Bechir Mejri pour décoder les motivations inconscientes, définir vos limites personnelles et consolider votre souveraineté du calme.",
    consultationNameLabel: "Nom Complet",
    consultationEmailLabel: "Adresse E-mail",
    consultationTypeLabel: "Thématique d'Accompagnement",
    consultationType1: "Décryptage du Langage Corporel & Signaux Comportementaux",
    consultationType2: "Affirmation de Soi, Limites Personnelles & Postures Souveraines",
    consultationType3: "Régulation Émotionnelle, Calme & Gestion Indépendante des Conflits",
    consultationDetailsLabel: "Décrivez votre situation ou le défi comportemental en détail",
    consultationSubmitBtn: "Soumettre la Demande de Consultation & d'Analyse",
    consultationSuccessMsg: "Votre demande de consultation a été soumise avec succès ! Bechir Mejri a été averti et vous contactera personnellement par e-mail très bientôt.",
    globalPerspectiveLabel: "Perspective Mondiale",
    referencesLabel: "Références et Sources",
    interactionTitle: "Commentaires des Chercheurs et Visiteurs",
    interactionLikes: "Interactions",
    interactionComments: "Commentaires",
    commentPlaceholderName: "Votre pseudo...",
    commentPlaceholderContent: "Écrivez votre impression ou lecture de cette recherche...",
    commentSubmit: "Envoyer le commentaire",
    commentSubmitting: "Envoi en cours...",
    noComments: "Soyez le premier à laisser une impression...",
    shareCta: "Partager le Lien",
    linkCopied: "Lien copié avec succès !",
    downloadArticle: "Télécharger pour lecture hors-ligne",
    zenModeCta: "Mode Lecture Zen",
    whatsappShare: "Partager via WhatsApp",
    recentActivityTitle: "Activité en Direct",
    savedItems: "Recherches Enregistrées",
    saveCta: "Enregistrer",
    removeSave: "Supprimer",
    insightTitle: "Aperçu Psychologique",
    relatedTitle: "Recherches Associées",
    aiAssistantTitle: "Le Guide de l'Âme (IA)",
    aiAssistantGreeting: "Une question psy ? Je suis là pour vous aider",
    aiAssistantWelcome: "Bienvenue dans les Orbites Psy. Je suis votre guide IA. Comment puis-je vous aider à comprendre les profondeurs de l'âme humaine aujourd'hui ?",
    aiAssistantPlaceholder: "Posez une question sur un concept...",
    aiAssistantLoading: "Réflexion en cours...",
    aiAssistantError: "Désolé, une perturbation est survenue. Veuillez réessayer.",
    ratingTitle: "Comment évaluez-vous votre expérience ?",
    ratingSubtitle: "Votre avis aide à développer Orbites Psy",
    ratingSuccess: "Merci pour votre évaluation ! Nous visons l'excellence.",
    ratingTotal: "Total des évaluations",
    promoQuote: "Redresses-toi, et les autres se redresseront avec toi. Car comment l'ombre peut-elle être droite quand le bois est tordu ?",
    promoTitle: "Tiens-toi droit toi-même",
    permissionDenied: "Permission refusée. L'accès invité peut être désactivé dans les règles de la base de données.",
    anonAuthNotice: "Avis : Cette fonctionnalité nécessite l'activation de 'Anonymous Auth' dans les paramètres Firebase.",
    recommendedResearch: "Recherches suggérées",
    noResultsFound: "Désolé, aucune recherche ne correspond à votre recherche...",
    addVideoTitle: "Ajouter une nouvelle vidéo de conseil",
    saveVideoBtn: "Enregistrer et publier la vidéo",
    videoUrlLabel: "Lien de la Vidéo (YouTube/TikTok)",
    videoTitleAr: "Titre (Arabe)",
    videoTitleEn: "Titre (Anglais)",
    videoDescAr: "Description (Arabe)",
    videoEducationalGuide: "Guide éducatif",
    deleteConfirm: "Êtes-vous sûr de vouloir supprimer cette vidéo ?",
    editVideoTitle: "Modifier la vidéo de conseil",
    saveChangesBtn: "Enregistrer les modifications",
    videoLibraryBtn: "Bibliothèque Vidéo",
    closeLibrary: "Fermer la Bibliothèque",
    videosTitle: "Vidéos de Conseil Psychologique",
    videosSubtitle: "Une bibliothèque visuelle pour la sensibilisation et le développement de soi",
    noVideos: "Aucune vidéo disponible pour le moment.",
    catAdults: "Adultes",
    catChildren: "Enfants",
    catAll: "Tout",
    videoSelectCategory: "Choisir le public cible",
    assessmentTitle: "Évaluation Orbites Psy",
    assessmentHeading: "Test d'Équilibre Psychologique et Social",
    assessmentDescription: "Une échelle scientifique simplifiée qui vous aide à comprendre votre état psychologique actuel et l'équilibre de vos relations sociales en analysant vos réponses à différentes situations de la vie.",
    assessmentBtn: "Commencer l'Évaluation",
    ctaTitle: "Bibliothèque Numérique",
    ctaHeading: "Rejoignez les Orbites de la Connaissance\nExclusivement pour les Membres",
    ctaDescription: "Accédez à toutes les recherches, études et clips exclusifs.",
    ctaInputPlaceholder: "Votre adresse e-mail",
    ctaButton: "S'inscrire Gratuitement",
    readingRoomTitle: "Bibliothèque des Orbites",
    readingRoomSubTitle: "Plongez dans des recherches psychologiques profondes avec une perspective moderne",
    readCta: "Commencer la Lecture",
    bookTitle: "Le Guide de l'Homme Serein dans les Relations",
    bookAuthor: "Préparé par : Bechir Mejri (Supervision et Gestion)",
    bookDescription: "Un guide pratique et tactique regroupant les articles les plus importants sur la souveraineté psychologique, l'analyse du langage corporel et la gestion des relations complexes.",
    closeReader: "Fermer la Bibliothèque",
    nextPage: "Page Suivante",
    prevPage: "Page Précédente",
    promoSectionTitle: "Promotion Spirituelle | Essence de l'Âme",
    promoSectionHeading: "L'Incarnation des Orbites Profondes de l'Âme",
    promoSectionDescription: "À travers cette expression visuelle, nous cherchons à décoder le voyage humain dans sa quête constante d'équilibre, de sérénité et de la lumière cachée au sein de chaque être.",
    poeticExamples: [],
    dailyOrbitTitle: "Orbite du Jour",
    dailyOrbitCta: "Contempler cet aperçu",
    dailyOrbits: [
      "L'âme est comme la lune, elle a une face cachée que seul celui qui veut comprendre le secret de la lumière voit.",
      "La plus grande victoire est d'être en paix avec ses défauts avant de juger les vertus des autres.",
      "Le silence n'est pas une absence de mots, mais une présence accablante de sens dans les orbites de soi.",
      "Celui qui maîtrise l'art de la sobriété détient les clés des esprits sans frapper à leurs portes.",
      "Les orbites de l'âme ne sont pas des cercles fermés, mais un voyage d'ascension vers la lumière latente."
    ],
    mappingTitle: "Moteur d'Orbites d'Intelligence",
    mappingHeading: "Cartographie Mentale Psychologique",
    mappingDescription: "Décrivez votre état, votre sentiment ou une situation que vous traversez, et le système Psych Orbits analysera l'orbite de ce sentiment et dessinera une carte psychologique préliminaire pour vous.",
    mappingPlaceholder: "Exemple : Je ressens beaucoup d'hésitation face à une nouvelle décision de carrière...",
    mappingAnalyzeBtn: "Analyser l'Orbite Psychologique",
    mappingResultTitle: "Votre Analyse d'Orbite",
    mappingWait: "Sondage des profondeurs de l'âme...",
    manifestoHeading: "Manifeste des Orbites de l'Âme",
    manifestoText: "Nous sommes ici pour décoder le comportement humain, non pas seulement d'un point de vue scientifique sec, mais avec une vision philosophique et spirituelle qui redonne à l'homme sa souveraineté sur lui-même. Notre projet est un voyage vers la lumière latente au sein de vos orbites.",
    manifestoSignature: "Supervision et Gestion : Bechir Mejri",
    quotes: [
      { text: "Celui qui regarde à l'extérieur rêve, celui qui regarde à l'intérieur s'éveille.", author: "Carl Jung" },
      { text: "Le bonheur n'est pas quelque chose de déjà fait. Il provient de vos propres actions.", author: "Dalaï Lama" },
      { text: "L'intelligence est la capacité de s'adapter au changement.", author: "Stephen Hawking" },
      { text: "La blessure est l'endroit par où la lumière entre en vous.", author: "Rumi" }
    ]
  }
};
