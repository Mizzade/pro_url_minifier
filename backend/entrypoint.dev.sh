#!/bin/sh

set -e

echo "Generating Prisma Client..."
PRISMA_CLI_BINARY_TARGETS="linux-arm64-openssl-3.0.x" bunx prisma generate

echo "Running Prisma Migrations..."
bunx prisma migrate dev --schema=./prisma/schema.prisma

echo "Starting app..."
exec bun --hot ./src/server.ts
