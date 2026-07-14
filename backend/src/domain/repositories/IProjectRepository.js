class IProjectRepository {
  async findAll() {
    throw new Error('Method not implemented');
  }

  async findById(id) {
    throw new Error('Method not implemented');
  }

  async findByArchitect(architectId) {
    throw new Error('Method not implemented');
  }

  async findByCategory(category) {
    throw new Error('Method not implemented');
  }
}

module.exports = IProjectRepository;