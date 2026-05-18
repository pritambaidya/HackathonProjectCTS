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
     await this.page.waitForLoadState('networkidle');
    await this.page.getByRole('textbox' , {name : 'Search'}).fill(term)
    await this.page.keyboard.press('Enter');
}

   async applyStorageFilter() {
    await this.storageFilter.click();
    await this.firstCheckbox.click();
    await this.page.waitForTimeout(1000);
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
