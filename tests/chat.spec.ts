import { test, expect } from '@playwright/test';

test('can send message and receive message', async ({ page }) => {
    const data = {
        user1: {
            username: "user1",
            password: "user1",
        },
        user2: {
            username: "user2",
            password: "user2",
        },
        chat: "This is chat test-" + Math.floor(Math.random() * 100000),
    } as const;

    await page.goto('http://localhost:9000/');
    await page.goto('http://localhost:9000/login');
    await page.locator('#username-input').click();
    await page.locator('#username-input').fill(data.user1.username);
    await page.locator('#password-input').click();
    await page.locator('#password-input').fill(data.user1.password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('http://localhost:9000/profile');

    await page.locator("#bottom-nav-right").click();
    const re = new RegExp('.*/chat');
    await page.waitForResponse(re);
    await page.locator("#matchlist-0").click();
    const reChat = new RegExp('.*/chat/.*/message');
    await page.waitForResponse(reChat);

    await page.getByPlaceholder('Type your message here').click();
    await page.getByPlaceholder('Type your message here').fill(data.chat);
    await page.locator("#send-button").click();
    
    await page.locator("#bottom-nav-left").click();
    await page.getByRole('button', { name: 'Logout' }).click();
    await page.getByRole('button', { name: 'Yes' }).click();
    await page.waitForURL('http://localhost:9000/login');
    await page.locator('#username-input').click();
    await page.locator('#username-input').fill(data.user1.username);
    await page.locator('#password-input').click();
    await page.locator('#password-input').fill(data.user1.password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('http://localhost:9000/profile');

    await page.locator("#bottom-nav-right").click();
    await page.waitForResponse(re);
    await page.locator("#matchlist-0").click();
    await page.waitForResponse(reChat);

    const msgs = await page.locator(".chat-msg").elementHandles();
    const lastMsg = await msgs[msgs.length - 1].innerText();
    console.log("lastMsg",lastMsg);
    expect(lastMsg).toBe(data.chat);    
});
