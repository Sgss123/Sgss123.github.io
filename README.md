# EdgeOne Pages Next.js Hybrid Rendering Template

A hybrid rendering demonstration project based on **EdgeOne Pages** and **Next.js 15**, showcasing SSR, ISR, SSG, Streaming, and other rendering strategies, as well as the use of Node Functions and Edge Functions.

## ✨ Features

- 🚀 **Hybrid Rendering Strategies** - Demonstrates SSR, ISR, SSG, Streaming, and other rendering methods
- ⚡ **Modern Frontend** - Next.js 15 + React 18 + TypeScript
- 🎨 **Aesthetic UI** - Tailwind CSS 4 + shadcn/ui component library
- 🔧 **Out-of-the-Box** - Preconfigured development environment and build process
- 📱 **Mobile-First** - Fully responsive design, supporting all devices
- 🌐 **Edge Computing** - Supports Node Functions and Edge Functions

## 🛠️ Technology Stack

### Frontend
- **Next.js 15.4.7** - React full-stack framework
- **React 18.3.1** - User interface library
- **TypeScript 5** - Type-safe JavaScript
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library

### Backend
- **EdgeOne Pages** - Edge computing platform
- **Node Functions** - Node.js runtime functions
- **Edge Functions** - Edge runtime functions

### Development Tools
- **ESLint** - Code quality checking
- **PostCSS** - CSS postprocessor
- **Turbopack** - Fast build tool

## 🚀 Quick Start

### Environment Requirements

- Node.js 18.0 or higher version
- EdgeOne Pages account

### Install Dependencies

```bash
# Clone the project
git clone <your-repo-url>
cd next-mix-template

# Install dependencies
npm install
```

### Local Development

```bash
# Start the development server
edgeone pages dev

# Access http://localhost:6699
```

### Build

```bash
# Build the production version
edgeone pages build
```

## 📚 Feature Demonstrations

### Hybrid Rendering Strategies

**SSR (Server-Side Rendering)**
- Path: `/ssr`
- Characteristics: Re-renders on the server for each request
- Suitable for: Dynamic content and personalized pages

**ISR (Incremental Static Regeneration)**
- Path: `/isr`
- Characteristics: Static generation + incremental updates
- Suitable for: News or blog websites

**SSG (Static Site Generation)**
- Path: `/ssg`
- Characteristics: Pre-generates all pages at build time
- Suitable for: Corporate websites and static content

**Streaming (Streaming Rendering)**
- Path: `/streaming`
- Characteristics: Gradually renders page content, enhancing user experience
- Suitable for: Data-intensive pages and complex content

### Server Functions

**Node Functions**
- Path: `/node-functions`
- Characteristics: Runs code at Node.js runtime
- Suitable for: Complex backend logic and data processing

**Edge Functions**
- Path: `/edge-functions`
- Characteristics: Runs code at edge runtime
- Suitable for: Real-time data processing and geolocation services

## 🗄️ Project Structure

```
next-mix-template/
├── src/                    # Source code directory
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Root layout component
│   │   ├── page.tsx       # Home page component
│   │   ├── ssr/           # SSR demonstration pages
│   │   ├── isr/           # ISR demonstration pages
│   │   ├── ssg/           # SSG demonstration pages
│   │   ├── streaming/     # Streaming demonstration pages
│   │   ├── node-functions/# Node Functions demonstration pages
│   │   ├── edge-functions/# Edge Functions demonstration pages
│   │   ├── api/           # API routes
│   │   └── globals.css    # Global styles
│   ├── components/        # React components
│   │   ├── ui/           # shadcn/ui component library
│   │   ├── Header.tsx    # Page header component
│   │   ├── Hero.tsx      # Hero section component
│   │   ├── Features.tsx  # Features component
│   │   └── FeatureCard.tsx # Feature card component
│   └── lib/              # Utility functions
├── public/               # Static resources
├── package.json          # Project configuration
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── components.json       # shadcn/ui configuration
```

## 📄 License

This project uses the MIT License - View the [LICENSE](https://github.com/github/choosealicense.com/blob/gh-pages/_licenses/mit.txt) file for details.

## 🚀 One-Click Deployment

[![Deploy with EdgeOne Pages](https://cdnstatic.tencentcs.com/edgeone/pages/deploy.svg)](https://edgeone.ai/pages/new?from=github&template=next-mix-template)
