# Install dependencies only when needed
FROM node:20-alpine AS deps

WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then \
    npm install -g pnpm && pnpm install; \
  else npm install; fi

# Rebuild the source code only when needed
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Build the Next.js app
RUN npm run build

# Production image, copy necessary files
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV production
ENV PORT 3000

# Set Next.js port
EXPOSE 3000

# Only copy what’s needed for production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["npm", "start"]