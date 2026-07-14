CREATE DATABASE IF NOT EXISTS buildmaster_db;
USE buildmaster_db;

-- Services
CREATE TABLE IF NOT EXISTS services (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon VARCHAR(50),
    category VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Architectes
CREATE TABLE IF NOT EXISTS architects (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100),
    experience INT,
    specialty VARCHAR(100),
    bio TEXT,
    photo VARCHAR(255),
    email VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projets
CREATE TABLE IF NOT EXISTS projects (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50),
    location VARCHAR(100),
    before_image VARCHAR(255),
    after_image VARCHAR(255),
    architect_id VARCHAR(36),
    year INT,
    status ENUM('completed', 'ongoing', 'planned') DEFAULT 'completed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (architect_id) REFERENCES architects(id) ON DELETE SET NULL
);

-- Témoignages
CREATE TABLE IF NOT EXISTS testimonials (
    id VARCHAR(36) PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_company VARCHAR(100),
    content TEXT,
    rating INT DEFAULT 5,
    project_id VARCHAR(36),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- Insertion des données
INSERT INTO services (id, name, description, icon, category) VALUES
('s1', 'Architecture Design', 'Conception architecturale innovante pour tous types de bâtiments', '🏛️', 'design'),
('s2', 'Construction Générale', 'Réalisation complète de vos projets de construction', '🔨', 'construction'),
('s3', 'Rénovation', 'Rénovation et réhabilitation de bâtiments existants', '🔧', 'renovation'),
('s4', 'Infrastructure d\'Entreprise', 'Création d\'infrastructures pour entreprises (hôtels, PME, bureaux)', '🏗️', 'infrastructure'),
('s5', 'Aménagement Intérieur', 'Design d\'intérieur et aménagement d\'espaces', '🛋️', 'interior'),
('s6', 'Étude et Conseil', 'Études de faisabilité et conseil en construction', '📋', 'consulting');

-- Architectes avec bonnes photos
INSERT INTO architects (id, name, title, experience, specialty, bio, photo, email, phone) VALUES
('a1', 'Rakoto Andrianina', 'Architecte Principal', 15, 'Architecture moderne', 'Architecte diplômé avec 15 ans d\'expérience. Spécialisé dans les constructions modernes et durables. A réalisé de nombreux projets d\'envergure à Madagascar.', '/uploads/architect-1.jpg', 'rakoto.andrianina@buildmaster.mg', '+261 34 12 345 67'),
('a2', 'Ranaivoarimanana Marie', 'Architecte d\'Intérieur', 10, 'Design d\'intérieur', 'Architecte d\'intérieur passionnée par la création d\'espaces fonctionnels et esthétiques. Expertise en design d\'intérieur pour entreprises et particuliers.', '/uploads/architect-2.jpg', 'marie.ranaivo@buildmaster.mg', '+261 34 23 456 78'),
('a3', 'Raharimanana Heriniaina', 'Architecte Paysagiste', 8, 'Architecture durable', 'Spécialiste en architecture durable et espaces verts. Passionné par l\'intégration de la nature dans l\'architecture urbaine.', '/uploads/architect-3.jpg', 'heriniaina.rahari@buildmaster.mg', '+261 34 34 567 89');

-- Projets avec images
INSERT INTO projects (id, title, description, category, location, before_image, after_image, architect_id, year, status) VALUES
('p1', 'Villa Moderne Antananarivo', 'Construction d\'une villa contemporaine avec piscine et jardin paysager', 'résidentiel', 'Antananarivo', '/uploads/before-villa.jpg', '/uploads/after-villa.jpg', 'a1', 2023, 'completed'),
('p2', 'Hôtel de Luxe Nosy Be', 'Création d\'un hôtel 5 étoiles en bord de mer', 'hôtelier', 'Nosy Be', '/uploads/before-hotel.jpg', '/uploads/after-hotel.jpg', 'a1', 2024, 'completed'),
('p3', 'Immeuble de Bureaux Antananarivo', 'Construction d\'un immeuble moderne de 8 étages', 'commercial', 'Antananarivo', '/uploads/before-office.jpg', '/uploads/after-office.jpg', 'a2', 2023, 'completed'),
('p4', 'Rénovation Maison Coloniale', 'Rénovation complète d\'une maison coloniale à Fianarantsoa', 'rénovation', 'Fianarantsoa', '/uploads/before-colonial.jpg', '/uploads/after-colonial.jpg', 'a3', 2024, 'ongoing');

-- Témoignages
INSERT INTO testimonials (id, client_name, client_company, content, rating, project_id) VALUES
('t1', 'Jean Rajaonarison', 'Groupe Raja', 'BuildMaster a réalisé un travail exceptionnel sur notre nouveau siège. Leur équipe est professionnelle et respecte les délais.', 5, 'p3'),
('t2', 'Marie Rasamimanana', 'Hôtel de Luxe Nosy Be', 'Une collaboration exceptionnelle. L\'équipe a su transformer notre vision en réalité.', 5, 'p2'),
('t3', 'Pierre Andrianaivo', 'PME Innovation', 'Très satisfait du service et de la qualité de construction. Je recommande BuildMaster.', 5, 'p4');
