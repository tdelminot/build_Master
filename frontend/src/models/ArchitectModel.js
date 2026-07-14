class ArchitectModel {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.title = data.title;
    this.experience = data.experience;
    this.specialty = data.specialty;
    this.bio = data.bio;
    this.photo = data.photo;
    this.email = data.email;
    this.phone = data.phone;
    this.isActive = data.isActive;
    this.createdAt = data.createdAt;
  }

  get experienceLabel() {
    return `${this.experience} ans d'expérience`;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      title: this.title,
      experience: this.experience,
      specialty: this.specialty,
      bio: this.bio,
      photo: this.photo,
      email: this.email,
      phone: this.phone,
      isActive: this.isActive,
      createdAt: this.createdAt
    };
  }

  static fromJSON(json) {
    return new ArchitectModel(json);
  }
}

export default ArchitectModel;