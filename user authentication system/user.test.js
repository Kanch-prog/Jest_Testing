const User = require('./user');
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'test-results.log');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const logResult = (description, result) => {
    console.log(description, result);
    logStream.write(`${description}: ${result}\n`);
};

describe('User Authentication System', () => {
    let userSystem;

    beforeEach(() => {
        userSystem = new User();
    });

    test('registers a new user successfully', () => {
        const user = userSystem.register('john_doe', 'password123');
        logResult('registers a new user', JSON.stringify(user));
        expect(user).toEqual({ username: 'john_doe', password: 'password123' });
    });

    test('throws an error when registering a user with an existing username', () => {
        userSystem.register('john_doe', 'password123');
        expect(() => userSystem.register('john_doe', 'password456')).toThrow('Username already exists');
    });

    test('logs in a user successfully', () => {
        userSystem.register('john_doe', 'password123');
        const result = userSystem.login('john_doe', 'password123');
        logResult('logs in a user', result);
        expect(result).toBe('Login successful');
    });

    test('throws an error when logging in with incorrect credentials', () => {
        userSystem.register('john_doe', 'password123');
        expect(() => userSystem.login('john_doe', 'wrongpassword')).toThrow('Invalid username or password');
    });

    test('changes the user password successfully', () => {
        userSystem.register('john_doe', 'password123');
        const result = userSystem.changePassword('john_doe', 'password123', 'newpassword456');
        logResult('changes the user password', result);
        expect(result).toBe('Password changed successfully');
    });

    test('throws an error when changing the password with incorrect old password', () => {
        userSystem.register('john_doe', 'password123');
        expect(() => userSystem.changePassword('john_doe', 'wrongpassword', 'newpassword456')).toThrow('Invalid username or password');
    });
});
