// pages/MyAccountPage.ts
import { expect, Locator, Page } from '@playwright/test';
import * as UIActions from '../utils/actions';
import { LocatorFactory } from '../locators/locatorFactory';

export class MyAccountPage {
    readonly page: Page;
    readonly locators: Record<string, Locator>;

    constructor(page: Page) {
        this.page = page;
        const factory = new LocatorFactory(page);
        this.locators = factory.getPageLocators('myAccountPage');
    }

    async goto() {
        await this.page.goto('/my-account');
        this.closePromotionPopup();
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
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

    getTooltipGreeting(username: string): Locator {
        return this.page.locator('p', { hasText: `Hi, ${username}` });
    }

    async verifyTooltipGreeting(username: string): Promise<void> {
        const tooltip = this.getTooltipGreeting(username);
        await expect(tooltip).toBeVisible();
    }

    async hoverToRevealTooltip(triggerLocator: Locator): Promise<void> {
        await UIActions.Actions.hover(triggerLocator, 'Hover to show tooltip');
        await this.page.waitForTimeout(500); // wait for tooltip to appear
    }

    async isLoaded(): Promise<boolean> {
        return await UIActions.Actions.isPresent(this.locators.logoutHeading);
    }

    async logout(): Promise<void> {
        await UIActions.Actions.click(this.locators.logoutHeading, 'Log Out');
    }
}
