import { useState } from "react";
import "./App.css";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setShortUrl("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3001/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setShortUrl(data.shortUrl);
      setOriginalUrl("");
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function copyUrl() {
    navigator.clipboard.writeText(shortUrl);
    alert("Short URL copied!");
  }

  return (
    <main className="container">
      <section className="card">
        <h1>URL Shortener</h1>
        <p>Enter a long URL and create a shorter one.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="url"
            placeholder="https://example.com/long-url"
            value={originalUrl}
            onChange={(event) => setOriginalUrl(event.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Shorten URL"}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {shortUrl && (
          <div className="result">
            <a href={shortUrl} target="_blank" rel="noreferrer">
              {shortUrl}
            </a>

            <button onClick={copyUrl}>Copy</button>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;