# Subha Studios - Visual Storytelling & Photography Portfolio

Welcome to the official web application for **Subha Studios**, a premier photography and cinematic storytelling studio specializing in wedding storytelling, candid moments, pre-wedding & outdoor shoots, and event cinematography.

## 🌟 Overview

Subha Studios is built to showcase rich visual narratives with an elegant, responsive, and performance-optimized interface. The application features dynamic portfolio categorization, service showcases, about stories, and contact booking capabilities.

## 🚀 Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom UI Components
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **State & Data Queries**: [TanStack React Query](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🛠️ Getting Started

### Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or **pnpm**

### Installation

1. **Clone the repository** (or navigate to the project directory):
   ```sh
   cd subha-studios-main
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Run the local development server**:
   ```sh
   npm run dev
   ```
   The application will be accessible at `http://localhost:8080/`.

## 📦 Production Build

To check for type errors and build the production-ready application bundle:

```sh
npm run build
```

To preview the built production bundle locally:

```sh
npm run preview
```

## 📁 Project Structure

```text
src/
├── components/
│   ├── layout/       # Core layout components (Navbar, Footer, Layout wrapper)
│   └── ui/           # Tailored, reusable UI primitives (Button, FlowButton, Reveal, Toast)
├── data/             # Static & structured content for categories and portfolios
├── lib/              # Utility helpers (class names, styling utils)
├── pages/            # Application routes (Index, About, Portfolio, Services, Contact, CategoryPage)
├── App.tsx           # Router configuration and global providers
└── main.tsx          # Application entry point
```

## 📄 License

All rights reserved. © Subha Studios.
