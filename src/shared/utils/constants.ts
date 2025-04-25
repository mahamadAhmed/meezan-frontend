
import { FiFileText, FiUser, FiCalendar, FiClipboard, FiDollarSign } from "react-icons/fi";

export const dashboardStats = [
  {
    label: "إجمالي القضايا",
    value: 287,
    color: "blue",
    icon: FiFileText,
    route: "/cases"
  },
  {
    label: "العملاء النشطين",
    value: 176,
    color: "green",
    icon: FiUser,
    route: "/customers"
  },
  {
    label: "الجلسات القادمة",
    value: 23,
    color: "purple",
    icon: FiCalendar,
    route: "/sessions"
  },
  {
    label: "المهام المستحقة",
    value: 15,
    color: "amber",
    icon: FiClipboard,
    route: "/tasks"
  }
];

export const NOTIFICATION_TYPES = {
  CASE: 'case',
  TASK: 'task',
  SESSION: 'session',
  SYSTEM: 'system'
};

export const MONTHS_AR = [
  "يناير", "فبراير", "مارس", "إبريل", 
  "مايو", "يونيو", "يوليو", "أغسطس", 
  "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
];

export const HIJRI_MONTHS = [
  "محرم", "صفر", "ربيع الأول", "ربيع الثاني", 
  "جمادى الأولى", "جمادى الثانية", "رجب", "شعبان", 
  "رمضان", "شوال", "ذو القعدة", "ذو الحجة"
];
