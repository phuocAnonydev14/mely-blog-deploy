export default function formateDateTimeByLocale(date: Date, localeId: Intl.LocalesArgument = 'en-US') {
  return date.toLocaleString(localeId, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}
