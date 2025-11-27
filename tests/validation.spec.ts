import { expect, test } from '../fixtures/baseFixtures';

test('@smoke Verify Products mega menu', async ({ pages, pw }) => {
    await pages.homePage.goto();
    const productsMenu = pw.getByTestId('mega-menu-container').getByRole('heading', { name: 'Products' });
    await productsMenu.hover();
    const productsSubmenu = pw.locator('[data-testid="mega-menu-products-section"] h3');
    await pw.waitForTimeout(10000);
    await expect(productsSubmenu).toHaveText('Products');
    await expect(productsSubmenu).toBeVisible();
    await pw.getByRole('button', { name: 'Login' }).hover();
});

test('@smoke Verify Services mega menu', async ({ pages, pw }) => {
    await pages.homePage.goto();
    await pw.getByTestId('mega-menu-container').getByRole('heading', { name: 'Services' }).click();
    const serviceHeading = await pw.locator('h3').innerText();
    expect(serviceHeading).toBe("Services");
    await pw.getByRole('button', { name: 'Login' }).hover();
});

test('@smoke Verify Learning Center mega menu', async ({ pages, pw }) => {
    await pages.homePage.goto();
    await pw.getByTestId('mega-menu-container').getByRole('heading', { name: 'Learning Center' }).click();
    const learningCenterHeading = await pw.locator('h3').innerText();
    expect(learningCenterHeading).toBe("Learning Center");
    await pw.getByRole('button', { name: 'Login' }).hover();
});


test('@smoke Verify About Fortis mega menu', async ({ pages, pw }) => {
    await pages.homePage.goto();
    await pw.getByTestId('mega-menu-container').getByRole('heading', { name: 'About Fortis' }).click();
    const aboutFortisHeading = await pw.locator('h3').innerText();
    expect(aboutFortisHeading).toBe("About Fortis");
    await pw.getByRole('button', { name: 'Login' }).hover();
});





