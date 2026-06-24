import { test } from '@playwright/test'

test.describe.only('Tips and Tricks', () => {
  test('Test info object', async ({ page }, testInfo) => {
    await page.goto('/')
    console.log({ testInfo })
  })

  test('Test skip browser', async ({ page, browserName }) => {
    test.skip(browserName === 'chromium', 'Feature not ready in Chrome browser')
    await page.goto('/')
  })

  test('Test fixme annotation', async ({ page, browserName }) => {
    test.fixme(browserName === 'chromium', 'Test is not stable, need revision')
    await page.goto('/')
  })

  const people = ['Mike', 'Judy', 'Peter', 'Elon', 'Alice']

  for (const name of people) {
    test(`Runing test for ${name}`, async ({ page }) => {
      await page.goto('/')
    })
  }

  // Mouse movement testing
  test('Mouse Movement Simulation', async ({ page }) => {
    await page.goto('/')
    await page.mouse.move(0, 0)
    await page.mouse.down()
    await page.mouse.move(0, 100)
  })

  test.only('Test multiple browser tabs inside 1 browser', async ({ browser }) => {
    const context = await browser.newContext()
    const page1 = await context.newPage()
    const page2 = await context.newPage()
    const page3 = await context.newPage()
    await page1.goto('/')
    await page2.goto('/')
    await page3.goto('/')
  })
  
})
