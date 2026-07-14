const csurf = require('csurf');

// Configuration CSRF
const csrfProtection = csurf({
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    },
    ignoreMethods: ['GET', 'HEAD', 'OPTIONS']
});

// Middleware pour ajouter le token CSRF aux vues
const csrfToken = (req, res, next) => {
    if (req.csrfToken) {
        res.locals.csrfToken = req.csrfToken();
    }
    next();
};

// Gestion des erreurs CSRF
const csrfErrorHandler = (err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') {
        return next(err);
    }
    res.status(403).json({
        success: false,
        error: 'Token CSRF invalide. Veuillez recharger la page.'
    });
};

module.exports = { csrfProtection, csrfToken, csrfErrorHandler };
