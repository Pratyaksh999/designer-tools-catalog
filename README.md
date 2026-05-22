# 🎨 DesignHour - Curated Designer Tools Catalog

A beautiful, modern catalog of design tools, animation libraries, and UI components with a Pinterest-inspired aesthetic. Built with Next.js 14, Tailwind CSS, and Framer Motion.

![DesignKit](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### Core Features
- 🎯 **40+ Curated Tools** - Animation, Components, Documentation, Design-to-Code, Inspiration
- 🔍 **Instant Search** - Real-time fuzzy search across names, descriptions, and tags
- 🎨 **Category Filtering** - Filter by Animation, Micro-interactions, Components, etc.
- ❤️ **Favorites System** - Save favorite tools with localStorage persistence
- 🌓 **Dark/Light Mode** - Smooth theme toggle with system preference detection
- 📊 **Click Tracking** - Analytics for which tools users visit most

### UI/UX
- 🎭 **Pinterest-style Grid** - Responsive masonry layout
- ✨ **Smooth Animations** - Framer Motion for all interactions
- 💫 **Micro-interactions** - Hover effects, stagger animations, spring physics
- 📱 **Fully Responsive** - Mobile, tablet, and desktop optimized
- ♿ **Accessible** - Semantic HTML, ARIA labels, keyboard navigation

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or navigate to the project
cd designer-tools-catalog

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
designer-tools-catalog/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main home page
│   ├── globals.css         # Global styles
│   └── api/
│       └── track/route.ts  # Click tracking API
├── components/
│   ├── Header.tsx          # Header with search and theme toggle
│   ├── FilterBar.tsx       # Category filter chips
│   ├── ToolCard.tsx        # Individual tool card
│   ├── ToolGrid.tsx        # Grid layout with animations
│   ├── SearchBar.tsx       # Search input component
│   ├── FavoritesButton.tsx # Favorite toggle button
│   └── ThemeToggle.tsx     # Dark/light mode switch
├── data/
│   ├── tools.json          # All tools data (40+ tools)
│   └── clicks.json         # Click tracking data
├── lib/
│   ├── context/
│   │   ├── ThemeContext.tsx     # Theme state management
│   │   └── FavoritesContext.tsx # Favorites state management
│   └── utils.ts            # Helper functions
├── types/
│   └── index.ts            # TypeScript interfaces
└── public/
    └── logos/              # Tool logos (optional)
```

## 🎨 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **State Management:** React Context API + localStorage
- **Font:** Inter

## 📊 Data Schema

Tools are stored in `data/tools.json`:

```json
{
  "id": "gsap",
  "name": "GSAP (GreenSock)",
  "description": "Professional-grade animation library...",
  "url": "https://greensock.com/gsap/",
  "category": "Animation",
  "tags": ["animation", "javascript", "timeline"],
  "featured": true,
  "color": "#88CE02"
}
```

### Categories
1. **Animation** - GSAP, Framer Motion, Lottie, Anime.js, etc.
2. **Micro-interactions** - Hover.css, Animate.css, Motion UI
3. **Components** - Radix UI, Headless UI, Shadcn/ui, Aceternity
4. **Documentation** - Storybook, Docz, Ladle
5. **Design-to-Code** - Figma, Framer, ProtoPie
6. **Inspiration** - CodePen, Dribbble, UI Movement, LottieFiles

## 🎯 Key Features Implementation

### Search
- Debounced input (300ms) for performance
- Searches across: name, description, category, tags
- Case-insensitive matching
- Clear button for quick reset

### Filtering
- Category chips with active state
- Favorites filter (separate from categories)
- Multiple filter support (OR logic)
- Smooth transitions when switching

### Favorites
- Heart icon toggle (outline → filled)
- Stored in localStorage as array of IDs
- Persists across sessions
- Count badge on Favorites chip

### Dark Mode
- Sun/Moon icon with rotation animation
- Respects system preference on first load
- Persists choice in localStorage
- Smooth 300ms transitions

### Click Tracking
- POST to `/api/track` on tool click
- Records: toolId, category, timestamp
- Stores in `data/clicks.json`
- Can be used for "Popular" badges

## 🎭 Animations

All animations powered by Framer Motion:

1. **Page Load** - Stagger cards entering (50ms delay each)
2. **Card Hover** - Lift + scale + shadow
3. **Category Switch** - Fade out/in transition
4. **Search Results** - Slide in from bottom
5. **Favorite Toggle** - Scale + bounce (elastic)
6. **Theme Toggle** - 180° rotation with spring

## 📱 Responsive Design

- **Mobile (<640px):** 1 column grid
- **Tablet (640-1024px):** 2 columns
- **Desktop (>1024px):** 3-4 columns
- **Horizontal scroll** for filter chips on mobile
- **Larger touch targets** (48x48px minimum)

## 🚢 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import repository in Vercel
3. Auto-deploy on push to main
4. Custom domain (optional)

### Other Platforms

```bash
# Build static export
npm run build

# Deploy the .next folder
```

## 🔮 Future Enhancements

- [ ] User submissions form
- [ ] Upvote/voting system
- [ ] Curated collections
- [ ] Side-by-side comparison tool
- [ ] RSS feed for new tools
- [ ] Social sharing
- [ ] Advanced filters (free/paid, license type)
- [ ] Multi-language support (i18n)

## 📝 Adding New Tools

Edit `data/tools.json`:

```json
{
  "id": "unique-id",
  "name": "Tool Name",
  "description": "Brief description...",
  "url": "https://tool-url.com",
  "category": "Animation",
  "tags": ["tag1", "tag2"],
  "featured": false,
  "color": "#HEXCOLOR"
}
```

Categories must be one of: `Animation`, `Micro-interactions`, `Components`, `Documentation`, `Design-to-Code`, `Inspiration`

## 🤝 Contributing

Contributions welcome! To add a tool:

1. Fork the repository
2. Add tool to `data/tools.json`
3. Test locally
4. Submit pull request

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🙏 Credits

- **Tools Catalog:** Curated from industry-standard design resources
- **Design Inspiration:** Pinterest, Dribbble, Apple
- **Built with:** Next.js, Tailwind CSS, Framer Motion

---

**Made with ❤️ for designers and developers**

Current tool count: **40+ tools**

[View Live Demo](#) • [Report Bug](#) • [Request Feature](#)
