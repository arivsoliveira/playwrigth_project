const { test, expect } = require('@playwright/test')

async function login(page, username, password) {

    const inputUserName = page.locator('#user-name')
    const inputPassword = page.locator('#password')
    
    await inputUserName.fill(username)
    await inputPassword.fill(password)
    await page.click('#login-button')
  }
  
async function verifyTitle(page) {
  
    await expect(page).toHaveTitle(/Swag Labs/)
  }

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/')
    await verifyTitle(page)
});

    test('Adding a product to cart from the product page', async ({ page }) => {
   
    await login(page, 'standard_user', 'secret_sauce')

    const pageProducts = page.locator('.title')
    await expect(pageProducts).toHaveText('Products')

    await page.click('#item_1_title_link')
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory-item.html?id=1')

    await page.click('#add-to-cart')

    const buttonRemove = page.locator('#remove')
    await expect(buttonRemove).toBeVisible()

    const cartQuantity = page.locator('.shopping_cart_badge')
    await expect(cartQuantity).toHaveText('1')


})


test('Adding a product to cart from the product list', async ({ page }) => {

    await login(page, 'standard_user', 'secret_sauce')

    const pageProducts = page.locator('.title')
    await expect(pageProducts).toHaveText('Products')

    await page.click('#add-to-cart-sauce-labs-backpack')

    const buttonRemove = page.locator('#remove-sauce-labs-backpack')
    await expect(buttonRemove).toBeVisible()

    const cartQuantity = page.locator('.shopping_cart_badge')
    await expect(cartQuantity).toHaveText('1')


})

test('Verifying the cart', async ({ page }) => {

    await login(page, 'standard_user', 'secret_sauce')

    const pageProducts = page.locator('.title')
    await expect(pageProducts).toHaveText('Products')

    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt')

    const buttonRemove = page.locator('#remove-sauce-labs-bolt-t-shirt')
    await expect(buttonRemove).toBeVisible()

    const cartQuantity = page.locator('.shopping_cart_badge')
    await expect(cartQuantity).toHaveText('1')

    await page.click('#shopping_cart_container')

    const productName = page.locator('.inventory_item_name')
    await expect(productName).toHaveText('Sauce Labs Bolt T-Shirt')


    const productPrice = page.locator('.inventory_item_price')
    await expect(productPrice).toHaveText('$15.99')

    const cartQuantityCheckout = page.locator('.cart_quantity')
    await expect(cartQuantityCheckout).toHaveText('1')


})


test('Removing a product from the cart', async ({ page }) => {

    await login(page, 'standard_user', 'secret_sauce')

    const pageProducts = page.locator('.title')
    await expect(pageProducts).toHaveText('Products')

    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt')

    const buttonRemove = page.locator('#remove-sauce-labs-bolt-t-shirt')
    await expect(buttonRemove).toBeVisible()

    const cartQuantity = page.locator('.shopping_cart_badge')
    await expect(cartQuantity).toHaveText('1')

    await buttonRemove.click()

    await expect(cartQuantity).not.toBeVisible()


})

test('Validating continue shopping button', async ({ page }) => {

    await login(page, 'standard_user', 'secret_sauce')

    const pageProducts = page.locator('.title')
    await expect(pageProducts).toHaveText('Products')

    await page.click('#add-to-cart-sauce-labs-bolt-t-shirt')

    const buttonRemove = page.locator('#remove-sauce-labs-bolt-t-shirt')
    await expect(buttonRemove).toBeVisible()

    const cartQuantity = page.locator('.shopping_cart_badge')
    await expect(cartQuantity).toHaveText('1')

    await page.click('#shopping_cart_container')

    const cartPage = page.locator('.header_secondary_container')
    await expect(cartPage).toHaveText('Your Cart')

    await page.click('#continue-shopping')

    await expect(pageProducts).toBeVisible()

})