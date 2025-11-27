//tests/user-registration.spec.ts
import { expect, test } from '../fixtures/baseFixtures';
import { RegistrationPage } from '../pages/RegistrationPage.ts';
import { ResetPasswordPage } from '../pages/ResetPasswordPage.ts';
import { TempEmailPage } from '../pages/TempEmailPage';
import { generatePartialUser, TestUser } from '../tests/testData/user-registration-data.ts'

let registrationPage: RegistrationPage;
let resetPasswordPage: ResetPasswordPage;
let tempEmailPage: TempEmailPage;

test('@inprogress - Verify New user registration', async ({ pw, context, pages }) => {
    const partialUser = generatePartialUser();
    const user: TestUser = { ...partialUser };
    const userFirstName = partialUser.firstName;

    await test.step('Open registration page and prepare user data', async () => {
        registrationPage = pages.registrationPage;
        await registrationPage.goto();
        await registrationPage.declineCookiesBanner();
        await registrationPage.page.bringToFront();
    });

    const email = await test.step('Open temp-mail page and retrieve generated email', async ({ }) => {
        tempEmailPage = new TempEmailPage(await pw.context().newPage());
        await tempEmailPage.page.goto('https://temp-mail.org/en/');
        await tempEmailPage.page.bringToFront();

        await tempEmailPage.page.waitForFunction(() => {
            const el = document.querySelector<HTMLInputElement>('#mail');
            return el && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(el.value);
        }, { timeout: 30000 });

        return tempEmailPage.page.inputValue('#mail');
    });

    await test.step('Fill out and submit the registration form', async () => {
        await registrationPage.page.bringToFront();
        await registrationPage.fillRegistrationForm(user);
        await registrationPage.enterEmailAddress(email);
        await registrationPage.clickSubmitButton();
        await registrationPage.waitForAccountSuccessPage();
        await registrationPage.waitForSuccessHeading('Account Created');
    });

    const passwordResetHref = await test.step('Retrieve password reset link from temp mail inbox', async () => {
        await tempEmailPage.page.bringToFront();

        await tempEmailPage.clickPasswordResetSubject();
        const href = await tempEmailPage.getPasswordResetLink();
        if (href == null) {
            throw new Error('Password reset link href not found');
        } else {
            return href;
        }

    });

    await test.step('Open password reset page and set new password', async () => {
        resetPasswordPage = new ResetPasswordPage(await pw.context().newPage());
        await resetPasswordPage.goto(passwordResetHref);

        const newPassword = 'Password!9';
        await resetPasswordPage.resetPasswordFlow(newPassword);
    });

    await test.step('Log in with newly created account and verify greeting', async () => {
        await registrationPage.page.bringToFront();
        await pages.loginPage.goto();
        await pw.waitForLoadState('networkidle');
        await pages.loginPage.login(email, 'Password!9');
        await pw.waitForLoadState('networkidle');
        await pages.loginPage.hoverOnProfileIcon();
        pages.loginPage.getTooltipGreeting(userFirstName);
    });
});


