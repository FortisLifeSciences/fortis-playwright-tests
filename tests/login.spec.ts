import { test } from '../fixtures/baseFixtures';
import { expect } from '@playwright/test';

test('@smoke - Login with invalid credentials shows error', async ({ pages }) => {
    await pages.loginPage.goto();
    await pages.loginPage.login('invalid@email.com', 'wrongpass');
    const errorText = await pages.loginPage.getErrorMessage();
    expect(errorText).toContain('You have entered an invalid username or password.');
});

test('@smoke Login with valid credentials and verify user name', async ({ pages }) => {
    await pages.loginPage.goto();
    await pages.loginPage.login('fn001fort@mailinator.com', '!SimpleScience25');

    const userName = 'FN001';
    await pages.loginPage.hoverOnProfileIcon();
    const greetingLocator = pages.loginPage.getTooltipGreeting(userName);
    await expect(greetingLocator).toBeVisible();
    await expect(greetingLocator).toHaveText(`Hi, ${userName}`);

    await pages.loginPage.clickOnProfileIcon();
    await pages.myAccountPage.logout();
});
