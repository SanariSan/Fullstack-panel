# Job-Sniper-backend

---

### Work in progress

---

## Usage <a name = "usage"></a>

```
docker-compose up --build
```

Only db:

```
docker build -t sanarisan/job_sniper_postgres:1 -f $pwd/docker/postgres.Dockerfile .
docker run -d --rm --name job_sniper_postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=super_secret_pWd -e POSTGRES_DB=postgres -v $pwd/db/pgdata:/var/lib/postgresql/data -p 5435:5432 --shm-size=512mb sanarisan/job_sniper_postgres:1
```