const IProjectRepository = require('../../../domain/repositories/IProjectRepository');
const Project = require('../../../domain/entities/Project');

class ProjectRepository extends IProjectRepository {
  constructor(dbConnection) {
    super();
    this.db = dbConnection;
  }

  async findAll() {
    const query = `SELECT p.*, a.name as architect_name 
                   FROM projects p 
                   LEFT JOIN architects a ON p.architect_id = a.id 
                   ORDER BY p.year DESC`;
    try {
      const [rows] = await this.db.getPool().execute(query);
      return rows.map(row => ({
        ...new Project({
          id: row.id,
          title: row.title,
          description: row.description,
          category: row.category,
          location: row.location,
          beforeImage: row.before_image,
          afterImage: row.after_image,
          architectId: row.architect_id,
          year: row.year,
          status: row.status,
          createdAt: row.created_at
        }).toJSON(),
        architectName: row.architect_name
      }));
    } catch (error) {
      throw new Error(`Erreur recherche projets: ${error.message}`);
    }
  }

  async findById(id) {
    const query = `SELECT p.*, a.name as architect_name 
                   FROM projects p 
                   LEFT JOIN architects a ON p.architect_id = a.id 
                   WHERE p.id = ?`;
    try {
      const [rows] = await this.db.getPool().execute(query, [id]);
      if (rows.length === 0) return null;
      const row = rows[0];
      return {
        ...new Project({
          id: row.id,
          title: row.title,
          description: row.description,
          category: row.category,
          location: row.location,
          beforeImage: row.before_image,
          afterImage: row.after_image,
          architectId: row.architect_id,
          year: row.year,
          status: row.status,
          createdAt: row.created_at
        }).toJSON(),
        architectName: row.architect_name
      };
    } catch (error) {
      throw new Error(`Erreur recherche projet: ${error.message}`);
    }
  }

  async findByArchitect(architectId) {
    const query = 'SELECT * FROM projects WHERE architect_id = ? ORDER BY year DESC';
    try {
      const [rows] = await this.db.getPool().execute(query, [architectId]);
      return rows.map(row => new Project({
        id: row.id,
        title: row.title,
        description: row.description,
        category: row.category,
        location: row.location,
        beforeImage: row.before_image,
        afterImage: row.after_image,
        architectId: row.architect_id,
        year: row.year,
        status: row.status,
        createdAt: row.created_at
      }));
    } catch (error) {
      throw new Error(`Erreur recherche projets par architecte: ${error.message}`);
    }
  }

  async findByCategory(category) {
    const query = 'SELECT * FROM projects WHERE category = ? ORDER BY year DESC';
    try {
      const [rows] = await this.db.getPool().execute(query, [category]);
      return rows.map(row => new Project({
        id: row.id,
        title: row.title,
        description: row.description,
        category: row.category,
        location: row.location,
        beforeImage: row.before_image,
        afterImage: row.after_image,
        architectId: row.architect_id,
        year: row.year,
        status: row.status,
        createdAt: row.created_at
      }));
    } catch (error) {
      throw new Error(`Erreur recherche projets par catégorie: ${error.message}`);
    }
  }
}

module.exports = ProjectRepository;