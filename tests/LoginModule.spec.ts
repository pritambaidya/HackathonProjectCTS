// tests/login.spec.js
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

import data from '../Test-data/LoginModuleTestData.json' assert { type: 'json' };


test.describe('Login Functionality', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Positive Test - Successful Login', async ({ browserName }) => {
        await loginPage.login(data.validCredentials.email, data.validCredentials.password, browserName);
        await expect(loginPage.errorMessage).not.toBeVisible();
        console.log("Login successful");
    });

    test('Negative Test - Invalid Credentials', async ({ browserName }) => {
    await loginPage.login(data.InvalidCredentials.email, data.InvalidCredentials.password, browserName);
    await expect(loginPage.errorMessage).toBeVisible();
    console.log("Login failed as expected with error message");
    });

    
});
