# Securing PostgresQL

Snaplet connects to your PostgresQL database in order to create snapshots. We recommend that you give us read-only access to your database, and that you restrict connection to a specific set of ip-addresses.

<div style={{textAlign: 'center'}}>

![Never cry over split milk!](/img/snappy-spilt-milk.svg)

</div>

## Create a read-only account

Connect to your database and run the following SQL statements. These creates a `snaplet_readonly` user with the password `a very good password` and gives them `readaccess` to the `public` schema.

Change the username, password and schemas to support your needs!

```sql
-- create a "readaccess" role
CREATE ROLE readaccess;

-- Grant "SELECT" access to the "public" schema.
GRANT USAGE ON SCHEMA public TO readaccess;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO readaccess;

-- Grant "SELECT" access to future tables.
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO readaccess;

-- Create a user with password.
CREATE USER snaplet_readonly WITH PASSWORD 'a very good password';

-- Grant "readaccess" to your user.
GRANT readaccess TO snaplet_readonly;
```

## Grant ip-address access

Snaplet uses `54.93.75.84` and `18.158.21.101` to connect to your database. It's a good idea to restrict all traffic to PostgresQL, and only grant access where it's absolutely required.

Restrict access to your database with the [pg_hba.conf file](https://www.postgresql.org/docs/current/auth-pg-hba-conf.html).

```
# TYPE  DATABASE        USER            ADDRESS                 METHOD
host    <dbname>        all             54.93.75.84/32          md5
host    <dbname>        all             18.158.21.101/32        md5
```
