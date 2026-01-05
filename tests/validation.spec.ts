import { expect, test } from '../fixtures/baseFixtures';

test('@smoke Verify Products mega menu', async ({ pages, pw }) => {
    await pages.homePage.goto();
    const productsMenu = pw.getByTestId('mega-menu-container').getByRole('heading', { name: 'Products' });
    await productsMenu.hover();
    //const productsSubmenu = pw.locator('[data-testid="mega-menu-products-section"] h3');
    const productsSubmenu = pw.locator('//h3[@class="MuiTypography-root MuiTypography-h3 mui-style-1t6jjjd"]'); // Added by to get locator value by xpath
    await pw.waitForTimeout(10000);
    await expect(productsSubmenu).toHaveText('Products');
    await expect(productsSubmenu).toBeVisible();
    await pw.getByRole('button', { name: 'Login' }).hover();
});

test('@smoke Verify Services mega menu', async ({ pages, pw }) => {
    await pages.homePage.goto();
    //Code added to solve issue
    const servicesMenu = pw.getByTestId('mega-menu-container').getByRole('heading', { name: 'Services' });
    await servicesMenu.click();
    await expect(servicesMenu).toBeVisible();
    //await pw.getByTestId('mega-menu-container').getByRole('heading', { name: 'Services' }).click();
    //const serviceHeading = await pw.locator('h3').innerText();
    /*expect(serviceHeading).toBe("Services");
    await pw.getByRole('button', { name: 'Login' }).hover();*/
});

test('@smoke Verify Learning Center mega menu', async ({ pages, pw }) => {
    await pages.homePage.goto();
    //Code added to solve issue
    const learningCenterMenu = pw.getByTestId('mega-menu-container').getByRole('heading', { name: 'Learning Center' });
    await learningCenterMenu.click();
    await expect(learningCenterMenu).toBeVisible();

    /*await pw.getByTestId('mega-menu-container').getByRole('heading', { name: 'Learning Center' }).click();
    const learningCenterHeading = await pw.locator('h3').innerText();
    expect(learningCenterHeading).toBe("Learning Center");
    await pw.getByRole('button', { name: 'Login' }).hover();*/
});


test('@smoke Verify About Fortis mega menu', async ({ pages, pw }) => {
    await pages.homePage.goto();
    //Code added to solve issue
    const aboutFortisMenu = pw.getByTestId('mega-menu-container').getByRole('heading', { name: 'About Fortis' });
    await aboutFortisMenu.click();
    await expect(aboutFortisMenu).toBeVisible();
    /*await pw.getByTestId('mega-menu-container').getByRole('heading', { name: 'About Fortis' }).click();
    const aboutFortisHeading = await pw.locator('h3').innerText();
    expect(aboutFortisHeading).toBe("About Fortis");
    await pw.getByRole('button', { name: 'Login' }).hover();*/
});





