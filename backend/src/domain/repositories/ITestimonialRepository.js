class ITestimonialRepository {
  async findAll() {
    throw new Error('Method not implemented');
  }

  async findByProject(projectId) {
    throw new Error('Method not implemented');
  }

  async findFeatured(limit = 3) {
    throw new Error('Method not implemented');
  }
}

module.exports = ITestimonialRepository;