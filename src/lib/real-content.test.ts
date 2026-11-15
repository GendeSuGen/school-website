import { describe, expect, it } from "vitest";
import { loadContent } from "./content";

describe("the real content/ folder", () => {
  it("passes validation", () => {
    expect(() => loadContent()).not.toThrow();
  });
});
