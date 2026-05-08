import { Locator, Page } from "@playwright/test";

// pages/LoginPage.js
export class LoginPage {
     page : Page
     accountMenu:Locator
     signInBtn : Locator
     categoryTen : Locator
     loginWithPwdBtn : Locator
     emailInput : Locator
     passwordInput : Locator
     submitBtn : Locator
     errorMessage : Locator
    constructor(page: Page) {
        this.page = page;
        this.accountMenu = page.getByRole('button', { name: 'Open account menu' });
        this.signInBtn = page.getByRole('button', { name: 'SIGN IN' });
        this.categoryTen = page.getByTestId('navigation-desktop-category-10');
        this.loginWithPwdBtn = page.getByRole('button', { name: 'Login with Password' });
        this.emailInput = page.getByTestId('login-email-input');
        this.passwordInput = page.getByTestId('login-password-input');
        this.submitBtn = page.getByTestId('login-submit-button');
        this.errorMessage = page.getByText('Password or username is');
    }

    async navigate() {
        await this.page.goto('https://www.urbanladder.com/');
    }

    async login(email : string , password : string , browserName : ('chromium' | 'firefox' | 'webkit')) {
        await this.accountMenu.click();
        await this.signInBtn.click();

        // Conditional click based on browser
        if (browserName !== 'firefox') {
            await this.categoryTen.click();
        }

        await this.loginWithPwdBtn.click();
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitBtn.click();
    }
}