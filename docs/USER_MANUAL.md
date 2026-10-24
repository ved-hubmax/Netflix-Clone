# 📖 Netflix Clone - User & Developer Manual

Welcome to the **Netflix Clone** comprehensive user and developer manual. This guide explains how to set up, configure, run, navigate, and troubleshoot the full-stack Netflix Clone web application.

---

## 📋 Table of Contents
1. [Introduction](#1-introduction)
2. [Prerequisites](#2-prerequisites)
3. [Project Structure](#3-project-structure)
4. [Environment Configuration](#4-environment-configuration)
   - [Server Configuration (`server/.env`)](#server-configuration-serverenv)
   - [Client Configuration (`client/.env.local`)](#client-configuration-clientenvlocal)
5. [Installation & Setup](#5-installation--setup)
   - [Step 1: Install Server Dependencies](#step-1-install-server-dependencies)
   - [Step 2: Install Client Dependencies](#step-2-install-client-dependencies)
6. [Running the Application](#6-running-the-application)
   - [Starting the Backend](#starting-the-backend)
   - [Starting the Frontend](#starting-the-frontend)
7. [User Guide & Feature Walkthrough](#7-user-guide--feature-walkthrough)
   - [1. User Registration (Sign Up)](#1-user-registration-sign-up)
   - [2. User Login](#2-user-login)
   - [3. Browsing Movies & TV Shows](#3-browsing-movies--tv-shows)
   - [4. Movie Details Modal](#4-movie-details-modal)
   - [5. Watching Trailers (Cinema Mode)](#5-watching-trailers-cinema-mode)
   - [6. Personalized Watchlist ("My List")](#6-personalized-watchlist-my-list)
   - [7. Movie & TV Search](#7-movie--tv-search)
8. [Testing Backend APIs](#8-testing-backend-apis)
9. [Troubleshooting & FAQs](#9-troubleshooting--faqs)

---

## 1. Introduction

The **Netflix Clone** is a full-stack streaming media showcase that reproduces the core user experience of Netflix:
- Dynamic video catalog integration powered by **The Movie Database (TMDB)**.
- User account registration and authentication with secure password encryption.
- Personalized watchlist persisted across sessions via **MongoDB Atlas**.
- High-definition video trailer playback using embedded **YouTube** video streams.
- Responsive, modern cinematic dark mode UI built with **Next.js 16**, **React 19**, and **Tailwind CSS**.

---

## 2. Prerequisites

Before setting up the project, make sure you have the following installed on your machine:

- **Node.js**: Version `18.18.0` or higher (Recommended: LTS `v20.x` or `v22.x`)
- **npm**: Version `9.x` or higher (included with Node.js)
- **MongoDB Atlas** account (or local MongoDB community instance)
- **TMDB API Key**: Free API key from [The Movie Database](https://www.themoviedb.org/)
- **Git**: Installed for version control

---

## 3. Project Structure

```
netflix-clone/
├── client/                     # Next.js 16 Frontend Application
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/           # Login & Signup pages
│   │   │   │   ├── login/
│   │   │   │   └── signup/
│   │   │   ├── my-list/        # Personalized Watchlist page
│   │   │   ├── search/         # Live search page
│   │   │   ├── watch/[id]/     # Video trailer player page
│   │   │   ├── layout.tsx      # Root application layout
│   │   │   └── page.tsx        # Homepage carousel & Hero banner
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Hero.tsx        # Dynamic featured movie banner
│   │   │   ├── MovieModal.tsx  # Interactive popup modal
│   │   │   ├── Navbar.tsx      # Sticky translucent navbar
│   │   │   └── Row.tsx         # Horizontal scrollable movie rows
│   │   └── lib/
│   │       └── tmdb.ts         # TMDB API helper functions & types
│   ├── .env.example            # Client environment template
│   ├── package.json
│   └── tsconfig.json
│
├── server/                     # Express 5 REST API Backend
│   ├── controllers/
│   │   └── authController.js   # Signup and login logic
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT verification middleware
│   ├── models/
│   │   └── User.js             # Mongoose User and Watchlist schema
│   ├── routes/
│   │   ├── authRoutes.js       # Auth routing (/api/auth)
│   │   └── watchlistRoutes.js  # Watchlist routing (/api/watchlist)
│   ├── .env.example            # Server environment template
│   ├── index.js                # Server entry point & DB connection
│   └── package.json
│
├── docs/                       # Project Documentation
│   ├── MODEL_SUMMARY.md        # Technical architecture & data models
│   └── USER_MANUAL.md          # Complete user manual (this file)
│
├── .gitignore                  # Git ignore rules for node_modules, .env, etc.
└── README.md                   # GitHub project overview & quickstart
```

---

## 4. Environment Configuration

### Server Configuration (`server/.env`)
1. In the `server` directory, check or create the `.env` file based on `.env.example`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/netflix-clone?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
```

| Variable | Description | Example |
| :--- | :--- | :--- |
| `PORT` | Port number for Express server | `5000` |
| `MONGO_URI` | MongoDB connection connection string | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key used to sign and verify JWT tokens | `supersecretkey_jwt123` |

### Client Configuration (`client/.env.local`)
1. In the `client` directory, check or create `.env.local` based on `.env.example`:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_TMDB_API_KEY` | Your 32-character API key from TMDB Settings > API |

> [!TIP]
> To get a free TMDB API key:
> 1. Sign up at [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup).
> 2. Go to **Settings > API** and click **Create** (Developer).
> 3. Copy your **API Key (v3 auth)** and paste it as `NEXT_PUBLIC_TMDB_API_KEY`.

---

## 5. Installation & Setup

Open a terminal or command prompt in the root `netflix-clone` directory.

### Step 1: Install Server Dependencies
```bash
cd server
npm install
cd ..
```

### Step 2: Install Client Dependencies
```bash
cd client
npm install
cd ..
```

---

## 6. Running the Application

For the full experience, both the server and client should run concurrently. You can open two terminal windows:

### Starting the Backend
In **Terminal 1**:
```bash
cd server
npm start
# or
node index.js
```
*Expected Console Output:*
```
✅ Connected to MongoDB Atlas
🚀 Server running on port 5000
```

### Starting the Frontend
In **Terminal 2**:
```bash
cd client
npm run dev
```
*Expected Console Output:*
```
  ▲ Next.js 16.4.3
  - Local:        http://localhost:3000
  ✓ Ready in 1.5s
```

Now open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 7. User Guide & Feature Walkthrough

### 1. User Registration (Sign Up)
1. Navigate to [http://localhost:3000/auth/signup](http://localhost:3000/auth/signup) or click the red profile box in the top-right corner.
2. Enter:
   - **Username**: Your preferred username (e.g., `alex`).
   - **Email**: A valid email address (e.g., `alex@example.com`).
   - **Password**: Your chosen secure password.
3. Click **Sign Up**.
4. Upon successful registration, your account is saved in MongoDB, a JWT session token is created, and you are redirected to the homepage.

---

### 2. User Login
1. Navigate to [http://localhost:3000/auth/login](http://localhost:3000/auth/login).
2. Enter your registered email and password.
3. Click **Log In**.
4. The application saves your session token in `localStorage` under key `'token'`, granting access to watchlist operations.

---

### 3. Browsing Movies & TV Shows
On the homepage (`/`):
- **Hero Billboard**: Shows a randomly featured trending movie with dynamic backdrop, overview, "Play", and "More Info" buttons.
- **Categorized Movie Carousels**:
  - *Netflix Originals*
  - *Trending Now*
  - *Top Rated*
  - *Action Movies*
- **Hover Animations**: Hovering over any movie poster expands the poster and highlights the title.

---

### 4. Movie Details Modal
1. Click on any movie card from any carousel.
2. An interactive high-definition modal pops up with:
   - Backdrop art and title banner.
   - Synopsis / plot overview.
   - Quality tags (e.g., Full HD).
   - Direct action buttons: **▶ Watch Full Movie** and **+ My List**.
3. Press the **✕** button or click outside to dismiss the modal.

---

### 5. Watching Trailers (Cinema Mode)
1. Click **▶ Watch Full Movie** in the modal or click **Play** on the hero banner.
2. The app routes to `/watch/[id]` in dedicated Cinema Mode.
3. If TMDB contains an official YouTube trailer:
   - An HD YouTube video player embeds automatically and begins playing.
   - Standard YouTube player controls (Fullscreen, Pause, Volume, Resolution) are enabled.
4. Below the player, you can inspect:
   - Movie Title & TMDB rating score.
   - Full plot synopsis.
   - Release year, runtime in minutes, and genre badges.
5. Click **← Back** at the top left to return to the catalog.

---

### 6. Personalized Watchlist ("My List")
1. To add a movie: Click on a movie to open the modal, then click **+ My List**.
   - A confirmation alert (`Added to My List! ❤️`) notifies you.
2. To view your list: Click **My List** in the navigation bar or visit [http://localhost:3000/my-list](http://localhost:3000/my-list).
3. The page fetches your saved movie IDs and loads high-resolution posters from TMDB.
4. To remove a movie: Hover over a poster in My List and click the red **Remove** button. The movie is instantly deleted from your MongoDB watchlist.

---

### 7. Movie & TV Search
1. In the navigation bar, locate the search bar with placeholder `"Search movies..."`.
2. Type any title (e.g., `Batman`, `Inception`, `Stranger Things`) and press **Enter** (or search icon 🔍).
3. You are redirected to `/search?q=your_query`.
4. The page queries TMDB multi-search API and renders a responsive grid of matched movies and TV series.
5. You can also type new queries directly inside the main input on `/search`.

---

## 8. Testing Backend APIs

You can test the backend REST API directly using `curl` or Postman:

### 1. Health / Debug Check
```bash
curl http://localhost:5000/debug
```
*Response:*
```json
{"status":"Server is alive!","timestamp":"2026-10-24T18:55:00.000Z"}
```

### 2. User Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","username":"tester"}'
```

### 3. User Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### 4. Fetch My List (Protected)
```bash
curl http://localhost:5000/api/watchlist/my-list \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
```

### 5. Add to Watchlist
```bash
curl -X POST http://localhost:5000/api/watchlist/add \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <YOUR_JWT_TOKEN>" \
  -d '{"movieId": 550}'
```

---

## 9. Troubleshooting & FAQs

### Q1: The homepage says "TMDB API key is missing".
* **Solution**: Ensure `client/.env.local` contains `NEXT_PUBLIC_TMDB_API_KEY=your_key`. Remember that Next.js requires restarting the dev server (`npm run dev`) after modifying `.env.local`.

### Q2: Server crashes on startup with `MONGO_URI is not defined`.
* **Solution**: Ensure `server/.env` exists and contains a valid MongoDB connection string under `MONGO_URI`.

### Q3: Adding to "My List" gives "Please log in to add movies to your list!".
* **Solution**: Go to `/auth/login` and sign in. Your authentication token must be present in your browser's local storage.

### Q4: Port 5000 is already in use.
* **Solution**: You can change the port in `server/.env` (e.g. `PORT=5001`). Note: If you change the server port, update the API fetch URLs in `client/src/app/` components.

### Q5: "No trailer available for this movie" in Watch Page.
* **Explanation**: Not every movie listed in TMDB has an official YouTube trailer uploaded with `type: Trailer`. If unavailable, the fallback message is gracefully displayed.
