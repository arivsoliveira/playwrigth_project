const { test, expect } = require('@playwright/test')

const loginData = [
    { username: 'standard_user', password: 'secret_sauce' },
    { username: 'problem_user', password: 'secret_sauce'},
    { username: 'visual_user', password: 'secret_sauce' },
    { username: 'performance_glitch_user', password: 'secret_sauce'},
  ]

  loginData.forEach(({ username, password }) => {
    test(`Login test with username: ${username}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/')
      await page.fill('#user-name', username)
      await page.fill('#password', password)
      await page.click('#login-button')
  
      await expect(page.locator('.title')).toHaveText('Products')

    })

})