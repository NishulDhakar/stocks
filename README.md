<div align="center">
  <h1>Simple-Invest</h1>
  <p><strong>Track markets. Set alerts. Stay informed. Forever free.</strong></p>

  <div>
    <img src="https://img.shields.io/badge/-Next.js-black?style=for-the-badge&logoColor=white&logo=next.js&color=000000" alt="Next.js" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="TypeScript" />
    <img src="https://img.shields.io/badge/-Tailwind%20CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=38B2AC" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/-MongoDB-black?style=for-the-badge&logoColor=white&logo=mongodb&color=00A35C" alt="MongoDB" />
  </div>
</div>

---

## What is Simple-Invest?

Simple-Invest is an **open-source alternative to expensive market platforms**. Built for students, developers, and individual investors who want powerful market tracking without the subscription fees.

**Track real-time prices** • **Set personalized alerts** • **Explore company insights** • **Built openly, for everyone**

> **Note:** Simple-Invest is community-built and not a brokerage. Market data may be delayed based on provider rules. Nothing here is financial advice.

---

## Features

<table>
<tr>
<td width="50%">

### **Authentication**
Secure email/password auth with Better Auth + MongoDB. Protected routes ensure your data stays private.

### 🔍 **Global Search**
Lightning-fast stock search with **Cmd/Ctrl + K** shortcut. Popular stocks when idle, instant results as you type.

### 📊 **Watchlist**
Build and manage your personal watchlist. Each symbol is unique per user and stored securely in MongoDB.

</td>
<td width="50%">

### **Stock Details**
Interactive TradingView charts, company profiles, financials, and technical indicators — all in one view.

### **Market Overview**
Heatmaps, live quotes, and top stories powered by TradingView widgets.

### **Smart Notifications**
AI-personalized welcome emails and daily news summaries based on your watchlist.

</td>
</tr>
</table>

### **Beautiful UI**
- Dark theme by default with shadcn/ui components
- Radix UI primitives for accessibility
- Tailwind CSS v4 design system
- Smooth animations and transitions

---

## Quick Start

### Prerequisites

| Requirement | Description |
|------------|-------------|
| **MongoDB** | Database (Atlas ) |
| **Finnhub API** | Market data (free tier available) |
| **Gmail Account** | Email notifications |
| **Gemini API** | AI-powered features |

### Installation

```bash
# Clone the repository
git clone https://github.com/nishuldhakar/Simple-Invest.git
cd Simple-Invest

# Install dependencies
pnpm install
# or
npm install

# Set up environment variables (see below)
cp .env.example .env

# Test database connection
pnpm test:db

# Start development server
pnpm dev
```

### Running with Inngest (for background jobs)

