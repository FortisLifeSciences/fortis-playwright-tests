import { devices, Locator } from 'playwright';
import { expect, test } from '../fixtures/baseFixtures';
import { Actions } from '../utils/actions';

test('@sanity @plp Verify on mobile viewports, PLP switches automatically from List View to Grid View.', async ({ pw, pages }) => {
    await pages.homePage.goto();
    await pages.homePage.searchAProduct("anti body");
    await pages.homePage.verifySwitchToGridViewOnMobile();
});

test("Verify 'New', 'Trial Size Available' and 'BSA-Free' tags on PLP", async ({ pw, pages }) => {
    // Step 1: Verify "New" tag for product "Bethyl"
    await test.step('Verify "New" tag appears on any product for "Bethyl"', async () => {
        await pages.homePage.goto();
        await pages.homePage.searchAProduct("Bethyl");
        await pages.homePage.verifyNewTagAppearsOnAnyProduct();
    });

    // Step 2: Verify "Trial Size Available" tag for "anti body"
    await test.step('Verify "Trial Size Available" tag appears for "anti body"', async () => {
        await pages.homePage.goto();
        await pages.homePage.searchAProduct("anti body");
        await pages.homePage.verifyTagAppears('Trial Size Available');
    });

    // Step 3: Verify "BSA-Free" tag for "anti body"
    await test.step('Verify "BSA-Free" tag appears for "anti body"', async () => {
        await pages.homePage.goto();
        await pages.homePage.searchAProduct("anti body");
        await pages.homePage.verifyTagAppears('BSA-Free');
    });
});


test('@sanity @plp Verify brand logo displays correctly to the right of the product name and brand attribute appears below it.', async ({ pw, pages }) => {
    await pages.homePage.goto();
    await pages.homePage.searchAProduct("Bethyl");

    // const productCards = pw.locator('.productviewstructure .productviewlistItem');
    const productCardslocator = pages.homePage.locators.productCards;
    const count = await productCardslocator.count();

    let found = false;

    for (let i = 0; i < count; i++) {
        const product = productCardslocator.nth(i);
        await product.scrollIntoViewIfNeeded();

        // Verify brand logo
        await test.step(`Product #${i + 1} - Verify brand logo is present`, async () => {
            const logo = product.locator('[data-testid="brand-logo"]');
            await expect(logo, 'Brand logo should be visible').toBeVisible();
        });

        // Verify trademark attribute 
        await test.step(`Product #${i + 1} - Verify trademark "Bethyl™" is present`, async () => {
            const trademark = product.locator('text=Bethyl™');
            await expect(trademark, 'Trademark (Bethyl™) should be visible').toBeVisible();
        });

        const logoCount = await product.locator('[data-testid="brand-logo"]').count();
        const trademarkCount = await product.locator('text=Bethyl™').count();
        if (logoCount > 0 && trademarkCount > 0) {
            found = true;
            break;
        }
    }

    expect(found).toBeTruthy();
});

test('@sanity @plp Verify entire product tile is clickable and navigates to the correct Product Detail Page (PDP).', async ({ pw, pages }) => {
    await pages.homePage.goto();
    await pages.homePage.searchAProduct("anti body");

    const productCards = pw.locator('.productviewstructure .productviewlistItem');
    const count = await productCards.count();

    let selectedProduct: Locator | null = null;
    let catalogueIdText: String | null = null;


    for (let i = 0; i < count; i++) {
        const product = productCards.nth(i);
        await product.scrollIntoViewIfNeeded();
        const catalogIdLocator = product.locator('p').nth(2);
        const fullText = await catalogIdLocator.textContent();
        catalogueIdText = fullText?.replace('Catalog # ', '').trim() ?? '';
        if (catalogueIdText !== '') {
            console.log(`Catalog ID: ${catalogueIdText}`);
            selectedProduct = product;
            break;
        }
    }

    if (selectedProduct) {
        await selectedProduct.click();
        const h2 = pw.locator('h2:has-text("Product Details")');
        const headingText = await Actions.getText(h2, 'Product Details heading');
        expect(headingText).toBe('Product Details');
        await pw.waitForLoadState('networkidle')
    }

    const webQuantitySection = pw.locator('[aria-label="Web Quantity"]');
    const multipleQuantitiesLocator = webQuantitySection.locator('p');
    const totalQuantities = await multipleQuantitiesLocator.count();
    let found = false;
    for (let i = 0; i < totalQuantities; i++) {
        const text = (await multipleQuantitiesLocator.nth(i).textContent())?.trim();
        console.log(`Catalog ID: ${text}`);
        if (text === catalogueIdText) {
            found = true;
            console.log(`Found catalogue ID "${catalogueIdText}" under Web Quantity, I am on correct product page`);
            break;
        }
    }

    expect(found).toBeTruthy();

});



