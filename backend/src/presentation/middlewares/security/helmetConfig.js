const helmet = require('helmet');

// Configuration Helmet minimaliste (sans restrictions CORS)
const securityHeaders = helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
    dnsPrefetchControl: false,
    frameguard: false,
    hsts: false,
    ieNoOpen: false,
    noSniff: false,
    referrerPolicy: false,
    xssFilter: false
});

// Headers supplémentaires (permissifs)
const additionalHeaders = (req, res, next) => {
    // Autoriser toutes les origines pour les images
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
};

module.exports = { securityHeaders, additionalHeaders };