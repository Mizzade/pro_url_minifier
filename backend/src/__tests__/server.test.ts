import request from "supertest";
import app from "../server";

describe("GET /", () => {
  it("should return Hello from Express and Bun!", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("Hello from Express and Bun!");
  });
});
