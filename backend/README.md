# Job-Sniper-backend

---

### Work in progress

---

## Hints

Session:

- If req came without cookie - req.session gets fresh .id
- If req came with cookie, but no ID found in storage - req.session gets fresh .id (before first controller)
- If req came with cookie and ID found in storage - req.session populated with data from storage

Cookie and ID example:

- Cookie: s%3A**OLlpedfafn96MNR2mH_2OmVvKRWYwK2q**.G0jIieIbAlOW8ktoqObkQAn7snUoW54LtfhYUS5JfVg
- req.session.id: **OLlpedfafn96MNR2mH_2OmVvKRWYwK2q**

## Usage <a name = "usage"></a>

```
docker-compose up --build
```

Only db:

```
docker build -t sanarisan/job_sniper_postgres:1 -f $pwd/docker/postgres.Dockerfile .
docker run -d --rm --name job_sniper_postgres -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=super_secret_pWd -e POSTGRES_DB=postgres -v $pwd/db/pgdata:/var/lib/postgresql/data -p 5435:5432 --shm-size=512mb sanarisan/job_sniper_postgres:1
```