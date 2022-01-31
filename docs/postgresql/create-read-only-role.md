---
sidebar_position: 2
---

# Create a read-only role

Snaplet connects to your PostgresQL database in order to create snapshots. We recommend that you give us read-only access to your database, and that you restrict connection to a specific set of IP addresses.

<div style={{textAlign: 'center'}}>

![Never cry over split milk!](/img/snappy-spilt-milk.svg)

</div>

Connect to your database and run the following SQL statements. These creates a `snaplet_readonly` user with the password `a very good password` and gives them `readaccess` to the `public` schema.

:::warning

Change the **username** and the **password**!

:::

```sql
-- Create a `read_all_data` role on all schemas
CREATE ROLE snaplet_read_all_data;

DO $do$
DECLARE
    sch text;
BEGIN
    FOR sch IN SELECT nspname FROM pg_namespace
    LOOP
        EXECUTE format($$ GRANT USAGE ON SCHEMA %I TO snaplet_read_all_data $$, sch);
				EXECUTE format($$ GRANT SELECT ON ALL TABLES IN SCHEMA %I TO snaplet_read_all_data $$, sch);
				EXECUTE format($$ ALTER DEFAULT PRIVILEGES IN SCHEMA %I GRANT SELECT ON TABLES TO snaplet_read_all_data $$, sch);
    END LOOP;
END;
$do$;

-- Create a `snaplet` user and associate the `read_all_data` role.
CREATE USER snaplet WITH PASSWORD 'a very good password';
GRANT snaplet_read_all_data TO snaplet;
```

::::note

If you have more than just the `public` schema (like if you're using Supabase or Hasura) you'll need to include those too.

::::
