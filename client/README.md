# URL Shortener Project

A modern full-stack URL shortening application built with React, Vite, Express, and SQLite. This project allows users to convert long URLs into short, shareable links and redirect visitors to the original destination.

## Project Importance

This project is a practical and professional example of full-stack web development. It demonstrates how to build a real-world application that combines:

- a responsive frontend user interface
- a backend API for creating and managing short links
- database storage for persistence
- redirect functionality for shortened URLs
- basic analytics through click tracking

It is an excellent project for showcasing web development skills, API integration, and database handling in a GitHub portfolio.

## Features

- Shorten long URLs into compact links
- Store shortened links securely in a local database
- Redirect short links to their original URLs
- Track how many times each link is used
- Copy generated short links with one click
- Clean and simple user interface

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js
- SQLite with better-sqlite3
- CORS

## Project Structure

```text
client/           # React frontend
  src/             # Application components and styles
  public/          # Static assets
  package.json     # Frontend dependencies and scripts

server/           # Express backend
  index.js         # API routes, database setup, and redirect logic
  package.json     # Backend dependencies and scripts
```

## Installation & Setup

### 1. Install frontend dependencies

```bash
cd client
npm install
```

### 2. Install backend dependencies

```bash
cd ../server
npm install
```

### 3. Start the backend server

```bash
node index.js
```

The server will run at:
- http://localhost:3001

### 4. Start the frontend app

In a new terminal:

```bash
cd client
npm run dev
```

The frontend will run at:
- http://localhost:5173

## API Endpoints

- POST /api/shorten - Create a new short URL
- GET /api/urls - Retrieve all stored URLs
- GET /:shortCode - Redirect to the original URL

## Example Usage

1. Open the app in the browser.
2. Paste a long URL into the input box.
3. Click "Shorten URL".
4. Use the generated short link to share the URL.

## Future Improvements

- Add user authentication
- Add QR code generation for short links
- Add link expiration and password protection
- Add dashboard analytics and charts
- Deploy to cloud hosting

## Author

This project was built as a practical full-stack web development application to demonstrate real-world API, database, and frontend integration skills.
