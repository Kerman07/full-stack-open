import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import NewBlogForm from "./NewBlogForm";

describe("testing <NewBlogForm />", () => {
  test("that the form calls the event handler it received as props with the right details", () => {
    const createBlog = jest.fn();

    const component = render(<NewBlogForm createBlog={createBlog} />);
    const button = component.container.querySelector("button");
    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");

    fireEvent.change(title, {
      target: {
        value: "this is the title",
      },
    });

    fireEvent.change(author, {
      target: {
        value: "kerman07",
      },
    });

    fireEvent.change(url, {
      target: {
        value: "www.url.com",
      },
    });

    fireEvent.click(button);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].title).toBe("this is the title");
    expect(createBlog.mock.calls[0][0].author).toBe("kerman07");
    expect(createBlog.mock.calls[0][0].url).toBe("www.url.com");
  });
});
