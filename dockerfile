# Builder stage
FROM --platform=linux/arm64 node:18-alpine AS builder
# Set working directory
WORKDIR /app
# Install required dependencies (bash, curl, git)
RUN apk add --no-cache bash curl git
# Install Bun
RUN curl -fsSL https://bun.sh/install | bash && \
    export PATH=/root/.bun/bin:$PATH && \
    ln -s /root/.bun/bin/bun /usr/local/bin/bun
# Copy package.json and bun.lockb
COPY package.json bun.lockb ./
# Install dependencies using Bun
RUN /root/.bun/bin/bun install --frozen-lockfile
# Copy the rest of the application code
COPY . .
# Build the Next.js application
RUN /root/.bun/bin/bun run build

# Production stage
FROM --platform=linux/arm64 node:18-alpine AS runner
WORKDIR /app
# Set to production environment
ENV NODE_ENV production
# Install required system dependencies
RUN apk add --no-cache bash curl
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
# Copy necessary files from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/bun.lockb ./bun.lockb
COPY --from=builder --chown=nextjs:nodejs /app/next.config.ts ./next.config.ts
# Switch to non-root user
USER nextjs
# Expose the application port
EXPOSE 3000
# Use node to start your Next.js app instead of Bun
CMD ["node", "node_modules/.bin/next", "start"]