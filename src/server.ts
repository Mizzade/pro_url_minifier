import express from "express";
import { nanoid } from "nanoid";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (_, res) => {
  res.send("Hello from Express and Bun!");
});

// TODO: Fix types for this endpoint
app.post("/api/shorten", async (req, res) => {
  const { url }: { url: string } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  const shortUrl = await nanoidAsync(10);
  res.json({ shortUrl });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const nanoidAsync = async (length: number): Promise<string> =>
  Promise.resolve(nanoid(length));
