const rateLimit = require('express-rate-limit');

// Limiteur général pour toutes les routes
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requêtes par fenêtre
    message: {
        success: false,
        error: 'Trop de requêtes, veuillez réessayer plus tard.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Utiliser l'IP directement sans keyGenerator personnalisé
});

// Limiteur strict pour le formulaire de contact (prévention spam)
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 heure
    max: 5, // 5 requêtes par heure
    message: {
        success: false,
        error: 'Trop de tentatives de contact. Veuillez réessayer dans 1 heure.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Ne pas utiliser keyGenerator personnalisé pour éviter l'erreur IPv6
    // L'IP est automatiquement gérée par express-rate-limit
});

// Limiteur pour le devis
const quoteLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 heures
    max: 3, // 3 demandes par jour
    message: {
        success: false,
        error: 'Trop de demandes de devis. Veuillez réessayer demain.'
    },
    standardHeaders: true,
    legacyHeaders: false,
});