export interface ContactItem {
  id: number;
  title: any;
  value: string;
  icon: "phone" | "mail";
  href: string;
}

export const CONTACT_ITEMS: ContactItem[] = [
  {
    id: 1,
    title: { uz: "Telefon raqami", ru: "Номер телефона", eng: "Phone number" },
    value: "+998 90 808-87-89",
    icon: "phone",
    href: "tel:+998908088789",
  },
  {
    id: 2,
    title: { uz: "Elektron pochta", ru: "Электронная почта", eng: "Email" },
    value: "info@ekeler.uz",
    icon: "mail",
    href: "mailto:info@ekeler.uz",
  },
];
