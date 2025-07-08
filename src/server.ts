import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (_, res) => {
  res.send("Hello from Express and Bun!");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
