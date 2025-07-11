# NLW Agents Web

A React-based web application for managing and joining rooms. Built with Vite, React Router, TanStack Query, and TailwindCSS.

## Project Structure

```
src/
  ├── app.tsx            # Main app component with routing
  ├── main.tsx           # Entry point
  ├── index.css          # Global styles (TailwindCSS)
  ├── lib/
  │   └── utils.ts       # Utility functions
  ├── pages/
  │   ├── create-room.tsx# Room listing and navigation
  │   └── room.tsx       # Room details page
  └── vite-env.d.ts      # Vite environment types
```

## Dependencies

- **React**: UI library
- **React Router DOM**: Routing
- **TanStack React Query**: Data fetching and caching
- **TailwindCSS**: Utility-first CSS framework
- **clsx**: Conditional class names
- **tailwind-merge**: Merge Tailwind classes
- **lucide-react**: Icon library
- **tw-animate-css**: Tailwind animation utilities

## Dev Dependencies

- **Vite**: Build tool
- **TypeScript**: Type safety
- **ESLint**: Linting
- **@vitejs/plugin-react**: React support for Vite

## Usage

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint code

```bash
npm run lint
```

## Features

- List available rooms
- Navigate to room details
- Responsive UI with TailwindCSS
- Data fetching with React Query

## API

The app expects a backend running at `http://localhost:3333` with the following endpoint:

- `GET /rooms`: Returns an array of rooms `{ id, name }`

## Customization

- Update styles in `src/index.css`
- Add new pages in `src/pages/`
- Extend API calls in `src/pages/create-room.tsx` and `src/pages/room.tsx`

## License

MIT
