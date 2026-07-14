const nodemailer = require('nodemailer');

class NodemailerService {
  constructor() {
    this.transporter = null;
    this.initialize();
  }

  initialize() {
    // Configuration pour l'envoi d'emails
    // Utiliser SendGrid, Mailgun ou un autre service
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  async sendContactEmail(data) {
    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: data.to || process.env.EMAIL_USER,
        subject: `Nouveau message de ${data.name}`,
        html: `
          <h3>Nouveau message de contact</h3>
          <p><strong>Nom:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.from}</p>
          <p><strong>Téléphone:</strong> ${data.phone || 'Non renseigné'}</p>
          <p><strong>Message:</strong></p>
          <p>${data.message}</p>
        `
      };

      await this.transporter.sendMail(mailOptions);
      return { success: true, message: 'Email envoyé avec succès' };
    } catch (error) {
      console.error('Erreur envoi email:', error);
      throw new Error('Erreur lors de l\'envoi de l\'email');
    }
  }
}

module.exports = NodemailerService;