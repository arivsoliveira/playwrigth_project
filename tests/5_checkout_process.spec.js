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

test('Validating checkout process', async ({ page }) => {

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

    const productName = page.locator('.inventory_item_name')
    await expect(productName).toHaveText('Sauce Labs Bolt T-Shirt')


    const productPrice = page.locator('.inventory_item_price')
    await expect(productPrice).toHaveText('$15.99')

    const cartQuantityCheckout = page.locator('.cart_quantity')
    await expect(cartQuantityCheckout).toHaveText('1')

    await page.click('#checkout')

    const checkoutPage = page.locator('.header_secondary_container')
    await expect(checkoutPage).toHaveText('Checkout: Your Information')

    const inputFirstName = page.locator('#first-name')
    const inputLastName = page.locator('#last-name')
    const inputPostalCode = page.locator('#postal-code')

    await inputFirstName.fill('Ariana')
    await inputLastName.fill('Oliveira')
    await inputPostalCode.fill('12345-678')

    await page.click('#continue')

    const confirmCheckout = page.locator('.header_secondary_container')
    await expect(confirmCheckout).toHaveText('Checkout: Overview')

    await page.click('#finish')

    const completeCheckout = page.locator('.header_secondary_container')
    await expect(completeCheckout).toHaveText('Checkout: Complete!')

    const confirmationMessage = page.locator('.complete-header')
    await expect(confirmationMessage).toHaveText('Thank you for your order!')

    const backHomeButton = page.locator('#back-to-products')
    await expect(backHomeButton).toBeVisible()
})

test('Validating cancel checkout button', async ({ page }) => {

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

    await page.click('#checkout')

    const cancelCheckoutButton = page.locator('#cancel')
    await expect(cancelCheckoutButton).toBeVisible()
    await cancelCheckoutButton.click()

    await expect(cartPage).toHaveText('Your Cart')

})

test.describe('Validating mandatory fields on the checkout screen', () => {

test('Validating the error message for the field: first name', async ({ page }) => {

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

    await page.click('#checkout')

    const checkoutPage = page.locator('.header_secondary_container')
    await expect(checkoutPage).toHaveText('Checkout: Your Information')

    const inputLastName = page.locator('#last-name')
    const inputPostalCode = page.locator('#postal-code')

    await inputLastName.fill('Oliveira')
    await inputPostalCode.fill('12345-678')

    await page.click('#continue')

    const errorMessageName = page.locator('.error-message-container.error')
    await expect(errorMessageName).toHaveText('Error: First Name is required')


})

test('Validating the error message for the field: last name', async ({ page }) => {

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

    await page.click('#checkout')

    const checkoutPage = page.locator('.header_secondary_container')
    await expect(checkoutPage).toHaveText('Checkout: Your Information')

    const inputFirstName = page.locator('#first-name')
    const inputPostalCode = page.locator('#postal-code')

    await inputFirstName.fill('Ariana')
    await inputPostalCode.fill('12345-678')

    await page.click('#continue')

    const errorMessageName = page.locator('.error-message-container.error')
    await expect(errorMessageName).toHaveText('Error: Last Name is required')


})


test('Validating the error message for the field: postal code', async ({ page }) => {

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

    await page.click('#checkout')

    const checkoutPage = page.locator('.header_secondary_container')
    await expect(checkoutPage).toHaveText('Checkout: Your Information')

    const inputFirstName = page.locator('#first-name')
    const inputLastName = page.locator('#last-name')


    await inputFirstName.fill('Ariana')
    await inputLastName.fill('Oliveira')

    await page.click('#continue')

    const errorMessageName = page.locator('.error-message-container.error')
    await expect(errorMessageName).toHaveText('Error: Postal Code is required')


})


})