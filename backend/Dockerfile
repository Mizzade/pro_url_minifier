FROM oven/bun:slim

# Install OpenSSL (required by Prisma)
RUN apt-get update -y && apt-get install -y openssl

# Set working directory inside the container
WORKDIR /app

# Copy dependency manifests from parent folder
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy backend source code into image
COPY ./src ./src
COPY ./prisma ./prisma

# Copy and run the entrypoint script
COPY ./entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Expose the port of your application
EXPOSE 5000

# Start with entrypoint (will run prisma migrate)
ENTRYPOINT ["/entrypoint.sh"]
