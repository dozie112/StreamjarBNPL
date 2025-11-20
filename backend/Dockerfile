# ------------ Base: Node runtime ------------
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production

# ------------ System deps (NEW for Prisma) ------------
# CHANGED: Prisma on Alpine needs OpenSSL at build/run time.
# Also keep curl for healthchecks/debug.
RUN apk add --no-cache openssl curl

# ------------ Dependencies layer ------------
# Copy manifest(s) first for better cache hits
COPY package*.json ./

# CHANGED: We need devDeps during build to run `npx prisma generate`.
# So we install FULL deps first (no --omit=dev), then prune later.
# Fallback to npm install if npm ci cache is cold.
RUN npm ci --no-audit --no-fund || npm install --no-audit --no-fund

# ------------ Prisma client generation (NEW) ------------
# CHANGED: Copy Prisma schema and generate the client during build,
# so runtime startup is fast and deterministic.
COPY prisma ./prisma
RUN npx prisma generate

# OPTIONAL (size): drop devDependencies AFTER generate to keep image small
# CHANGED: This recreates your previous "prod-only" footprint.
RUN npm prune --omit=dev

# ------------ App layer ------------
# Copy application source AFTER deps + prisma client for better caching
COPY src ./src

# Expose backend port
EXPOSE 4000

# Default command (same as before)
# CHANGED: None — your server still starts with node src/server.js
CMD ["node", "src/server.js"]
