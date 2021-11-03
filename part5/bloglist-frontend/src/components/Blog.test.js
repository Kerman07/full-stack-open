import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("testing <Blog />", () => {
  let component;
  beforeEach(() => {
    const blog = {
      title: "title",
      author: "author",
      url: "url",
      likes: 0,
      user: {
        username: "kerman07",
      },
    };
    const user = {
      username: "kerman07",
    };
    component = render(<Blog blog={blog} user={user} />);
  });

  test("renders the title and author, but not its url or number of likes by default", () => {
    const titleAuthor = component.container.querySelector(".title-author");
    expect(titleAuthor).toBeDefined();
    const blogDetail = component.container.querySelector(".blog-detail");
    expect(blogDetail).toHaveStyle("display: none");
  });

  test("the blog's url and number of likes are shown when the button to show details has been clicked", () => {
    const button = component.getByText("view");
    fireEvent.click(button);
    const blogDetail = component.container.querySelector(".blog-detail");
    expect(blogDetail).not.toHaveStyle("display: none");
  });
});
