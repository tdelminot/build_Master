const ContactArchitectUseCase = require('../../application/useCases/ContactArchitectUseCase');
const EmailService = require('../../application/services/EmailService');

class ContactController {
  constructor() {
    this.emailService = new EmailService();
    this.contactUseCase = new ContactArchitectUseCase(this.emailService);
  }

  async contactArchitect(req, res) {
    try {
      const { architectId, name, email, phone, message } = req.body;
      
      const result = await this.contactUseCase.execute({
        architectId,
        name,
        email,
        phone,
        message
      });

      res.json({ success: true, message: result.message });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  }
}

module.exports = ContactController;