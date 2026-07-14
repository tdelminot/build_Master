class GetServicesUseCase {
  constructor(serviceRepository) {
    this.serviceRepository = serviceRepository;
  }

  async execute() {
    const services = await this.serviceRepository.findAll();
    return services;
  }

  async getById(id) {
    return await this.serviceRepository.findById(id);
  }

  async getByCategory(category) {
    return await this.serviceRepository.findByCategory(category);
  }
}

module.exports = GetServicesUseCase;