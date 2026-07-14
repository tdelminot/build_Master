class GetArchitectsUseCase {
  constructor(architectRepository) {
    this.architectRepository = architectRepository;
  }

  async execute() {
    const architects = await this.architectRepository.findAll();
    return architects;
  }

  async getById(id) {
    return await this.architectRepository.findById(id);
  }

  async getBySpecialty(specialty) {
    return await this.architectRepository.findBySpecialty(specialty);
  }
}

module.exports = GetArchitectsUseCase;