```bash
# In a separate terminal
npx inngest-cli@latest dev
```

 **Open [http://localhost:3000](http://localhost:3000)** and start exploring!

---

## Environment Variables

Create a `.env` file in the project root:

<details>
<summary><strong>📋 Click to see environment template</strong></summary>

```env
# === Core ===
NODE_ENV=development

# === Database ===
# Option 1: MongoDB Atlas (hosted)
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority

# Option 2: Local Docker MongoDB
# MONGODB_URI=mongodb://root:example@mongodb:27017/Simple-Invest?authSource=admin

# === Authentication ===
BETTER_AUTH_SECRET=your_better_auth_secret_here
BETTER_AUTH_URL=http://localhost:3000

# === Finnhub API ===
FINNHUB_API_KEY=your_finnhub_key
FINNHUB_BASE_URL=https://finnhub.io/api/v1
# Optional: Client-side access (if needed)
NEXT_PUBLIC_FINNHUB_API_KEY=

# === AI Features (Gemini) ===
GEMINI_API_KEY=your_gemini_api_key

# === Email (Nodemailer) ===
NODEMAILER_EMAIL=youraddress@gmail.com
NODEMAILER_PASSWORD=your_gmail_app_password
```

</details>

** Security Tips:**
- Never commit `.env` to version control
- Use App Passwords for Gmail with 2FA enabled
- Keep `NEXT_PUBLIC_` variables minimal (they're exposed to browsers)
- Use dedicated SMTP providers in production

---

## 🏗️ Tech Stack

<table>
<tr>
<td width="50%">

### **Frontend**
- **Next.js 15** with App Router & React 19
- **TypeScript** for type safety
- **Tailwind CSS v4** for styling
- **shadcn/ui** + Radix UI primitives
- **Lucide** icons

</td>
<td width="50%">

### **Backend**
- **Better Auth** for authentication
- **MongoDB** + Mongoose for data
- **Finnhub API** for market data
- **Inngest** for background jobs
- **Nodemailer** for emails

</td>
</tr>
</table>

**Language Composition:** TypeScript (~93.4%) • CSS (~6%) • JavaScript (~0.6%)

---

## 📁 Project Structure

```
Simple-Invest/
├── app/
│   ├── (auth)/              # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (root)/              # Main application
│   │   ├── stocks/[symbol]/ # Stock detail pages
│   │   ├── help/
│   │   └── page.tsx         # Dashboard
│   └── api/inngest/         # Inngest webhook
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── forms/               # Form components
│   └── Header.tsx, Footer.tsx, etc.
├── database/
│   ├── models/              # Mongoose models
│   └── mongoose.ts          # Database connection
├── lib/
│   ├── actions/             # Server actions
│   ├── better-auth/         # Auth configuration
│   ├── inngest/             # Background jobs
│   └── nodemailer/          # Email templates
├── public/assets/           # Static assets
└── types/                   # TypeScript definitions
```

---

## 📡 Integrations

### **Finnhub**
Real-time and historical market data. Free tier available with rate limits.

### **TradingView**
Professional-grade charts and market widgets embedded throughout the app.

### **Better Auth**
Modern authentication with MongoDB adapter. Session-based security with middleware protection.

### **Inngest**
Reliable background job processing:
- Welcome emails on user signup
- Daily news summaries at noon
- AI-powered content via Gemini

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server (Turbopack) |
| `pnpm build` | Build for production |
| `pnpm start` | Run production server |
| `pnpm lint` | Run ESLint |
| `pnpm test:db` | Test database connection |

---

## Contributing

**You belong here.** Whether you're writing your first line of code or your millionth, contributions are welcome.

### How to Contribute

1. ** Find an issue** — Look for `good first issue` or `help wanted` labels
2. ** Discuss first** — Open an issue to discuss your idea
3. ** Make changes** — Keep PRs focused on a single feature/fix
4. ** Add screenshots** — For UI changes, show before/after
5. ** Be kind** — Guide beginners, no gatekeeping

### Development Workflow

```bash
# Fork and clone the repo
git clone https://github.com/YOUR_USERNAME/Simple-Invest.git

# Create a feature branch
git checkout -b feature/amazing-feature

# Make your changes and commit
git commit -m "Add amazing feature"

# Push and create a Pull Request
git push origin feature/amazing-feature
```

---

## Open Dev Society Manifesto

> **We live in a world where knowledge is hidden behind paywalls.**

We believe there's a better way.

### Our Belief
Technology should belong to everyone. Knowledge should be open, free, and accessible. Communities should welcome newcomers with trust, not gatekeeping.

### Our Mission
Build free, open-source projects that make a real difference:
-  **Tools** that professionals and students can use without barriers
-  **Knowledge platforms** where learning is free, forever
-  **Communities** where every beginner is guided, not judged
-  **Resources** that run on trust, not profit

### Our Promise
We will never lock knowledge. We will never charge for access. We will never trade trust for money. We run on transparency, donations, and the strength of our community.

### Our Call
If you've ever felt you didn't belong, struggled to find free resources, or wanted to build something meaningful — **you belong here**.

**Because the future belongs to those who build it openly.**

---

## Acknowledgements

Built with gratitude for these amazing open-source projects:

- **Finnhub** for accessible market data
- **TradingView** for professional market widgets
- **shadcn/ui, Radix UI & Tailwind CSS** for the beautiful UI foundation
- **Next.js** and the React community
- **Inngest** for reliable background jobs
- **Better Auth** for simple, secure authentication
- **All contributors** who make open tools possible

---
