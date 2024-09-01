// test/ui.test.mjs
import { Builder, By, until } from 'selenium-webdriver';
import { expect } from 'chai';

describe('User Registration and Login', function () {
    this.timeout(30000); // Set a longer timeout for the tests

    let driver;

    before(async () => {
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async () => {
        await driver.quit();
    });

    it('should register a new user', async () => {
        await driver.get('http://localhost:3000');
        await driver.findElement(By.name('username')).sendKeys('testuser');
        await driver.findElement(By.id('registration-form')).submit();

        const message = await driver.wait(until.elementLocated(By.css('body')), 10000);
        const text = await message.getText();
        expect(text).to.include('User testuser registered successfully');
    });

    it('should log in the registered user', async () => {
        await driver.get('http://localhost:3000');
        await driver.findElement(By.name('username')).sendKeys('testuser');
        await driver.findElement(By.id('login-form')).submit();

        const message = await driver.wait(until.elementLocated(By.css('body')), 10000);
        const text = await message.getText();
        expect(text).to.include('User testuser logged in successfully');
    });

    it('should not register a user with an existing username', async () => {
        await driver.get('http://localhost:3000');
        await driver.findElement(By.name('username')).sendKeys('testuser');
        await driver.findElement(By.id('registration-form')).submit();

        const message = await driver.wait(until.elementLocated(By.css('body')), 10000);
        const text = await message.getText();
        expect(text).to.include('Username already exists');
    });
});
