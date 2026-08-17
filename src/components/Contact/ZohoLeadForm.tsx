import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

const ZOHO_FORM_ACTION = "https://crm.zoho.com/crm/WebToLeadForm";
const ZOHO_FORM_ID = "webform7525508000000615582";
const ZOHO_FORM_NAME = "WebToLeads7525508000000615582";
const ZOHO_WF_ID = 7525508000000615582;

const ZOHO_XNQSJSDP =
  "0150acda6c327b749714cfeb9f1c78adec33c8b3496f636d6e6550ee0a37ee6e";
const ZOHO_XMIWTLD =
  "8989c1eac67f637726ca120f25250c27ff684a6d5d8c4f93bf091711dcd843239c4ff937fffa8d8c6b0d1fd2d0bba8dc";
const ZOHO_ACTION_TYPE = "TGVhZHM=";

const ZOHO_ANALYTICS_ID = "wf_anal";
const ZOHO_ANALYTICS_SRC =
  "https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=2e63e3edaaed15da7bae658bc570d92df51c987cbb6ea65e4c0a53e3c09aaa869b3bac55d68c38ad82ed97940c73ef7dgidbfe15d86b20534031204427e55107afdf4e5f27e1346ac11f6c67251f77b1410gidd6e5a73911d9a7e17572a01667c8c01ede87899bc2a3774baf9b8bc8d460a6c2gid02584ff5a4e6dc2eb23a5bf05e783a6b99bae64bf1a5768c170283863b7b797a&tw=16b832df8bf702ed04a76c6083d23b78dc695fa8eed070de00372429ee866d88";

const HIDDEN_IFRAME_NAME = "zoho_hidden_iframe";

const MND_FIELDS = ["First Name", "Last Name"] as const;
const FLD_LANG_VAL = [
  { ru: "Фамилия", uz: "Familiya", eng: "Last name" },
  { ru: "Имя", uz: "Ism", eng: "First name" },
] as const;

let analyticsInjected = false;

const INPUT_CLASS =
  "w-full min-h-[44px] rounded-[8px] border border-[#ECECEC] bg-white px-4 py-3 font-['Inter'] text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20] align-middle outline-none transition-colors focus:border-[#E88029] placeholder:text-[#ECECEC]";
const LABEL_CLASS = "font-['Inter'] text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20] align-middle";

