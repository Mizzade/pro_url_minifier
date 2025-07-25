import express from "express";
import { createShortUrl, getOriginalUrl } from "./routes/short-urls";
import { errorHandler, missingRouteHandler } from "./errors/error-handler";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (_, res) => {
  // TODO: Add a proper index page
  res.send("Hello from Express and Bun!");
});

app.get("/api/shorten/:shortUrl", getOriginalUrl);

app.post("/api/shorten", createShortUrl);

app.use(missingRouteHandler);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

export default app;
