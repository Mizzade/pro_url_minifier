# proj_url_minifier

## Optional requirements

### psql

- On mac:

```bash
brew install pgcli
```

## Backend

Move to the `backend` directory to run the backend server.

```bash
cd backend
```

Install dependencies:

```bash
bun install
```

### Generate Prisma client

```bash
 bunx prisma generate --schema=./backend/prisma/schema.prisma
```

### Apply migrations to the database

#### Note: For this step the DB container must be running.

Make sure to run this command after changing the Prisma schema or before running the application for the first time.
Run this from the root of the project:

```bash
bunx prisma migrate dev --schema=./backend/prisma/schema.prisma
```

#### To run development mode:

## Getting started

From inside the `backend` directory, do the following steps:

- 1. Start the database in docker
- 2. Run migration: `bunx prisma migrate dev --schema=./prisma/schema.prisma`
- 3. Run generation: `bunx prisma generate --schema=./prisma/schema.prisma`
- 4. Start the backend server: `bun run dev`



## Database

This project uses PostgreSQL as the database and uses Prisma as the ORM.
The database is run in a Docker container using `docker-compose`.

### Only start the DB in docker

From the project's root directory, run:

```bash
docker-compose up -d db
```

### Remove the volume when shutting down the DB

```bash
docker-compose down --volumes
```

### Enter the DB on the running container

```bash
docker exec -it <CONTAINER_ID> psql -U <POSTGRES_USER> -d <POSTGRES_DB>
```

or use the `pgcli`
Enter local docker database:

```bash
pgcli -h localhost -p 5432 -U <POSTGRES_USER> -d <POSTGRES_DB>
```

### Build the backend image

```bash
docker build -t url-minifier-backend ./backend
```

### Run the backend container

```bash
docker run -p 5000:5000 --env-file ./backend/.env url-minifier-backend
```
## Running tests
Run the unit and integration tests with
```bash
bun run test
```

