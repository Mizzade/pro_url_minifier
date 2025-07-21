#!/bin/sh

echo "Generating Prisma Client..."
PRISMA_CLI_BINARY_TARGETS="linux-arm64-openssl-3.0.x" bunx prisma generate

echo "Running Prisma Migrations..."
bunx prisma migrate dev --schema=./prisma/schema.prisma

echo "Starting app..."
exec bun run src/server.ts
