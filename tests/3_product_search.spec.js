const { test, expect } = require('@playwright/test')

test('Selecting a product from the product list', async ({ page }) => {

    const inputUserName = page.locator('#user-name')
    const inputPassword = page.locator('#password')

    await page.goto('https://www.saucedemo.com/')
    await expect(page).toHaveTitle(/Swag Labs/)

    await inputUserName.fill('standard_user')
    await inputPassword.fill('secret_sauce')
    await page.click('#login-button')

    const pageProducts = page.locator('.title')
    await expect(pageProducts).toHaveText('Products')

    await page.click('#item_1_title_link')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=1')

    const productName = page.locator('.inventory_details_name')
    await expect(productName).toHaveText('Sauce Labs Bolt T-Shirt')

    const productPrice = page.locator('.inventory_details_price')
    await expect(productPrice).toHaveText('$15.99')

    const productDescription = page.locator('.inventory_details_desc')
    await expect(productDescription).toHaveText('Get your testing superhero on with the Sauce Labs bolt T-shirt. From American Apparel, 100% ringspun combed cotton, heather gray with red bolt.')



})

