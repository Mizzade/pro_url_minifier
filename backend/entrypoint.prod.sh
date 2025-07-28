#!/bin/sh

# Ensures the script exits immediately if any command fails. Good practice in production scripts.
set -e

echo "Generating Prisma Client..."
PRISMA_CLI_BINARY_TARGETS="linux-arm64-openssl-3.0.x" bunx prisma generate

echo "Running Prisma Migrations..."
bunx prisma migrate deploy --schema=./prisma/schema.prisma

echo "Starting app..."
exec bun ./src/server.ts
