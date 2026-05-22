# Breathe

Breathe is a gentle reflection app: part living book, part private journal, part quiet peer connection space. It gives people a place to slow down, write what they are feeling, receive AI-assisted reflection, save meaningful moments, and connect with other "breathers" without turning the experience into a noisy social feed.

## What It Does

- **Living book home**: an immersive introduction to the heart and purpose of Breathe.
- **Reflect**: a calm AI-supported writing space for emotional reflection.
- **Archive**: saved highlights and summaries from personal reflections.
- **Connect**: peer reflections, shared moments, and "walk together" requests.
- **Walk rooms**: temporary Stream Chat rooms for two people to sit with each other for a while.
- **PWA support**: install prompt and web app manifest for a more app-like experience.

## Project Structure

```text
breathe-app/
|-- apps/
|   |-- web/        # React app, routes, UI, local reflection state
|   `-- server/     # Serverless backend handlers and integrations
|-- packages/
|   |-- types/      # Shared TypeScript types
|   `-- utils/      # Shared utilities
|-- package.json    # Monorepo scripts
`-- tsconfig.json   # Shared TypeScript config
```

## Tech Stack

- **Frontend**: React, TypeScript, React Router, Tailwind CSS, Framer Motion, Lottie
- **Backend**: Serverless Framework, AWS Lambda/API Gateway, TypeScript
- **Data and services**: MongoDB, Stream Chat, OpenAI
- **Tooling**: pnpm workspaces, Turborepo, Create React App

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 8+
- MongoDB connection string
- Stream Chat API credentials
- OpenAI API key

### Install Dependencies

```bash
pnpm install
```

### Environment Variables

Create environment files for the web and server apps.

`apps/server/.env`

```bash
MONGODB_URI=your_mongodb_uri
MONGODB_USERNAME=your_mongodb_username
MONGODB_PWD=your_mongodb_password
STREAM_API_KEY=your_stream_api_key
STREAM_SECRET=your_stream_secret
OPENAI_API_KEY=your_openai_api_key
```

`apps/web/.env`

```bash
REACT_APP_STREAM_API_KEY=your_stream_api_key
REACT_APP_HF_API_KEY=your_huggingface_api_key
```

The web app currently points to the deployed API Gateway URL in `apps/web/src/functions/api.ts`. To run fully against a local backend, update `API_BASE_URL` to your Serverless Offline URL, usually:

```ts
http://localhost:8000/dev
```

## Development

Run all apps through the monorepo:

```bash
pnpm dev
```

Run only the web app:

```bash
pnpm --filter breathe-app start
```

Run only the backend with Serverless Offline:

```bash
pnpm --filter server dev
```

The web app starts on [http://localhost:3000](http://localhost:3000). The local Serverless API runs on [http://localhost:8000](http://localhost:8000).

## Build

Build every workspace:

```bash
pnpm build
```

Build a single app:

```bash
pnpm --filter breathe-app build
pnpm --filter server build
```

## Testing

Run the web test suite:

```bash
pnpm --filter breathe-app test
```

## Backend Endpoints

The Serverless app exposes handlers for:

- Reflections: `POST /reflections`, `GET /user-reflections`, `GET /peer-reflections`
- Moments: `POST /send-moment`, `GET /moments`
- Walk requests: `POST /walk-together`, `GET /walk-requests`, `POST /walk-accept`, `POST /walk-decline`
- Walk rooms: `GET /walk-rooms`, `POST /walk-leave`
- Chat: `GET /chat-token`
- AI reflection: `POST /ai/reflection`

## Deploying the Backend

From the server workspace:

```bash
pnpm --filter server deploy
```

This uses the Serverless Framework configuration in `apps/server/serverless.yml` and deploys to AWS in the `ap-south-1` region by default.

## Notes

- Breathe stores an anonymous `breatheUserId` in browser `localStorage`.
- Reflection chat history and archive data are also stored locally in the browser.
- Shared reflections, moments, walk requests, and chat tokens use the backend API.
- Keep secrets in local `.env` files and do not commit them.
