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

  test('Successful user login', async ({ page }) => {

    await login(page, 'standard_user', 'secret_sauce')

    const pageProducts = page.locator('.title');
    await expect(pageProducts).toHaveText('Products')
  });

  test('Login with invalid credentials', async ({ page }) => {

    await login(page, 'invalid_user', 'invalid_password')

    const errorMessage = page.locator('.error-message-container.error')
    await expect(errorMessage).toHaveText('Epic sadface: Username and password do not match any user in this service');
  });

  test('Login with locked out user', async ({ page }) => {

    await login(page, 'locked_out_user', 'secret_sauce')

    const errorMessage = page.locator('.error-message-container.error')
    await expect(errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });

  test('Login with the problematic user and validate the cart issue', async ({ page }) => {

    await login(page, 'problem_user', 'secret_sauce')

    const pageProducts = page.locator('.title')
    await expect(pageProducts).toHaveText('Products')

    await page.click('#add-to-cart-sauce-labs-backpack')

    const buttonRemove = page.locator('#remove-sauce-labs-backpack')
    await expect(buttonRemove).toBeVisible()

    const cartQuantity = page.locator('.shopping_cart_badge')
    await expect(cartQuantity).toHaveText('1')
    
    //clicking on the remove button and validating that the product remains in the cart
    
    await buttonRemove.click()

    await expect(cartQuantity).toHaveText('1')

    
})
  


