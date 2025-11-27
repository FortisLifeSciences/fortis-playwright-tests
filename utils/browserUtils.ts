import { BrowserContext, Page } from '@playwright/test';

export async function createNewTab(context: BrowserContext, url: string): Promise<Page> {
    const newPage = await context.newPage();
    await newPage.goto(url);
    return newPage;
}


export async function switchToTab(page: Page): Promise<void> {
    await page.bringToFront();
}
