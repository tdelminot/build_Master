class Testimonial {
  constructor({ id, clientName, clientCompany, content, rating, projectId, createdAt }) {
    this.id = id;
    this.clientName = clientName;
    this.clientCompany = clientCompany || '';
    this.content = content;
    this.rating = rating || 5;
    this.projectId = projectId;
    this.createdAt = createdAt || new Date();
  }

  toJSON() {
    return {
      id: this.id,
      clientName: this.clientName,
      clientCompany: this.clientCompany,
      content: this.content,
      rating: this.rating,
      projectId: this.projectId,
      createdAt: this.createdAt
    };
  }
}

module.exports = Testimonial;