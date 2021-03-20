class User {
  constructor(username, email, age, createdAt) {
    if (username !== undefined) this.username = username;
    if (email !== undefined) this.email = email;
    if (age !== undefined) this.age = age;
    if (createdAt !== undefined) this.createdAt = createdAt;
  }
}

module.exports = User;
