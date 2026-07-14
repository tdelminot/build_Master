const IServiceRepository = require('../../../domain/repositories/IServiceRepository');
const Service = require('../../../domain/entities/Service');

class ServiceRepository extends IServiceRepository {
  constructor(dbConnection) {
    super();
    this.db = dbConnection;
  }

  async findAll() {
    const query = 'SELECT * FROM services ORDER BY name';
    try {
      const [rows] = await this.db.getPool().execute(query);
      return rows.map(row => new Service({
        id: row.id,
        name: row.name,
        description: row.description,
        icon: row.icon,
        category: row.category,
        createdAt: row.created_at
      }));
    } catch (error) {
      throw new Error(`Erreur recherche services: ${error.message}`);
    }
  }

  async findById(id) {
    const query = 'SELECT * FROM services WHERE id = ?';
    try {
      const [rows] = await this.db.getPool().execute(query, [id]);
      if (rows.length === 0) return null;
      const row = rows[0];
      return new Service({
        id: row.id,
        name: row.name,
        description: row.description,
        icon: row.icon,
        category: row.category,
        createdAt: row.created_at
      });
    } catch (error) {
      throw new Error(`Erreur recherche service: ${error.message}`);
    }
  }

  async findByCategory(category) {
    const query = 'SELECT * FROM services WHERE category = ?';
    try {
      const [rows] = await this.db.getPool().execute(query, [category]);
      return rows.map(row => new Service({
        id: row.id,
        name: row.name,
        description: row.description,
        icon: row.icon,
        category: row.category,
        createdAt: row.created_at
      }));
    } catch (error) {
      throw new Error(`Erreur recherche services par catégorie: ${error.message}`);
    }
  }
}

module.exports = ServiceRepository;