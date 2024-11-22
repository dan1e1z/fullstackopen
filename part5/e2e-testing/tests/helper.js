const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "login" }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page, title, author, url) => {
  await page.getByRole("button", { name: "new blog" }).click();
  await page.getByTestId("title-input").fill(title);
  await page.getByTestId("author-input").fill(author);
  await page.getByTestId("url-input").fill(url);
  await page.getByRole("button", { name: "create" }).click();

  // Ensure the blog is created by waiting for its text to appear
  await page.getByText(`Title: ${title} Author: ${author}`).waitFor();
};

export { loginWith, createBlog };
