import { test, expect } from '@playwright/test';

const convertDate = (date: { day: number, month: number, year: number }) => {
    const formattedDay = date.day < 10 ? `0${date.day}` : date.day;
    const formattedMonth = date.month < 10 ? `0${date.month}` : date.month;
    return `${date.year}-${formattedMonth}-${formattedDay}`;
}

const dateFormatString = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
    });
};

test('can change profile', async ({ page }) => {
    const data = {
        username: "user1",
        password: "user1",
        newName: "user1-" + Math.floor(Math.random() * 100000),
        newBOD: {
            day: Math.floor(Math.random() * 28) + 1,
            month: Math.floor(Math.random() * 12) + 1,
            year: Math.floor(Math.random() * 100) + 1900,
        },
        newSex: Math.random() > 0.5 ? "MALE" : "FEMALE",
        newDesc: "this is a new description, random number: " + Math.floor(Math.random() * 100000),
    } as const;

    const newBOD = convertDate(data.newBOD);
    const newIdxSex = "MALE" === data.newSex ? 0 : 1;
    console.log("newBOD", newBOD);

    await page.goto('http://localhost:9000/');
    await page.goto('http://localhost:9000/login');
    await page.locator('#username-input').click();
    await page.locator('#username-input').fill(data.username);
    await page.locator('#password-input').click();
    await page.locator('#password-input').fill(data.password);
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('http://localhost:9000/profile');

    await page.locator('#btn-edit-profile').click();
    await page.locator('#profile-name-input').click();
    await page.locator('#profile-name-input').fill(data.newName);

    await page.locator('#profile-sex-input svg').nth(1).click();
    await page.locator('#react-select-2-input').press('Control+a');
    await page.locator('#react-select-2-input').fill('');
    await page.locator('#react-select-2-option-' + newIdxSex).click();

    await page.locator('#profile-birthday-input').fill(newBOD);
    await page.locator('#profile-desc-input').click();
    await page.locator('#profile-desc-input').fill(data.newDesc);
    await page.getByRole('button', { name: 'Save' }).click();

    // create regexp to match url with endpoint */user/profile
    const re = new RegExp('.*/user/profile');
    await page.waitForResponse(re);

    const name = await page.locator("#profile-name").innerText();
    expect(name).toBe(data.newName);

    const date = await page.locator("#profile-birthday").innerText();
    expect(date).toBe(dateFormatString(newBOD));

    const desc = await page.locator("#profile-desc").innerText();
    expect(desc).toBe(data.newDesc);

    const sex = await page.locator("#profile-sex").innerText();
    expect(sex).toBe(data.newSex);
});
