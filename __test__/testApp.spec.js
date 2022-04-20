import { app } from "../src/client/js/app";

describe("Testing the app function", () => {
  test("App Must be a function", () => {
    expect(typeof app).toBe("function");
  });
});
