import { expect, test } from '../fixtures/baseFixtures.ts';

test('@wip - Login and order a product', async ({ pw, pages }) => {

    await test.step('Login', async () => {
        await pages.loginPage.goto();
        await pages.loginPage.login('fn001fort@mailinator.com', '!SimpleScience25');
    });

    await test.step('Search and add product to cart', async () => {
        await pages.homePage.searchAProduct('anti body');
        await pages.homePage.clickFirstProduct();
        const productPrice = await pages.productPage.getPriceAndCode();
        await pages.productPage.clickAddToCart();
        await pages.productPage.clickGoToCart();
        await pages.cartPage.editQuantity('1');
        await expect(pages.cartPage.locators.subTotalValue).toHaveText(productPrice);
    });

    await test.step('Proceed to Checkout', async () => {
        await pages.cartPage.clickCheckoutButton();
    });

    await test.step('Click Continue after FedEx ', async () => {
        await pages.cartPage.clickContinue();
    });

    await test.step('Add new credit card', async () => {
        await pages.cartPage.addNewCard({
            cardNum: '4242424242424242',
            cardExpiry: '10/2035',
            cardCVV: '111'
        });
    });

    await test.step('Use shipping address the same as new card address', async () => {
        await pages.cartPage.acceptShippingCheckbox();
        await pages.cartPage.clickSaveAddressButton();
    });

    await test.step('Click Continue after adding card as payment method ', async () => {
        await pages.cartPage.verifyAndGetCreditCardInfo();
        await pages.cartPage.clickContinue();
    });

    await test.step('Agree to sales terms ', async () => {
        await expect(pages.cartPage.locators.checkOutHeading).toHaveText('Checkout');
        await expect(pages.cartPage.locators.reviewOrderHeading).toHaveText('Review Order');
        await pages.cartPage.acceptTermsAndConditions();
    });

    await test.step('Place order ', async () => {
        await pages.cartPage.clickPlaceOrderButton();
    });




});
