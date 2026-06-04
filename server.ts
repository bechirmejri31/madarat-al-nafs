import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Mail Transporter Lazy Loader
const getTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  if (!user || !pass) {
    throw new Error("لم يتم تكوين البريد الإلكتروني أو كلمة السر بعد.");
  }
  
  const cleanUser = user.trim();
  const cleanPass = pass.replace(/\s+/g, '');
  
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // TLS/SSL on port 465
    auth: {
      user: cleanUser,
      pass: cleanPass
    }
  });
};

const getApiKey = () => {
  return process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GOOGLE_GENAI_API_KEY || "";
};

let aiInstance: GoogleGenAI | null = null;
const getAI = () => {
  if (!aiInstance) {
    const key = getApiKey();
    if (!key) {
      throw new Error("GEMINI_API_KEY is not configured");
    }
    aiInstance = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiInstance;
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Google Search Console Site Verification HTML Route
  app.get("/google530f89ba5d1e4bdb.html", (req, res) => {
    res.send("google-site-verification: google530f89ba5d1e4bdb.html");
  });

  app.get("/googlepI2cNbbdoKn8VgbdeOww_RhGAvQhYKmwMrRfFBFsKKw.html", (req, res) => {
    res.send("google-site-verification: googlepI2cNbbdoKn8VgbdeOww_RhGAvQhYKmwMrRfFBFsKKw.html");
  });

  app.get("/google7EaUohu4NAr_z19pjswEib7lOESvS5Y_JOxzkAaWdZM.html", (req, res) => {
    res.send("google-site-verification: google7EaUohu4NAr_z19pjswEib7lOESvS5Y_JOxzkAaWdZM.html");
  });

  // Dynamic generic fallback for any other Google verification HTML files
  app.get("/google:id.html", (req, res) => {
    res.send(`google-site-verification: google${req.params.id}.html`);
  });

  // AI Assistant Route
  app.post("/api/ai/ask", async (req, res) => {
    const { question, lang, context, history } = req.body;
    console.log(`[AI Request] Lang: ${lang}, Question: ${question?.substring(0, 50)}...`);

    if (!getApiKey()) {
      console.error("[AI Error] Gemini API key is missing (checked GEMINI_API_KEY, GOOGLE_API_KEY, GOOGLE_GENAI_API_KEY).");
      return res.status(500).json({ error: "AI Service not configured on server" });
    }

    const platformContext = `
      Platform: Madarat Al-Nafs (Orbits of the Soul)
      Founder: Bechir Mejri (بشير الماجري) - Platform Founder, Behavioral Analyst, and Human Behavior Enthusiast.
      Location: Tunisia (تونس)
      Mission: Decoding human behavior, body language, social intelligence, and combining academic research with spiritual/philosophical vision.
      Supervision: Supervised and Managed by Bechir Mejri.
      
      Key Features of the site:
      - Mental Mapping: A psychological orbit analysis tool.
      - Video Library: Educational content on behavior.
      - Research: Deep articles on personality and society.
      - AI Consultation: Providing psychological insights and behavioral guidance.
    `;

    const systemInstruction = `You are "The Soul Guide" (مرشد المدارات), the premium AI research and consultation assistant for "Madarat Al-Nafs".
    Your purpose is to offer deep psychological insights, behavioral guidance, and information about the platform's research.
    
    Visionary & Founder: Bechir Mejri (Founder, Behavioral Analyst, and Passionate Researcher).
    Platform Context: ${platformContext}
    
    Tone: Deeply insightful, empathetic, professional, and slightly philosophical (poetic but scientific).
    
    Google Search Access: Use it for the latest psychological trends, research papers, or if the user asks for specific external info.
    
    Rules:
    1. If asked in Arabic, use elegant and sophisticated Arabic. English otherwise.
    2. Always align your advice with the brand's values: Understanding, Balance, and Radiance.
    3. You are capable of providing:
       - Psychological consultations (behavioral focus).
       - Summaries of body language concepts.
       - Explanations of how to use the site (Mapping, Videos).
       - Deep analysis of personality traits.
    4. Mention you are part of Bechir Mejri's mission (Supervision & Management: Bechir Mejri) to decode the human soul.
    5. Be concise in daily chat, but deep and thorough for consultations/research.`;

    const makeRequest = async (useSearch: boolean) => {
      const config: any = {
        systemInstruction: systemInstruction,
      };
      if (useSearch) {
        config.tools = [{ googleSearch: {} }];
      }

      // Convert history to Gemini format if provided
      const chatHistory = (history || []).map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      return await getAI().models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          ...chatHistory,
          {
            role: "user",
            parts: [{ text: `User Inquiry: ${question}\n(Respond in the same language as the inquiry. If User context provided: ${context || "None"})` }]
          }
        ],
        config
      });
    };

    try {
      // Attempt with Google Search first
      let result = await makeRequest(true);
      
      let answer = "";
      try {
        answer = result.text || "";
      } catch (e) {
        // Fallback to manual part extraction if .text getter fails
        const parts = result.candidates?.[0]?.content?.parts;
        if (parts) {
          answer = parts.find(p => p.text)?.text || "";
        }
      }

      const groundingChunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const citations = groundingChunks
        .map((chunk: any) => (chunk.web ? { title: chunk.web.title || "Source", uri: chunk.web.uri } : null))
        .filter((c: any) => c !== null);

      if (!answer && citations.length > 0) {
        answer = lang === 'ar' 
          ? "لقد وجدت بعض المعلومات المتعلقة بسؤالك في المصادر التالية." 
          : "I found some relevant information in the following sources.";
      }

      if (!answer) {
        throw new Error("Empty response from AI");
      }

      console.log(`[AI Success] Response generated via Search (${answer.length} chars)`);
      return res.json({ answer, citations });

    } catch (error) {
      console.warn("[AI Search Error] Attempting fallback without search tool:", error);
      
      try {
        // Fallback attempt without tools (in case search tool is restricted or failing)
        const fallbackResult = await makeRequest(false);
        let answer = "";
        try {
          answer = fallbackResult.text || "";
        } catch (e) {
          const parts = fallbackResult.candidates?.[0]?.content?.parts;
          if (parts) answer = parts.find(p => p.text)?.text || "";
        }

        if (answer) {
          console.log(`[AI Success] Response generated via Fallback (${answer.length} chars)`);
          return res.json({ answer, citations: [] });
        }
        
        throw new Error("Fallback also returned empty");
      } catch (finalError) {
        console.error("[AI Terminal Error]:", finalError);
        return res.status(500).json({ error: "The AI service is currently unavailable. Please try again later." });
      }
    }
  });

  // AI Translation Route
  app.post("/api/ai/translate", async (req, res) => {
    try {
      const { text, targetLang, context } = req.body;
      
      if (!getApiKey()) {
        return res.status(500).json({ error: "AI Service not configured" });
      }

      const prompt = context === 'research' 
        ? `Translate the following research article details to ${targetLang}. Return ONLY a JSON object with these keys: title, category, author, description, globalPerspective, content.
           Data to translate: ${JSON.stringify(text)}`
        : `Translate the following UI translation object to ${targetLang}. Return ONLY the translated JSON object.
           Object: ${JSON.stringify(text)}`;

      const response = await getAI().models.generateContent({
        model: "gemini-3.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json",
        }
      });

      res.json(JSON.parse(response.text));
    } catch (error) {
      console.error("Translation Error:", error);
      res.status(500).json({ error: "Failed to translate" });
    }
  });

  // Analyze Orbit Route
  app.post("/api/analyze-orbit", async (req, res) => {
    try {
      const { text, lang } = req.body;
      if (!getApiKey()) {
        console.error("[Orbit Mapping] Gemini API key is missing from environment variables.");
        return res.status(500).json({ error: "AI Service not configured on the server" });
      }

      const prompt = `
        Analyze the following psychological state described by a user. 
        User description: "${text}"
        
        Provide a "Psychological Orbit Mapping" in ${lang === "ar" ? "Arabic (اللغة العربية)" : lang === "fr" ? "French" : "English"}.
        Return ONLY a JSON object with these exact keys: 
        - title: A poetic, deep name/title for this mental state.
        - core: The core nature of this psychological feeling (Core Orbit).
        - outer: The visible social impact, outer communication, or external manifestation (Outer Orbit).
        - inner: The hidden root causes, fears, or subconscious drivers (Inner Orbit).
        - trajectory: A constructive recommended path, sovereign advice, or wisdom (Trajectory).
        
        Keep the tone professional, insightful, and consistent with "Madarat Al-Nafs" (Orbits of the Soul) branding.
      `;

      console.log(`[Orbit Mapping] Triggering Gemini generateContent...`);
      const response = await getAI().models.generateContent({
        model: "gemini-3.5-flash",
        contents: [{ role: "user", parts: [{ text: prompt }] }],
        config: { responseMimeType: "application/json" }
      });

      let rawText = "";
      try {
        rawText = response.text || "";
      } catch (e) {
        const parts = response.candidates?.[0]?.content?.parts;
        if (parts) {
          rawText = parts.find(p => p.text)?.text || "";
        }
      }

      rawText = rawText.trim();
      console.log(`[Orbit Mapping] Received raw text of length: ${rawText.length}`);

      // Clean the output if the model wrapped it in markdown code blocks
      if (rawText.startsWith("```")) {
        rawText = rawText.replace(/^```(?:json)?\n?/i, "").replace(/```$/, "").trim();
      }

      if (!rawText) {
        throw new Error("Gemini returned empty text or content parts");
      }

      const parsedJSON = JSON.parse(rawText);
      
      // Ensure all fields are populated with something so the UI doesn't look empty
      const result = {
        title: parsedJSON.title || (lang === "ar" ? "تحليل مداري" : "My Orbit"),
        core: parsedJSON.core || parsedJSON.Core || (lang === "ar" ? "مدار المشاعر الجوهرية" : "Subtle feelings analysis"),
        outer: parsedJSON.outer || parsedJSON.Outer || (lang === "ar" ? "التأثير الخارجي والسلوك" : "External behavior guidance"),
        inner: parsedJSON.inner || parsedJSON.Inner || (lang === "ar" ? "المحركات الداخلية والدوافع" : "Hidden subconscious drivers"),
        trajectory: parsedJSON.trajectory || parsedJSON.Trajectory || (lang === "ar" ? "المسار المقترح للتوازن" : "Actionable sovereign advice")
      };

      res.json(result);
    } catch (error) {
      console.error("Mapping Error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to analyze orbits" });
    }
  });

  // Verify Notifications Status & Credentials Test
  app.get("/api/verify-notifications", async (req, res) => {
    const user = process.env.EMAIL_USER || "";
    const pass = process.env.EMAIL_PASS || "";
    
    const status: any = {
      emailConfigured: !!(user && pass),
      emailUser: user ? `${user.substring(0, 4)}...${user.substring(user.indexOf('@'))}` : "",
      emailPassLength: pass.length,
      smtpStatus: "pending",
      smtpError: null,
      telegramConfigured: !!(process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID),
      discordConfigured: !!process.env.DISCORD_WEBHOOK_URL,
      facebookConfigured: !!(process.env.FACEBOOK_PAGE_ACCESS_TOKEN && process.env.FACEBOOK_PAGE_ID)
    };

    if (user && pass) {
      try {
        const cleanUser = user.trim();
        const cleanPass = pass.replace(/\s+/g, '');
        const testTransporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: cleanUser,
            pass: cleanPass
          }
        });
        await new Promise<void>((resolve, reject) => {
          testTransporter.verify((err) => {
            if (err) reject(err);
            else resolve();
          });
        });
        status.smtpStatus = "success";
      } catch (err: any) {
        status.smtpStatus = "failed";
        status.smtpError = err.message || JSON.stringify(err);
      }
    } else {
      status.smtpStatus = "missing_credentials";
    }

    res.json(status);
  });

  // Send Test Notification
  app.post("/api/test-notification", async (req, res) => {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    if (!user || !pass) {
      return res.status(400).json({ error: "البريد الإلكتروني أو كلمة المرور غير مهيأة بعد في إعدادات المنصة." });
    }

    const cleanUser = user.trim();
    const cleanPass = pass.replace(/\s+/g, '');

    const testTransporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: cleanUser,
        pass: cleanPass
      }
    });

    try {
      await testTransporter.sendMail({
        from: `"Madarat Al-Nafs" <${cleanUser}>`,
        to: cleanUser,
        subject: "🧪 تجربة إشعارات مدارات النفس",
        html: `
          <div style="direction: rtl; font-family: sans-serif; text-align: right; padding: 20px; border: 1px solid #d4af37; border-radius: 8px;">
            <h2 style="color: #d4af37; border-bottom: 1px solid #eee; padding-bottom: 10px;">🧪 تجربة إشعارات مدارات النفس</h2>
            <p style="font-size: 16px;">مرحباً بشير! لقد تمت تجربة خادم البريد بنجاح والاتصال يعمل 100%.</p>
            <p style="font-size: 14px; color: #444;">الآن عند دخول أي زائر للمنصة، ستتلقى تنبيهاً فورياً يحتوي على بلده، مدينته، عنوان IP، والمتصفح.</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;"/>
            <p style="font-size: 12px; color: #888;">تم إرسال هذا الإشعار التجريبي للتأكد من ربط كلمة المرور ذات الـ 16 حرفاً بنجاح.</p>
          </div>
        `
      });
      res.json({ success: true, message: "تم إرسال البريد التجريبي بنجاح! يرجى التحقق من علبة الوارد في Gmail." });
    } catch (error: any) {
      console.error("[Test Notification Error]:", error);
      res.status(500).json({ error: "فشل إرسال البريد التجريبي: " + (error.message || error) });
    }
  });

  // Send Email Report Route
  app.post("/api/send-report", async (req, res) => {
    const { email, subject, reportHtml } = req.body;
    
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("[Email] Service not configured.");
      return res.status(200).json({ status: "skipped", message: "Email service not configured on server" });
    }

    const cleanUser = process.env.EMAIL_USER.trim();

    try {
      await getTransporter().sendMail({
        from: `"Madarat Al-Nafs" <${cleanUser}>`,
        to: email || cleanUser,
        subject: subject || "تقرير مدارات النفس",
        html: `
          <div style="font-family: serif; color: #000; direction: rtl; padding: 20px; border: 1px solid #d4af37;">
            <h1 style="color: #d4af37;">منصة مدارات النفس</h1>
            <hr/>
            ${reportHtml}
            <hr/>
            <p style="font-size: 12px; color: #666;">تم إنتاج هذا التقرير آلياً بواسطة برمجية مدارات الذكاء.</p>
          </div>
        `
      });
      res.json({ status: "ok" });
    } catch (error) {
      console.error("[Email Error]:", error);
      res.status(500).json({ error: "Failed to send email" });
    }
  });

  // Discord Webhook Route (Smoother alternative)
  app.post("/api/notify-discord", async (req, res) => {
    const { content, embed } = req.body;
    const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

    if (!DISCORD_WEBHOOK_URL) {
      return res.status(200).json({ status: "skipped", message: "Discord Webhook not configured" });
    }

    try {
      const response = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: content || null,
          embeds: embed ? [embed] : []
        })
      });
      
      if (!response.ok) throw new Error(`Discord responded with ${response.status}`);
      res.json({ status: "ok" });
    } catch (error) {
      console.error("[Discord Error]:", error);
      res.status(500).json({ error: "Failed to send Discord notification" });
    }
  });

  // Telegram Bot Route (The smoothest for mobile alerts)
  app.post("/api/notify-telegram", async (req, res) => {
    const { text } = req.body;
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!BOT_TOKEN || !CHAT_ID) {
      return res.status(200).json({ status: "skipped", message: "Telegram not configured" });
    }

    try {
      const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text,
          parse_mode: 'HTML'
        })
      });
      
      if (!response.ok) throw new Error(`Telegram responded with ${response.status}`);
      res.json({ status: "ok" });
    } catch (error) {
      console.error("[Telegram Error]:", error);
      res.status(500).json({ error: "Failed to send Telegram notification" });
    }
  });

  // Facebook Page Notification Route
  app.post("/api/notify-facebook", async (req, res) => {
    const { message } = req.body;
    const PAGE_ACCESS_TOKEN = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
    const PAGE_ID = process.env.FACEBOOK_PAGE_ID;

    if (!PAGE_ACCESS_TOKEN || !PAGE_ID) {
      return res.status(200).json({ status: "skipped", message: "Facebook not configured" });
    }

    try {
      const response = await fetch(`https://graph.facebook.com/${PAGE_ID}/feed`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: message,
          access_token: PAGE_ACCESS_TOKEN
        })
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      res.json({ status: "ok" });
    } catch (error) {
      console.error("[Facebook Error]:", error);
      res.status(500).json({ error: "Failed to send Facebook notification" });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    console.log("Starting in DEVELOPMENT mode");
    const { createServer } = await import("vite");
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting in PRODUCTION mode");
    const distPath = path.resolve("dist");
    console.log(`Serving production assets from: ${distPath}`);

    if (!fs.existsSync(path.join(distPath, "index.html"))) {
      console.error(`FATAL: index.html not found in ${distPath}`);
    }

    app.use(express.static(distPath));

    app.get("*", (req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Application not initialized. Please rebuild.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical server error:", err);
  process.exit(1);
});
