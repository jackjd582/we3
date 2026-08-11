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
  }
};