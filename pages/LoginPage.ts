// pages/LoginPage.ts
import { Page, Locator, expect } from '@playwright/test';
import * as UIActions from '../utils/actions';
import { LocatorFactory } from '../locators/locatorFactory'; // adjust path as needed
import { RegistrationPage } from './RegistrationPage';

export class LoginPage {
    readonly page: Page;
    readonly locators: Record<string, Locator>;

    constructor(page: Page) {
        this.page = page;
        const factory = new LocatorFactory(page);
        this.locators = factory.getPageLocators('loginPage');
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

    async openLoginForm(registrationPage: RegistrationPage) {
        await UIActions.Actions.click(this.locators.loginButton, 'Login Button');
        // await UIActions.Actions.click(registrationPage.locators.createAccountButton, 'Create Account Link');
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

    async openRegistrationForm(registrationPage: RegistrationPage) {
        await UIActions.Actions.click(this.locators.loginButton, 'Login Button');
        await UIActions.Actions.click(registrationPage.locators.createAccountButton, 'Create Account Link');
    }

    async enterEmail(testEmail: string) {
        await UIActions.Actions.fill(this.locators.emailInput, testEmail);
    }

    async verifyMandatoryEmailField(value: string) {
        await UIActions.Actions.click(this.locators.emailInput);
        await UIActions.Actions.pressTab(this.locators.emailInput);
        await expect(this.locators.missingEmailError).toBeVisible();

        await UIActions.Actions.fill(this.locators.emailInput, value);
        await UIActions.Actions.pressTab(this.locators.emailInput);
        await expect(this.locators.missingEmailError).not.toBeVisible();
    }

    async verifyMandatoryPasswordField(value: string) {
        await UIActions.Actions.click(this.locators.passwordInput);
        await UIActions.Actions.pressTab(this.locators.passwordInput);
        await expect(this.locators.missingPasswordError).toBeVisible();

        await UIActions.Actions.fill(this.locators.passwordInput, value);
        await UIActions.Actions.pressTab(this.locators.passwordInput);
        await expect(this.locators.missingPasswordError).not.toBeVisible();
    }

    async login(email: string, password: string) {
        await UIActions.Actions.click(this.locators.loginButton);
        await UIActions.Actions.fill(this.locators.emailInput, email);
        await UIActions.Actions.fill(this.locators.passwordInput, password);
        await UIActions.Actions.click(this.locators.submitButton);
    }

    async closeLoginForm() {
        await UIActions.Actions.click(this.locators.closeLoginFormBtn);
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
}
