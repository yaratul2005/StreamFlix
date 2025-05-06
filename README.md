# 🎬 StreamFlix

<div align="center">
  <img src="https://i.imgur.com/IjWrvEI.png&auto=format&fit=crop&w=1470&q=80" alt="StreamFlix Banner" width="100%">
  
  <p><em>✨ Premium Movie and TV Show Streaming Platform ✨</em></p>

  <div>
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
    <img src="https://img.shields.io/badge/TMDB_API-01D277?style=for-the-badge&logo=themoviedatabase&logoColor=white" alt="TMDB API">
  </div>
</div>

## 🌟 Featured Preview
<div align="center">
  <img src="https://i.imgur.com/SXTW94x.jpeg&auto=format&fit=crop&w=1325&q=80" width="45%">
  <img src="https://i.imgur.com/w8fVU0i.jpeg&auto=format&fit=crop&w=1497&q=80" width="45%">
</div>

## 📋 Overview

StreamFlix is a modern, responsive streaming platform built with Next.js that allows users to browse and watch movies and TV shows. It features a sleek UI, comprehensive search functionality, and integration with TMDB for metadata and VidSrc for streaming sources.

### ✨ Live Demo

[![Live Demo](https://img.shields.io/badge/View-Live_Demo-FF5722?style=for-the-badge&logo=vercel&logoColor=white)](https://v0-create-a-php-project.vercel.app/)

## 🚀 Features

<div align="center">
  <table>
    <tr>
      <td><b>🎭 Extensive Library</b></td>
      <td>Thousands of movies and TV shows</td>
    </tr>
    <tr>
      <td><b>🔍 Advanced Search</b></td>
      <td>Find content by title, genre, or actor</td>
    </tr>
    <tr>
      <td><b>📱 Responsive Design</b></td>
      <td>Optimized for all devices</td>
    </tr>
    <tr>
      <td><b>🌓 Dark/Light Mode</b></td>
      <td>Choose your preferred theme</td>
    </tr>
    <tr>
      <td><b>📺 HD Streaming</b></td>
      <td>High-quality video playback</td>
    </tr>
    <tr>
      <td><b>📝 User Accounts</b></td>
      <td>Track watch history and favorites</td>
    </tr>
  </table>
</div>

## 🛠️ Tech Stack

<div align="center">
  <img src="https://skillicons.dev/icons?i=nextjs,typescript,tailwind,vercel,react" width="80%">
</div>

### Frontend
- Next.js 13+ (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- Lucide React Icons

### APIs & Services
- TMDB API (The Movie Database)
- VidSrc API (Streaming Sources)

## 📸 Screenshots

<div align="center">
  <img src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" width="30%">
  <img src="https://images.unsplash.com/photo-1535016120720-40c646be5580?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" width="30%">
  <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1459&q=80" width="30%">
</div>

## 🚀 Getting Started

### Prerequisites
- Node.js 18.0 or later
- TMDB API Key ([Get one here](https://www.themoviedb.org/settings/api))

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/streamflix.git
cd streamflix

# Install dependencies
npm install

# Set up environment variables
echo "TMDB_API_KEY=your_tmdb_api_key_here" > .env.local
echo "NEXT_PUBLIC_APP_URL=http://localhost:3000" >> .env.local

# Run the development server
npm run dev
