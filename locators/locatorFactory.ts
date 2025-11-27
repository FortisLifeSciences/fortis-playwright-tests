import type { Page, Locator } from '@playwright/test';
import { locators } from './locators';

type ARIARole = 'button' | 'textbox' | 'checkbox' | 'heading';

type RoleValue = { role: ARIARole; name: string };


type LocatorDef =
    | { type: 'role'; value: RoleValue }
    | { type: 'testId'; value: string }
    | { type: 'text'; value: string }
    | { type: 'css'; value: string }
    | { type: 'xpath'; value: string }

type PageLocators<T extends keyof typeof locators> = typeof locators[T];
type LocatorKey<T extends keyof typeof locators> = keyof PageLocators<T>;

export class LocatorFactory {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private resolveLocator(def: LocatorDef): Locator {
        switch (def.type) {
            case 'role':
                return this.page.getByRole(def.value.role, { name: def.value.name });
            case 'testId':
                return this.page.getByTestId(def.value);
            case 'text':
                return this.page.getByText(def.value);
            case 'css':
                return this.page.locator(def.value);
            case 'xpath':
                return this.page.locator(def.value);
            // return this.page.locator(`xpath=${def.value}`);
            default:
                throw new Error(`Unknown locator type: ${(def as any).type}`);
        }
    }

    getPageLocators<T extends keyof typeof locators>(
        pageName: T
    ): Record<keyof typeof locators[T], Locator> {
        const pageLocators = locators[pageName];
        const resolvedLocators = {} as Record<keyof typeof locators[T], Locator>;

        for (const key in pageLocators) {
            const def = pageLocators[key as keyof typeof locators[T]];
            resolvedLocators[key as keyof typeof locators[T]] = this.resolveLocator(
                def as LocatorDef
            );
        }

        return resolvedLocators;
    }

    getLocator<T extends keyof typeof locators>(
        pageName: T,
        locatorKey: keyof typeof locators[T]
    ): Locator {
        const pageLocators = locators[pageName];
        const locatorDef = pageLocators[locatorKey];

        return this.resolveLocator(locatorDef as LocatorDef);
    }
}
