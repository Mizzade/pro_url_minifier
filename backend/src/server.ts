import express from "express";
import { nanoid } from "nanoid";
import type { NextFunction, Request, Response } from "express";

const nanoidAsync = async (length: number): Promise<string> =>
  Promise.resolve(nanoid(length));

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello from Express and Bun!");
});

app.post(
  "/api/shorten",
  async (req: Request, res: Response, next: NextFunction) => {
    const { url }: { url: string } = req.body || {};

    if (!url) {
      res.status(400);
      const error = new Error("Missing URL in request body.");
      return next(error);
    }

    try {
      const shortUrl = await nanoidAsync(10);
      res.json({ shortUrl });
    } catch (error) {
      next(error);
    }
  },
);

// Global error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.statusCode < 400) {
    res.status(500);
  }

  const message = err.message || "Internal Server Error";

  res.json({ error: { message } });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
