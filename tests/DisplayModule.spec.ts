import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductPage';
import data from '../Test-data/LoginModuleTestData.json' assert { type: 'json' };


let loginPage: LoginPage;
let productsPage : ProductsPage;

test.beforeEach(async ({ page, browserName }) => {
    
    loginPage = new LoginPage(page);
    productsPage = new ProductsPage(page);
    await loginPage.navigate();
    await loginPage.login(data.validCredentials.email, data.validCredentials.password, browserName);
});

// Use the product name in the test title for better reporting

test(`display top products - Positive`, async ({ page }) => {
        await productsPage.searchFor(data.validCredentialsforproduct.name);
        await productsPage.applyStorageFilter();
        const topProducts = await productsPage.getTopProductData(5);
        productsPage.displayTable(topProducts);
        
        // Assert that we actually got results back
        expect(topProducts.length).toBeGreaterThan(0);
});


test.fail(`display top products - Negative`, async ({ page }) => {
    const searchTerm = data.InvalidCredentialsforproduct.name;
    await productsPage.searchFor(searchTerm);
    
    const topProducts = await productsPage.getTopProductData(5);
    
    if (topProducts.length === 0) {
        // Log the specific message you requested
        console.log(`THE PRODUCT "${searchTerm.toUpperCase()}" IS NOT VALID`);
        
        // This force-fails the test with a descriptive error message in the report
        expect(topProducts.length, `Test failed because the product "${searchTerm}" is not valid/found.`).toBeGreaterThan(0);
    } else {
        // If it somehow found products for gibberish, the test continues (or you can handle that too)
        expect(topProducts.length).toBeGreaterThan(0);
    }
});

test.fail(`display top products - Empty Search`, async ({ page }) => {
    await productsPage.searchBar.fill('');
    await productsPage.page.keyboard.press('Enter');

    const topProducts = await productsPage.getTopProductData(5);
    if (topProducts.length === 0) {
        console.log(`NO PRODUCTS DISPLAYED FOR EMPTY SEARCH`);
        expect(topProducts.length, `Test failed because no products were displayed for an empty search.`).toBeGreaterThan(0);
    } else {
        expect(topProducts.length).toBeGreaterThan(0);
    }   
});

test.fail(`display top products - Special Characters`, async ({ page }) => {
    const searchTerm = '@#$%^&*';
    await productsPage.searchFor(searchTerm);
    const topProducts = await productsPage.getTopProductData(5);
    
    if (topProducts.length === 0) {
        console.log(`NO PRODUCTS DISPLAYED FOR SPECIAL CHARACTERS SEARCH`);
        expect(topProducts.length, `Test failed because no products were displayed for special characters search.`).toBeGreaterThan(0);
    }   else {
        expect(topProducts.length).toBeGreaterThan(0);
    }
});
