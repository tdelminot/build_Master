const ITestimonialRepository = require('../../../domain/repositories/ITestimonialRepository');
const Testimonial = require('../../../domain/entities/Testimonial');

class TestimonialRepository extends ITestimonialRepository {
  constructor(dbConnection) {
    super();
    this.db = dbConnection;
  }

  async findAll() {
    const query = 'SELECT * FROM testimonials ORDER BY created_at DESC';
    try {
      const [rows] = await this.db.getPool().execute(query);
      return rows.map(row => new Testimonial({
        id: row.id,
        clientName: row.client_name,
        clientCompany: row.client_company,
        content: row.content,
        rating: row.rating,
        projectId: row.project_id,
        createdAt: row.created_at
      }));
    } catch (error) {
      throw new Error(`Erreur recherche témoignages: ${error.message}`);
    }
  }

  async findByProject(projectId) {
    const query = 'SELECT * FROM testimonials WHERE project_id = ? ORDER BY created_at DESC';
    try {
      const [rows] = await this.db.getPool().execute(query, [projectId]);
      return rows.map(row => new Testimonial({
        id: row.id,
        clientName: row.client_name,
        clientCompany: row.client_company,
        content: row.content,
        rating: row.rating,
        projectId: row.project_id,
        createdAt: row.created_at
      }));
    } catch (error) {
      throw new Error(`Erreur recherche témoignages par projet: ${error.message}`);
    }
  }

  async findFeatured(limit = 3) {
    const query = 'SELECT * FROM testimonials WHERE rating >= 4 ORDER BY created_at DESC LIMIT ?';
    try {
      const [rows] = await this.db.getPool().execute(query, [limit]);
      return rows.map(row => new Testimonial({
        id: row.id,
        clientName: row.client_name,
        clientCompany: row.client_company,
        content: row.content,
        rating: row.rating,
        projectId: row.project_id,
        createdAt: row.created_at
      }));
    } catch (error) {
      throw new Error(`Erreur recherche témoignages vedettes: ${error.message}`);
    }
  }
}

module.exports = TestimonialRepository;