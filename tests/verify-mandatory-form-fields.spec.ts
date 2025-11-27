import { test, expect, UIActions } from '../fixtures/baseFixtures';
import { HomePage } from '../pages/HomePage';

test('@smoke Verify Login form mandatory fields', async ({ pw, pages }) => {
    await pages.homePage.goto();
    await pages.loginPage.openLoginForm(pages.registrationPage);

    await pages.loginPage.verifyMandatoryEmailField('test@email.com');
    await pages.loginPage.verifyMandatoryPasswordField('Password@1');
});

test('@smoke Verify Email Format validation on Login form', async ({ pw, pages }) => {
    await pages.homePage.goto();
    await pages.loginPage.openLoginForm(pages.registrationPage);

    const invalidEmails = [
        'testemail',
        'testemail@domain',
        'testemail@domain.',
        'testemaildomain.com',
        '@domain.com',
        'testemail@.com'
    ];

    for (const email of invalidEmails) {
        await pages.loginPage.enterEmail(email);
        await UIActions.Actions.pressTab(pages.loginPage.locators.emailInput);
        await expect(pages.loginPage.locators.invalidEmailError).toBeVisible();
    }

    const validEmail = 'test.email@example.com';
    await pages.loginPage.enterEmail(validEmail);
    await UIActions.Actions.pressTab(pages.loginPage.locators.emailInput);
    await expect(pages.loginPage.locators.invalidEmailError).not.toBeVisible();
});

test('@smoke Verify clicking cross closes the Login form', async ({ pages }) => {
    await pages.homePage.goto();
    await pages.loginPage.openLoginForm(pages.registrationPage);

    await expect(pages.loginPage.locators.emailInput).toBeVisible();
    await pages.loginPage.closeLoginForm();
    await expect(pages.loginPage.locators.closeLoginFormBtn).not.toBeVisible();
});

test('@smoke Verify Registration form mandatory fields', async ({ pages }) => {
    await pages.homePage.goto();
    await pages.loginPage.openRegistrationForm(pages.registrationPage);

    await pages.registrationPage.validateAllRequiredFields({
        firstName: 'John',
        lastName: 'Doe',
        company: 'Example Corp',
        email: 'john.doe@example.com'
    });

});
