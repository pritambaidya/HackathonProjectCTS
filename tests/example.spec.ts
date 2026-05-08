// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Login Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Positive Test - Successful Login', async ({ browserName }) => {
        await loginPage.login('prajwalpujar24@gmail.com', 'Prajwal@123', browserName);
        await expect(loginPage.errorMessage).not.toBeVisible();
        console.log("Login successful");
    });

    test('Negative Test - Invalid Credentials', async ({ browserName }) => {
    await loginPage.login('wrong@email.com', 'WrongPass123', browserName);
    await expect(loginPage.errorMessage).toBeVisible();
    console.log("Login failed as expected with error message");
    });
});