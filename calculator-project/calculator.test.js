const Calculator = require('./calculator');
const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'test-results.log');

const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const logResult = (description, result) => {
    console.log(description, result);
    logStream.write(`${description}: ${result}\n`);
};

describe('Calculator', () => {
    let calculator;

    beforeEach(() => {
        calculator = new Calculator();
    });

    test('adds 1 + 2 to equal 3', () => {
        const result = calculator.add(1, 2);
        logResult('adds 1 + 2 to equal', result);
        expect(result).toBe(3);
    });

    test('subtracts 5 - 3 to equal 2', () => {
        const result = calculator.subtract(5, 3);
        logResult('subtracts 5 - 3 to equal', result);
        expect(result).toBe(2);
    });

    test('multiplies 2 * 3 to equal 6', () => {
        const result = calculator.multiply(2, 3);
        logResult('multiplies 2 * 3 to equal', result);
        expect(result).toBe(6);
    });

    test('divides 6 / 2 to equal 3', () => {
        const result = calculator.divide(6, 2);
        logResult('divides 6 / 2 to equal', result);
        expect(result).toBe(3);
    });

    test('throws error when dividing by zero', () => {
        expect(() => calculator.divide(1, 0)).toThrow('Cannot divide by zero');
    });
});
