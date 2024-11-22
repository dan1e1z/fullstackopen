import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";

const sampleBlog = {
  title: "Test Title",
  author: "Test Author",
  url: "http://TestBlogURL.com",
  likes: 3,
  user: {
    username: "testUsername",
    name: "Test User",
    id: "Test0m1d",
  },
};

test("renders blog default", () => {
  render(
    <Blog blog={sampleBlog} updateBlog={() => {}} removeBlog={() => {}} />,
  );

  const blogTitleElement = screen.getByTestId("blog-title");
  const blogAuthorElement = screen.getByTestId("blog-author");

  expect(blogTitleElement).toHaveTextContent(sampleBlog.title);
  expect(blogAuthorElement).toHaveTextContent(sampleBlog.author);

  // Assert that URL and likes are not displayed
  expect(screen.queryByTestId("blog-url")).toBeNull();
  expect(screen.queryByTestId("blog-likes")).toBeNull();
});

test("display blogs URL and likes", async () => {
  render(
    <Blog blog={sampleBlog} updateBlog={() => {}} removeBlog={() => {}} />,
  );

  // Assert URL and likes are initially not visible
  expect(screen.queryByTestId("blog-url")).toBeNull();
  expect(screen.queryByTestId("blog-likes")).toBeNull();

  // Simulate clicking the view button
  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  // Assert URL and likes are now visible
  expect(screen.getByTestId("blog-url")).toHaveTextContent(sampleBlog.url);
  expect(screen.getByTestId("blog-likes")).toHaveTextContent("3");
});

test("handle updated blog like increment", async () => {
  const mockUpdateBlog = vi.fn();

  render(
    <Blog
      blog={sampleBlog}
      updateBlog={mockUpdateBlog}
      removeBlog={() => {}}
    />,
  );

  const user = userEvent.setup();
  const viewButton = screen.getByText("view");
  await user.click(viewButton);

  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);

  expect(mockUpdateBlog).toHaveBeenCalledTimes(2);
});

test("create new blog, display correct default", async () => {
  const mockCreateBlog = vi.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={mockCreateBlog} />);

  // Use data-testid attributes for form inputs
  const titleInputField = screen.getByTestId("title-input");
  const authorInputField = screen.getByTestId("author-input");
  const urlInputField = screen.getByTestId("url-input");

  // Simulate user typing in the form inputs
  await user.type(titleInputField, "Test Input Title");
  await user.type(authorInputField, "Test Input Author");
  await user.type(urlInputField, "http://testInputBlogURL.com");

  // Simulate clicking the create button
  const createButton = screen.getByText("create");
  await user.click(createButton);

  // Assert the form handler was called with correct arguments
  expect(mockCreateBlog).toHaveBeenCalledTimes(1);
  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: "Test Input Title",
    author: "Test Input Author",
    url: "http://testInputBlogURL.com",
  });
});
