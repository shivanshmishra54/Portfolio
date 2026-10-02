# Shivansh Mishra — Portfolio

<div align="center">
  <h3>Software Developer & Freelancer</h3>
  <p>A premium, cinematic, 3D-enhanced portfolio built with React and Vite.</p>
</div>

---

## 🚀 Live Preview

**[View Live Site](https://shivanshmishra.com)**

## 📖 Overview

This is the personal portfolio of **Shivansh Mishra**, designed to serve a dual audience:
1. **Freelancer Path (`/freelancer`)** — A client-oriented experience outlining services, capabilities, process, and business inquiries.
2. **Developer Path (`/developer`)** — A recruiter- and engineering-oriented experience outlining tech stack, projects, coding profiles (LeetCode/Codeforces), and technical history.

The architecture emphasizes progressive disclosure. The homepage (`/`) provides a universal overview, while the routed paths provide deep-dives into specific career aspects.

## ✨ Key Features

- **Dual-Path Architecture**: Distinct routing (`/freelancer` vs `/developer`) that presents the same underlying data through different contextual lenses.
- **Context-Aware Contact System**: Global contact modal that adapts form fields (Project Inquiry vs Technical Discussion) depending on the active route, powered by **Web3Forms**.
- **Cinematic 3D Integration**: Features a 3D avatar scene built with `react-three-fiber` and `@react-three/drei`, complete with dynamic lighting and camera interactions.
- **Data-Driven Content**: All site content (projects, journey, platforms, services) is extracted into `src/data/` as the single source of truth.
- **Premium Monochrome Aesthetics**: Minimalist, high-performance styling using Tailwind CSS with seamless Framer Motion transitions and Lenis smooth scrolling.

## 💻 Tech Stack

- **Framework**: React 18 & Vite
- **Routing**: React Router v7
- **Styling**: Tailwind CSS v3
- **Animations**: Framer Motion & Lenis
- **3D Graphics**: React Three Fiber (`@react-three/fiber`)
- **Forms API**: Web3Forms

## 🛠️ Local Development

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/shivanshmishra54/Portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root directory and add your Web3Forms access key for the contact forms to work:
   ```env
   VITE_WEB3FORMS_KEY=your_web3forms_access_key
   ```

4. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## 📂 Architecture & Documentation

Extensive project documentation and architectural guidelines are available in the repository:
- `AGENTS.md` - Core operating principles, rules, and constraints for the project.
- `docs/PRODUCT_SPEC.md` - Core requirements and audience definition.
- `docs/ARCHITECTURE.md` - Component structure and routing strategy.
- `docs/CONTENT_SCHEMA.md` - Data models and structures for the `src/data` folder.
- `docs/3D_STRATEGY.md` - Performance and technical strategy for WebGL/3D integration.

## 📝 License

This project is proprietary and intended for personal portfolio use by Shivansh Mishra.

<div align="center"> Designed and built by Shivansh Mishra </div>
