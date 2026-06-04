
export enum NotificationType {
  VISITOR = 'visitor',
  CONSULTATION = 'consultation',
  ASSESSMENT = 'assessment',
  MAPPING = 'mapping'
}

interface NotifyOptions {
  subject?: string;
  message: string;
  details?: Record<string, any>;
  emailHtml?: string;
}

export const notifyOwner = async (type: NotificationType, options: NotifyOptions) => {
  const { subject, message, details, emailHtml } = options;
  
  // 1. Log to server console
  console.log(`[Notification: ${type}] ${message}`, details);

  // 2. Try Email
  const emailPromise = fetch('/api/send-report', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: subject || `تنبيه من مدارات النفس: ${type}`,
      reportHtml: emailHtml || `
        <div style="direction: rtl;">
          <p>${message}</p>
          <pre>${JSON.stringify(details, null, 2)}</pre>
        </div>
      `
    })
  }).catch(e => console.warn("Email notify failed:", e));

  // 3. Try Telegram (Smoothest for phone)
  const telegramText = `
<b>🔔 تنبيه منصة مدارات النفس</b>
<b>النوع:</b> ${type}
<b>الرسالة:</b> ${message}
${details ? `\n<b>تفاصيل:</b>\n${Object.entries(details).map(([k, v]) => `• ${k}: ${v}`).join('\n')}` : ''}
<i>توقيت: ${new Date().toLocaleString('ar-TN')}</i>
  `;

  const telegramPromise = fetch('/api/notify-telegram', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: telegramText })
  }).catch(e => console.warn("Telegram notify failed:", e));

  // 4. Try Facebook
  const facebookPromise = fetch('/api/notify-facebook', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      message: `🔔 إشعار مدارات النفس (${type})\n${message}\n\nالتفاصيل:\n${details ? Object.entries(details).map(([k, v]) => `- ${k}: ${v}`).join('\n') : ''}` 
    })
  }).catch(e => console.warn("Facebook notify failed:", e));

  // 5. Try Discord
  const discordPromise = fetch('/api/notify-discord', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      content: `🔔 **${type.toUpperCase()} ALERT**`,
      embed: {
        title: subject || message,
        description: message,
        color: type === NotificationType.CONSULTATION ? 0xd4af37 : 0x3b82f6,
        fields: details ? Object.entries(details).map(([k, v]) => ({ name: k, value: String(v), inline: true })) : [],
        timestamp: new Date().toISOString()
      }
    })
  }).catch(e => console.warn("Discord notify failed:", e));

  await Promise.allSettled([emailPromise, telegramPromise, facebookPromise, discordPromise]);
};
