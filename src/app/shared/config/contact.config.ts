export const CONTACT = {
  whatsappNumbers: [
    '918128641593',
    '917016716025',
    '919662999559',
    '918200336226'
  ],

  whatsapp: '918128641593',

  email: 'we3enterprises03@gmail.com',

  getWhatsAppNumbers(): string[] {
    const numbers = this.whatsappNumbers?.filter((number: string) => Boolean(number)) || [];
    return numbers.length > 0 ? numbers : this.whatsapp ? [this.whatsapp] : [];
  },

  getWhatsAppUrl(number: string, message: string): string {
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  },

  openWhatsApp(message: string, targetWindow: Window = window): void {
    const numbers = this.getWhatsAppNumbers();

    if (!numbers.length) {
      return;
    }

    const urls = numbers.map((number) => this.getWhatsAppUrl(number, message));

    targetWindow.location.href = urls[0];

    urls.slice(1).forEach((url, index) => {
      window.setTimeout(() => {
        const popup = targetWindow.open(url, '_blank', 'noopener,noreferrer');
        if (!popup) {
          targetWindow.location.href = url;
        }
      }, (index + 1) * 400);
    });
  }
};