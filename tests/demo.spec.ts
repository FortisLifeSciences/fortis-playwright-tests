import { test } from '../fixtures/baseFixtures';
import { expect } from '@playwright/test';

test('@smoke - Login with invalid credentials shows error', async ({ page }) => {
    await page.goto('https://preprod.fortislife.com/');
    await page.getByRole('searchbox', { name: 'Submit' }).click();
    await page.locator('iframe[title="Cookie banner"]').contentFrame().getByRole('button', { name: 'Decline' }).click();
    await page.getByRole('searchbox', { name: 'Submit' }).click();
    await page.getByRole('searchbox', { name: 'Submit' }).fill('anti body');
    await page.getByRole('searchbox', { name: 'Submit' }).press('Enter');
});