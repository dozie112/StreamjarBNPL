# ------------ Base: Node runtime ------------
FROM node:20-alpine AS base
WORKDIR /app
ENV NODE_ENV=production


# ------------ Dependencies layer ------------
# Copy manifest(s) first for better cache hits
COPY package*.json ./

# Install prod deps only (smaller image). Fall back to npm install if ci fails.
RUN npm ci --omit=dev --no-audit --no-fund || npm install --omit=dev --no-audit --no-fund

# ------------ App layer ------------
# Copy source code
COPY src ./src

# Expose backend port
EXPOSE 4000

# Install curl for container healthchecks
RUN apk add --no-cache curl

# Default command
CMD ["node", "src/server.js"]
