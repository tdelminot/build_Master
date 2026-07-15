// backend/src/infrastructure/storage/CloudinaryService.js
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Configuration Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class CloudinaryService {
  // Upload d'une image depuis un fichier local
  async uploadImage(filePath, folder = 'buildmaster') {
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: folder,
        use_filename: true,
        unique_filename: true,
        transformation: [
          { width: 1200, height: 800, crop: 'limit' },
          { quality: 'auto' },
          { fetch_format: 'auto' }
        ]
      });
      
      // Supprimer le fichier local après upload
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      return {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      };
    } catch (error) {
      console.error('Erreur upload Cloudinary:', error);
      throw error;
    }
  }

  // Upload depuis une URL
  async uploadFromUrl(imageUrl, folder = 'buildmaster') {
    try {
      const result = await cloudinary.uploader.upload(imageUrl, {
        folder: folder,
        use_filename: true,
        unique_filename: true,
      });
      
      return {
        url: result.secure_url,
        publicId: result.public_id,
      };
    } catch (error) {
      console.error('Erreur upload depuis URL:', error);
      throw error;
    }
  }

  // Supprimer une image
  async deleteImage(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === 'ok';
    } catch (error) {
      console.error('Erreur suppression:', error);
      return false;
    }
  }

  // Obtenir une URL optimisée
  getOptimizedUrl(publicId, options = {}) {
    return cloudinary.url(publicId, {
      width: options.width || 800,
      height: options.height || 600,
      crop: 'fill',
      quality: 'auto',
      fetch_format: 'auto',
      ...options
    });
  }
}

module.exports = new CloudinaryService();