#!/bin/sh

# Ensures the script exits immediately if any command fails. Good practice in production scripts.
set -e

# The prisma migrate deploy command applies database migrations, which requires:
# - A live connection to your production database
# - Appropriate credentials and permissions
# But during docker build, you don’t have access to runtime secrets or the
# target database—this phase is meant for building artifacts, not executing
# side effects like touching a DB.

# Running prisma migrate deploy during the build introduces:
# - Side effects (writes to database)
# - Dependency on environment-specific runtime configuration (e.g., production DB access)
# - Risk of migrations being tied to image build, making the build non-repeatable

echo "Generating Prisma Client..."
PRISMA_CLI_BINARY_TARGETS="linux-arm64-openssl-3.0.x" bunx prisma generate

echo "Running Prisma Migrations..."
bunx prisma migrate deploy --schema=./prisma/schema.prisma

echo "Starting app..."
exec bun ./server.js
