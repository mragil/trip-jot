# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@9 --activate

# Install dependencies first (better layer caching)
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .

# Build-time environment variables
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN pnpm build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config template (not the final config)
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Pass API_URL for CSP header (envsubst will replace ${API_URL})
# This should match VITE_API_BASE_URL
ARG VITE_API_BASE_URL
ENV API_URL=$VITE_API_BASE_URL

EXPOSE 80

# nginx:alpine automatically runs envsubst on /etc/nginx/templates/*.template
# and outputs to /etc/nginx/conf.d/
CMD ["nginx", "-g", "daemon off;"]
