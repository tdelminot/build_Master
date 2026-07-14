class Architect {
  constructor({ id, name, title, experience, specialty, bio, photo, email, phone, isActive, createdAt }) {
    this.id = id;
    this.name = name;
    this.title = title;
    this.experience = experience;
    this.specialty = specialty;
    this.bio = bio;
    this.photo = photo || 'https://via.placeholder.com/300x300?text=Architect';
    this.email = email;
    this.phone = phone;
    this.isActive = isActive !== undefined ? isActive : true;
    this.createdAt = createdAt || new Date();
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
}

module.exports = Architect;