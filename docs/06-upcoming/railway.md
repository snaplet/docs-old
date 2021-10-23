---
sidebar_position: 3
---

# Railway

## 1. Provision a PostgreSQL database with Railway

First you need to [create a Railway account](http://railway.app/) and install the [Railway CLI](https://docs.railway.app/cli/installation).

### Install Railway CLI

Install with Homebrew

```bash
brew tap railwayapp/railway
brew install railway
```

Install with npm

```bash
npm i -g @railway/cli
```

Install with curl

```bash
sh -c "$(curl -sSL https://raw.githubusercontent.com/railwayapp/cli/master/install.sh)"
```

### Check Railway CLI version

```bash
railway version
```

```
railway version 0.2.40
```

### Login with `railway login`

```
railway login
```

```
🚝 Logging in... No dice? Try railway login --browserless
🚄 Logging in... 
🎉 Logged in as Anthony Campolo (anthony@email.com)
```

### Initialize project with `railway init`

Run the following command and select “Empty Project.”

```
railway init
```

Give your project a name.

```
✔ Starting Point: Empty Project 
✔ Enter project name: snaplet-railway
✔ Environment: production
🎉 Created project snaplet-railway
```

### Provision PostgreSQL with `railway add`

Add a plugin to your Railway project.

```
railway add
```

Select PostgreSQL.

```
✔ Plugin: postgresql 
🚊 Adding postgresql plugin
🎉 Created plugin postgresql
```

### Connect to database with `psql`

Replace `xxxx` with your database password.

```bash
PGPASSWORD=xxxx psql --host=containers-us-west-2.railway.app --username=postgres --port=5675 --dbname=railway
```

```
psql (13.3, server 13.2)
SSL connection (protocol: TLSv1.3, cipher: TLS_AES_256_GCM_SHA384, bits: 256, compression: off)
Type "help" for help.

railway=# 
```

## 2. Seed database

```sql
CREATE TABLE test_table (Test text);
INSERT INTO test_table VALUES ('Hello'), ('Goodbye');
SELECT * FROM test_table;
```

### List tables in database

```bash
\d
```

```
railway-# 
           List of relations
 Schema |    Name    | Type  |  Owner   
--------+------------+-------+----------
 public | test_table | table | postgres
(1 row)
```

### Describe table

```bash
\d test_table
```

```
           Table "public.test_table"
 Column | Type | Collation | Nullable | Default 
--------+------+-----------+----------+---------
 test   | text |           |          | 
```

### Revoke Write access

By default you will have privileges to perform DELETE, INSERT, TRUNCATE, or UPDATE. While Snaplet does work with WRITE-access, the team does not recommend it.

Create a "readaccess" role

```sql
CREATE ROLE readaccess;
```

Grant "SELECT" access to the "public" schema.

```sql
GRANT USAGE ON SCHEMA public TO readaccess;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readaccess;
```

Grant "SELECT" access to future tables.

```sql
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readaccess;
```

Create a user with password.

```sql
CREATE USER snaplet_readonly WITH PASSWORD 'a very good password';
```

Grant "readaccess" to your user.

```sql
GRANT readaccess TO snaplet_readonly;
```

### Quit psql

```bash
\q
```

### Copy database connection string to clipboard

```bash
echo `railway variables get DATABASE_URL` | pbcopy
```

## 3. Connect Snaplet to Railway database with `snaplet init`

The `snaplet init` command must be run for each project and is usually run at the repository root directory level, where a configuration file is generated.

```bash
snaplet init
```

```
This command is usually run at the repository root directory level
and will create a config file here:
/Users/ajcwebdev/snaplet/.snaplet/config.json

Access is scoped to a specific directory on your filesystem
as this allow you to restore snapshots for multiple databases
and configure where snapshots are restored.

Add this config file to your repository,
so that other developers can skip this step.

Fetching databases...
✔ Select a database › snaplet-railway

Testing local database credentials...Success ✔
✔ User ajcwebdev
✔ Password ***
✔ Hostname localhost
✔ Port 5432

✔ Change database credentials? … no

Enter the name of the database where snapshots are restored.
✔ Database name … snaplet-railway

✔ Updated system config: /Users/ajcwebdev/.snaplet/config.json
✔ Updated project config: /Users/ajcwebdev/snaplet/.snaplet/config.json

Tip: Use snaplet restore to restore your latest snapshot
```

### Create a new snapshot with `snaplet restore --new`

```bash
snaplet restore --new
```

```
Creating new snapshot...

Name: v2-serena-circles-transmitter
Updated: just now
Created: 2 minutes ago
Size: 69 B

Tables: test_table
Downloading "test_table"...
Restoring schema...
Importing table data...

Backup your database by renaming it to snaplet_snaplet-railway_2021-6-12_3144
✔ Backup database … yes

🎉 Restored snapshot to: snaplet-railway
```