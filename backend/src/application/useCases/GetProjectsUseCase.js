class GetProjectsUseCase {
  constructor(projectRepository) {
    this.projectRepository = projectRepository;
  }

  async execute() {
    const projects = await this.projectRepository.findAll();
    return projects;
  }

  async getById(id) {
    return await this.projectRepository.findById(id);
  }

  async getByArchitect(architectId) {
    return await this.projectRepository.findByArchitect(architectId);
  }

  async getByCategory(category) {
    return await this.projectRepository.findByCategory(category);
  }
}

module.exports = GetProjectsUseCase;