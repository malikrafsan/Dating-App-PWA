import { test, expect } from '@playwright/test';

test('can manage channel admin', async ({ page }) => {
    const data = {
        username: "admin",
        password: "admin",
        newChannel: "New Channel-" + Math.floor(Math.random() * 100000),
        modifiedNewChannel: "Modified New Channel-" + Math.floor(Math.random() * 100000),
    } as const;

    await page.goto('http://localhost:9000/');
    await page.goto('http://localhost:9000/login');
    await page.locator('#username-input').click();
    await page.locator('#username-input').fill(data.username);
    await page.locator('#password-input').click();
    await page.locator('#password-input').fill(data.password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('http://localhost:9000/channel');
    await expect(page).toHaveURL('http://localhost:9000/channel');

    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill(data.newChannel);
    await page.getByRole('button', { name: 'Add Channel' }).click();
    await page.waitForResponse('http://localhost:3000/university');

    await page.getByText(data.newChannel).click();
    await page.locator('#edit-channel-btn').click();
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill(data.modifiedNewChannel);
    await page.getByRole('button', { name: 'Save' }).click();
    const re = new RegExp('.*/university/.*');
    await page.waitForResponse(re);

    await page.getByText(data.modifiedNewChannel).click();
    await page.locator('#delete-channel-btn').click();

    await expect(page.locator('#channel-list')).not.toHaveText(data.modifiedNewChannel);
})
