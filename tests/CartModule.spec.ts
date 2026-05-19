import { test, expect } from '@playwright/test';
import { SofaBedCartPage } from '../pages/SofaBedsPage';
import data from '../Test-data/LoginModuleTestData.json' assert { type: 'json' };


let sofaBedPOM: SofaBedCartPage;
let count : number;



test("Displaying products in the cart", async ({ page }) => {

  sofaBedPOM = new SofaBedCartPage(page);

  sofaBedPOM.navigate()
  await sofaBedPOM.navigateToSofaCumBeds();
  
  // 2. Process Product 1
  const page1 = await sofaBedPOM.openProduct(data.products[0]);
  await sofaBedPOM.addToCart(page1);

  // 3. Process Product 2
  const page2 = await sofaBedPOM.openProduct(data.products[1]);
  await sofaBedPOM.addToCart(page2);

  // 4. Process Product 3
  const page3 = await sofaBedPOM.openProduct(data.products[2]);
  await sofaBedPOM.addToCart(page3);

  // 5. Open Cart and Print items using the last active tab (page3)
  await sofaBedPOM.goToCart(page3);
  count = await sofaBedPOM.count(page3);
  await sofaBedPOM.printCartItems(page3);

});


test("Displaying count of the products in the cart", async ({ page }) => {
    sofaBedPOM = new SofaBedCartPage(page);

  sofaBedPOM.navigate()
  await sofaBedPOM.navigateToSofaCumBeds();
  
  // 2. Process Product 1
  const page1 = await sofaBedPOM.openProduct(data.products[0]);
  await sofaBedPOM.addToCart(page1);

  // 3. Process Product 2
  const page2 = await sofaBedPOM.openProduct(data.products[1]);
  await sofaBedPOM.addToCart(page2);

  // 4. Process Product 3
  const page3 = await sofaBedPOM.openProduct(data.products[2]);
  await sofaBedPOM.addToCart(page3);

  // 5. Open Cart and Print items using the last active tab (page3)
  await sofaBedPOM.goToCart(page3);
  count = await sofaBedPOM.count(page3);
  
  console.log("The count of products in cart are : ", count)
});

test('Delete products from the cart', async ({ page }) => {
    sofaBedPOM = new SofaBedCartPage(page);
  sofaBedPOM.navigate()
  await sofaBedPOM.navigateToSofaCumBeds();
  // 2. Process Product 1
  const page1 = await sofaBedPOM.openProduct(data.products[0]);
  await sofaBedPOM.addToCart(page1);  
  // 3. Process Product 2
  const page2 = await sofaBedPOM.openProduct(data.products[1]);
  await sofaBedPOM.addToCart(page2);
  // 4. Process Product 3
  const page3 = await sofaBedPOM.openProduct(data.products[2]);
  await sofaBedPOM.addToCart(page3);
  // 5. Open Cart and Print items using the last active tab (page3)
  await sofaBedPOM.goToCart(page3);
  count = await sofaBedPOM.count(page3);
  
  console.log("Count before deletion : ", count); 
  let cn = await sofaBedPOM.deleteProducts(page3);
  console.log("Count after deletion : ", cn); 
});


