import { Page, Locator } from '@playwright/test';

export class ProductsPage {
    readonly page: Page;
    readonly searchBar: Locator;
    readonly storageFilter: Locator;
    readonly firstCheckbox: Locator;
    readonly productCards: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchBar = page.getByRole('textbox', { name: 'Search' });
        this.storageFilter = page.getByRole('button', { name: 'Storage Type filter' });
        this.firstCheckbox = page.getByRole('checkbox', { name: 'Checkbox' }).first();
        this.productCards = page.locator('.o0mbO');
    }

   async searchFor(term: string) {
     await this.page.waitForLoadState('domcontentloaded');
    await this.page.getByRole('textbox' , {name : 'Search'}).fill(term)
    await this.page.keyboard.press('Enter');
}

   async applyStorageFilter() {
    // 1. Wait for the button to exist in the DOM
    await this.storageFilter.waitFor({ state: 'attached', timeout: 15000 });

    // 2. Scroll it into the view (Crucial for headless Jenkins)
    await this.storageFilter.scrollIntoViewIfNeeded();

    // 3. Use a 'force' click to bypass any hidden overlays
    await this.storageFilter.click({ force: true });

    // 4. Wait for the checkbox to be visible before clicking it
    await this.firstCheckbox.waitFor({ state: 'visible', timeout: 10000 });
    await this.firstCheckbox.click();
    
    // 5. Instead of a hard timeout, wait for the network to finish the filter action
    await this.page.waitForLoadState('domcontentloaded');
}

    async getTopProductData(count: number) {
    let results: string[][] = [];
    
    // 1. Get the actual count of products visible on the screen
    const actualCount = await this.productCards.count();
    
    // 2. Determine how many to iterate: whichever is smaller
    // If search is 'axuuuxx', limit will be 0.
    const limit = Math.min(actualCount, count);

    for (let i = 0; i < limit; i++) {
        const element = this.productCards.nth(i);
        // It's safer to wait for visibility than just 'attached'
        await element.waitFor({ state: 'visible', timeout: 5000 }); 
        
        const text = await element.innerText();
        const lines = text.split('\n');
        
        // Push the data (Price and Name)
        results.push([lines[2], lines[1]]); 
    }
    
    return results;
}

    displayTable(data: string[][]) {
        console.log("Sl.No".padEnd(8) + " | " + "Price".padEnd(12) + " | " + "Product Name");
        console.log("-".repeat(80));

        data.forEach((ele, index) => {
            const slNo = (index + 1).toString().padEnd(8);
            const price = (ele[0] || "N/A").padEnd(12);
            const name = ele[1] || "N/A";
            console.log(`${slNo} | ${price} | ${name}`);
        });
    }
}
