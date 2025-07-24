import request from "supertest";
import app from "../../server";
import * as Url from "../../models/urls";
import { describe, it, expect, beforeEach, vi } from "vitest";

vi.mock("nanoid", () => ({
  nanoid: () => "mockedShortId",
}));

describe("POST /short-urls", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const ENDPOINT = "/api/shorten";
  const FIXED_DATE = new Date("2025-01-01T00:00:00.000Z");

  it("should create a short URL for a valid URL", async () => {
    const URL = "https://google.com";
    const SHORT_URL = "mockedShortId";
    const mockResponseCreate = {
      id: 1,
      original: URL,
      shortened: SHORT_URL,
      createdAt: FIXED_DATE,
      updatedAt: FIXED_DATE,
    };
    const expectedBody = {
      url: URL,
      shortUrl: SHORT_URL,
    };

    vi.spyOn(Url, "findByUrl").mockResolvedValue(null);
    vi.spyOn(Url, "create").mockResolvedValue(mockResponseCreate);

    const res = await request(app).post(ENDPOINT).send({ url: URL });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expectedBody);
    expect(Url.create).toHaveBeenCalledWith(URL, SHORT_URL);
  });

  it("should return existing short URL if URL already exists", async () => {
    const URL = "https://google.com";
    const SHORT_URL = "mockedShortId";
    const mockResponseFind = {
      id: 1,
      original: URL,
      shortened: SHORT_URL,
      createdAt: FIXED_DATE,
      updatedAt: FIXED_DATE,
    };
    const expectedBody = {
      url: URL,
      shortUrl: SHORT_URL,
    };

    vi.spyOn(Url, "findByUrl").mockResolvedValue(mockResponseFind);
    vi.spyOn(Url, "create");

    const res = await request(app).post(ENDPOINT).send({ url: URL });

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expectedBody);
    expect(Url.create).not.toHaveBeenCalled();
  });

  it("should return 400 if the URL parameter is missing", async () => {
    const res = await request(app).post(ENDPOINT).send({});

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Missing URL in request body.");
    expect(Url.create).not.toHaveBeenCalled();
  });

  it("should return 400 if the URL parameter is invalid", async () => {
    const res = await request(app).post(ENDPOINT).send({ url: "invalid-url" });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("message", "Invalid URL.");
    expect(Url.create).not.toHaveBeenCalled();
  });

  it("should handle database/model errors gracefully", async () => {
    const URL = "https://google.com";
    vi.spyOn(Url, "findByUrl").mockImplementation(() => {
      throw new Error("Database error");
    });

    const res = await request(app).post(ENDPOINT).send({ url: URL });

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("message", "Database error");
  });
});

describe("GET /api/shorten/:shortUrl", async () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const ENDPOINT = "/api/shorten";
  const FIXED_DATE = new Date("2025-01-01T00:00:00.000Z");

  it("should return the original URL for a valid short URL", async () => {
    const SHORT_URL = "mockedShortId";
    const URL = "https://google.com";
    const mockResponse = {
      id: 1,
      original: URL,
      shortened: SHORT_URL,
      createdAt: FIXED_DATE,
      updatedAt: FIXED_DATE,
    };
    const expectedBody = {
      original: URL,
      shortened: SHORT_URL,
    };

    vi.spyOn(Url, "findByShortUrl").mockResolvedValue(mockResponse);

    const res = await request(app).get(`${ENDPOINT}/${SHORT_URL}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(expectedBody);
    expect(Url.findByShortUrl).toHaveBeenCalledWith(SHORT_URL);
  });

  it("should return 404 for an unknown short URL", async () => {
    const SHORT_URL = "unknownShortId";
    vi.spyOn(Url, "findByShortUrl").mockResolvedValue(null);

    const res = await request(app).get(`${ENDPOINT}/${SHORT_URL}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Invalid short URL.");
  });

  it("should return 404 if short URL parameter is missing", async () => {
    const res = await request(app).get(`${ENDPOINT}`);

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("message", "Route not found.");
  });

  it("should handle database/model errors gracefully", async () => {
    const SHORT_URL = "mockedShortId";
    vi.spyOn(Url, "findByShortUrl").mockImplementation(() => {
      throw new Error("Database error");
    });

    const res = await request(app).get(`${ENDPOINT}/${SHORT_URL}`);

    expect(res.statusCode).toBe(500);
    expect(res.body).toHaveProperty("message", "Database error");
  });
});
