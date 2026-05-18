import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { SofaBedCartPage } from '../pages/SofaBedsPage';
import data from '../Test-data/LoginModuleTestData.json' assert { type: 'json' };

let loginPage: LoginPage;
let sofaBedPOM: SofaBedCartPage;
let count : number;
test.beforeEach(async ({ page, browserName }) => {
    
    loginPage = new LoginPage(page);
   sofaBedPOM = new SofaBedCartPage(page);
   
    await loginPage.navigate();
    await loginPage.login(data.validCredentials.email, data.validCredentials.password, browserName);
});


test("Displaying products in the cart", async ({ page }) => {
    await sofaBedPOM.navigateToSofaCumBeds();

  // 2. Process Product 1
  const page1 = await sofaBedPOM.openProduct('Kowloon Sectional Pull Out');
  await sofaBedPOM.addToCart(page1);

  // 3. Process Product 2
  const page2 = await sofaBedPOM.openProduct('Felicity 3 Seater Click Clack');
  await sofaBedPOM.addToCart(page2);

  // 4. Process Product 3
  const page3 = await sofaBedPOM.openProduct('Kobi 2 Seater Fold Out Sofa');
  await sofaBedPOM.addToCart(page3);

  // 5. Open Cart and Print items using the last active tab (page3)
  await sofaBedPOM.goToCart(page3);
  count = await sofaBedPOM.count(page3);
  await sofaBedPOM.printCartItems(page3);

});


test("Displaying count of the products in the cart", async ({ page }) => {


  console.log("The count of products in cart are : ", count)

  
});