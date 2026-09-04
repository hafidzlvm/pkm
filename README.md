# PKMN-LUXE — Pokedex Portfolio

A curated high-fidelity digital repository of elite-tier Pokemon specimens. Built with Next.js, TypeScript, Redux Toolkit, and Tailwind CSS, featuring a brutalist luxury design aesthetic.

![PKMN-LUXE](https://img.shields.io/badge/PKMN--LUXE-Pokedex-050505?style=for-the-badge&logo=react&logoColor=fada38)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Redux Toolkit](https://img.shields.io/badge/Redux-4.0-purple?style=for-the-badge&logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🏠 Home Page (Archive)
- **Infinite Scroll**: Seamlessly browse through all Pokemon with lazy loading
- **Search Functionality**: Real-time search with debounced API calls
- **Responsive Grid Layout**: Beautiful card-based display with PKMN-LUXE design
- **Pokemon Cards**: Display Pokemon with images, IDs, types, and favorite buttons
- **Type-based Styling**: Dynamic color schemes based on Pokemon types

### 📊 Pokemon Detail Page
- **Official Artwork**: High-quality Pokemon images
- **Comprehensive Stats**: Base stats visualization with progress bars
- **Type Information**: Visual type badges with color coding
- **Abilities Display**: List of Pokemon abilities
- **Evolution Chain**: Visual representation of Pokemon evolution paths
- **Favorite Toggle**: Add/remove Pokemon from favorites

### ⭐ Curated Collection
- **High-Value Assets**: Curated list of elite-tier Pokemon
- **Market Valuation**: Simulated ETH-based valuation system
- **Purity Grades**: Grade classification (Gem Mint, Pristine, Mint)
- **Rarity Status**: LEGENDARY, ULTRA RARE, RARE classifications
- **Featured Specimen**: Hero section showcasing featured Pokemon
- **Market Volatility**: Sparkline charts for price trends

### ❤️ Favorites (Collection)
- **Personal Vault**: Your collected Pokemon favorites
- **Local Storage**: Persistent storage using browser localStorage
- **Collection Management**: Add, remove, and clear favorites
- **Share Functionality**: Share your collection (if supported)

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.0](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with custom PKMN-LUXE theme
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **API**: [PokéAPI](https://pokeapi.co/)
- **HTTP Client**: Axios
- **Icons**: Material Symbols

## 📦 Installation

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:hafidzlvm/pokedex.portofolio.git
   cd pokedex.portofolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Run development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🚀 Build & Deploy

### Build for Production

```bash
npm run build
# or
bun run build
```

### Start Production Server

```bash
npm start
# or
bun start
```

### Docker Deployment

```bash
# Build Docker image
docker build -t pkmn-luxe .

# Run with Docker Compose
docker-compose up -d
```

## 📁 Project Structure

```
pokedex.portofolio/
├── app/                    # Next.js App Router
│   ├── page.tsx           # Home page (Archive)
│   ├── pokemon/[id]/      # Pokemon detail pages
│   ├── curated/           # Curated collection page
│   ├── favorites/         # Favorites page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── sections/          # Section components
│   │   └── Navbar.tsx     # Navigation bar
│   └── ui/                # UI components
│       └── PokemonCard.tsx
├── lib/
│   ├── services/          # API services
│   │   └── pokeApi.ts     # PokéAPI integration
│   └── store/             # Redux store
│       ├── slices/        # Redux slices
│       │   ├── pokemonSlice.ts
│       │   ├── searchSlice.ts
│       │   ├── pokemonDetailSlice.ts
│       │   └── favoritesSlice.ts
│       ├── store.ts       # Store configuration
│       └── StoreProvider.tsx
└── public/                # Static assets
    ├── icon.svg          # App icon
    └── favicon.ico        # Favicon
```

## 🎨 Design System

### PKMN-LUXE Theme

- **Primary Color**: `#fada38` (Golden Yellow)
- **Background**: `#050505` (Near Black)
- **Accent Gold**: `#d4af37`
- **Font**: Space Grotesk (Display), System fonts (Body)

### Key Design Elements

- **Brutalist Luxury**: Bold typography, high contrast, geometric shapes
- **Glass Morphism**: Backdrop blur effects with subtle transparency
- **Technical Grid**: Subtle grid pattern overlay
- **Type-based Colors**: Dynamic color schemes based on Pokemon types

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file (optional):

```env
# API Configuration (PokéAPI doesn't require API key)
NEXT_PUBLIC_API_URL=https://pokeapi.co/api/v2
```

### Redux Store

The Redux store is configured with the following slices:

- **pokemonSlice**: Manages Pokemon list and pagination
- **searchSlice**: Handles search queries and results
- **pokemonDetailSlice**: Manages individual Pokemon details
- **favoritesSlice**: Manages favorite Pokemon with localStorage persistence

## 📱 Responsive Design

- **Mobile**: Optimized for screens 320px+
- **Tablet**: Responsive breakpoints at 640px (sm), 768px (md)
- **Desktop**: Full experience at 1024px (lg), 1280px (xl)

## 🧪 Features in Detail

### Infinite Scroll
- Uses `useInView` hook from `react-intersection-observer`
- Automatically loads more Pokemon when scrolling near bottom
- Efficient pagination with offset-based API calls

### Search
- Debounced search input
- Real-time filtering
- Search across Pokemon names
- Integrated in Navbar and sidebar

### Favorites
- Persistent storage using localStorage
- Hydration-safe implementation
- Add/remove with toggle functionality
- Collection page with grid layout

## 🐛 Known Issues

- Hydration warnings resolved with client-side mounting checks
- Large datasets may require optimization for better performance

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Hafidz LVM**

- GitHub: [@hafidzlvm](https://github.com/hafidzlvm)
- Portfolio: [PKMN-LUXE](https://pkmn-luxe.hafidzlvm.org)

## 🙏 Acknowledgments

- [PokéAPI](https://pokeapi.co/) for providing the Pokemon data
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

---

**PKMN-LUXE** — A curated high-fidelity digital repository of elite-tier Pokemon specimens.
