# Subset data

Capturing a snapshot of a large database in its entirety can be lengthy, and ultimately unncessary, as only a representative subset of the data is typically needed to code against. 

Snaplet can be configured to capture a subset of data during the snapshot process, reducing the snapshot's size, and the subsequent time spent uploading and downloading snapshots.

## Getting started

To reduce the size of your next snapshot and get a small, representative subset of your database, use the `subset` object to your `snapshot.config.ts` file.

An example of a `snapshot.config.ts` file with a basic `subset` config:


```typescript
import { defineConfig } from "snaplet";
export default defineConfig({
  subset: {
    targets: [
      {
        table: "public.User",
        percent: 5
      },
    ],
    keepDisconnectedTables: true,
  },
});
```

When `snaplet snapshot capture` is run against the above example config the following will happen:
* The `User` table is subsetd to roughly 5% of its original size.
* Related rows in related tables connected to the `User` table via foreign key relationships are included in the new snapshot.
* As `keepDisconnectedTables` is set to `true`, any tables not connected to the `User` table via foreign key relationships will be included in the new snapshot, and **won't** be subsetd.  

## Configuring subsetting

Various commands permit more granular control over subsetting. Chat to us [on Discord](https://app.snaplet.dev/chat) if your use case isn't supported.

### Enabled (enabled: boolean)
When set to true, subsetting will occur during `snaplet snapshot capture`.

### Targets (targets: array)
The first table defined in `targets` is the starting point of subsetting. Subsetting specifics are controlled by the `percent` (or `rowLimit`), `where` and `orderBy` properties. 

Subset traverses tables related to the `target` table and selects all the rows that are connected to the `target` table via foreign key relationship. This process is repeated for each `target` table. At least one `target` must be defined.

Each `target` requires:
* A `table` name 
* One or more of the following subsetting properties:
  * `percent` (percent of rows captured: number)  
  * `rowLimit` (limit on the number of rows captured: number)
  * `where` (filter by string: string)

Optionally, you can also define an `orderBy` property to sort the rows before subsetting.

Here is an example of a config with multiple targets:


```typescript
import { defineConfig } from "snaplet";
export default defineConfig({
  subset: {
    targets: [
      {
        table: "public.User",
        orderBy: `"User"."createdAt" desc`,
        percent: 5
      },
      {
        table: "public.Project",
        where: `"Project"."id" = 'xyz'`
      }
    ],
  },
});
```

In this example a snapshot would be created with 5% of the rows in the User table (and all linked tables), as well as ensuring that any rows in the Project table where the Project ID matches 'xyz' are included.

### Keep Disconnected Tables (keepDisconnectedTables: boolean) (default=false)

When set to true, all tables (with all data) that are not connected via foreign key relationships to the tables defined in `targets` will be included in the snapshot. When set to false, all the tables not connected to the `target` tables via foreign key relationships will be excluded from the snapshot.

### Enabled (enabled: boolean) (default=true)

When set to true, subsetting will occur during `snaplet snapshot capture`. This allows you to turn off the subsetting with one single parameter.

### Follow Nullable Relations (followNullableRelations: boolean) (default=true)

When set to true, Snaplet subsetting will follow nullable relations. This means that if a table has a nullable foreign key, Snaplet will include the related rows in the snapshot. If set to false, those foreign key relations will be marked as null. Useful if the algorithm overfetches data.

### Max cycles loop (maxCyclesLoop: number) (default=10)

This parameter tells the subsetting algorithm how many times it's allowed to fetch "optional" data in the same table (cycles loop). This is useful to avoid an infinite loop in case of a circular relation.
This is particularly useful in case of overfetching to early exit the fetching process after some point.

:::note A recommendation

When setting up Snaplet for the first time, we recommend setting this parameter to 0 and to gradually
increment it until the subset of data you fetch trough a relationship is enough for your use case.

:::

### Max Children Per Node (maxChildrenPerNode: number) (default=unlimited)
This parameter tells the subsetting algorithm how many optional data it's allowed to retrieve at a time.
This can be useful in the case of 1 single row being linked to one millions rows in another table.
In that case, setting a limit of 1000 will allow the algorithm to fetch only the first 1000 related rows from this relation.

### Eager (eager: boolean) (default=false)
This parameter tells the subsetting algorithm to perform bi-directional relationship fetching.

Let's take an example:

Let's say you have the following database schema:
```
+-----------+                     +-----------+
|   user    | ------------------->|   team    |
+-----------+                     +-----------+
| id (PK)   |                     | id (PK)   |
| name      |                     | name      |
| team_id   | <------------------ |           |
| role      |                     |           |
+-----------+                     +-----------+
With the following data:
user: 1, 2, 3, 4, 5         ->     team: 1, role: 'user', 'user', 'user', 'admin', 'moderator'
user: 6, 7, 8               ->     team: NULL
```

Let's say we use the following target: `{table: 'public.user', where: 'user.id IN (1, 8)'}`
In "lazy" mode, we will only fetch `user: (1, 8) and team (1)` then stop. As there is no need to fetch more
data to satify this relationship constraint.
However, if your app logic require each team to have at least one user with the role 'admin' in it, then it might be a problem.

In that case, turning the `eager` parameter to true will allow the algorithm to fetch the missing data.
Resulting in the follwing data being fetched: `user: (1,2,3,4,5,8) and team (1)`

### Excluding tables from subset

To exclude specific tables from the snapshot see [exclude](docs/04-references/data-operations/03-exclude.md) documentation.

:::note A note on subset precision

Note that the `precent` / `rowLimit` specified in the subset config may not be exact. The actual row count of the data is affected by the relationships between the tables. As such, a 5% subset specified against a specific table may ultimately include more than 5% of the actual database.

:::
