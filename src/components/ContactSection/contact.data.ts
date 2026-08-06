export interface ContactItem {
  id: number;
  title: string;
  value: string;
  icon: "phone" | "mail";
  href: string;
}

export const CONTACT_ITEMS: ContactItem[] = [
  {
    id: 1,
    title: "Telefon raqami",
    value: "+998 77 777-77-77",
    icon: "phone",
    href: "tel:+998777777777",
  },
  {
    id: 2,
    title: "Elektron pochta",
    value: "info@ekeler.uz",
    icon: "mail",
    href: "mailto:info@ekeler.uz",
  },
];
