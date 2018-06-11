import { DateTime, Info } from 'luxon';

export const formatDay = (day, locale = 'en') =>
  DateTime.fromJSDate(day)
    .setLocale(locale)
    .toLocaleString(DateTime.DATE_HUGE);

export const formatMonthTitle = (date, locale = 'en') =>
  DateTime.fromJSDate(date)
    .setLocale(locale)
    .toLocaleString({ month: 'long', year: 'numeric' });

export const formatWeekdayShort = (dayOfWeekNumber, locale = 'en') =>
  Info.weekdays('short', { locale })[dayOfWeekNumber];

export const formatWeekdayLong = (dayOfWeekNumber, locale = 'en') => Info.weekdays('long', { locale })[dayOfWeekNumber];

export const getFirstDayOfWeek = (locale = 'en') => 0;

export const getMonths = (locale = 'en') => Info.months('long', { locale });

export const formatDate = (date, format = 'L', locale = 'en') =>
  DateTime.fromJSDate(date)
    .setLocale(locale)
    .toFormat(format);

export const parseDate = (string, format = 'L', locale = 'en') =>
  DateTime.fromFormat(string, format, { locale }).toJSDate();

export default {
  getFirstDayOfWeek,
  formatDate,
  formatDay,
  formatMonthTitle,
  formatWeekdayShort,
  formatWeekdayLong,
  getMonths,
  parseDate,
};
