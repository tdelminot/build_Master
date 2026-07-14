class GetTestimonialsUseCase {
  constructor(testimonialRepository) {
    this.testimonialRepository = testimonialRepository;
  }

  async execute() {
    const testimonials = await this.testimonialRepository.findAll();
    return testimonials;
  }

  async getFeatured(limit = 3) {
    return await this.testimonialRepository.findFeatured(limit);
  }

  async getByProject(projectId) {
    return await this.testimonialRepository.findByProject(projectId);
  }
}

module.exports = GetTestimonialsUseCase;