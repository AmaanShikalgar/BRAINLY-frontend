# 🧠 Brainly — Your Second Brain

Brainly is a full-stack web app that lets you save, organize, and share content from across the web — YouTube videos, tweets, Instagram posts, Reddit threads, articles, and links — all in one place.

**Live demo:** https://brainly-secondbrain.vercel.app

---

## ✨ Features

- 🔐 JWT authentication with bcrypt password hashing
- ▶ YouTube video embeds
- 𝕏 Twitter/X tweet embeds  
- 📸 Instagram post embeds
- 🔴 Reddit & link previews via Open Graph scraping
- 🌐 Public brain sharing via unique hash links
- 🔍 Sidebar filtering by content type
- 🌙 Dark / light mode with localStorage persistence
- ⚡ Auto link-type detection on paste
- 🗑️ Delete content with ownership validation
- 📱 Mobile responsive with collapsible sidebar

---

## 🛠 Tech Stack

### Frontend
- React + TypeScript
- Tailwind CSS v4
- Vite
- Axios
- React Router DOM
- React Hot Toast

### Backend
- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- JWT (`jsonwebtoken`)
- bcrypt
- Zod (input validation)
- open-graph-scraper

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### Backend setup

```bash
git clone https://github.com/AmaanShikalgar/BRAINLY
cd BRAINLY
npm install
```

Create a `.env` file:
```env
MONGO_URI=mongodb://localhost:27017/brainly
JWT_USER_SECRET=your_secret_key_here
PORT=3000
```

Start the server:
```bash
npm run dev
```

### Frontend setup

```bash
git clone https://github.com/AmaanShikalgar/BRAINLY-frontend
cd BRAINLY-frontend
npm install
```

Create a `.env` file:
```env
VITE_BACKEND_URL=http://localhost:3000
```

Start the dev server:
```bash
npm run dev
```

---

## 📁 Project Structure

### Frontend
```
src/
├── components/
│   └── ui/          # Button, Card, Input, Sidebar, Modal
├── hooks/           # useContent, useLinkPreview, useUser
├── icons/           # SVG icon components
├── pages/           # Signup, Signin, Dashboard, Brain
└── config.ts        # Backend URL config
```

### Backend
```
src/
├── db.ts            # Mongoose schemas (User, Content, Link)
├── middleware.ts    # JWT auth middleware
├── zod.ts           # Input validation schemas
└── index.ts         # Express routes
```

---

## 🔌 API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/v1/signup` | ❌ | Create account |
| POST | `/api/v1/signin` | ❌ | Sign in, returns JWT |
| GET | `/api/v1/me` | ✅ | Get current user |
| POST | `/api/v1/content` | ✅ | Add content |
| GET | `/api/v1/content` | ✅ | Get all content |
| DELETE | `/api/v1/content` | ✅ | Delete content |
| POST | `/api/v1/brain/share` | ✅ | Enable/disable sharing |
| GET | `/api/v1/brain/:shareLink` | ❌ | Get shared brain |
| POST | `/api/v1/preview` | ✅ | Fetch OG link preview |

---

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "add your feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Ideas for contributions
- [ ] Search bar to filter cards by title
- [ ] Edit content title
- [ ] Card count per sidebar type
- [ ] Loading skeletons
- [ ] Notion / Google Docs embed support
- [ ] Tags and collections
- [ ] Drag and drop reordering

---

## 📄 License

MIT — free to use, fork, and build on.

---

Built by [Amaan Shikalgar](https://github.com/AmaanShikalgar)