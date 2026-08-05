import React, { useCallback, useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import type { Language } from "../../context/LanguageContext";

interface FormValues {
  firstName: string;
  lastName: string;
  product: string;
  phone: string;
  comment: string;
}

interface Labels {
  firstName: Record<Language, string>;
  firstNamePlaceholder: Record<Language, string>;
  lastName: Record<Language, string>;
  lastNamePlaceholder: Record<Language, string>;
  product: Record<Language, string>;
  productPlaceholder: Record<Language, string>;
  phone: Record<Language, string>;
  phonePlaceholder: Record<Language, string>;
  comment: Record<Language, string>;
  commentPlaceholder: Record<Language, string>;
  send: Record<Language, string>;
  success: Record<Language, string>;
}

const LABELS: Labels = {
  firstName: { ru: "Имя", uz: "Ism", eng: "Name" },
  firstNamePlaceholder: { ru: "Имя", uz: "Ism", eng: "Name" },
  lastName: { ru: "Фамилия", uz: "Familiya", eng: "Surname" },
  lastNamePlaceholder: { ru: "Фамилия", uz: "Familiya", eng: "Surname" },
  product: { ru: "Продукт", uz: "Mahsulot", eng: "Product" },
  productPlaceholder: {
    ru: "Какой продукт вас интересует?",
    uz: "Qaysi mahsulotga qiziqish bildirasiz?",
    eng: "Which product are you interested in?",
  },
  phone: { ru: "Телефон", uz: "telefon nomeri", eng: "Phone number" },
  phonePlaceholder: { ru: "(555) 348-7623", uz: "(555) 348-7623", eng: "(555) 348-7623" },
  comment: { ru: "Ваш комментарий", uz: "sizning izohingiz", eng: "Your comment" },
  commentPlaceholder: {
    ru: "Оставьте комментарий об интересующем продукте",
    uz: "sizning qiziqayotgan mahsulot boyicha izoh qoldiring",
    eng: "Leave a comment about the product you are interested in",
  },
  send: { ru: "Отправить", uz: "Yuborish", eng: "Send" },
  success: {
    ru: "Спасибо! Мы с вами свяжемся.",
    uz: "Rahmat! Siz bilan aloqaga chiqamiz.",
    eng: "Thank you! We will contact you.",
  },
};

const INITIAL_VALUES: FormValues = {
  firstName: "",
  lastName: "",
  product: "",
  phone: "",
  comment: "",
};

const ContactFormBase: React.FC = () => {
  const { language } = useLanguage();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const res = await fetch('https://api.ekeler.uz/api/v1/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: values.firstName,
          surname: values.lastName,
          phone: values.phone,
          product_name: values.product,
          description: values.comment,
        }),
      });
      if (res.ok) {
        const telegramBotToken = (import.meta as any).env?.VITE_TELEGRAM_BOT_TOKEN;
        const telegramChatId = (import.meta as any).env?.VITE_TELEGRAM_CHAT_ID || '-5497877953';
        if (!telegramBotToken) {
          setError('Telegram bot token yoq (VITE_TELEGRAM_BOT_TOKEN)');
          return;
        }
        const date = new Date().toLocaleString('uz-UZ');
        const telegramText = `<b>📝 Yangi murojaat</b>\n\n<b>Ism:</b> ${values.firstName}\n<b>Familiya:</b> ${values.lastName}\n<b>Telefon:</b> ${values.phone}\n<b>Mahsulot:</b> ${values.product}\n<b>Izoh:</b> ${values.comment || '—'}\n\n<b>📅 Sana:</b> ${date}`;
        const tgRes = await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramText,
            parse_mode: 'HTML',
          }),
        });
        if (!tgRes.ok) {
          setError('Telegramga yuborishda xato');
          return;
        }
        alert(LABELS.success[language]);
        setValues(INITIAL_VALUES);
      } else {
        const data = await res.json().catch(() => ({} as { detail?: { msg: string }[] }));
        const message = data.detail?.map((d) => d.msg).join('\n') || `Xato: ${res.status}`;
        setError(message);
      }
    } catch (err) {
      setError('Tarmoq xatosi');
    } finally {
      setIsSubmitting(false);
    }
  }, [values, language]);

  // Responsive: inputlar mobilda ham qulay bosiladigan bo'lishi uchun min-h-[44px]
  const inputClassName = useMemo(
    () => "w-full min-h-[44px] rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-[#1B1D20] outline-none focus:border-[#E88029] placeholder:text-neutral-400",
    []
  );

  const labelClassName = useMemo(() => "text-sm font-medium text-[#1B1D20]", []);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="contact-first-name" className={labelClassName}>
            {LABELS.firstName[language]}
          </label>
          <input
            id="contact-first-name"
            name="firstName"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            placeholder={LABELS.firstNamePlaceholder[language]}
            required
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="contact-last-name" className={labelClassName}>
            {LABELS.lastName[language]}
          </label>
          <input
            id="contact-last-name"
            name="lastName"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            placeholder={LABELS.lastNamePlaceholder[language]}
            required
            className={inputClassName}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-product" className={labelClassName}>
          {LABELS.product[language]}
        </label>
        <input
          id="contact-product"
          name="product"
          type="text"
          value={values.product}
          onChange={handleChange}
          placeholder={LABELS.productPlaceholder[language]}
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-phone" className={labelClassName}>
          {LABELS.phone[language]}
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
          placeholder={LABELS.phonePlaceholder[language]}
          className={inputClassName}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-comment" className={labelClassName}>
          {LABELS.comment[language]}
        </label>
        <textarea
          id="contact-comment"
          name="comment"
          value={values.comment}
          onChange={handleChange}
          placeholder={LABELS.commentPlaceholder[language]}
          rows={5}
          required
          className={`resize-none ${inputClassName}`}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="min-h-[44px] w-full rounded-full bg-[#1B1D20] px-8 py-3 text-sm font-medium text-white hover:bg-[#E88029] disabled:opacity-60 sm:w-fit"
      >
        {isSubmitting ? '...' : LABELS.send[language]}
      </button>
    </form>
  );
};

export const ContactForm = React.memo(ContactFormBase);
export default React.memo(ContactFormBase);