export const ZohoLeadForm: React.FC = () => {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const postedRef = useRef(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const successMessage = { ru: 'Спасибо! Ваше сообщение отправлено.', uz: 'Rahmat! Xabaringiz yuborildi.', eng: 'Thank you! Your message has been sent.' };
  const loadingText = { ru: 'Отправка...', uz: 'Yuborilmoqda...', eng: 'Sending...' };

  useEffect(() => {
    if (analyticsInjected || document.getElementById(ZOHO_ANALYTICS_ID)) return;
    analyticsInjected = true;

    const w = window as unknown as Record<string, unknown>;
    w._wFa_ajax_will_be_replaced = false;
    if (typeof w._wfa_fstprtcken === "undefined") w._wfa_fstprtcken = {};
    (w._wfa_fstprtcken as Record<number, boolean>)[ZOHO_WF_ID] = true;

    const script = document.createElement("script");
    script.id = ZOHO_ANALYTICS_ID;
    script.src = ZOHO_ANALYTICS_SRC;
    (formRef.current ?? document.body).appendChild(script);
  }, []);

  useEffect(() => {
    if (!submitted) return;
    const id = setTimeout(() => setSubmitted(false), 4000);
    return () => clearTimeout(id);
  }, [submitted]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    const form = formRef.current;
    if (!form) {
      setLoading(false);
      e.preventDefault();
      return;
    }

    try {
      (document as unknown as { charset: string }).charset = "UTF-8";
    } catch {
      // ignore
    }

    for (let i = 0; i < MND_FIELDS.length; i++) {
      const fieldObj = form.elements.namedItem(MND_FIELDS[i]) as HTMLInputElement | HTMLTextAreaElement | null;
      if (!fieldObj) continue;

      const trimmed = fieldObj.value.replace(/^\s+|\s+$/g, "");
      if (trimmed.length === 0) {
        alert(t(FLD_LANG_VAL[i]) + t({ ru: ' не может быть пустым.', uz: ' bo‘sh bo‘lishi mumkin emas.', eng: ' cannot be empty.' }));
        fieldObj.focus();
        setLoading(false);
        e.preventDefault();
        return;
      }
    }

    const urlparams = new URLSearchParams(window.location.search);
    if (urlparams.has("service") && urlparams.get("service") === "smarturl") {
      const service = urlparams.get("service") as string;
      if (!form.elements.namedItem("service")) {
        const smarturlfield = document.createElement("input");
        smarturlfield.setAttribute("type", "hidden");
        smarturlfield.setAttribute("value", service);
        smarturlfield.setAttribute("name", "service");
        form.appendChild(smarturlfield);
      }
    }

    const fd = new FormData(form);
    const firstName = String(fd.get("First Name") || "");
    const lastName = String(fd.get("Last Name") || "");
    const company = String(fd.get("Company") || "");
    const phone = String(fd.get("Phone") || "");
    const description = String(fd.get("Description") || "");

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://api.ekeler.uz";

    // 1. Telegram botga to'g'ridan-to'g'ri yuborish (HTML formatida)
    const TELEGRAM_BOT_TOKEN = "8608889308:AAFGMWlAUnJVuSXVb6Jc6lgTG9XixWKDYXk";
    const TELEGRAM_CHAT_ID = "-5497877953";

    const tgText = `<b>Yangi murojaat</b>\n\n<b>Ism:</b> ${firstName}\n<b>Familiya:</b> ${lastName}\n<b>Kompaniya:</b> ${company}\n<b>Telefon:</b> ${phone}\n<b>Tavsif:</b> ${description}`;

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: tgText,
        parse_mode: 'HTML',
      }),
    }).catch((err) => console.log("Telegram xatosi:", err));

    // 2. /api/v1/contacts ga yuborish
    fetch(`${backendUrl}/api/v1/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: lastName,
        phone: phone,
        surname: firstName,
        product_name: company,
        description: description,
      }),
    }).catch((err) => console.log("Backend xatosi:", err));

    postedRef.current = true;
  };

  const handleIframeLoad = () => {
    if (!postedRef.current) return;
    postedRef.current = false;
    setLoading(false);
    setSubmitted(true);
    formRef.current?.reset();
  };

  return (
    <div id="crmWebToEntityForm" className="zcwf_lblLeft crmWebToEntityForm w-full max-w-[600px]">
      <iframe
        name={HIDDEN_IFRAME_NAME}
        title="Zoho form response"
        onLoad={handleIframeLoad}
        aria-hidden="true"
        tabIndex={-1}
        style={{ position: "absolute", width: 0, height: 0, border: 0, left: "-9999px" }}
      />

      {submitted && (
        <div className="mb-6 rounded-[8px] bg-[#E88029]/10 px-4 py-3 text-center font-['Inter'] text-[14px] font-normal leading-[22px] text-[#E88029]">
          {t(successMessage)}
        </div>
      )}

      <form
        ref={formRef}
        id={ZOHO_FORM_ID}
        name={ZOHO_FORM_NAME}
        action={ZOHO_FORM_ACTION}
        method="POST"
        target={HIDDEN_IFRAME_NAME}
        acceptCharset="UTF-8"
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input type="text" style={{ display: "none" }} name="xnQsjsdp" defaultValue={ZOHO_XNQSJSDP} />
        <input type="hidden" name="zc_gad" id="zc_gad" defaultValue="" />
        <input type="text" style={{ display: "none" }} name="xmIwtLD" defaultValue={ZOHO_XMIWTLD} />
        <input type="text" style={{ display: "none" }} name="actionType" defaultValue={ZOHO_ACTION_TYPE} />
        <input type="text" style={{ display: "none" }} name="returnURL" defaultValue="null" />

        <div className="flex flex-col gap-2">
          <label htmlFor="Last_Name" className={LABEL_CLASS}>
            {t({ ru: 'Имя', uz: 'Ism', eng: 'First name' })}<span className="ml-1 text-red-600">*</span>
          </label>
          <input type="text" id="Last_Name" name="Last Name" maxLength={80} className={INPUT_CLASS} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="First_Name" className={LABEL_CLASS}>
            {t({ ru: 'Фамилия', uz: 'Familiya', eng: 'Last name' })}<span className="ml-1 text-red-600">*</span>
          </label>
          <input type="text" id="First_Name" name="First Name" maxLength={40} className={INPUT_CLASS} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="Company" className={LABEL_CLASS}>
            {t({ ru: 'Компания', uz: 'Kompaniya', eng: 'Company' })}
          </label>
          <input type="text" id="Company" name="Company" maxLength={200} className={INPUT_CLASS} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="Phone" className={LABEL_CLASS}>
            {t({ ru: 'Телефон', uz: 'Telefon', eng: 'Phone' })}
          </label>
          <input type="text" id="Phone" name="Phone" maxLength={30} className={INPUT_CLASS} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="Description" className={LABEL_CLASS}>
            {t({ ru: 'Описание', uz: 'Tavsif', eng: 'Description' })}
          </label>
          <textarea id="Description" name="Description" rows={4} className={`resize-none ${INPUT_CLASS}`} />
        </div>

        <input type="text" style={{ display: "none" }} name="aG9uZXlwb3Q" defaultValue="" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <div className="mt-[30px] flex justify-center">
          <input
            type="submit"
            id="formsubmit"
            disabled={loading}
            className="formsubmit w-full cursor-pointer rounded-full border-0 bg-[#E88029] px-6 py-[15px] text-center align-middle font-['Inter'] text-[16px] font-normal leading-[24px] tracking-[-0.02em] text-white transition-colors duration-300 ease-out outline-none hover:bg-white hover:text-[#E88029] disabled:cursor-not-allowed disabled:opacity-70"
            value={loading ? t(loadingText) : t({ ru: 'Отправить', uz: 'Yuborish', eng: 'Send' })}
          />
        </div>
      </form>
    </div>
  );
};

export default ZohoLeadForm;