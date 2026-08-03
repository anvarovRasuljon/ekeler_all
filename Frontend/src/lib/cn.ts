// Responsive refactor: shartli className'larni toza boshqarish uchun kichik cn() yordamchisi.
// clsx o'rniga qo'shimcha bog'liqliksiz ishlaydi.
export type ClassValue =
  | string
  | number
  | null
  | undefined
  | false
  | ClassValue[]
  | Record<string, boolean | null | undefined>;

export function cn(...inputs: ClassValue[]): string {
  const out: string[] = [];

  const walk = (value: ClassValue): void => {
    if (!value) return;

    if (typeof value === "string" || typeof value === "number") {
      out.push(String(value));
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }

    Object.entries(value).forEach(([key, enabled]) => {
      if (enabled) out.push(key);
    });
  };

  inputs.forEach(walk);

  return out.join(" ");
}

export default cn;
