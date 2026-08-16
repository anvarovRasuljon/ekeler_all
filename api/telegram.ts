const escapeMd = (text: string) =>
  text.replace(/([_\*\[\]\(\)~`>#+\-=|\{\}\.!])/g, '\\$1');

const cleanPhone = (phone: string) => phone.replace(/[^0-9+]/g, '');

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const { firstName, lastName, company, phone, description, language } = req.body || {};

  const message = [
    '🎉 *Yangi murojaat*',
    '',
    `👤 *Ism:* ${escapeMd(String(firstName || '-'))}`,
    `👥 *Familiya:* ${escapeMd(String(lastName || '-'))}`,
    `🏢 *Kompaniya:* ${escapeMd(String(company || '-'))}`,
    `📞 *Telefon:* ${phone ? `[${escapeMd(String(phone))}](tel:${cleanPhone(String(phone))})` : '-'}`,
    `📝 *Tavsif:* ${escapeMd(String(description || '-'))}`,
  ].join('\n');

  const token = process.env.TELEGRAM_BOT_TOKEN || '8608889308:AAFGMWlAUnJVuSXVb6Jc6lgTG9XixWKDYXk';
  const chatId = process.env.TELEGRAM_CHAT_ID || '-5497877953';

  console.log('[Telegram] sending to chat', chatId, 'payload:', { firstName, lastName, company, phone, description, language });

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'MarkdownV2',
      }),
    });
    const data = (await telegramRes.json()) as { ok: boolean; description?: string };
    console.log('[Telegram] response:', data);
    if (!telegramRes.ok || !data.ok) {
      res.status(500).json({ ok: false, error: data.description || 'Telegram error' });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[Telegram] error:', err);
    res.status(500).json({ ok: false, error: String(err) });
  }
}
