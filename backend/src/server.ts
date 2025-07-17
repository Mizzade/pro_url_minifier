import express from "express";
import type { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";
import { createShortUrl, getOriginalUrl } from "./routes/short-urls";

const nanoidAsync = async (length: number): Promise<string> =>
  Promise.resolve(nanoid(length));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (_, res) => {
  // TODO: Add a proper index page
  res.send("Hello from Express and Bun!");
});

app.get("/api/shorten/:shortUrl", getOriginalUrl);

app.post("/api/shorten", createShortUrl);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.statusCode < 400) {
    res.status(500);
  }

  const message = err.message || "Internal Server Error";

  res.json({ error: { message } });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
