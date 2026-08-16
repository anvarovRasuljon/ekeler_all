const escapeHtml = (text: string) =>
  text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

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

  const message = `<b>Yangi murojaat (ekeler.uz)</b>
<b>Ism:</b> ${escapeHtml(String(firstName || '-'))}
<b>Familiya:</b> ${escapeHtml(String(lastName || '-'))}
<b>Kompaniya:</b> ${escapeHtml(String(company || '-'))}
<b>Telefon:</b> ${escapeHtml(String(phone || '-'))}
<b>Tavsif:</b> ${escapeHtml(String(description || '-'))}
<b>Til:</b> ${escapeHtml(String(language || '-'))}`;

  const token = process.env.TELEGRAM_BOT_TOKEN || '8608889308:AAFGMWlAUnJVuSXVb6Jc6lgTG9XixWKDYXk';
  const chatId = process.env.TELEGRAM_CHAT_ID || '-5497877953';

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });
    const data = (await telegramRes.json()) as { ok: boolean; description?: string };
    if (!telegramRes.ok || !data.ok) {
      res.status(500).json({ ok: false, error: data.description || 'Telegram error' });
      return;
    }
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
}
