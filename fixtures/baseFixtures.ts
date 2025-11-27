// fixtures/baseFixtures.ts
import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { MegaMenu } from '../pages/MegaMenu';
import { RegistrationPage } from '../pages/RegistrationPage';
import { TempEmailPage } from '../pages/TempEmailPage';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import * as UIActions from '../utils/actions';

type Pages = {
    loginPage: LoginPage;
    myAccountPage: MyAccountPage;
    registrationPage: RegistrationPage;
    megaMenu: MegaMenu;
    tempEmailPage: TempEmailPage;
    homePage: HomePage;
    productPage: ProductPage;
    cartPage: CartPage;
};

type Fixtures = {
    pw: Page;
    pages: Pages;
};

export const test = base.extend<Fixtures>({
    pw: async ({ page }, use) => {
        await use(page);
    },

    pages: async ({ page }, use) => {
        const pages: Pages = {
            loginPage: new LoginPage(page),
            myAccountPage: new MyAccountPage(page),
            registrationPage: new RegistrationPage(page),
            megaMenu: new MegaMenu(page),
            tempEmailPage: new TempEmailPage(page),
            homePage: new HomePage(page),
            productPage: new ProductPage(page),
            cartPage: new CartPage(page),
        };

        await use(pages);
    }
});

export { expect, UIActions };
