class AuthResponse {
    constructor(user, token) {
        this.userId = user._id;
        this.email = user.email;
        this.name = user.name;
        this.roles = user.roles;
        this.age = user.age;
        this.gender = user.gender;
        this.token = token
    }
}


module.exports =AuthResponse;