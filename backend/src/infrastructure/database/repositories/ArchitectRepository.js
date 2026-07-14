const IArchitectRepository = require('../../../domain/repositories/IArchitectRepository');
const Architect = require('../../../domain/entities/Architect');

class ArchitectRepository extends IArchitectRepository {
  constructor(dbConnection) {
    super();
    this.db = dbConnection;
  }

  async findAll() {
    const query = 'SELECT * FROM architects WHERE is_active = TRUE ORDER BY experience DESC';
    try {
      const [rows] = await this.db.getPool().execute(query);
      return rows.map(row => new Architect({
        id: row.id,
        name: row.name,
        title: row.title,
        experience: row.experience,
        specialty: row.specialty,
        bio: row.bio,
        photo: row.photo,
        email: row.email,
        phone: row.phone,
        isActive: row.is_active,
        createdAt: row.created_at
      }));
    } catch (error) {
      throw new Error(`Erreur recherche architectes: ${error.message}`);
    }
  }

  async findById(id) {
    const query = 'SELECT * FROM architects WHERE id = ?';
    try {
      const [rows] = await this.db.getPool().execute(query, [id]);
      if (rows.length === 0) return null;
      const row = rows[0];
      return new Architect({
        id: row.id,
        name: row.name,
        title: row.title,
        experience: row.experience,
        specialty: row.specialty,
        bio: row.bio,
        photo: row.photo,
        email: row.email,
        phone: row.phone,
        isActive: row.is_active,
        createdAt: row.created_at
      });
    } catch (error) {
      throw new Error(`Erreur recherche architecte: ${error.message}`);
    }
  }
}

module.exports = ArchitectRepository;