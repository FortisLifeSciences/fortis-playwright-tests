// pages/HomePage.ts
import { Page, Locator, expect } from '@playwright/test';
import * as UIActions from '../utils/actions';
import { LocatorFactory } from '../locators/locatorFactory'; // adjust path as needed

export class HomePage {
    readonly page: Page;
    readonly locators: Record<string, Locator>;

    constructor(page: Page) {
        this.page = page;
        const factory = new LocatorFactory(page);
        this.locators = factory.getPageLocators('homePage');
    }

    async goto() {
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
        this.closePromotionPopup();
        const iframeElement = this.page.locator('#ifrmCookieBanner');
        if (await iframeElement.isVisible()) {
            const frame = this.page.frameLocator('#ifrmCookieBanner');
            const declineButton = frame.getByRole('button', { name: 'Decline' });
            await declineButton.click();
        }
    }

    private async closePromotionPopup() {
        const closePopup = this.page.locator('#closePopup');

        // Check if it’s visible
        if (await closePopup.isVisible()) {
            await closePopup.click();
            console.log('Popup closed');
        } else {
            console.log('Popup not present, continuing test...');
        }
    }

    async searchAProduct(productName: string) {
        await UIActions.Actions.click(this.locators.searchBox);
        await UIActions.Actions.fill(this.locators.searchBox, productName);
        await UIActions.Actions.pressEnter(this.locators.searchBox);
        const result = await UIActions.Actions.isTextPresent(this.page, /Products for ".*"/);
        // expect(result).toBe(true);
    }

    async clickFirstProduct() {
        // const productCards = this.page.locator('.productviewstructure .productviewlistItem');
        const count = await this.locators.productCards.count();

        let selectedProduct: Locator | null = null;
        let catalogueIdText: String | null = null;


        for (let i = 0; i < count; i++) {
            const product = this.locators.productCards.nth(i);
            await product.scrollIntoViewIfNeeded();
            const catalogIdLocator = product.locator('p').nth(2);
            const fullText = await catalogIdLocator.textContent();
            catalogueIdText = fullText?.replace('Catalog # ', '').trim() ?? '';
            if (catalogueIdText !== '') {
                console.log(`Catalog ID: ${catalogueIdText}`);
                selectedProduct = product;
                product.click()
                break;
            }
        }
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    }

    async hoverOnProfileIcon() {
        await UIActions.Actions.hover(this.locators.loginButton);
    }

    async clickOnProfileIcon() {
        await UIActions.Actions.click(this.locators.loginButton);
    }

    getTooltipGreeting(username: string): Locator {
        return this.page.locator('p', { hasText: `Hi, ${username}` });
    }

    async getErrorMessage(): Promise<string> {
        return await UIActions.Actions.getText(this.locators.errorText, 'Login error message');
    }

    async verifySwitchToGridViewOnMobile() {
        await expect(this.locators.searchViewGridorList).toHaveClass(/product-list-view/);
        await expect(this.locators.searchViewGridorList).not.toHaveClass(/product-grid-view/);

        await this.page.setViewportSize({ width: 390, height: 844 });
        await this.page.waitForTimeout(1000);

        await expect(this.locators.searchViewGridorList).toHaveClass(/product-grid-view/);
        await expect(this.locators.searchViewGridorList).not.toHaveClass(/product-list-view/);
    }

    async verifyNewTagAppearsOnAnyProduct() {
        const count = await this.locators.productItems.count();
        for (let i = 0; i < count; i++) {
            const product = this.locators.productItems.nth(i);
            await product.scrollIntoViewIfNeeded();

            const style = await this.locators.newTagDiv.getAttribute('style');
            if (style?.includes('background-image: url("/NewTag.svg")')) {
                expect(style).toContain('background-image: url("/NewTag.svg")');
                return;
            }
        }
        throw new Error('No product with "New" tag found');
    }

    async verifyTagAppears(tagText: string) {
        const tagLocator = this.locators.productItems.getByText(tagText);
        const count = await tagLocator.count();
        expect(count, `Expected at least one product with tag: ${tagText}`).toBeGreaterThan(0);
    }

    async verifyBrandLogoAndTrademark(brand: string) {
        const count = await this.locators.productItems.count();
        let found = false;

        for (let i = 0; i < count; i++) {
            const product = this.locators.productItems.nth(i);
            await product.scrollIntoViewIfNeeded();

            const logo = product.locator('[data-testid="brand-logo"]');
            const trademark = product.locator(`text=${brand}™`);

            await expect(logo).toBeVisible();
            await expect(trademark).toBeVisible();

            const logoCount = await logo.count();
            const trademarkCount = await trademark.count();
            if (logoCount > 0 && trademarkCount > 0) {
                found = true;
                break;
            }
        }

        expect(found).toBeTruthy();
    }

    async clickFirstProductWithCatalogId(): Promise<string> {
        const count = await this.locators.productItems.count();

        for (let i = 0; i < count; i++) {
            const product = this.locators.productItems.nth(i);
            await product.scrollIntoViewIfNeeded();
            const catalogIdLocator = product.locator('p').nth(2);
            const fullText = await catalogIdLocator.textContent();
            const catalogueIdText = fullText?.replace('Catalog # ', '').trim() ?? '';

            if (catalogueIdText) {
                await product.click();
                await this.page.waitForLoadState('networkidle');
                return catalogueIdText;
            }
        }

        throw new Error('No product with catalog ID found');
    }
}
