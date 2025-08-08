#!/bin/sh

set -e

# Note: This version must be the same as in deno.json
PRISMA_VERSION="6.13.0"
PRISMA="npm:prisma@${PRISMA_VERSION}"

echo "Generating Prisma Client..."
deno run --allow-scripts -A ${PRISMA} generate


echo "Running Prisma Migrations..."
deno run --allow-scripts -A ${PRISMA} migrate dev --schema=./prisma/schema.prisma

echo "Starting app..."
exec deno task dev
