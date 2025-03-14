# Builder stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install required dependencies (bash, curl, git)
RUN apk add --no-cache bash curl git

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash && \
    echo "export PATH=/root/.bun/bin:$PATH" >> /etc/profile

# Copy package.json and bun.lockb
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN /root/.bun/bin/bun install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN /root/.bun/bin/bun run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app

# Set to production environment
ENV NODE_ENV production

# Install required system dependencies
RUN apk add --no-cache bash curl git

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Copy necessary files from builder stage
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lockb ./bun.lockb
COPY --from=builder /app/next.config.ts ./next.config.ts

# Expose the application port
EXPOSE 3000

# Start the Next.js application
CMD ["/root/.bun/bin/bun", "start"]
