import { expect, Locator, Page } from '@playwright/test';
import { Logger } from '../utils/logger';


export class Actions {

    static async click(locator: Locator, description?: string) {
        Logger.info(`Clicking on ${description ?? locator.toString()}`);
        await locator.waitFor({ state: 'visible' });
        await locator.click();
    }

    static async type(locator: Locator, text: string, description?: string) {
        Logger.info(`Typing '${text}' into ${description ?? locator.toString()}`);
        await locator.waitFor({ state: 'visible', timeout: 60_000 });
        await locator.fill('');  // clear if needed
        await locator.fill(text);
    }


    static async getText(locator: Locator, description?: string): Promise<string> {
        await locator.waitFor({ state: 'visible' });
        const text = await locator.textContent();
        Logger.info(`Text from ${description ?? locator.toString()}: ${text}`);
        return text ?? '';
    }

    static async hover(locator: Locator, description?: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.hover();
        Logger.info(`Hovered on ${description ?? locator.toString()}`);
    }

    static async fill(locator: Locator, text: string, description?: string) {
        Logger.info(`Filling '${text}' into ${description ?? locator.toString()}`);
        await locator.waitFor({ state: 'visible' });
        await locator.fill(text);
    }

    static async check(locator: Locator, description?: string): Promise<void> {
        Logger.info(`Checking checkbox ${description ?? locator.toString()}`);
        await locator.waitFor({ state: 'visible' });
        await locator.check();
    }

    static async isCheckboxChecked(locator: Locator, description?: string): Promise<boolean> {
        Logger.info(`Is Checkbox checked ${description ?? locator.toString()}`);
        await locator.waitFor({ state: 'visible' });
        return await locator.isChecked();
    }

    static async waitForURL(page: Page, urlPart: string, timeout = 10000): Promise<void> {
        Logger.info(`Waiting for URL to contain: ${urlPart}`);
        await page.waitForURL(`**${urlPart}**`, { timeout });
    }

    static async getCurrentUrl(page: Page): Promise<string> {
        const url = page.url();
        Logger.info(`Current URL: ${url}`);
        return url;
    }

    static async urlContains(page: Page, expectedSubstring: string): Promise<boolean> {
        const currentUrl = page.url();
        Logger.info(`Checking if URL contains '${expectedSubstring}': ${currentUrl}`);
        return currentUrl.includes(expectedSubstring);
    }

    static async urlEquals(page: Page, expectedUrl: string): Promise<boolean> {
        const currentUrl = page.url();
        Logger.info(`Checking if URL equals '${expectedUrl}': ${currentUrl}`);
        return currentUrl === expectedUrl;
    }

    static async goto(page: Page, expectedUrl: string): Promise<void> {
        page.goto(expectedUrl);
        Logger.info(`Go to this URL '${expectedUrl}'`);
    }

    static async pressEnter(locator: Locator, description?: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.press('Enter');
        Logger.info(`Pressed Enter on ${description ?? locator.toString()}`);
    }

    static async pressTab(locator: Locator, description?: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.press('Tab');
        Logger.info(`Pressed Tab on ${description ?? locator.toString()}`);
    }

    static async pressDownArrow(locator: Locator, description?: string): Promise<void> {
        await locator.waitFor({ state: 'visible' });
        await locator.press('ArrowDown');
        Logger.info(`Pressed Tab on ${description ?? locator.toString()}`);
    }

    static async pressEnterOnPage(page: Page): Promise<void> {
        await page.keyboard.press('Enter');
        Logger.info('Pressed Enter on page');
    }

    static async isTextPresent(
        page: Page,
        text: string | RegExp,
        timeout = 5000
    ): Promise<boolean> {
        try {
            await page.getByText(text).first().waitFor({ timeout });
            Logger.info(`Text "${text}" is present on the page.`);
            return true;
        } catch {
            Logger.warn(`Text "${text}" NOT found on the page after ${timeout}ms.`);
            return false;
        }
    }

    static async isPresent(locator: Locator, description?: string, timeout = 5000): Promise<boolean> {
        try {
            await locator.waitFor({ state: 'attached', timeout });
            Logger.info(`Element present in DOM: ${description ?? locator.toString()}`);
            return true;
        } catch {
            Logger.warn(`Element NOT present in DOM after ${timeout}ms: ${description ?? locator.toString()}`);
            return false;
        }
    }

    static async waitForPageToLoad(page: Page, milliSeconds: number) {
        await page.waitForLoadState('networkidle', { timeout: milliSeconds });
    }

}