// pages/SofaBedCartPage.ts
import { Page, Locator } from '@playwright/test';

export class SofaBedCartPage {
  readonly mainPage: Page;
  readonly sofaCumBedsLink: Locator;

  constructor(page: Page) {
    this.mainPage = page;
    this.sofaCumBedsLink = page.getByRole('link', { name: 'Sofa Cum Beds Sofa Cum Beds' });
  }

  
  // Navigation action
  async navigateToSofaCumBeds(): Promise<void> {
    await this.sofaCumBedsLink.click();
  }

  async navigate() {
        await this.mainPage.goto('https://www.urbanladder.com', { 
    waitUntil: 'load' 
})};

  

  // Opens a product link in a new tab and returns that new tab context
  async openProduct(productName: string): Promise<Page> {
    const pagePromise = this.mainPage.waitForEvent('popup');
    await this.mainPage.getByRole('link', { name: productName }).click();
    return await pagePromise;
  }

  // Dynamic context action: Targets the specific popup/tab context to click add to cart
  async addToCart(targetPage: Page): Promise<void> {
    await targetPage.getByTestId('pdp-add-to-cart-button').click();
  }

  // Dynamic context action: Targets the final popup/tab context to go to the cart
  async goToCart(targetPage: Page): Promise<void> {
    await targetPage.getByRole('link', { name: '3', exact: true }).click();
  }

  // Dynamic context action: Verifies and prints items from the cart

  async count(targetPage: Page): Promise<number> {
    const cartItems = targetPage.locator('.eKp90');
    
    // Wait for the first element to become visible
    await cartItems.first().waitFor({ state: 'visible', timeout: 10000 });

    const count = await cartItems.count();
    
    return count
  }
  async printCartItems(targetPage: Page): Promise<void> {
    const cartItems = targetPage.locator('.eKp90');
    
    // Wait for the first element to become visible
    await cartItems.first().waitFor({ state: 'visible', timeout: 10000 });

    const count = await cartItems.count();
    console.log("The products in your cart are: ");

    for (let i = 0; i < count; i++) {
      const text = await cartItems.nth(i).innerText();
      console.log(text);
    }
  }
}