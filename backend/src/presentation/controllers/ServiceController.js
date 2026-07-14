const GetServicesUseCase = require('../../application/useCases/GetServicesUseCase');

class ServiceController {
  constructor(serviceRepository) {
    this.getServicesUseCase = new GetServicesUseCase(serviceRepository);
  }

  async getAll(req, res) {
    try {
      const services = await this.getServicesUseCase.execute();
      res.json({ success: true, services });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params;
      const service = await this.getServicesUseCase.getById(id);
      if (!service) {
        return res.status(404).json({ success: false, error: 'Service non trouvé' });
      }
      res.json({ success: true, service });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }

  async getByCategory(req, res) {
    try {
      const { category } = req.params;
      const services = await this.getServicesUseCase.getByCategory(category);
      res.json({ success: true, services });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  }
}

module.exports = ServiceController;