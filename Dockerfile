# Multi-stage build untuk optimasi ukuran image
FROM oven/bun:1-alpine AS base

# Install dependencies hanya jika diperlukan
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lockb* ./
RUN bun install --frozen-lockfile

# Build stage
FROM base AS builder
WORKDIR /app

# Copy dependencies dari stage sebelumnya
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment untuk production build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

ARG NEXT_PUBLIC_TMDB_API_KEY
ENV NEXT_PUBLIC_TMDB_API_KEY=${NEXT_PUBLIC_TMDB_API_KEY}
# Build aplikasi
RUN bun run build

# Production stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Install wget untuk healthcheck
RUN apk add --no-cache wget

# Buat non-root user untuk security
RUN addgroup --system --gid 1001 bunjs && \
    adduser --system --uid 1001 nextjs

# Copy file yang diperlukan untuk standalone output
COPY --from=builder --chown=nextjs:bunjs /app/public ./public
COPY --from=builder --chown=nextjs:bunjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bunjs /app/.next/static ./.next/static

# Switch ke non-root user
USER nextjs

# Expose port
EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-proxy --quiet --tries=1 --spider http://localhost:3000 || exit 1

# Start aplikasi dengan Bun (standalone output menggunakan server.js)
CMD ["bun", "server.js"]

