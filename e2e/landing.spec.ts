import { test, expect, Page } from '@playwright/test';

// Helper: open burger menu if on mobile
async function openMobileMenuIfNeeded(page: Page) {
  const burger = page.locator('.nav-burger');
  const isVisible = await burger.isVisible();
  if (isVisible) {
    await burger.click();
    await page.waitForTimeout(200);
  }
}

test.describe('Vexor landing page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load and show hero section', async ({ page }) => {
    await expect(page).toHaveTitle(/Vexor/);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('navbar should be visible', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    await expect(nav.locator('text=vexor')).toBeVisible();
  });

  test('navbar links should scroll to sections', async ({ page }) => {
    await openMobileMenuIfNeeded(page);
    const servicesLink = page.locator('a[href="#services"]:visible').first();
    await expect(servicesLink).toBeVisible();
    await servicesLink.click();
    await expect(page.locator('#services')).toBeInViewport();
  });

  test('navbar CTA should scroll to contact', async ({ page }) => {
    await openMobileMenuIfNeeded(page);
    // Click any visible #contact link (desktop CTA or mobile menu CTA)
    const ctaLink = page.locator('a[href="#contact"]:visible').first();
    await ctaLink.click();
    await expect(page.locator('#contact')).toBeInViewport();
  });

  test('theme toggle should switch theme', async ({ page }) => {
    const burger = page.locator('.nav-burger');
    const isMobile = await burger.isVisible();

    if (isMobile) {
      await burger.click();
      await page.waitForTimeout(200);
      // Theme button inside mobile menu
      await page.locator('[style*="position: fixed"] button').first().click();
    } else {
      await page.locator('.nav-controls-desktop button').first().click();
    }

    const bg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--bg').trim()
    );
    expect(bg).toBe('#ffffff');
  });

  test('language toggle should switch to English', async ({ page }) => {
    const burger = page.locator('.nav-burger');
    const isMobile = await burger.isVisible();

    if (isMobile) {
      await burger.click();
      await page.waitForTimeout(200);
      await page.locator('[style*="position: fixed"] button:has-text("EN")').click();
    } else {
      await page.locator('nav button:has-text("EN")').click();
    }

    await expect(page.locator('h1')).toContainText('We build');
  });

  test('services section should have 6 cards', async ({ page }) => {
    await page.locator('#services').scrollIntoViewIfNeeded();
    await expect(page.locator('.service-card')).toHaveCount(6);
  });

  test('work cards should have links', async ({ page }) => {
    await page.locator('#work').scrollIntoViewIfNeeded();
    await expect(page.locator('#work a[href^="/work/"]')).toHaveCount(3);
  });

  test('team section should have 6 members', async ({ page }) => {
    await page.locator('#about').scrollIntoViewIfNeeded();
    await expect(page.locator('#about .team-grid > div')).toHaveCount(6);
  });

  test('FAQ should open and close items', async ({ page }) => {
    await page.locator('#faq').scrollIntoViewIfNeeded();
    const firstQuestion = page.locator('#faq button').first();
    await firstQuestion.click();
    await expect(
      page
        .locator('#faq')
        .locator('text=Вартість залежить')
        .or(page.locator('#faq').locator('text=The cost depends'))
    ).toBeVisible();
    await firstQuestion.click();
  });

  test('contact form currency toggle should work', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    await page.click('button:has-text("$ USD")');
    const budgetSelect = page.locator('#contact select').last();
    const options = await budgetSelect.locator('option').allTextContents();
    expect(options.some(o => o.includes('$200') && o.includes('$800'))).toBe(true);
  });

  test('contact form submit button should show success', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    // Fill required fields first (form now validates name + contact)
    const nameInput = page.locator('#contact input').first();
    const contactInput = page.locator('#contact input').nth(1);
    await nameInput.fill('Test User');
    await contactInput.fill('@testuser');
    await page.click('button:has-text("Надіслати заявку")');
    await expect(page.locator('text=Відправлено')).toBeVisible();
  });

  test('telegram button should have correct href', async ({ page }) => {
    await page.locator('#contact').scrollIntoViewIfNeeded();
    const tgBtn = page.locator('#contact a[href*="t.me"]').last();
    await expect(tgBtn).toHaveAttribute('href', 'https://t.me/vexor_studio');
  });

  test('should be mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('.nav-burger')).toBeVisible();
  });
});
