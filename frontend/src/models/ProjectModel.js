class ProjectModel {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.category = data.category;
    this.location = data.location;
    this.beforeImage = data.beforeImage;
    this.afterImage = data.afterImage;
    this.architectId = data.architectId;
    this.architectName = data.architectName;
    this.year = data.year;
    this.status = data.status;
    this.createdAt = data.createdAt;
  }

  get statusLabel() {
    const labels = {
      'completed': 'Terminé',
      'ongoing': 'En cours',
      'planned': 'Planifié'
    };
    return labels[this.status] || this.status;
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      category: this.category,
      location: this.location,
      beforeImage: this.beforeImage,
      afterImage: this.afterImage,
      architectId: this.architectId,
      architectName: this.architectName,
      year: this.year,
      status: this.status,
      createdAt: this.createdAt
    };
  }

  static fromJSON(json) {
    return new ProjectModel(json);
  }
}

export default ProjectModel;