const GetArchitectsUseCase = require('../../application/useCases/GetArchitectsUseCase');

class ArchitectController {
  constructor(architectRepository) {
    this.getArchitectsUseCase = new GetArchitectsUseCase(architectRepository);
  }

  async getAll(req, res) {
    try {
      const architects = await this.getArchitectsUseCase.execute();
      res.json({ success: true, architects });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const architect = await this.getArchitectsUseCase.getById(id);
      if (!architect) {
        return res.status(404).json({ success: false, error: 'Architecte non trouvé' });
      }
      res.json({ success: true, architect });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = ArchitectController;