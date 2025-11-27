// pages/CartPage.ts
import { Page, Locator, expect } from '@playwright/test';
import * as UIActions from '../utils/actions';
import { LocatorFactory } from '../locators/locatorFactory';

export class CartPage {

    readonly page: Page;
    readonly locators: Record<string, Locator>;
    productCode: any;
    productPrice: any;

    constructor(page: Page) {
        this.page = page;
        const factory = new LocatorFactory(page);
        this.locators = factory.getPageLocators('cartPage');
    }

    async goto() {
        await this.page.goto('/cart');
        await this.page.waitForLoadState('networkidle', { timeout: 30000 });
        // const cartPageHeading = await UIActions.Actions.getText();
    }

    async editQuantity(qtyStr: string) {
        UIActions.Actions.waitForPageToLoad(this.page, 30000);
        await UIActions.Actions.type(this.locators.quantityInput, qtyStr);
        await UIActions.Actions.pressTab(this.locators.quantityInput, qtyStr);
    }

    async getSubtotalPrice() {
        UIActions.Actions.waitForPageToLoad(this.page, 30000);
        return await UIActions.Actions.getText(this.locators.subTotalValue);
    }

    async waitForSubtotalToBe(expectedPrice: string, timeout = 10000) {
        await expect(this.locators.subTotalValue).toHaveText(expectedPrice, { timeout });
    }

    async clickCheckoutButton() {
        await UIActions.Actions.click(this.locators.checkoutButton);
    }

    async fillShippingAddress(data: {
        firstName: string;
        lastName: string;
        company: string;
        phone: string;
        street: string;
        city: string;
        state: string;
        zip: string;
    }) {
        await UIActions.Actions.type(this.locators.firstNameInput, data.firstName);
        await UIActions.Actions.type(this.locators.lastNameInput, data.lastName);
        await UIActions.Actions.type(this.locators.companyInput, data.company);
        await UIActions.Actions.type(this.locators.phoneInput, data.phone);
        await UIActions.Actions.type(this.locators.streetInput, data.street);
        await UIActions.Actions.type(this.locators.cityInput, data.city);

        await UIActions.Actions.pressDownArrow(this.locators.stateDropdown, 'ArrowDown'); // or select dynamically if needed
        await UIActions.Actions.type(this.locators.zipInput, data.zip);
        await UIActions.Actions.click(this.locators.saveAddressButton);
    }

    async selectShippingMethod() {
        await UIActions.Actions.check(this.locators.shippingRadio);
    }

    async selectPaymentType(index = 1) {
        await this.locators.paymentTypeOption.locator('span').nth(index).click();
    }

    async addNewCard(data: {
        cardNum: string;
        cardExpiry: string;
        cardCVV: string;
    }) {
        await UIActions.Actions.click(this.locators.addNewCardButton);
        await UIActions.Actions.type(this.locators.cardNumberInput, data.cardNum);
        await UIActions.Actions.type(this.locators.expiryInput, data.cardExpiry);
        await UIActions.Actions.type(this.locators.cvvInput, data.cardCVV);
    }

    async acceptShippingCheckbox() {
        await this.page.waitForTimeout(10000);

        // const shippingCheckBox = await UIActions.Actions.isCheckboxChecked(this.locators.shippingCheckbox);
        const shippingCheckBox = await this.page.locator('input[name="Use my shipping address"]').isChecked();
        await this.page.waitForTimeout(10000);

        console.log(`shippingCheckBox >>>>>>>>>>>>>>> ${shippingCheckBox}`);
        if (shippingCheckBox == false) {
            await UIActions.Actions.check(this.locators.shippingCheckbox);
            await expect(this.locators.shippingCheckbox).toBeChecked();

        }
    }

    async acceptTermsAndConditions() {
        await UIActions.Actions.check(this.locators.termsCheckbox);
    }

    async clickContinue() {
        await UIActions.Actions.click(this.locators.continueButton);
    }

    async placeOrder() {
        await UIActions.Actions.click(this.locators.placeOrderButton);
    }

    async verifyOrderSuccess(expectedAmount: string) {
        await expect(this.locators.thankYouHeading).toBeVisible();
        await expect(this.locators.totalPriceHeading).toHaveText(expectedAmount);
    }

    async isShippingAddressSaved(): Promise<boolean> {
        await UIActions.Actions.waitForPageToLoad(this.page, 30000);
        return await this.locators.savedAddressCard.isVisible({ timeout: 30000 });
    }

    async clickAddNewCardButton() {
        await this.page.getByRole('button', { name: 'Add New Card' }).click();
    }

    async fillCardNumber(card: string) {
        await this.page.getByRole('textbox', { name: 'Card Number' }).fill(card);
    }

    async fillExpiry(expiry: string) {
        await this.page.getByRole('textbox', { name: 'Expires (MM/YYYY)' }).fill(expiry);
    }

    async fillCVV(cvv: string) {
        await this.page.getByRole('textbox', { name: 'CVV Code' }).fill(cvv);
    }

    async clickSaveAddressButton() {
        await this.page.getByRole('button', { name: 'save address' }).click();
    }

    async verifyAndGetCreditCardInfo(): Promise<{ cardType: string; lastFour: string; expiry: string }> {
        await this.locators.creditCardInfo.waitFor({ state: 'visible', timeout: 15000 });
        const text = await UIActions.Actions.getText(this.locators.creditCardInfo);
        const regex = /^(\w+)\s+ending\s+(\d{4})\s+\(expires\s+(\d{2}\/\d{4})\)$/;
        const match = text?.match(regex);
        if (!match) {
            throw new Error(`Credit card info text did not match expected pattern. Actual text: "${text}"`);
        }

        const [, cardType, lastFour, expiry] = match;
        console.log(`Card Type: ${cardType}, Last 4: ${lastFour}, Expiry: ${expiry}`);
        return { cardType, lastFour, expiry };
    }

    async checkTermsCheckbox() {
        await expect(this.locators.checkOutHeading).toHaveText('Checkout');
        await this.page.getByRole('checkbox', { name: 'termsConditions' }).check();
    }

    async getOrderNumber(): Promise<string> {
        const text = await UIActions.Actions.getText(this.locators.orderNumberText);
        const fullMatch = text?.match(/Order #(\d+) was placed successfully\./);
        if (!fullMatch) {
            throw new Error(`Expected confirmation text not found or format mismatch. Actual text: "${text}"`);
        }
        return fullMatch[1];
    }


    async clickPlaceOrderButton() {
        await UIActions.Actions.click(this.locators.placeOrderButton);
        await expect(this.locators.orderConfirmationText).toBeVisible();
        const orderNumberText = await UIActions.Actions.getText(this.locators.orderConfirmationText);
        console.log('Full confirmation text:', orderNumberText);
        const match = orderNumberText?.match(/#(\d+)/);
        if (match) {
            const orderNumber = match[1];
            console.log('Extracted order number:', orderNumber);
        } else {
            console.log('Order number not found!');
        }
        await expect(this.locators.orderConfirmationText).toHaveText(/Order #\d+ was placed successfully\./);
    }



}
