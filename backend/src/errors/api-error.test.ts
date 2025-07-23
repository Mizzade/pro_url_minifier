import ApiError from "./api-error";

describe("ApiError", () => {
  it("should set message, statusCode, and status for 4xx codes", () => {
    const err = new ApiError("bad request", 400);
    expect(err.message).toBe("bad request");
    expect(err.statusCode).toBe(400);
    expect(err.status).toBe("fail");
    expect(err).toBeInstanceOf(Error);
    expect(err.stack).toBeDefined();
  });

  it("should set status to 'error' for 5xx codes", () => {
    const err = new ApiError("server error", 500);
    expect(err.status).toBe("error");
  });
});
