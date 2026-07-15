// scripts/upload-to-cloudinary.js
const dotenv = require('dotenv');
const path = require('path');

// Charger le fichier .env depuis le dossier backend
dotenv.config({ path: path.join(__dirname, '../.env') });

const fs = require('fs');
const cloudinary = require('cloudinary').v2;

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Vérification des variables
console.log('🔍 Vérification:');
console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME || '❌ Manquant');
console.log('API Key:', process.env.CLOUDINARY_API_KEY ? '✅ Défini' : '❌ Manquant');
console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? '✅ Défini' : '❌ Manquant');

const uploadsDir = path.join(__dirname, '../uploads');

async function uploadAllImages() {
  const files = fs.readdirSync(uploadsDir);
  
  console.log(`\n📸 Upload de ${files.length} images vers Cloudinary...\n`);
  
  let successCount = 0;
  let errorCount = 0;
  
  for (const file of files) {
    if (file === '.gitkeep') continue;
    
    const filePath = path.join(uploadsDir, file);
    console.log(`📤 Upload: ${file}`);
    
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'buildmaster',
        use_filename: true,
        unique_filename: true,
      });
      console.log(`✅ ${file} -> ${result.secure_url}\n`);
      successCount++;
    } catch (error) {
      console.error(`❌ Erreur pour ${file}:`, error.message, '\n');
      errorCount++;
    }
  }
  
  console.log(`\n✅ Upload terminé !`);
  console.log(`📊 Succès: ${successCount}, Échecs: ${errorCount}`);
}

uploadAllImages();