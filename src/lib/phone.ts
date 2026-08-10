/** Strip to digits only, optionally dropping a leading US country code `1`. */
export function digitsOnlyPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("1")) {
    return digits.slice(1);
  }
  return digits.slice(0, 10);
}

/**
 * Progressive US phone mask: `(XXX) XXX-XXXX`.
 * Accepts raw or partially formatted input; caps at 10 digits.
 */
export function formatPhoneUS(value: string): string {
  const digits = digitsOnlyPhone(value);
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/** Fully formatted `(XXX) XXX-XXXX`, or empty if fewer than 10 digits. */
export function toFormattedPhoneUS(value: string): string {
  const digits = digitsOnlyPhone(value);
  if (digits.length === 0) return "";
  if (digits.length !== 10) return formatPhoneUS(digits);
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}
