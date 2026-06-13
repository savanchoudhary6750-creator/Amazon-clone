import request from "supertest";
import app from "../app.js";

describe("GET /", () => {
  it("should return API running message", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("Amazon Clone API Running");
  });
});
