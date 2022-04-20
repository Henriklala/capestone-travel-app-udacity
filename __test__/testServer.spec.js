import "regenerator-runtime/runtime";

const app = require("../src/server/server");
const req = require("supertest");

describe("test the root path", () => {
  test("should res the GET method", async () => {
    const res = await req(app).get("/");
    expect(res.statusCode).toBe(200);
  });
});