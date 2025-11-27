// pages/TempEmailPage.ts
import { Page, Locator } from '@playwright/test';
import { LocatorFactory } from '../locators/locatorFactory';

export class TempEmailPage {
    readonly page: Page;
    readonly locators: Record<string, Locator>;

    constructor(page: Page) {
        this.page = page;
        const factory = new LocatorFactory(page);
        this.locators = factory.getPageLocators('tempEmailPage');
    }

    async clickPasswordResetSubject() {
        const passwordResetSubject = this.locators.emailSubject.filter({
            hasText: 'Password Reset',
        });
        await passwordResetSubject.waitFor({ state: 'visible', timeout: 120000 });
        await passwordResetSubject.click();
    }

    async getPasswordResetLink() {
        await this.locators.passwordResetLink.waitFor({ state: 'visible', timeout: 120000 });
        const href = await this.locators.passwordResetLink.getAttribute('href');
        if (!href) throw new Error('Password reset link href not found');
        return href;
    }

    async getGeneratedEmail(): Promise<string> {
        await this.page.waitForFunction(() => {
            const el = document.querySelector<HTMLInputElement>('#mail');
            return el && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value);
        }, { timeout: 30000 });

        return await this.locators.mailInput.inputValue();
    }

}
