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



test('Display total prize in cart', async ({ page }) => {
    sofaBedPOM = new SofaBedCartPage(page);
  sofaBedPOM.navigate()
  await sofaBedPOM.navigateToSofaCumBeds();
 
  const page1 = await sofaBedPOM.openProduct(data.products[0]);
  await sofaBedPOM.addToCart(page1);  

  const page2 = await sofaBedPOM.openProduct(data.products[1]);
  await sofaBedPOM.addToCart(page2);
  
  const page3 = await sofaBedPOM.openProduct(data.products[2]);
  await sofaBedPOM.addToCart(page3);
 
  await sofaBedPOM.goToCart(page3);
 

const rawPrize = await page3.getByText('Total MRP₹').textContent();
const rawDiscount = await page3.getByText('Discount-₹').textContent();
const rawFinalPrize = await page3.getByText('Subtotal₹').textContent();


const extractNumber = (text: string | null): number => {
  if (!text) return 0;
  
  const cleaned = text.replace(/[^0-9]/g, ''); 
  return parseInt(cleaned, 10) || 0;
};


const prizeAmount = extractNumber(rawPrize);
const discountAmount = extractNumber(rawDiscount);
const finalAmount = extractNumber(rawFinalPrize);


console.log("=========================================");
console.log("           RECEIPT SUMMARY               ");
console.log("=========================================");
console.log(` Total MRP     :  ₹${prizeAmount.toLocaleString('en-IN')}`);
console.log(` Discount      : -₹${discountAmount.toLocaleString('en-IN')}`);
console.log("-----------------------------------------");
console.log(` FINAL AMOUNT  :  ₹${finalAmount.toLocaleString('en-IN')}`);
console.log("=========================================");
});


test('Display total prize in cart after applying coupens', async ({ page }) => {
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
  await page3.getByRole('button', { name: 'Applicable Coupons' }).click();
  await page3.getByTestId('coupons-item-apply-button').first().click();
  await page3.getByTestId('coupons-close-modal-button').click();
 // 1. Fetch raw text values from the page
const rawPrize = await page3.getByText('Total MRP₹').textContent();
const rawDiscount = await page3.getByText('Discount-₹').textContent();
const rawSubtotal = await page3.getByText('Subtotal₹').textContent();
const rawCoupon = await page3.getByText('Coupon-₹').textContent();

// 2. Helper function to extract numbers safely
const extractNumber = (text: string | null): number => {
  if (!text) return 0;
  const cleaned = text.replace(/[^0-9]/g, ''); 
  return parseInt(cleaned, 10) || 0;
};

// 3. Convert all raw strings to numbers
const totalMRP = extractNumber(rawPrize);
const discountAmount = extractNumber(rawDiscount);
const subtotalAmount = extractNumber(rawSubtotal);
const couponAmount = extractNumber(rawCoupon);

// 4. Calculate the true final amount (Subtotal minus Coupon)
const trueFinalAmount = subtotalAmount - couponAmount;

// 5. Professional Terminal Display
console.log("\n=========================================");
console.log("             ORDER SUMMARY               ");
console.log("=========================================");
console.log(` Total MRP     :   ₹${totalMRP.toLocaleString('en-IN')}`);
console.log(` Discount      :  -₹${discountAmount.toLocaleString('en-IN')}`);
console.log("-----------------------------------------");
console.log(` Subtotal      :   ₹${subtotalAmount.toLocaleString('en-IN')}`);
console.log(` Coupon Applied:  -₹${couponAmount.toLocaleString('en-IN')}`);
console.log("=========================================");
console.log(` NET PAYABLE   :   ₹${trueFinalAmount.toLocaleString('en-IN')}`);
console.log("=========================================\n");
});



