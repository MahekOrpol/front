# Crystal Jewels E-commerce Frontend

A modern, performant React-based e-commerce frontend for a jewelry store.

## Features

- 🛍️ Product browsing and searching
- 🛒 Shopping cart functionality
- 💎 Detailed product views
- 👤 User authentication
- 📱 Responsive design
- ⚡ Optimized performance
- 🔄 PWA support with offline capabilities

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd front
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
yarn start
```

The app will be available at `http://localhost:3000`

### Building for Production

```bash
npm run build
# or
yarn build
```

## Performance Optimizations

- Code splitting with React.lazy
- Service Worker for offline support
- Image optimization
- Bundle size optimization
- Error boundary implementation
- Performance monitoring with Web Vitals

## Project Structure

```
src/
├── Components/        # Reusable UI components
├── Pages/            # Page components
├── redux/            # State management
├── assets/           # Static assets
├── styles/           # Global styles
└── utils/            # Helper functions
```

## Development Guidelines

1. Use TypeScript for type safety
2. Follow the component structure:
   - One component per file
   - Use functional components with hooks
   - Implement proper error boundaries
3. Style components using CSS modules or styled-components
4. Write meaningful commit messages
5. Add proper documentation for complex logic

## Available Scripts

- `npm start`: Start development server
- `npm test`: Run tests
- `npm run build`: Build for production
- `npm run eject`: Eject from Create React App
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
