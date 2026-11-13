# PixelFlow 🌊📸

PixelFlow is a modern, responsive web application for discovering and exploring high-quality photos and videos powered by the Pexels API, along with an AI Creation Studio.

## Features

- 🔍 **Real-time Search**: Search millions of high-resolution photos and curated videos.
- 🎨 **Media Types**: Seamless switching between Photos and Videos.
- 📐 **Smart Filters**: Filter by orientation (landscape, portrait, square) and size.
- 📱 **Responsive Masonry Grid**: Dynamic Pinterest-style grid layout optimized for all screen sizes.
- 🔍 **Media Modal**: Detailed modal preview with resolution options, photographer attribution, and direct download links.
- 🌟 **Trending Topics**: Discover curated popular tags and collections with a single click.
- ✨ **AI Studio**: Create and generate images using integrated AI workflows.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI & Icons**: React, Lucide Icons
- **Data Source**: [Pexels API](https://www.pexels.com/api/)
- **Language**: TypeScript

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/lobdp/PixelFlow.git
cd PixelFlow
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Copy `.env.example` to `.env.local` and add your Pexels API Key:

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
PEXELS_API_KEY=your_pexels_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
```

> Get your free Pexels API key from [pexels.com/api](https://www.pexels.com/api/).

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## License

MIT
