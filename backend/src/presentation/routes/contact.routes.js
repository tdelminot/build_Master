const express = require('express');
const router = express.Router();
const EmailService = require('../../application/services/EmailService');
const { validateContact } = require('../middlewares/security/validators');
const { sanitizeMessage } = require('../middlewares/security/sanitizer');

const emailService = new EmailService();

// POST /api/contact/architect - Contacter un architecte
router.post('/architect', validateContact, async (req, res) => {
    try {
        const { name, email, phone, message, architectId } = req.body;

        console.log('📩 Nouveau message de contact:', { name, email, architectId });

        // Sanitisation du message
        const sanitizedMessage = sanitizeMessage(message);

        // Trouver le nom de l'architecte
        let architectName = 'BuildMaster';
        if (architectId) {
            const architectNames = {
                'a1': 'Rakoto Andrianina',
                'a2': 'Ranaivoarimanana Marie',
                'a3': 'Raharimanana Heriniaina'
            };
            architectName = architectNames[architectId] || 'BuildMaster';
        }

        // Envoyer l'email
        const result = await emailService.sendContactConfirmation({
            name,
            email,
            phone,
            message: sanitizedMessage,
            architectName
        });

        if (result.success) {
            res.json({
                success: true,
                message: 'Message envoyé avec succès ! Un email de confirmation vous a été envoyé.',
                data: {
                    sentAt: new Date().toISOString(),
                    recipient: email
                }
            });
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Erreur envoi email:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur lors de l\'envoi du message. Veuillez réessayer.'
        });
    }
});

// POST /api/contact/quote - Demander un devis gratuit
router.post('/quote', async (req, res) => {
    try {
        const { name, email, phone, projectType, budget, message } = req.body;

        console.log('📋 Nouvelle demande de devis:', { name, email, projectType });

        const result = await emailService.sendQuoteRequest({
            name,
            email,
            phone,
            projectType,
            budget,
            message
        });

        if (result.success) {
            res.json({
                success: true,
                message: 'Demande de devis envoyée avec succès !'
            });
        } else {
            throw new Error(result.error);
        }
    } catch (error) {
        console.error('❌ Erreur demande devis:', error);
        res.status(500).json({
            success: false,
            error: 'Erreur lors de la demande de devis'
        });
    }
});

module.exports = router;