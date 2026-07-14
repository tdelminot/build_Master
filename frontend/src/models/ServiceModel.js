class ServiceModel {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.icon = data.icon;
    this.category = data.category;
    this.createdAt = data.createdAt;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      icon: this.icon,
      category: this.category,
      createdAt: this.createdAt
    };
  }

  static fromJSON(json) {
    return new ServiceModel(json);
  }
}

export default ServiceModel;