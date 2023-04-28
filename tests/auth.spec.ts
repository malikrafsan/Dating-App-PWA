import { test, expect } from '@playwright/test';

test('can login and logout as generated user', async ({ page }) => {
    const data = {
        username: "user1",
        password: "user1",
    } as const;

    await page.goto('http://localhost:9000/');
    await page.goto('http://localhost:9000/login');
    await page.locator('#username-input').click();
    await page.locator('#username-input').fill(data.username);
    await page.locator('#password-input').click();
    await page.locator('#password-input').fill(data.password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('http://localhost:9000/profile');
    await expect(page).toHaveURL('http://localhost:9000/profile');

    await page.getByRole('button', { name: 'Logout' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForURL('http://localhost:9000/login');
    await expect(page).toHaveURL('http://localhost:9000/login');
});

test('can login and logout as admin', async ({ page }) => {
    const data = {
        username: "admin",
        password: "admin",
    }

    await page.goto('http://localhost:9000/');
    await page.goto('http://localhost:9000/login');
    await page.locator('#username-input').click();
    await page.locator('#username-input').fill(data.username);
    await page.locator('#password-input').click();
    await page.locator('#password-input').fill(data.password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('http://localhost:9000/channel');
    await expect(page).toHaveURL('http://localhost:9000/channel');

    await page.getByRole('button', { name: 'Logout' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForURL('http://localhost:9000/login');
    await expect(page).toHaveURL('http://localhost:9000/login');
})

test('can register and login', async ({ page }) => {
    const data = {
        email: "malikakbar" + Math.floor(Math.random() * 100000) + "@gmail.com",
        username: "malik" + Math.floor(Math.random() * 100000),
        password: "malik" + Math.floor(Math.random() * 100000),
    } as const;

    await page.goto('http://localhost:9000/');
    await page.goto('http://localhost:9000/login');
    await page.getByRole('link', { name: 'Sign Up' }).click();
    await page.locator('#email-input').click();
    await page.locator('#email-input').fill(data.email);
    await page.locator('#username-input').click();
    await page.locator('#username-input').fill(data.username);
    await page.locator('#password-input').click();
    await page.locator('#password-input').fill(data.password);
    await page.locator('#confirm-password-input').click();
    await page.locator('#confirm-password-input').fill(data.password);
    await page.locator("#university-input > div").click();
    await page.locator('#react-select-2-input').press('Enter');
    await page.getByRole('button', { name: 'Sign Up' }).click();
    await page.waitForURL('http://localhost:9000/login');
    await page.locator('#username-input').click();
    await page.locator('#username-input').fill(data.username);
    await page.locator('#password-input').click();
    await page.locator('#password-input').fill(data.password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    await expect(page).toHaveURL('http://localhost:9000/profile');
});
