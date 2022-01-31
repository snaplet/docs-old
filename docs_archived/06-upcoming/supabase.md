---
sidebar_position: 1
---

# Supabase

## Create Postgres Database with Supabase

```bash
mkdir supabase-snaplet
cd supabase-snaplet
```

Supabase includes a CLI for [local development](https://supabase.io/docs/guides/local-development).

```bash
npm install -g supabase
```

### Initialize Supabase project

You will need to have Docker installed and running on your machine to initialize a local development environment.

```bash
supabase init
```

You will be asked to select port numbers for the Supabase URL, Postgres database, and email testing interface.

```
✔ Port for Supabase URL: · 8000
✔ Port for PostgreSQL database: · 5432
✔ Port for email testing interface: · 9000
✔ Project initialized.
Supabase URL: http://localhost:8000
Supabase Key (anon, public): xxxx
Supabase Key (service_role, private): xxxx
Database URL: postgres://postgres:postgres@localhost:5432/postgres
Email testing interface URL: http://localhost:9000
```

Run `supabase start` to start local Supabase.

```bash
supabase start
```

```
✔ Started local Supabase.
```

## Connect to database with psql

```bash
PGPASSWORD=postgres psql -h localhost -U postgres -p 5432 -d postgres
```

### Create table

```sql
CREATE TABLE test_table (Test text);
```

### Insert values

```sql
INSERT INTO test_table VALUES ('Hello'), ('Goodbye');
```

### Print seed data

```sql
SELECT * FROM test_table;
```