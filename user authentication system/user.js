class User {
    constructor() {
        this.users = [];
    }

    register(username, password) {
        if (this.users.some(user => user.username === username)) {
            throw new Error('Username already exists');
        }
        const user = { username, password };
        this.users.push(user);
        return user;
    }

    login(username, password) {
        const user = this.users.find(user => user.username === username && user.password === password);
        if (!user) {
            throw new Error('Invalid username or password');
        }
        return 'Login successful';
    }

    changePassword(username, oldPassword, newPassword) {
        const user = this.users.find(user => user.username === username && user.password === oldPassword);
        if (!user) {
            throw new Error('Invalid username or password');
        }
        user.password = newPassword;
        return 'Password changed successfully';
    }
}

module.exports = User;
