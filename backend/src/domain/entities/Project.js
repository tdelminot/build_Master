class Project {
  constructor({ id, title, description, category, location, beforeImage, afterImage, architectId, year, status, createdAt }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.location = location;
    this.beforeImage = beforeImage;
    this.afterImage = afterImage;
    this.architectId = architectId;
    this.year = year;
    this.status = status || 'completed';
    this.createdAt = createdAt || new Date();
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
      year: this.year,
      status: this.status,
      createdAt: this.createdAt
    };
  }
}

module.exports = Project;