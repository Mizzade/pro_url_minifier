import request from "supertest";
import app from "../../server";
import * as Url from "../../models/urls";

jest.mock("nanoid", () => ({
  nanoid: () => "mockedShortId"
}));

describe("POST /short-urls", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a short URL for a valid URL", async () => {
    const URL = "https://google.com";
    const SHORT_URL = "mockedShortId";
    const FIXED_DATE = new Date("2025-01-01T00:00:00.000Z");
    const mockResponseCreate = {
      id: 1,
      original: URL,
      shortened: SHORT_URL,
      createdAt: FIXED_DATE,
      updatedAt: FIXED_DATE
    }

    jest.spyOn(Url, "findByUrl").mockResolvedValue(null);
    jest.spyOn(Url, "create").mockResolvedValue(mockResponseCreate);

    const res = await request(app)
      .post("/shorten")
      .send({ url: URL });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      url: URL,
      shortUrl: SHORT_URL
    });
    expect(Url.create).toHaveBeenCalledWith(URL, SHORT_URL);
  });
});
