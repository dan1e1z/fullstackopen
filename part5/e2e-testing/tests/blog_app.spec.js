const { test, describe, expect, beforeEach } = require("@playwright/test");

const { loginWith, createBlog } = require("./helper");

// A counter to ensure uniqueness across tests
let testCounter = 1;

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3001/api/testing/reset");
    await request.post("http://localhost:3001/api/users", {
      data: { name: "root1", username: "root1", password: "root1" },
    });
    await request.post("http://localhost:3001/api/users", {
      data: { name: "root2", username: "root2", password: "root2" },
    });
    await page.goto("/");
  });

  test("Front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Blogs");
    await expect(locator).toBeVisible();
  });

  test("Login form is shown", async ({ page }) => {
    const locator = await page.getByRole("button", { name: "login" });
    await expect(locator).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "root1", "root1");
      await expect(page.getByText("root1 logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "root2", "wrong");
      const errorDiv = await page.locator(".error");
      await expect(errorDiv).toContainText("Wrong username or password");
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "root1", "root1");
    });

    test("a new blog can be created", async ({ page }) => {
      const title = `testTitle_${testCounter}`;
      const author = `testAuthor_${testCounter}`;
      const url = `https://testBlogURL_${testCounter}.com`;
      testCounter++; // Increment the counter for the next test
      await createBlog(page, title, author, url);
      await expect(
        page.locator(`[data-testid="blog-title"]:has-text("${title}")`),
      ).toBeVisible();
    });

    describe("when a blog has been created", () => {
      beforeEach(async ({ page }) => {
        const title = `test1Title_${testCounter}`;
        const author = `test1Author_${testCounter}`;
        const url = `https://test1BlogURL_${testCounter}.com`;
        testCounter++; // Increment the counter for the next test
        await createBlog(page, title, author, url);
      });

      test("the blog can be liked", async ({ page }) => {
        await page.locator("button", { hasText: "view" }).first().click();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.locator('[data-testid="blog-likes"]')).toHaveText(
          "1",
        );
      });

      test("the blog can be removed", async ({ page }) => {
        await page.locator("button", { hasText: "view" }).first().click();
        await page.getByRole("button", { name: "remove" }).click();
        await expect(
          page.locator(`[data-testid="blog-title"]:has-text("test1Title_1")`),
        ).not.toBeVisible();
      });

      test(`a different user can't remove it`, async ({ page }) => {
        await page.getByRole("button", { name: "logout" }).click();
        await loginWith(page, "root2", "root2");

        await page.locator("button", { hasText: "view" }).first().click();
        await expect(
          page.locator("button", { name: "remove" }),
        ).not.toBeVisible();
      });

      test(`the blogs will be ranked by likes`, async ({ page }) => {
        const title = `test2Title_${testCounter}`;
        const author = `test2Author_${testCounter}`;
        const url = `https://test2BlogURL_${testCounter}.com`;
        testCounter++; // Increment the counter for the next test
        await createBlog(page, title, author, url);

        await page.locator("button", { hasText: "view" }).last().click();
        await page.getByRole("button", { name: "like" }).click();

        const titles = await page
          .locator('[data-testid="blog-title"]')
          .allTextContents();
        expect(titles[0]).toContain("test2Title");
        expect(titles[1]).toContain(`test1Title_1`);
      });
    });
  });
});
