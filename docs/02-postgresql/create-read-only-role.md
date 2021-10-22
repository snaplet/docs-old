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

::::note

If you have more than just the `public` schema (like if you're using Supabase or Hasura) you'll need to include those too.

::::
