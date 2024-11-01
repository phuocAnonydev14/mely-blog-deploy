export async function urlToFile(url: string, filename: string, mimeType: string) {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
  const response = await fetch(proxyUrl + url);
  const buffer = await response.arrayBuffer();
  const blob = new Blob([buffer], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
}
