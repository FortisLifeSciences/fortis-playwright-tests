import { expect, test } from '../fixtures/baseFixtures';

test.describe('@smoke Mega Menu Tests', () => {

    test('@smoke Verify Products mega menu', async ({ pages, pw }) => {
        await pages.homePage.goto();
        await pages.megaMenu.openMenu('Products', 'hover');
        await pages.megaMenu.verifyMenuHeading('Products');
        await pages.megaMenu.hoverLoginButton();
    });

    test('@smoke Verify Services mega menu', async ({ pages }) => {
        await pages.homePage.goto();
        await pages.megaMenu.openMenu('Services', 'hover');
        await pages.megaMenu.verifyMenuHeading('Services');
        await pages.megaMenu.hoverLoginButton();
    });

    test('@smoke Verify Learning Center mega menu', async ({ pages }) => {
        await pages.homePage.goto();
        await pages.megaMenu.openMenu('Learning Center', 'hover');
        await pages.megaMenu.verifyMenuHeading('Learning Center');
        await pages.megaMenu.hoverLoginButton();
    });

    test('@smoke Verify About Fortis mega menu', async ({ pages }) => {
        await pages.homePage.goto();
        await pages.megaMenu.openMenu('About Fortis', 'hover');
        await pages.megaMenu.verifyMenuHeading('About Fortis');
        await pages.megaMenu.hoverLoginButton();
    });

});




