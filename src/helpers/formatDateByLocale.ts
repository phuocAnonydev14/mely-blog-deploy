export default function formatDateByLocale(date: Date, localeId: Intl.LocalesArgument = 'en-US') {
  return date.toLocaleString(localeId, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
