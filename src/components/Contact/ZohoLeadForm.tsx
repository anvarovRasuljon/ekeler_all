import React, { useEffect, useState } from "react";

const ZOHO_ANALYTICS_SCRIPT_ID = "zoho-wf-analytics-7525508000000615582";

// TODO: original HTML'dagi <script src="..."> manzilini shu yerga qo'ying.
const ZOHO_ANALYTICS_SCRIPT_URL =
  "https://crm.zohopublic.com/crm/WebFormAnalyticsServeServlet?rid=a1b0e8c6930eba05ed5eb254238f62761873926b935a4235551149f17a725608a5a498bbf216b33634a6cd9342fb0de4&gid=f37aaa401e6470e07a349a085924165d98f8fc5a428e2526ad1401408219fb40";

interface FormValues {
  "Last Name": string;
  "First Name": string;
  Company: string;
  Mobile: string;
  "Address - City": string;
  Description: string;
}

const INITIAL_VALUES: FormValues = {
  "Last Name": "",
  "First Name": "",
  Company: "",
  Mobile: "",
  "Address - City": "",
  Description: "",
};

const MANDATORY_FIELDS: (keyof FormValues)[] = [
  "First Name",
  "Last Name",
  "Mobile",
];

export const ZohoLeadForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById(ZOHO_ANALYTICS_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = ZOHO_ANALYTICS_SCRIPT_ID;
    script.src = ZOHO_ANALYTICS_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      const existing = document.getElementById(ZOHO_ANALYTICS_SCRIPT_ID);
      if (existing) document.body.removeChild(existing);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value } as FormValues));
    setErrors((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);
    const params = new URLSearchParams();

    console.log("=== FORM DATA ===");
    for (const [key, value] of (data as any).entries()) {
      const str = typeof value === "string" ? value : value.toString();
      console.log(key, "=", str);
      params.append(key, str);
    }

    fetch(form.action, {
      method: "POST",
      body: params,
      mode: "no-cors",
    })
      .then((res) => {
        console.log("Status:", res.status);
        console.log("Type:", res.type);
        console.log("So'rov yuborildi. Natijani Network tab va Zoho CRM'da tekshiring.");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const inputClassName =
    "w-full min-h-[44px] rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm text-[#1B1D20] outline-none focus:border-[#E88029] placeholder:text-neutral-400";
  const labelClassName = "text-sm font-medium text-[#1B1D20]";

  return (
    <form
      id="webform7525508000000615582"
      name="WebToLeads7525508000000615582"
      action="https://crm.zoho.com/crm/WebToLeadForm"
      method="POST"
      acceptCharset="UTF-8"
      encType="application/x-www-form-urlencoded"
      target="_blank"
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-xl"
    >
      <input type="hidden" name="xnQsjsdp" defaultValue="f37aaa401e6470e07a349a085924165d98f8fc5a428e2526ad1401408219fb40" />
      <input type="hidden" name="zc_gad" defaultValue="" />
      <input type="hidden" name="xmIwtLD" defaultValue="a1b0e8c6930eba05ed5eb254238f62761873926b935a4235551149f17a725608a5a498bbf216b33634a6cd9342fb0de4" />
      <input type="hidden" name="actionType" defaultValue="TGVhZHM=" />
      <input type="hidden" name="returnURL" defaultValue="null" />
      <input type="hidden" name="aG9uZXlwb3Q" defaultValue="" />

      {[
        { key: "Last Name", label: "Фамилия" },
        { key: "First Name", label: "Имя" },
        { key: "Company", label: "Компания" },
        { key: "Mobile", label: "Моб. телефон", type: "tel" },
        { key: "Address - City", label: "Адрес - город" },
      ].map(({ key, label, type = "text" }) => (
        <div key={key} className="flex flex-col gap-2">
          <label htmlFor={`zoho-${key}`} className={labelClassName}>
            {label}
            {MANDATORY_FIELDS.includes(key as keyof FormValues) && (
              <span className="ml-1 text-red-600">*</span>
            )}
          </label>
          <input
            id={`zoho-${key}`}
            type={type}
            name={key}
            value={values[key as keyof FormValues]}
            onChange={handleChange}
            className={inputClassName}
          />
          {errors[key] && (
            <p className="text-sm text-red-600">{errors[key]}</p>
          )}
        </div>
      ))}

      <div className="flex flex-col gap-2">
        <label htmlFor="zoho-Description" className={labelClassName}>
          Описание
        </label> 
        <textarea
          id="zoho-Description"
          name="Description"
          value={values.Description}
          onChange={handleChange}
          rows={4}
          className={`resize-none ${inputClassName}`}
        />
      </div>

      <button
        type="submit"
        id="formsubmit"
        className="min-h-[44px] w-full rounded-full bg-[#1B1D20] px-8 py-3 text-sm font-medium text-white hover:bg-[#E88029] sm:w-fit"
      >
        Отправить
      </button>
    </form>
  );
};

export default ZohoLeadForm;
