export default function formatNumberWithLeadingSign(number: number, localeId: string = 'en-US') {
  return Intl.NumberFormat(localeId, {
    signDisplay: 'exceptZero',
  }).format(number);
}
