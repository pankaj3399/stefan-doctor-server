class UserResponse {
  constructor(user) {
    this.userId = user._id;
    this.email = user.email;
    this.name = user.name;
    this.roles = user.roles;
    this.age = user.age;
    this.gender = user.gender;
  }
}


module.exports =UserResponse;