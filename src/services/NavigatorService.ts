class NavigatorService {
  async copyToClipboard(text: string) {
    await navigator.clipboard.writeText(text);
  }

  async share(data: ShareData) {
    await navigator.share(data);
  }
}

const navigatorService = new NavigatorService();
export default navigatorService;
