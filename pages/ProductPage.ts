// pages/ProductPage.ts
import { Page, Locator, expect } from '@playwright/test';
import * as UIActions from '../utils/actions';
import { LocatorFactory } from '../locators/locatorFactory';

export class ProductPage {
    readonly page: Page;
    readonly locators: Record<string, Locator>;
    productCode: any;
    productPrice: any;

    constructor(page: Page) {
        this.page = page;
        const factory = new LocatorFactory(page);
        this.locators = factory.getPageLocators('productPage');
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

        if (await closePopup.isVisible()) {
            await closePopup.click();
            console.log('Popup closed');
        } else {
            console.log('Popup not present, continuing test...');
        }
    }

    async getPriceAndCode() {
        await UIActions.Actions.waitForPageToLoad(this.page, 30000);
        this.productCode = await UIActions.Actions.getText(this.locators.firstRowCode);
        this.productPrice = await UIActions.Actions.getText(this.locators.firstRowPrice);
        return this.productPrice;
    }

    async clickAddToCart() {
        await UIActions.Actions.click(this.locators.addToCartButton);
        await UIActions.Actions.waitForPageToLoad(this.page, 30000);
        const addToCartDialogHeading = await UIActions.Actions.getText(this.locators.cartConfirmDialog);
        console.log(`This is dialog ${addToCartDialogHeading}`);
        expect(addToCartDialogHeading).toBe('Added to Cart');
    }

    async clickGoToCart() {
        await UIActions.Actions.click(this.locators.goToCartButton);
        await UIActions.Actions.waitForPageToLoad(this.page, 30000);
    }

}
