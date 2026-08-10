import React, { useEffect, useRef } from "react";

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
  "e5f76d507cd012720bed14eb494a3494904759a62892920e3297aadcbd7f7c41";
const ZOHO_XMIWTLD =
  "e4abec6bb62336ed4f5c4b280c39705efcbee82cf448bafff6db06dfac668f48a2892226edff566c51897f26319e16e1";
const ZOHO_ACTION_TYPE = "TGVhZHM=";

/* Zoho original: <script id='wf_anal' src='...'> — "Do not remove this" */
const ZOHO_ANALYTICS_ID = "wf_anal";
const ZOHO_ANALYTICS_SRC =
  "https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=c99497a5b8f139c13331bab7013da657eebce41aa450329c13ca4cea14dabb14edb6e7186ac13278f2510fd86401bc1egid2ef6c8b0b4d78bfd95b035e18475bed9e66b46053380aa8d6117699786c2bdd5gid827233aeb153a16d0dafecbb86a7efa23b5790a4ccf432ad2198ce22366a93b7gide92f3b320448f7ac77030996f1f8968c3a7479ec866f568377759e927558be38&tw=7729a16980ca0983d9c967630bf9d022aa65cf295ee46f2985dca79c1e29e253&version=v2";

const HIDDEN_IFRAME_NAME = "zoho_hidden_iframe";

/* DEBUG: production'da `false` qiling. */
const ZOHO_DEBUG = true;

const L = (stage: string, ...rest: unknown[]) => {
  if (ZOHO_DEBUG) console.log(`[Zoho][${stage}]`, ...rest);
};

/* Zoho original checkMandatory7525508000000615582() dagi ikki massiv.
 * DIQQAT: Zoho kodida tartib mos kelmaydi ('First Name' -> 'Фамилия').
 * Ataylab Zoho kodidagidek qoldirildi. */
const MND_FIELDS = ["First Name", "Last Name", "Mobile"] as const;
const FLD_LANG_VAL = ["Фамилия", "Имя", "Моб. телефон"] as const;

/* StrictMode'da effect 2 marta ishlaydi — modul darajasidagi guard. */
let analyticsInjected = false;

/* Tailwind — UI o'zgartirilmadi. */
const INPUT_CLASS =
  "w-full min-h-[44px] rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-[#1B1D20] outline-none transition-colors focus:border-[#E88029] placeholder:text-neutral-400";
const LABEL_CLASS = "text-sm font-medium text-[#1B1D20]";

export const ZohoLeadForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const postedRef = useRef(false);

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

  /* Zoho original:
   *   onSubmit='javascript:document.charset="UTF-8";
   *             return checkMandatory7525508000000615582()' */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    L("1-submit", "submit event boshlandi");

    const form = formRef.current;
    if (!form) {
      L("1-submit", "XATO: formRef bo'sh, bekor qilindi");
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
        alert(FLD_LANG_VAL[i] + " не может быть пустым.");
        fieldObj.focus();
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

    /* ---------- ETAP 6: submit tugmasini disable (Zoho aynan) ----------
     * React state ORQALI EMAS -> submit paytida re-render bo'lmaydi. */
    const submitBtn = form.querySelector<HTMLInputElement>(".formsubmit");
    if (submitBtn) {
      submitBtn.setAttribute("disabled", "true");
      L("6-disable", "formsubmit disabled qilindi");
    } else {
      L("6-disable", ".formsubmit topilmadi");
    }

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
            Имя<span className="ml-1 text-red-600">*</span>
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
            Фамилия<span className="ml-1 text-red-600">*</span>
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
            Компания
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
          <label htmlFor="Mobile" className={LABEL_CLASS}>
            Моб. телефон<span className="ml-1 text-red-600">*</span>
          </label>
          <input
            type="text"
            id="Mobile"
            name="Mobile"
            aria-required="true"
            aria-label="Mobile"
            maxLength={30}
            className={INPUT_CLASS}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="Address_-_City" className={LABEL_CLASS}>
            Адрес - город
          </label>
          <input
            type="text"
            id="Address_-_City"
            name="Address - City"
            aria-required="false"
            aria-label="Address - City"
            maxLength={255}
            className={INPUT_CLASS}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="Description" className={LABEL_CLASS}>
            Описание
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

        <div className="flex flex-wrap gap-3 items-center">
          <input
            type="submit"
            id="formsubmit"
            role="button"
            className="formsubmit zcwf_button min-h-[44px] cursor-pointer rounded-full bg-[#1B1D20] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#E88029] disabled:cursor-not-allowed disabled:opacity-60"
            value="Отправить"
            aria-label="Отправить"
            title="Отправить"
          />
          <input
            type="reset"
            role="button"
            name="reset"
            className="zcwf_button min-h-[44px] cursor-pointer rounded-full border border-neutral-300 bg-white px-8 py-3 text-sm font-medium text-[#1B1D20] transition-colors hover:border-[#E88029]"
            value="Сброс"
            aria-label="Сброс"
            title="Сброс"
          />
        </div>
      </form>
    </div>
  );
};

export default ZohoLeadForm;
