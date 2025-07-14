# proj_url_minifier

To install dependencies:

```bash
bun install
```

To run development mode:

```bash
bun run dev
```

This project was created using `bun init` in bun v1.2.18. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.


### Optional requirements
#### psql
- On mac:
```bash
brew install pgcli
```

Enter local docker database:
```bash
pgcli -h localhost -p 5432 -U <POSTGRES_USER> -d <POSTGRES_DB>
```


## Local development
### Only start the DB in docker

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

