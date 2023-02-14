import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import {
  Avatar,
  FALLBACK_AVATAR_ALT_TEXT,
  FALLBACK_AVATAR_URL,
} from "./avatar";

describe("Avatar", () => {
  beforeEach(() => {
    cleanup();
  });

  it("should render an <img />", () => {
    const url = "https://cataas.com/cat/says/hello%20world!";
    const alt = "@github-handle";
    render(<Avatar url={url} alt={alt} />);

    const img = screen.getByAltText(alt);
    expect(img).toBeInTheDocument();
    expect(img.tagName).toBe("IMG");
  });

  it("should use the url and alt passed in", () => {
    const url = "https://cataas.com/cat/says/hello%20world!";
    const alt = "a beautiful cat";
    render(<Avatar url={url} alt={alt} />);

    const img = screen.getByAltText(alt);
    expect(img).toHaveAttribute("src", url);
  });

  it("should use a fallback image if no URL passed in", () => {
    render(<Avatar />);

    const img = screen.getByAltText(FALLBACK_AVATAR_ALT_TEXT);
    expect(img).toHaveAttribute("src", FALLBACK_AVATAR_URL);
  });

  it("should use a fallback image if image fails to load", () => {
    render(<Avatar url="https://hello.com/fake.png" />);

    const img = screen.getByAltText(FALLBACK_AVATAR_ALT_TEXT);
    fireEvent.error(img);
    expect(img).toHaveAttribute("src", FALLBACK_AVATAR_URL);
  });

  it("should use a fallback image if url is empty string", () => {
    render(<Avatar url="" />);

    const img = screen.getByAltText(FALLBACK_AVATAR_ALT_TEXT);
    fireEvent.error(img);
    expect(img).toHaveAttribute("src", FALLBACK_AVATAR_URL);
  });
});
