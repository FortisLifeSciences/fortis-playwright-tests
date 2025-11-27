// pages/RegistrationPage.ts
import { Page, Locator, expect } from '@playwright/test';
import * as UIActions from '../utils/actions';
import { LocatorFactory } from '../locators/locatorFactory';

export class RegistrationPage {
    readonly page: Page;
    readonly locators: Record<string, Locator>;

    constructor(page: Page) {
        this.page = page;
        const factory = new LocatorFactory(page);
        this.locators = factory.getPageLocators('registrationPage');
    }

    async goto() {
        await this.page.goto('/');
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
        this.closePromotionPopup();
    }

    async declineCookiesBanner() {
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

    private async validateRequiredField(fieldName: string, value: string) {
        let input: Locator;
        let error: Locator;

        switch (fieldName) {
            case 'First Name':
                input = this.locators.firstNameInput;
                error = this.locators.firstNameError;
                break;

            case 'Last Name':
                input = this.locators.lastNameInput;
                error = this.locators.lastNameError;
                break;

            case 'Company':
            case 'Company, Institution or Organization':
                input = this.locators.companyInput;
                error = this.locators.companyError;
                break;

            case 'Email Address':
                input = this.locators.emailInput;
                error = this.locators.emailError;
                break;

            default:
                throw new Error(`Unknown field name: ${fieldName}`);
        }

        // Perform validation sequence
        await UIActions.Actions.click(input, `${fieldName} input`);
        await UIActions.Actions.pressTab(input);
        await expect(error, `${fieldName} required error should appear`).toBeVisible();

        await UIActions.Actions.type(input, value, `${fieldName} input`);
        await UIActions.Actions.pressTab(input);
        await expect(error, `${fieldName} required error should disappear`).not.toBeVisible();
    }

    async validateAllRequiredFields(data: { firstName: string; lastName: string; company: string; email: string }) {
        await this.validateRequiredField('First Name', data.firstName);
        await this.validateRequiredField('Last Name', data.lastName);
        await this.validateRequiredField('Company, Institution or Organization', data.company);
        await this.validateRequiredField('Email Address', data.email);
    }

    async clickLoginButton() {
        await UIActions.Actions.click(this.locators.loginButton);
    }

    async clickCreateAccountButton() {
        await UIActions.Actions.click(this.locators.createAccountButton);
    }

    async fillFirstName(firstName: string) {
        await UIActions.Actions.fill(this.locators.firstNameInput, firstName);
    }

    async fillLastName(lastName: string) {
        await UIActions.Actions.fill(this.locators.lastNameInput, lastName);
    }

    async fillCompany(company: string) {
        await UIActions.Actions.fill(this.locators.companyInput, company);
    }

    async fillEmail(email: string) {
        await UIActions.Actions.fill(this.locators.emailInput, email);
    }

    async acceptTermsAndConditions() {
        await UIActions.Actions.check(this.locators.termsCheckbox);
    }

    async clickSubmitButton() {
        await UIActions.Actions.click(this.locators.submitButton);
    }

    async waitForAccountSuccessPage() {
        return await UIActions.Actions.waitForURL(this.page, '/account-success');
    }

    async waitForSuccessHeading(expectedText: string): Promise<boolean> {
        const actualText = await UIActions.Actions.getText(this.locators.successHeading, 'Success heading');
        return actualText.includes(expectedText);
    }

    async fillRegistrationForm(user: {
        firstName: string;
        lastName: string;
        companyName: string;
        // email: string;
    }) {
        await this.clickLoginButton();
        await this.clickCreateAccountButton();

        await this.fillFirstName(user.firstName);
        await this.fillLastName(user.lastName);
        await this.fillCompany(user.companyName);
        await this.acceptTermsAndConditions();
    }

    async enterEmailAddress(email: string) {
        await this.fillEmail(email);
    }

}
