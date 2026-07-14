const GetProjectsUseCase = require('../../application/useCases/GetProjectsUseCase');

class ProjectController {
  constructor(projectRepository) {
    this.getProjectsUseCase = new GetProjectsUseCase(projectRepository);
  }

  async getAll(req, res) {
    try {
      const projects = await this.getProjectsUseCase.execute();
      res.json({ success: true, projects });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const project = await this.getProjectsUseCase.getById(id);
      if (!project) {
        return res.status(404).json({ success: false, error: 'Projet non trouvé' });
      }
      res.json({ success: true, project });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async getByArchitect(req, res) {
    try {
      const { architectId } = req.params;
      const projects = await this.getProjectsUseCase.getByArchitect(architectId);
      res.json({ success: true, projects });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async getByCategory(req, res) {
    try {
      const { category } = req.params;
      const projects = await this.getProjectsUseCase.getByCategory(category);
      res.json({ success: true, projects });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = ProjectController;