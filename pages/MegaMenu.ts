// pages/MegaMenu.ts
import { Page, Locator, expect } from '@playwright/test';
import { LocatorFactory } from '../locators/locatorFactory';
import * as UIActions from '../utils/actions';

export class MegaMenu {
    readonly page: Page;
    readonly locators: Record<string, Locator>;

    constructor(page: Page) {
        this.page = page;
        const factory = new LocatorFactory(page);
        this.locators = factory.getPageLocators('megaMenu');
    }

    async goto() {
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
    }

    async searchBoxClick() {
        await UIActions.Actions.click(this.locators.searchSubmitBtn);
        await UIActions.Actions.click(this.locators.searchAutoComplete);
    }

    async focusElementByText(text: string, maxTabs = 50, delay = 200): Promise<boolean> {
        for (let i = 0; i < maxTabs; i++) {
            await this.page.keyboard.press('Tab');
            await this.page.waitForTimeout(delay);
            const focusedText = await this.page.evaluate(() => document.activeElement?.textContent?.trim());
            if (focusedText === text) return true;
        }
        return false;
    }

    // Focus heading h3
    async focusHeading(heading: string, maxTabs = 50, delay = 300): Promise<boolean> {
        for (let i = 0; i < maxTabs; i++) {
            await this.page.keyboard.press('Tab');
            await this.page.waitForTimeout(delay);
            const h3Locator = this.page.locator('h3');
            if ((await h3Locator.count()) > 0) {
                const headingText = await h3Locator.first().innerText();
                if (headingText.trim() === heading) return true;
            }
        }
        return false;
    }

    // Press Enter and verify link by text
    async pressEnterAndVerifyLink(linkText: string) {
        await this.page.keyboard.press('Enter');
        const link = this.page.getByRole('link', { name: linkText });
        await expect(link).toHaveText(linkText);
    }

    async selectSubMenu(subMenuText: string) {
        const link = this.page.getByRole('link', { name: subMenuText });
        await link.click();
        return await link.innerText();
    }

    async openMenu(menuName: string, action: 'click' | 'hover' = 'click') {
        const menu = this.locators.megaMenuContainer.getByRole('heading', { name: menuName });
        if (action === 'hover') {
            await menu.hover();
        } else {
            await menu.click();
        }
    }

    // async verifyMenuHeading(expectedText: string) {
    //     await expect(this.locators.productsHeading).toHaveText(expectedText);
    // }

    async verifyMenuHeading(menuName: string) {
        let headingDef;

        switch (menuName) {
            case 'Products':
                headingDef = this.locators.productsHeading;
                break;
            case 'Services':
                headingDef = this.locators.servicesHeading;
                break;
            case 'Learning Center':
                headingDef = this.locators.learningCenterHeading;
                break;
            case 'About Fortis':
                headingDef = this.locators.aboutFortisHeading;
                break;
            default:
                throw new Error(`No heading locator defined for menu: ${menuName}`);
        }

        // const heading = getLocator(this.page, headingDef);
        await expect(headingDef).toHaveText(menuName);
        await expect(headingDef).toBeVisible();
    }

    async getHeadingText(): Promise<string> {
        return (await this.locators.headingH3.innerText()).trim();
    }

    async hoverSubMenu(subMenuLocatorKey: string) {
        await UIActions.Actions.hover(this.locators[subMenuLocatorKey]);
    }

    async getSubMenuLinkText(linkLocatorKey: string): Promise<string> {
        return (await this.locators[linkLocatorKey].innerText()).trim();
    }

    async hoverLoginButton() {
        await UIActions.Actions.hover(this.locators.loginButton);
    }

}
