const xss = require('xss');
const sanitizeHtml = require('sanitize-html');

// Sanitiser les entrées utilisateur
const sanitizeInput = (data) => {
    if (typeof data === 'string') {
        return xss(data);
    }
    if (typeof data === 'object' && data !== null) {
        const result = {};
        for (const [key, value] of Object.entries(data)) {
            result[key] = sanitizeInput(value);
        }
        return result;
    }
    return data;
};

// Middleware de sanitisation pour toutes les requêtes
const sanitizeRequest = (req, res, next) => {
    if (req.body) {
        req.body = sanitizeInput(req.body);
    }
    if (req.query) {
        req.query = sanitizeInput(req.query);
    }
    if (req.params) {
        req.params = sanitizeInput(req.params);
    }
    next();
};

// Sanitisation HTML pour les messages
const sanitizeMessage = (message) => {
    return sanitizeHtml(message, {
        allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br'],
        allowedAttributes: {
            'b': ['style'],
            'i': ['style'],
            'em': ['style'],
            'strong': ['style'],
            'p': ['style']
        }
    });
};

module.exports = { sanitizeRequest, sanitizeMessage };
