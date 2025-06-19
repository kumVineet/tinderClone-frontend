# Migration from Vite+React to Next.js

This document outlines the changes made to migrate the Tinder Clone project from Vite+React to Next.js.

## Key Changes Made

### 1. Project Structure
- **Before**: Vite with `src/` directory containing React components
- **After**: Next.js App Router with `src/app/` directory structure

### 2. Routing Changes
- **Before**: React Router with `<BrowserRouter>`, `<Routes>`, `<Route>`, and `<Outlet>`
- **After**: Next.js App Router with file-based routing in `src/app/` directory

### 3. File Structure Changes
```
Before (Vite):
├── src/
│   ├── App.jsx (main app with routing)
│   ├── Body.jsx (layout wrapper)
│   ├── main.jsx (entry point)
│   ├── components/
│   ├── screens/
│   └── utils/
├── index.html
├── vite.config.js
└── package.json

After (Next.js):
├── src/
│   ├── app/
│   │   ├── layout.jsx (root layout)
│   │   ├── page.jsx (home page)
│   │   ├── login/page.jsx
│   │   ├── profile/page.jsx
│   │   ├── connections/page.jsx
│   │   ├── requests/page.jsx
│   │   ├── providers.jsx (Redux provider)
│   │   └── globals.css
│   ├── components/ (unchanged)
│   ├── screens/ (unchanged)
│   └── utils/ (unchanged)
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

### 4. Configuration Files
- **Removed**: `vite.config.js`, `eslint.config.js`, `index.html`
- **Added**: `next.config.js`, `tailwind.config.js`, `postcss.config.js`, `.eslintrc.json`

### 5. Dependencies Updated
- **Removed**: `react-router`, `@vitejs/plugin-react`, `vite`
- **Added**: `next`, `@types/node`, `eslint-config-next`, `@tailwindcss/postcss`, `autoprefixer`

### 6. Component Updates

#### Navigation
- **NavBar.jsx**: Updated to use `next/link` and `next/navigation` instead of React Router
- **Login.jsx**: Updated to use `next/navigation` for routing

#### Client Components
- Added `'use client'` directive to components that use hooks or browser APIs:
  - `src/app/providers.jsx`
  - `src/app/page.jsx`
  - `src/app/login/page.jsx`
  - `src/app/profile/page.jsx`
  - `src/app/connections/page.jsx`
  - `src/app/requests/page.jsx`
  - `src/components/NavBar.jsx`
  - `src/screens/Login.jsx`

### 7. Routing Migration
- **Home page**: `/` → `src/app/page.jsx`
- **Login page**: `/login` → `src/app/login/page.jsx`
- **Profile page**: `/profile` → `src/app/profile/page.jsx`
- **Connections page**: `/connections` → `src/app/connections/page.jsx`
- **Requests page**: `/requests` → `src/app/requests/page.jsx`

### 8. Redux Integration
- Redux store remains unchanged in `src/utils/appStore.js`
- Wrapped with `Provider` in `src/app/providers.jsx`
- All Redux functionality preserved

### 9. Styling Fixes
- Fixed global CSS to remove conflicting body styles
- Updated NavBar component with proper styling and structure
- Improved layout structure with semantic HTML elements
- Fixed Tailwind CSS v4 configuration with proper PostCSS setup

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Start production server:
```bash
npm start
```

## Key Benefits of Next.js Migration

1. **File-based Routing**: Simpler routing without manual route configuration
2. **Server-side Rendering**: Better SEO and performance
3. **Built-in Optimizations**: Automatic code splitting, image optimization
4. **API Routes**: Built-in API functionality (if needed later)
5. **Better Development Experience**: Hot reloading, error boundaries
6. **TypeScript Support**: Better TypeScript integration
7. **Performance**: Automatic optimizations and better bundle splitting

## Notes

- All existing functionality has been preserved
- Redux state management remains unchanged
- Tailwind CSS configuration updated for Next.js v4
- All components and screens work as before
- Authentication flow remains the same
- App folder is organized inside src/ for better project structure

## Troubleshooting

If you encounter any issues:

1. Clear `.next` directory: `rm -rf .next`
2. Clear node_modules: `rm -rf node_modules && npm install`
3. Check that all imports are correct (especially for components in src/app directory)
4. Ensure all client components have `'use client'` directive where needed
5. Verify Tailwind CSS v4 configuration with `@tailwindcss/postcss` 