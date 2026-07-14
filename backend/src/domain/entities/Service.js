class Service {
  constructor({ id, name, description, icon, category, createdAt }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.icon = icon;
    this.category = category;
    this.createdAt = createdAt || new Date();
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
}

module.exports = Service;