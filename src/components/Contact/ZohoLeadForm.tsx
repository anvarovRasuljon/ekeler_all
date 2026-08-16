import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";

/* ==================================================================
 * Zoho CRM Web-to-Lead — Zoho generated HTML'ning 1:1 JSX ko'chirmasi.
 *
 * Manba: Zoho CRM -> Webforms -> "Website from" -> Source Code
 *
 * QOIDA:
 *   - React state YO'Q (uncontrolled: value={} / onChange yo'q)
 *   - fetch / axios / JSON YO'Q -> native browser POST
 *   - submit paytida re-render BO'LMAYDI
 *   - hidden fieldlar, name qiymatlari, actionType o'zgartirilmaydi
 *   - forma POST'dan oldin reset QILINMAYDI
 * ================================================================== */

const ZOHO_FORM_ACTION = "https://crm.zoho.com/crm/WebToLeadForm";
const ZOHO_FORM_ID = "webform7525508000000615582";
const ZOHO_FORM_NAME = "WebToLeads7525508000000615582";
const ZOHO_WF_ID = 7525508000000615582;

const ZOHO_XNQSJSDP =
  "0150acda6c327b749714cfeb9f1c78adec33c8b3496f636d6e6550ee0a37ee6e";
const ZOHO_XMIWTLD =
  "8989c1eac67f637726ca120f25250c27ff684a6d5d8c4f93bf091711dcd843239c4ff937fffa8d8c6b0d1fd2d0bba8dc";
const ZOHO_ACTION_TYPE = "TGVhZHM=";

/* Zoho original: <script id='wf_anal' src='...'> — "Do not remove this" */
const ZOHO_ANALYTICS_ID = "wf_anal";
const ZOHO_ANALYTICS_SRC =
  "https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=2e63e3edaaed15da7bae658bc570d92df51c987cbb6ea65e4c0a53e3c09aaa869b3bac55d68c38ad82ed97940c73ef7dgidbfe15d86b20534031204427e55107afdf4e5f27e1346ac11f6c67251f77b1410gidd6e5a73911d9a7e17572a01667c8c01ede87899bc2a3774baf9b8bc8d460a6c2gid02584ff5a4e6dc2eb23a5bf05e783a6b99bae64bf1a5768c170283863b7b797a&tw=16b832df8bf702ed04a76c6083d23b78dc695fa8eed070de00372429ee866d88";

const HIDDEN_IFRAME_NAME = "zoho_hidden_iframe";

/* DEBUG: production'da `false` qiling. */
const ZOHO_DEBUG = true;

const L = (stage: string, ...rest: unknown[]) => {
  if (ZOHO_DEBUG) console.log(`[Zoho][${stage}]`, ...rest);
};

/* Zoho original checkMandatory7525508000000615582() dagi ikki massiv.
 * DIQQAT: Zoho kodida tartib mos kelmaydi ('First Name' -> 'Фамилия').
 * Ataylab Zoho kodidagidek qoldirildi. */
const MND_FIELDS = ["First Name", "Last Name"] as const;
const FLD_LANG_VAL = [
  { ru: "Фамилия", uz: "Familiya", eng: "Last name" },
  { ru: "Имя", uz: "Ism", eng: "First name" },
] as const;

/* StrictMode'da effect 2 marta ishlaydi — modul darajasidagi guard. */
let analyticsInjected = false;

/* Tailwind — UI o'zgartirilmadi. */
const INPUT_CLASS =
  "w-full min-h-[44px] rounded-[8px] border border-[#ECECEC] bg-white px-4 py-3 font-['Inter'] text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20] align-middle outline-none transition-colors focus:border-[#E88029] placeholder:text-[#ECECEC]";
const LABEL_CLASS = "font-['Inter'] text-[14px] font-normal leading-[22px] tracking-[-0.02em] text-[#1B1D20] align-middle";

