# Use a base image with Node.js and Bun pre-installed
FROM oven/bun:latest

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and bun.lockb to the working directory
COPY package.json bun.lockb ./

# Install dependencies using Bun
RUN bun install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN bun run build

# Expose the port that Next.js will run on
EXPOSE 30018

# Command to start the Next.js application
CMD ["bun", "start", "-p", "30018"]