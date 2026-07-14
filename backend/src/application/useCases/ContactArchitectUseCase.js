class ContactArchitectUseCase {
  constructor(emailService) {
    this.emailService = emailService;
  }

  async execute(contactData) {
    const { architectId, name, email, phone, message } = contactData;

    if (!name || !email || !message) {
      throw new Error('Nom, email et message sont requis');
    }

    // Envoyer l'email via le service
    const result = await this.emailService.sendContactEmail({
      to: architectId, // L'email de l'architecte sera récupéré
      from: email,
      name,
      phone,
      message
    });

    return result;
  }
}

module.exports = ContactArchitectUseCase;