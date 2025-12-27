<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Shirley's Kitchen - Family Cookbook

A modern, type-safe recipe management application with enterprise-grade security and accessibility features.

View your app in AI Studio: https://ai.studio/apps/drive/1Rk-NLmQ5e6rr8P0NwavHeSgtRjYzOmHV

## ✨ Features

- 📖 **Recipe Management**: Add, edit, delete, and organize family recipes
- ⭐ **Favorites**: Mark and filter favorite recipes
- 🔍 **Smart Search**: Debounced search with optimized indexing
- 📂 **Categories**: Organize recipes by type (appetizers, main dishes, desserts, etc.)
- 🎨 **Modern UI**: Beautiful interface with smooth animations
- ♿ **Accessible**: ARIA labels, keyboard navigation, focus management
- 🔒 **Secure**: XSS protection, CSP headers, input validation
- ⚡ **Performant**: Memoized contexts, web vitals monitoring
- 🧪 **Tested**: Vitest + Testing Library setup

## 🚀 Quick Start

**Prerequisites:** Node.js 16+

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Install backend server dependencies
cd server && npm install && cd ..

# 3. Create .env file with your Gemini API key
cp .env.example .env
# Edit .env and add: GEMINI_API_KEY=your_key_here
```

### Running the App

**You need 2 terminal windows:**

**Terminal 1 - Backend Server:**
```bash
npm run dev:server
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

See [BACKEND_SETUP.md](./BACKEND_SETUP.md) for detailed instructions.

## 📝 Development

### Available Scripts

```bash
npm run dev          # Start dev server
npm run build        # Build for production  
npm run preview      # Preview production build
npm test             # Run tests
npm run test:ui      # Run tests with UI
npm run lint         # Lint code
npm run lint:fix     # Fix linting errors
npm run format       # Format code with Prettier
```

### Project Structure

```
/
├── components/       # React components
│   ├── SafeHTML.tsx # XSS protection component
│   └── ...
├── hooks/           # Custom React hooks
│   ├── useAsyncOperation.ts
│   ├── useRecipeFilters.ts
│   └── useFocusTrap.ts
├── services/        # Business logic services
│   ├── storageService.ts
│   └── searchService.ts
├── context/         # React context providers
├── constants.ts     # App constants
├── config.ts        # Environment configuration
├── validation.ts    # Zod validation schemas
└── webVitals.ts     # Performance monitoring
```

## 🔒 Security Features

- **XSS Protection**: DOMPurify sanitization for user-generated content
- **Content Security Policy**: Strict CSP headers in index.html
- **Input Validation**: Zod schemas with comprehensive validation rules
- **Safe Storage**: Quota-aware localStorage with error handling

## ♿ Accessibility

- **ARIA Labels**: Descriptive labels for screen readers
- **Keyboard Navigation**: Full keyboard support, Tab cycling in modals
- **Focus Management**: Custom focus trap for modal dialogs
- **Semantic HTML**: Proper use of semantic elements

## ⚡ Performance Optimizations

- **Memoized Context**: Prevents unnecessary re-renders
- **Debounced Search**: Optimized search indexing
- **Lazy Loading Ready**: Infrastructure for code splitting
- **Web Vitals Monitoring**: Tracks CLS, INP, LCP, FCP, TTFB

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm test -- --coverage
```

## 🏗️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Validation**: Zod
- **Security**: DOMPurify
- **Testing**: Vitest + Testing Library
- **Code Quality**: ESLint + Prettier

## 📚 Recent Improvements

### Type Safety
✅ TypeScript strict mode enabled  
✅ Runtime validation with Zod  
✅ Comprehensive type coverage

### Performance
✅ Memoized context with useMemo/useCallback  
✅ Debounced search indexing  
✅ Custom hooks for business logic

### Security
✅ XSS protection with DOMPurify  
✅ Content Security Policy configured  
✅ Input validation schemas defined

### Accessibility  
✅ ARIA labels on interactive elements  
✅ Focus trap for modals  
✅ Keyboard navigation support

### Developer Experience
✅ ESLint and Prettier for code quality  
✅ Vitest for testing  
✅ Comprehensive JSDoc documentation  
✅ Web Vitals monitoring

See [CHANGELOG.md](./CHANGELOG.md) for detailed changes.

## 📄 License

This is a family recipe collection project.

## 🤝 Contributing

This is a personal/family project, but suggestions are welcome!
