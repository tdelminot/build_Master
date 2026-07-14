const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = null;
    this.initialize();
  }

  initialize() {
    // Configuration avec gestion des certificats
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
      },
      // Ignorer les problèmes de certificat en développement
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendContactConfirmation(data) {
    const { name, email, phone, message, architectName } = data;

    try {
      // Email de confirmation pour le client
      const clientMailOptions = {
        from: `"BuildMaster" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '✅ Confirmation de votre demande de contact - BuildMaster',
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1a365d; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .footer { text-align: center; padding: 20px; color: #666; font-size: 0.9rem; }
              .highlight { color: #c7a45b; font-weight: bold; }
              .button { display: inline-block; background: #c7a45b; color: white; padding: 10px 25px; text-decoration: none; border-radius: 5px; }
              .info-box { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #c7a45b; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🏗️ BuildMaster</h1>
                <p>Agence de Construction et Architecture</p>
              </div>
              <div class="content">
                <h2>Bonjour ${name} 👋</h2>
                <p>Nous avons bien reçu votre demande de contact pour <strong class="highlight">${architectName || 'un de nos architectes'}</strong>.</p>
                
                <div class="info-box">
                  <h3>📋 Récapitulatif de votre message</h3>
                  <p><strong>Nom :</strong> ${name}</p>
                  <p><strong>Email :</strong> ${email}</p>
                  ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
                  <p><strong>Message :</strong></p>
                  <p><em>${message}</em></p>
                </div>

                <p>✅ Un membre de notre équipe va prendre contact avec vous dans les plus brefs délais (sous 24-48h).</p>
                
                <p style="text-align: center; margin: 30px 0;">
                  <a href="https://buildmaster.mg" class="button">Visiter notre site</a>
                </p>

                <p>📞 Besoin d'une réponse rapide ? Contactez-nous directement au <strong>+261 34 12 345 67</strong></p>
              </div>
              <div class="footer">
                <p>© 2024 BuildMaster - Tous droits réservés</p>
                <p>Antananarivo, Madagascar</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      // Email de notification pour l'architecte/équipe
      const architectMailOptions = {
        from: `"BuildMaster" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `📩 Nouvelle demande de contact - ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <style>
              body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #1a365d; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
              .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
              .info-box { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #c7a45b; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📩 Nouvelle demande de contact</h1>
              </div>
              <div class="content">
                <h2>Nouveau message de ${name}</h2>
                
                <div class="info-box">
                  <h3>👤 Informations du client</h3>
                  <p><strong>Nom :</strong> ${name}</p>
                  <p><strong>Email :</strong> ${email}</p>
                  ${phone ? `<p><strong>Téléphone :</strong> ${phone}</p>` : ''}
                  <p><strong>Architecte concerné :</strong> ${architectName || 'Non spécifié'}</p>
                </div>

                <div class="info-box">
                  <h3>💬 Message</h3>
                  <p><em>${message}</em></p>
                </div>

                <p style="text-align: center; margin: 20px 0;">
                  <a href="mailto:${email}" style="background: #c7a45b; color: white; padding: 10px 25px; text-decoration: none; border-radius: 5px;">
                    📧 Répondre au client
                  </a>
                </p>
              </div>
              <div class="footer">
                <p>BuildMaster - Agence de Construction</p>
              </div>
            </div>
          </body>
          </html>
        `
      };

      // Envoyer les deux emails
      await this.transporter.sendMail(clientMailOptions);
      await this.transporter.sendMail(architectMailOptions);

      console.log(`✅ Email de confirmation envoyé à ${email}`);
      console.log(`✅ Email de notification envoyé à l'équipe BuildMaster`);

      return { 
        success: true, 
        message: 'Emails envoyés avec succès' 
      };

    } catch (error) {
      console.error('❌ Erreur envoi email:', error);
      
      // En cas d'erreur, renvoyer un message d'erreur
      return { 
        success: false, 
        error: error.message 
      };
    }
  }

  // Méthode pour envoyer un email de devis
  async sendQuoteRequest(data) {
    const { name, email, phone, projectType, budget, message } = data;

    try {
      const mailOptions = {
        from: `"BuildMaster" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: '📋 Demande de devis - BuildMaster',
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #1a365d; color: white; padding: 20px; text-align: center;">
              <h1>🏗️ BuildMaster</h1>
            </div>
            <div style="padding: 20px;">
              <h2>Demande de devis reçue ✅</h2>
              <p>Bonjour ${name},</p>
              <p>Nous avons bien reçu votre demande de devis pour votre projet de <strong>${projectType}</strong>.</p>
              <p>Nous allons étudier votre demande et vous faire un retour dans les plus brefs délais.</p>
              <p style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                <strong>Budget estimé :</strong> ${budget}€<br>
                <strong>Message :</strong> ${message}
              </p>
              <p>📞 Pour toute question : +261 34 12 345 67</p>
            </div>
          </div>
        `
      };

      await this.transporter.sendMail(mailOptions);
      return { success: true };

    } catch (error) {
      console.error('Erreur envoi devis:', error);
      throw new Error('Erreur lors de l\'envoi du devis');
    }
  }
}

module.exports = EmailService;
