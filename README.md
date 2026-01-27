# Trip Jot

Trip Jot is a itinerary planner designed to help users organize their travel plans efficiently. Built with the latest web technologies, it offers a seamless and interactive user experience.

## Features

- **Trip Management**: comprehensive tools to create, view, and manage trip itineraries.
- **Modern Architecture**: Leverages the full **TanStack** ecosystem (Router, Query, Store, Form) for robust state management and routing.
- **Beautiful UI**: Polished, accessible components using **Shadcn UI** and **Tailwind CSS v4**.
- **Type-Safe**: Built with **TypeScript** for reliability and developer experience.
- **Quality Assurance**: Integrated testing with **Vitest** (Unit) and **Playwright** (E2E).
- **Code Quality**: Fast linting and formatting with **Biome**.

## Tech Stack

- **Framework**: [React 19](https://react.dev/) & [Vite](https://vitejs.dev/)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **State Management**: [TanStack Store](https://tanstack.com/store) & [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching**: [TanStack Query](https://tanstack.com/query)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Forms**: [TanStack Form](https://tanstack.com/form) & [Zod](https://zod.dev/)
- **Testing**: [Vitest](https://vitest.dev/) & [Playwright](https://playwright.dev/)
- **Tooling**: [Biome](https://biomejs.dev/) & [TypeScript](https://www.typescriptlang.org/)

## Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your machine. This project uses [pnpm](https://pnpm.io/) as the package manager.

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd trip-jot
pnpm install
```

### Development

Start the development server:

```bash
pnpm dev
```

The application will be available at `http://localhost:5173`.

## Scripts

- **`pnpm dev`**: Starts the Vite development server.
- **`pnpm build`**: Builds the application for production.
- **`pnpm preview`**: Locally previews the production build.
- **`pnpm lint`**: Lints the codebase using Biome.
- **`pnpm format`**: Formats the codebase using Biome.
- **`pnpm check`**: Runs Biome checks (linting + formatting).
- **`pnpm type-check`**: Runs TypeScript type checking.
- **`pnpm test`**: Runs unit tests using Vitest.
- **`pnpm test:e2e`**: Runs end-to-end tests using Playwright.
- **`pnpm test:e2e:mock`**: Runs e2e tests with mocked API responses.

## Project Structure

- **`src/routes`**: Application routes (File-Based Routing).
- **`src/components`**: Reusable UI components.
- **`src/hooks`**: Custom React hooks.
- **`src/store`**: Global state definitions.
- **`src/lib`**: Utility functions and helpers.
- **`src/types`**: TypeScript type definitions.
- **`src/integrations`**: Third-party service integrations.
