# 🎬 Netflix Clone (Full-Stack MERN + Next.js 16)

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-5.3.0-lightgrey?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green?logo=mongodb)](https://www.mongodb.com/)
[![TMDB API](https://img.shields.io/badge/TMDB-v3-01b4e4?logo=themoviedatabase)](https://www.themoviedb.org/)

A full-stack Netflix Clone featuring movie and TV show discovery, YouTube trailer playback in Cinema mode, real-time title search, user registration/login, and custom personal watchlists stored in MongoDB.

---

## 📚 Project Documentation

Detailed guides and specifications are located in the [`docs/`](./docs) folder:

- 🏛️ **[Technical Architecture & Model Summary](./docs/MODEL_SUMMARY.md)**: Deep dive into the system architecture, Mongoose schemas, TMDB contracts, JWT auth model, sequence diagrams, and API endpoints.
- 📖 **[User & Developer Manual](./docs/USER_MANUAL.md)**: Step-by-step installation, environment setup, feature walkthrough, cURL testing commands, and troubleshooting guide.

---

## ✨ Features

- **Dynamic Video Catalog**: Integrated with TMDB API for *Netflix Originals*, *Trending Now*, *Top Rated*, and *Action Movies*.
- **Interactive Billboard Hero**: Dynamic featured movie showcase with backdrop imagery and synopsis.
- **Cinema Mode Video Player**: Automatic YouTube trailer detection and responsive embed playback.
- **User Authentication**: Secure signup and login with Bcrypt password hashing and JWT authorization tokens.
- **Personal Watchlist ("My List")**: Add and remove favorite movies, synchronized with MongoDB.
- **Multi-Search**: Live search bar querying movies and TV series across TMDB.
- **Modern Responsive Design**: Built with Next.js 16 App Router, React 19, and Tailwind CSS v4.

---

## 📁 Repository Structure

```text
netflix-clone/
├── client/              # Next.js 16 Frontend
│   ├── src/app/         # App router (pages: /, /auth, /my-list, /search, /watch)
│   ├── src/components/  # UI components (Hero, Navbar, MovieModal, Row)
│   ├── src/lib/         # TMDB API client & TypeScript interfaces
│   ├── .env.example     # Frontend environment variables template
│   └── package.json
├── server/              # Express 5 Backend
│   ├── controllers/     # Auth & business logic
│   ├── middleware/      # JWT auth middleware
│   ├── models/          # Mongoose User & Watchlist models
│   ├── routes/          # API route handlers (/api/auth, /api/watchlist)
│   ├── .env.example     # Backend environment variables template
│   └── package.json
├── docs/                # Comprehensive Documentation
│   ├── MODEL_SUMMARY.md # Data models, sequence diagrams & architecture
│   └── USER_MANUAL.md   # Step-by-step user & developer manual
├── .gitignore           # Git ignore rules for clean repository
└── README.md            # Root repository overview
```

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd netflix-clone
```

### 2. Configure Environment Variables
- **Backend**: Copy `server/.env.example` to `server/.env` and configure your `PORT`, `MONGO_URI`, and `JWT_SECRET`.
- **Frontend**: Copy `client/.env.example` to `client/.env.local` and add your `NEXT_PUBLIC_TMDB_API_KEY`.

### 3. Start Backend Server
```bash
cd server
npm install
npm start
```
*Server runs on `http://localhost:5000`.*

### 4. Start Frontend Client
Open a second terminal:
```bash
cd client
npm install
npm run dev
```
*App is live on `http://localhost:3000`.*

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express 5, Mongoose 9, BcryptJS, JSON Web Token (JWT)
- **Database**: MongoDB Atlas
- **External Services**: TMDB REST API, YouTube IFrame Embed

---

## 📄 License

This project is created for educational and portfolio demonstration purposes. All movie data and imagery are provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).