export const ZohoLeadForm: React.FC = () => {
  const { t, language } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const postedRef = useRef(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const successMessage = { ru: 'Спасибо! Ваше сообщение отправлено.', uz: 'Rahmat! Xabaringiz yuborildi.', eng: 'Thank you! Your message has been sent.' };
  const loadingText = { ru: 'Отправка...', uz: 'Yuborilmoqda...', eng: 'Sending...' };

  /* ---------- ETAP 0: mount + analytics ---------- */
  useEffect(() => {
    L("0-mount", "component mount qilindi");

    if (analyticsInjected || document.getElementById(ZOHO_ANALYTICS_ID)) {
      L("0-analytics", "allaqachon yuklangan, skip (StrictMode guard)");
      return;
    }
    analyticsInjected = true;

    /* Zoho original script'idagi global flaglar */
    const w = window as unknown as Record<string, unknown>;
    w._wFa_ajax_will_be_replaced = false;
    if (typeof w._wfa_fstprtcken === "undefined") w._wfa_fstprtcken = {};
    (w._wfa_fstprtcken as Record<number, boolean>)[ZOHO_WF_ID] = true;
    L("0-analytics", "_wfa_fstprtcken tayyor", w._wfa_fstprtcken);

    /* Original'da bu script <form> ichida turadi — shu joyga qo'yamiz. */
    const script = document.createElement("script");
    script.id = ZOHO_ANALYTICS_ID;
    script.src = ZOHO_ANALYTICS_SRC;
    script.onload = () => L("0-analytics", "script YUKLANDI (onload)");
    script.onerror = () => L("0-analytics", "script XATO (onerror) — bloklangan?");
    (formRef.current ?? document.body).appendChild(script);
    L("0-analytics", "script DOM'ga qo'shildi", ZOHO_ANALYTICS_SRC.slice(0, 80) + "...");
  }, []);

  /* Muvaffaqiyat xabari 4 soniyadan keyin yo'qoladi. */
  useEffect(() => {
    if (!submitted) return;
    const id = setTimeout(() => setSubmitted(false), 4000);
    return () => clearTimeout(id);
  }, [submitted]);

  /* Zoho original:
   *   onSubmit='javascript:document.charset="UTF-8";
   *             return checkMandatory7525508000000615582()' */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    L("1-submit", "submit event boshlandi");
    setLoading(true);

    const form = formRef.current;
    if (!form) {
      L("1-submit", "XATO: formRef bo'sh, bekor qilindi");
      setLoading(false);
      e.preventDefault();
      return;
    }

    /* ---------- ETAP 2: charset ---------- */
    try {
      (document as unknown as { charset: string }).charset = "UTF-8";
      L("2-charset", "document.charset = UTF-8 o'rnatildi");
    } catch {
      L("2-charset", "o'rnatilmadi (read-only) — muhim emas");
    }

    /* ---------- ETAP 3: checkMandatory (Zoho aynan) ---------- */
    L("3-validate", "mandatory tekshiruv boshlandi", MND_FIELDS);
    for (let i = 0; i < MND_FIELDS.length; i++) {
      const fieldObj = form.elements.namedItem(MND_FIELDS[i]) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;

      if (!fieldObj) {
        L("3-validate", `"${MND_FIELDS[i]}" TOPILMADI (name mos emas!)`);
        continue;
      }

      const trimmed = fieldObj.value.replace(/^\s+|\s+$/g, "");
      L("3-validate", `"${MND_FIELDS[i]}" =`, JSON.stringify(fieldObj.value), `len=${trimmed.length}`);

      if (trimmed.length === 0) {
        L("3-validate", `BO'SH -> POST bekor qilinadi. alert: ${FLD_LANG_VAL[i]}`);
        alert(t(FLD_LANG_VAL[i]) + t({ ru: ' не может быть пустым.', uz: ' bo‘sh bo‘lishi mumkin emas.', eng: ' cannot be empty.' }));
        fieldObj.focus();
        setLoading(false);
        e.preventDefault();
        return;
      }
    }
    L("3-validate", "hammasi OK");

    /* ---------- ETAP 4: ?service=smarturl (Zoho aynan) ---------- */
    const urlparams = new URLSearchParams(window.location.search);
    if (urlparams.has("service") && urlparams.get("service") === "smarturl") {
      const service = urlparams.get("service") as string;
      if (form.elements.namedItem("service")) {
        L("4-smarturl", "hidden input allaqachon bor, skip");
      } else {
        const smarturlfield = document.createElement("input");
        smarturlfield.setAttribute("type", "hidden");
        smarturlfield.setAttribute("value", service);
        smarturlfield.setAttribute("name", "service");
        form.appendChild(smarturlfield);
        L("4-smarturl", "hidden input qo'shildi:", service);
      }
    } else {
      L("4-smarturl", "?service=smarturl yo'q, skip");
    }

    /* ---------- ETAP 5: haqiqiy POST payload ---------- */
    const fd = new FormData(form);
    const payload = [...fd.entries()].map(([key, value]) => ({ key, value }));
    L("5-payload", "POST payload:", payload);
    if (ZOHO_DEBUG) console.table(payload);
    L("5-payload", "form attrs:", {
      action: form.action,
      method: form.method,
      name: form.getAttribute("name"),
      target: form.getAttribute("target"),
      acceptCharset: form.getAttribute("accept-charset"),
      enctype: form.enctype,
    });
    L("5-payload", "page origin:", window.location.origin, "| href:", window.location.href);

    /* ---------- ETAP 5.5: Telegram botga xabar yuborish ---------- */
    const telegramPayload = {
      firstName: String(fd.get("First Name") || ""),
      lastName: String(fd.get("Last Name") || ""),
      company: String(fd.get("Company") || ""),
      phone: String(fd.get("Phone") || ""),
      description: String(fd.get("Description") || ""),
      language,
    };
    L("5-telegram", "Telegram payload:", telegramPayload);
    void fetch("/api/telegram", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(telegramPayload),
      keepalive: true,
    }).catch((err) => {
      L("5-telegram", "Telegram xabari yuborishda xato:", err);
    });

    /* ---------- ETAP 7: native POST ---------- */
    postedRef.current = true;
    L("7-post", `e.preventDefault() CHAQIRILMADI -> brauzer native POST qiladi -> target="${HIDDEN_IFRAME_NAME}"`);
    L("7-post", "forma RESET QILINMAYDI");
  };

  /* ---------- ETAP 8: Zoho javobi ---------- */
  const handleIframeLoad = () => {
    if (!postedRef.current) {
      L("8-iframe", "dastlabki about:blank load (POST emas)");
      return;
    }
    postedRef.current = false;
    L("8-iframe", "Zoho JAVOB QAYTARDI (iframe load)");
    L(
      "8-iframe",
      "Javob mazmuni cross-origin, o'qib bo'lmaydi. Ko'rish uchun iframe style'ini ochiq qiling (kodda izoh bor)."
    );
    setLoading(false);
    setSubmitted(true);
    formRef.current?.reset();
  };

  return (
    <div
      id="crmWebToEntityForm"
      className="zcwf_lblLeft crmWebToEntityForm w-full max-w-[600px]"
    >
      {/* Native POST shu iframe'ga boradi -> sahifa reload bo'lmaydi.
          DEBUG: Zoho javobini KO'RISH uchun style'ni shunga o'zgartiring:
          style={{ position: "static", width: "100%", height: 400, border: "1px solid red" }} */}
      <iframe
        name={HIDDEN_IFRAME_NAME}
        title="Zoho form response"
        onLoad={handleIframeLoad}
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          border: 0,
          left: "-9999px",
        }}
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
        {/* ===== Zoho hidden / system fieldlari — AYNAN, TEGILMAYDI ===== */}
        <input
          type="text"
          style={{ display: "none" }}
          name="xnQsjsdp"
          defaultValue={ZOHO_XNQSJSDP}
        />
        <input type="hidden" name="zc_gad" id="zc_gad" defaultValue="" />
        <input
          type="text"
          style={{ display: "none" }}
          name="xmIwtLD"
          defaultValue={ZOHO_XMIWTLD}
        />
        <input
          type="text"
          style={{ display: "none" }}
          name="actionType"
          defaultValue={ZOHO_ACTION_TYPE}
        />
        <input
          type="text"
          style={{ display: "none" }}
          name="returnURL"
          defaultValue="null"
        />

        {/* ===== Ko'rinadigan maydonlar =====
            Zoho original mapping (ATAYLAB shunday):
              id=Last_Name  / name="Last Name"  -> label "Имя"
              id=First_Name / name="First Name" -> label "Фамилия" */}
        <div className="flex flex-col gap-2">
          <label htmlFor="Last_Name" className={LABEL_CLASS}>
            {t({ ru: 'Имя', uz: 'Ism', eng: 'First name' })}<span className="ml-1 text-red-600">*</span>
          </label>
          <input
            type="text"
            id="Last_Name"
            name="Last Name"
            aria-required="true"
            aria-label="Last Name"
            maxLength={80}
            className={INPUT_CLASS}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="First_Name" className={LABEL_CLASS}>
            {t({ ru: 'Фамилия', uz: 'Familiya', eng: 'Last name' })}<span className="ml-1 text-red-600">*</span>
          </label>
          <input
            type="text"
            id="First_Name"
            name="First Name"
            aria-required="true"
            aria-label="First Name"
            maxLength={40}
            className={INPUT_CLASS}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="Company" className={LABEL_CLASS}>
            {t({ ru: 'Компания', uz: 'Kompaniya', eng: 'Company' })}
          </label>
          <input
            type="text"
            id="Company"
            name="Company"
            aria-required="false"
            aria-label="Company"
            maxLength={200}
            className={INPUT_CLASS}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="Phone" className={LABEL_CLASS}>
            {t({ ru: 'Телефон', uz: 'Telefon', eng: 'Phone' })}
          </label>
          <input
            type="text"
            id="Phone"
            name="Phone"
            aria-required="false"
            aria-label="Phone"
            maxLength={30}
            className={INPUT_CLASS}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="Description" className={LABEL_CLASS}>
            {t({ ru: 'Описание', uz: 'Tavsif', eng: 'Description' })}
          </label>
          <textarea
            id="Description"
            name="Description"
            aria-multiline="true"
            aria-required="false"
            aria-label="Description"
            rows={4}
            className={`resize-none ${INPUT_CLASS}`}
          />
        </div>

        {/* Zoho honeypot — original: type="text" + display:none, bo'sh qolishi shart */}
        <input
          type="text"
          style={{ display: "none" }}
          name="aG9uZXlwb3Q"
          defaultValue=""
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="mt-[30px] flex justify-center">
          <input
            type="submit"
            id="formsubmit"
            role="button"
            disabled={loading}
            className="formsubmit w-full cursor-pointer rounded-full border-0 bg-[#E88029] px-6 py-[15px] text-center align-middle font-['Inter'] text-[16px] font-normal leading-[24px] tracking-[-0.02em] text-white transition-colors duration-300 ease-out outline-none hover:bg-white hover:text-[#E88029] disabled:cursor-not-allowed disabled:opacity-70"
            value={loading ? t(loadingText) : t({ ru: 'Отправить', uz: 'Yuborish', eng: 'Send' })}
            aria-label={loading ? t(loadingText) : t({ ru: 'Отправить', uz: 'Yuborish', eng: 'Send' })}
            title={loading ? t(loadingText) : t({ ru: 'Отправить', uz: 'Yuborish', eng: 'Send' })}
          />
        </div>
      </form>
    </div>
  );
};

export default ZohoLeadForm;
