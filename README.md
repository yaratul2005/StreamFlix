### 🎬 StreamFlix

<div>

`<p>``<em>`Premium Movie and TV Show Streaming Platform`</em>``</p>`

[

](https://nextjs.org/)
[

](https://www.typescriptlang.org/)
[

](https://tailwindcss.com/)
[

](https://www.themoviedb.org/documentation/api)

</div>## 📋 Overview

StreamFlix is a modern, responsive streaming platform built with Next.js that allows users to browse and watch movies and TV shows. It features a sleek UI, comprehensive search functionality, and integration with TMDB for metadata and VidSrc for streaming sources.

### ✨ Live Demo

[View Live Demo](https://streamflix-demo.vercel.app) *(Replace with your actual deployment URL)*

## 🚀 Features

- **🎭 Extensive Content Library** - Access thousands of movies and TV shows
- **🔍 Advanced Search** - Find content by title, genre, or actor
- **📱 Responsive Design** - Optimized for all devices from mobile to desktop
- **🌓 Dark/Light Mode** - Choose your preferred theme
- **📺 HD Streaming** - High-quality video playback
- **📝 User Accounts** - Create accounts to track watch history and favorites
- **📊 Content Details** - View comprehensive information about movies and shows
- **🎬 Trailers & Previews** - Watch trailers before deciding what to watch
- **📺 TV Show Episode Management** - Navigate seasons and episodes easily
- **🔄 Similar Content Recommendations** - Discover related content


## 🛠️ Technologies Used

- **Frontend**

- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Lucide React Icons



- **APIs & Services**

- TMDB API (The Movie Database)
- VidSrc API (Streaming Sources)



- **Deployment**

- Vercel





## 📸 Screenshots

<div>







</div>## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or later
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))


### Installation

1. **Clone the repository**


```shellscript
git clone https://github.com/yourusername/streamflix.git
cd streamflix
```

2. **Install dependencies**


```shellscript
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**


Create a `.env.local` file in the root directory with the following:

```plaintext
TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**


```shellscript
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser**


## 📁 Project Structure

```plaintext
streamflix/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   ├── [type]/[id]/        # Dynamic movie/TV show pages
│   ├── tv/[id]/[season]/[episode]/ # TV episode pages
│   ├── search/             # Search functionality
│   ├── login/              # Authentication
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── ui/                 # UI components (shadcn)
│   ├── enhanced-media-player.tsx # Video player
│   ├── hero-slider.tsx     # Homepage hero section
│   └── ...                 # Other components
├── lib/                    # Utility functions
│   ├── tmdb.ts             # TMDB API integration
│   ├── vidsrc.ts           # VidSrc API integration
│   └── utils.ts            # Helper functions
├── types/                  # TypeScript type definitions
├── public/                 # Static assets
└── ...                     # Config files
```

## 🔌 API Integration

### TMDB API

StreamFlix uses the TMDB API to fetch movie and TV show metadata, including:

- Trending content
- Movie and TV show details
- Cast and crew information
- Similar content recommendations
- Search functionality


### VidSrc API

The VidSrc API is used to source streaming content:

- Movie streams
- TV episode streams
- Multiple source fallbacks


## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## ⚠️ Disclaimer

This project is for educational purposes only. StreamFlix does not host any content. All streaming links are provided by VidSrc, which aggregates links from third-party sources. Please use this application responsibly and in accordance with your local laws regarding content streaming.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [TMDB](https://www.themoviedb.org/) for their comprehensive movie and TV show database
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Shadcn UI](https://ui.shadcn.com/) for the beautiful UI components
- [Lucide React](https://lucide.dev/) for the icon set
- [VidSrc](https://vidsrc.me/) for the streaming sources API


---

<div>`<p>`Made with ❤️ by `<a href="https://github.com/yourusername">`Your Name`</a>``</p>`
`<p>`© 2023 StreamFlix. All rights reserved.`</p>`

</div>
