# Hangman Game 🎯

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/) 
[![SQLite](https://img.shields.io/badge/SQLite-3.38.0-blue?style=flat-square&logo=sqlite)](https://www.sqlite.org/) 
[![Prisma](https://img.shields.io/badge/Prisma-6.18.0-2bbc8a?style=flat-square&logo=prisma)](https://www.prisma.io/)

A simple **Hangman game** built with **Next.js**, **Tailwind CSS**, and **SQLite** using **Prisma ORM**.  
Play Hangman in the browser, save games, and view game history.

---

## 🚀 Features

- Interactive Hangman game with clickable letters  
- Random word selection from database  
- Tracks guessed letters and win/loss status  
- Saves played games in **SQLite**  
- View game history on a separate page  

---

## 🛠 Prerequisites

- [Node.js](https://nodejs.org/) (v22+)  
- npm (comes with Node.js)  
- Optional: [Webstorm](https://www.jetbrains.com/fr-fr/webstorm/) for editing  

---

## 🎯 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd hangman
````

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Prisma and the database

```bash
# Run migrations to create the database
npx prisma migrate dev --name init

# Generate Prisma client
npx prisma generate
```

### 4. Seed the database with initial words

```bash
npm run db:seed
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
/hangman
 ├── app/
 │   ├── page.tsx          # Home page with Hangman game
 │   ├── games/page.tsx    # Game history page
 │   ├── api/
 │   │   ├── games/route.ts # API to save/fetch games
 │   │   └── words/route.ts # API to fetch random word
 ├── components/
 │   └── Hangman.tsx       # Hangman game component
 ├── prisma/
 │   ├── schema.prisma     # Database schema
 │   └── seed.ts           # Seed script
 ├── lib/
 │   └── prisma.ts         # Prisma client singleton
 ├── package.json
 └── ...
```

---

## ⚡ NPM Scripts

| Command               | Description                      |
| --------------------- | -------------------------------- |
| `npm run dev`         | Start Next.js development server |
| `npm run build`       | Build for production             |
| `npm start`           | Run production build             |
| `npm run lint`        | Lint the code                    |
| `npm run db:migrate`  | Run Prisma migrations            |
| `npm run db:generate` | Generate Prisma client           |
| `npm run db:studio`   | Open Prisma Studio (GUI for DB)  |
| `npm run db:seed`     | Seed database with initial words |
| `npm run db:reset`    | Reset database (erases all data) |

---

## 🎮 How to Play

1. Go to the homepage.
2. Click letters to guess the word.
3. Up to 6 wrong guesses are allowed.
4. Game ends with a win or loss.
5. Played games are saved automatically.
6. Click **"View Game History"** to see all games.

---

## 🛠 Troubleshooting

* **Prisma client error:**

  ```bash
  npx prisma generate
  ```

* **Database file error (SQLite):**
  Make sure `prisma/dev.db` exists and is writable:

  ```bash
  mkdir -p prisma
  touch prisma/dev.db
  ```

* **Seed errors:** Run `npm run db:seed` after migrations.

---

## 🌟 Next Steps / Enhancements

* Add new words from the UI
* Filter games by status (won/lost)
* Add leaderboard or statistics
* Deploy to Vercel for online play

---

## 📌 License

This project is open source and free to use.

---
