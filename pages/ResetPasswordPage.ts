// pages/RegistrationPage.ts
import { Page, Locator, expect } from '@playwright/test';
import * as UIActions from '../utils/actions';
import { LocatorFactory } from '../locators/locatorFactory';

export class ResetPasswordPage {
    readonly page: Page;
    readonly locators: Record<string, Locator>;

    constructor(page: Page) {
        this.page = page;
        const factory = new LocatorFactory(page);
        this.locators = factory.getPageLocators('resetPasswordPage');
    }

    async goto(resetHref: string) {
        await UIActions.Actions.goto(this.page, resetHref);
    }

    async enterNewPassword(password: string) {
        await UIActions.Actions.fill(this.locators.newPasswordInput, password);
    }

    async enterConfirmPassword(password: string) {
        await UIActions.Actions.fill(this.locators.confirmPasswordInput, password);
    }

    async clickResetPasswordButton() {
        await UIActions.Actions.click(this.locators.resetPasswordButton);
    }

    async waitForSuccessHeading() {
        await UIActions.Actions.isPresent(this.locators.successHeading);
    }

    async waitForLoginButton() {
        await UIActions.Actions.isPresent(this.locators.loginButton);
    }

    async resetPasswordFlow(newPassword: string) {
        await this.enterNewPassword(newPassword);
        await this.enterConfirmPassword(newPassword);
        await this.clickResetPasswordButton();
        await this.waitForSuccessHeading();
        await this.waitForLoginButton();
    }

}
