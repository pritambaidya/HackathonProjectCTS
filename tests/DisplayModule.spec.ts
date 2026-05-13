import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import {  ProductsPage } from '../pages/ProductPage';
 
let loginPage: LoginPage;
let productsPage : ProductsPage;
test.beforeEach(async ({ page , browserName}) => {
        test.setTimeout(60000);
        loginPage = new LoginPage(page);
        productsPage = new ProductsPage(page);
        await loginPage.navigate();
        await loginPage.login('prajwalpujar24@gmail.com', 'Prajwal@123', browserName);
});

test('display top products' , async({page })=>{
    await productsPage.searchFor('chairs');
    await productsPage.applyStorageFilter();
    const topProducts = await productsPage.getTopProductData(5);
    productsPage.displayTable(topProducts);
})