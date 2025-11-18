import { test, expect } from '@playwright/test';

test.describe('Translate Plugin', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3001');
  });

  test('should display default locale translation', async ({ page }) => {
    await expect(page.locator('text=Welcome!')).toBeVisible();
  });

  test('should switch locale and display correct translation', async ({ page }) => {
    await page.click('button:has-text("Русский")');
    await expect(page.locator('text=Добро пожаловать!')).toBeVisible();
    await expect(page.locator('text=Welcome!')).not.toBeVisible();
  });

  test('should display translation with arguments', async ({ page }) => {
    await expect(page.locator('text=Hello, Мир!')).toBeVisible();
    await page.click('button:has-text("English")');
    await expect(page.locator('text=Hello, Мир!')).toBeVisible(); // The argument remains the same
  });

  test('should display nested translation', async ({ page }) => {
    await expect(page.locator('text=Hello, Мир!')).toBeVisible();
  });

  test('should return key if translation not found', async ({ page }) => {
    await expect(page.locator('text=nonExistentKey')).toBeVisible();
  });

  test('should dynamically change translation argument', async ({ page }) => {
    await expect(page.locator('text=Hello, Мир!')).toBeVisible();
    await page.click('button:has-text("Change Name")');
    await expect(page.locator('text=Hello, Планета!')).toBeVisible();
    await page.click('button:has-text("Change Name")');
    await expect(page.locator('text=Hello, Мир!')).toBeVisible();
  });

  test('should display translation using t function', async ({ page }) => {
    await expect(page.locator('text=Home Page')).toBeVisible();
    await page.click('button:has-text("Русский")');
    await expect(page.locator('text=Домашняя страница')).toBeVisible();
    await expect(page.locator('text=Home Page')).not.toBeVisible();
  });
});