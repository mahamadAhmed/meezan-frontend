
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import HijriDate from "hijri-date";
import { HIJRI_MONTHS } from "./constants";

export const formatGregorianDate = (date: Date): string => {
  return format(date, "EEEE، d MMMM yyyy", { locale: ar });
};

export const formatHijriDate = (): string => {
  const hijri = new HijriDate();
  return `${hijri.getDate()} ${HIJRI_MONTHS[hijri.getMonth()]} ${hijri.getFullYear()} هـ`;
};
