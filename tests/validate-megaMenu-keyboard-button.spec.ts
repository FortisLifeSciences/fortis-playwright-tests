import { test, expect, UIActions } from '../fixtures/baseFixtures';
import { MegaMenu } from '../pages/MegaMenu';

test('@smoke Mega menu keyboard navigation', async ({ pages, pw }) => {

    await test.step('Navigate from homepage to "Diagnostic Components" using keyboard', async () => {
        await pages.homePage.goto();
        await pages.megaMenu.searchBoxClick();

        await test.step('Focus on "Products" heading', async () => {
            const productsFocused = await pages.megaMenu.focusHeading('Products');
            expect(productsFocused, '"Products" heading should be focused').toBeTruthy();
        });

        await test.step('Focus on "Diagnostic Components"', async () => {
            const diagnosticFocused = await pages.megaMenu.focusElementByText('Diagnostic Components');
            expect(diagnosticFocused, '"Diagnostic Components" should be focused').toBeTruthy();
            await UIActions.Actions.pressEnterOnPage(pw);
        });
    });

    await test.step('Select "Control Swabs" submenu', async () => {
        const subMenuText = await pages.megaMenu.selectSubMenu('Control Swabs');
        expect(subMenuText).toBe('Control Swabs');
    });
});
