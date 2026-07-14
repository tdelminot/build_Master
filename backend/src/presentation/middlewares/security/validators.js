const { body, validationResult, matchedData } = require('express-validator');

// Validation du formulaire de contact
const validateContact = [
    body('name')
        .trim()
        .notEmpty().withMessage('Le nom est requis')
        .isLength({ min: 2, max: 100 }).withMessage('Le nom doit contenir entre 2 et 100 caractères')
        .matches(/^[a-zA-ZÀ-ÿ\s\-']+$/).withMessage('Le nom contient des caractères invalides')
        .escape(),
    
    body('email')
        .trim()
        .notEmpty().withMessage('L\'email est requis')
        .isEmail().withMessage('Email invalide')
        .normalizeEmail()
        .isLength({ max: 100 }).withMessage('Email trop long'),
    
    body('phone')
        .optional()
        .trim()
        .isLength({ max: 20 }).withMessage('Téléphone trop long')
        .matches(/^[0-9+\s\-()]+$/).withMessage('Téléphone invalide'),
    
    body('message')
        .trim()
        .notEmpty().withMessage('Le message est requis')
        .isLength({ min: 10, max: 1000 }).withMessage('Le message doit contenir entre 10 et 1000 caractères')
        .escape(),
    
    body('architectId')
        .optional()
        .trim()
        .isLength({ max: 36 }),
    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            });
        }
        next();
    }
];

// Validation de la demande de devis
const validateQuote = [
    body('name')
        .trim()
        .notEmpty().withMessage('Le nom est requis')
        .isLength({ min: 2, max: 100 }).withMessage('Nom invalide')
        .escape(),
    
    body('email')
        .trim()
        .notEmpty().withMessage('L\'email est requis')
        .isEmail().withMessage('Email invalide')
        .normalizeEmail(),
    
    body('phone')
        .optional()
        .trim()
        .matches(/^[0-9+\s\-()]+$/).withMessage('Téléphone invalide'),
    
    body('projectType')
        .trim()
        .notEmpty().withMessage('Le type de projet est requis')
        .isIn(['résidentiel', 'hôtelier', 'commercial', 'rénovation', 'infrastructure', 'intérieur'])
        .withMessage('Type de projet invalide'),
    
    body('budget')
        .optional()
        .isNumeric().withMessage('Le budget doit être un nombre')
        .isFloat({ min: 0 }).withMessage('Budget invalide'),
    
    body('message')
        .trim()
        .notEmpty().withMessage('Le message est requis')
        .isLength({ min: 10, max: 1000 })
        .escape()
];

// Validation de l'ID (pour les requêtes paramétrées)
const validateId = [
    body('id')
        .notEmpty().withMessage('ID requis')
        .isUUID().withMessage('ID invalide')
];

module.exports = { validateContact, validateQuote, validateId };
