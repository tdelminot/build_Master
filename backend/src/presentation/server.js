require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const dbConnection = require('../infrastructure/database/mysqlConnection');
const ServiceRepository = require('../infrastructure/database/repositories/ServiceRepository');
const ArchitectRepository = require('../infrastructure/database/repositories/ArchitectRepository');
const ProjectRepository = require('../infrastructure/database/repositories/ProjectRepository');
const TestimonialRepository = require('../infrastructure/database/repositories/TestimonialRepository');

const ServiceController = require('./controllers/ServiceController');
const ArchitectController = require('./controllers/ArchitectController');
const ProjectController = require('./controllers/ProjectController');
const ContactController = require('./controllers/ContactController');

const serviceRoutes = require('./routes/service.routes');
const architectRoutes = require('./routes/architect.routes');
const projectRoutes = require('./routes/project.routes');
const contactRoutes = require('./routes/contact.routes');

const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// CORS CONFIGURATION (Avec support des images)
// ============================================
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'https://buildmaster.netlify.app'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-CSRF-Token']
}));

// ============================================
// MIDDLEWARE POUR LES IMAGES (CORP)
// ============================================
const allowCrossOriginImages = (req, res, next) => {
    // Permettre le cross-origin pour les images
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    res.setHeader('Cross-Origin-Opener-Policy', 'unsafe-none');
    next();
};

// Appliquer le middleware aux fichiers statiques
app.use('/uploads', allowCrossOriginImages, express.static(path.join(__dirname, '../../uploads'), {
    setHeaders: (res, filePath) => {
        // Forcer les bons headers pour les images
        const ext = path.extname(filePath).toLowerCase();
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'].includes(ext)) {
            res.setHeader('Content-Type', `image/${ext.slice(1)}`);
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
        }
    }
}));

// ============================================
// MIDDLEWARES DE SÉCURITÉ
// ============================================
try {
    const { securityHeaders, additionalHeaders } = require('./middlewares/security/helmetConfig');
    app.use(securityHeaders);
    app.use(additionalHeaders);
    console.log('✅ Helmet + CSP activés');
} catch (error) {
    console.log('⚠️ Helmet non configuré, poursuite sans...');
}

// 2. Rate Limiting
try {
    const { generalLimiter } = require('./middlewares/security/rateLimiter');
    app.use(generalLimiter);
    console.log('✅ Rate Limiting activé');
} catch (error) {
    console.log('⚠️ Rate Limiting non configuré, poursuite sans...');
}

// 3. Sanitisation
try {
    const { sanitizeRequest } = require('./middlewares/security/sanitizer');
    app.use(sanitizeRequest);
    console.log('✅ Sanitization activé');
} catch (error) {
    console.log('⚠️ Sanitization non configuré, poursuite sans...');
}

// 4. Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// CRÉER LE DOSSIER UPLOADS
// ============================================
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// ============================================
// REPOSITORIES
// ============================================
const serviceRepository = new ServiceRepository(dbConnection);
const architectRepository = new ArchitectRepository(dbConnection);
const projectRepository = new ProjectRepository(dbConnection);
const testimonialRepository = new TestimonialRepository(dbConnection);

// ============================================
// CONTROLLERS
// ============================================
const serviceController = new ServiceController(serviceRepository);
const architectController = new ArchitectController(architectRepository);
const projectController = new ProjectController(projectRepository);
const contactController = new ContactController();

// ============================================
// ROUTES
// ============================================
app.use('/api/services', serviceRoutes(serviceController));
app.use('/api/architects', architectRoutes(architectController));
app.use('/api/projects', projectRoutes(projectController));
app.use('/api/contact', contactRoutes);

// ============================================
// HEALTH CHECK
// ============================================
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memory: process.memoryUsage()
    });
});

// ============================================
// GESTION DES ERREURS
// ============================================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route non trouvée'
    });
});

app.use((err, req, res, next) => {
    console.error('❌ Erreur serveur:', err);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Erreur interne du serveur'
    });
});

// ============================================
// DÉMARRAGE
// ============================================
const startServer = async () => {
    try {
        await dbConnection.connect();
        app.listen(PORT, () => {
            console.log(`\n🚀 BuildMaster API démarrée sur http://localhost:${PORT}`);
            console.log(`📁 Uploads: ${uploadsDir}\n`);
        });
    } catch (error) {
        console.error('❌ Erreur au démarrage:', error);
        process.exit(1);
    }
};

startServer();

module.exports = app;