const express = require("express");
const cors = require("cors");
const Database = require("better-sqlite3");
const crypto = require("crypto");

const app = express();
const db = new Database("urls.db");

app.use(cors());
app.use(express.json());

db.exec(`
  CREATE TABLE IF NOT EXISTS urls (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    original_url TEXT NOT NULL,
    short_code TEXT UNIQUE NOT NULL,
    clicks INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

function createShortCode() {
  let code;

  do {
    code = crypto
      .randomBytes(4)
      .toString("base64url")
      .slice(0, 5);
  } while (
    db.prepare("SELECT id FROM urls WHERE short_code = ?").get(code)
  );

  return code;
}

app.get("/", (req, res) => {
  res.json({
    message: "URL Shortener API is working",
  });
});

app.post("/api/shorten", (req, res) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({
      error: "URL is required",
    });
  }

  try {
    const parsedUrl = new URL(originalUrl);

    if (
      parsedUrl.protocol !== "http:" &&
      parsedUrl.protocol !== "https:"
    ) {
      throw new Error("Invalid URL");
    }
  } catch {
    return res.status(400).json({
      error: "Enter a valid URL starting with http:// or https://",
    });
  }

  try {
    const shortCode = createShortCode();

    db.prepare(`
      INSERT INTO urls (original_url, short_code)
      VALUES (?, ?)
    `).run(originalUrl, shortCode);

    return res.status(201).json({
      originalUrl,
      shortCode,
      shortUrl: `http://localhost:3001/${shortCode}`,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to create the short URL",
    });
  }
});

app.get("/api/urls", (req, res) => {
  try {
    const urls = db
      .prepare("SELECT * FROM urls ORDER BY created_at DESC")
      .all();

    return res.json(urls);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Unable to retrieve URLs",
    });
  }
});

app.get("/:shortCode", (req, res) => {
  const savedUrl = db
    .prepare("SELECT * FROM urls WHERE short_code = ?")
    .get(req.params.shortCode);

  if (!savedUrl) {
    return res.status(404).send("Short URL not found");
  }

  db.prepare(`
    UPDATE urls
    SET clicks = clicks + 1
    WHERE id = ?
  `).run(savedUrl.id);

  return res.redirect(savedUrl.original_url);
});

app.listen(3001, () => {
  console.log("Server running at http://localhost:3001");
});