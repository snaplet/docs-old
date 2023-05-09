# Sample (subset) data

Capturing a snapshot of a large database in its entirety can be lengthy, and ultimately unncessary, as only a representative sample of the data is typically needed to code against. 

Snaplet can be configured to capture a subset of data during the snapshot process, reducing the snapshot's size, and the subsequent time spent uploading and downloading snapshots.

## Getting started

To reduce the size of your next snapshot and get a small, representative sample of your database, export the `subset` object to your `transform.ts file`.

An example of a `transform.ts` file with a basic `subset` config:

```ts
...

export const config: Transform = () => {
  ...
}

export const subset = {
  enabled: true,
  version: "3", // the latest version
  targets: [
    {
      table: "public.User",
      percent: 5
    },
  ],
  keepDisconnectedTables: true
}

```
When `snaplet snapshot capture` is run against the above example config the following will happen:
* The `User` table is sampled to roughly 5% of its original size.
* Related rows in related tables connected to the `User` table via foreign key relationships are included in the new snapshot.
* As `keepDisconnectedTables` is set to `true`, any tables not connected to the `User` table via foreign key relationships will be included in the new snapshot, and **won't** be sampled.  

## Configuring sampling

Various commands permit more granular control over sampling. Chat to us [on Discord](https://app.snaplet.dev/chat) if your use case isn't supported.

### Enabled (enabled: boolean)
When set to true, sampling will occur during `snaplet snapshot capture`.

### Targets (targets: array)
The first table defined in `targets` is the starting point of sampling. Sampling specifics are controlled by the `percent` (or `rowLimit`), `where` and `orderBy` properties. 

Sample traverses tables related to the `target` table and selects all the rows that are connected to the `target` table via foreign key relationship. This process is repeated for each `target` table. At least one `target` must be defined.

Each `target` requires:
* A `table` name 
* One or more of the following sampling properties:
  * `percent` (percent of rows captured: number)  
  * `rowLimit` (limit on the number of rows captured: number)
  * `where` (filter by string: string)

Optionally, you can also define an `orderBy` property to sort the rows before sampling.

Here is an example of a config with multiple targets:

```ts
...

export const config: Transform = () => {
  ...
}

export const subset = {
  enabled: true,
  version: "2",
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
  keepDisconnectedTables: true
}

```

In this example a snapshot would be created with 5% of the rows in the User table (and all linked tables), as well as ensuring that any rows in the Project table where the Project ID matches 'xyz' are included.

### Keep Disconnected Tables (keepDisconnectedTables: boolean)

When set to true, all tables (with all data) that are not connected via foreign key relationships to the tables defined in `targets` will be included in the snapshot. When set to false, all the tables not connected to the `target` tables via foreign key relationships will be excluded from the snapshot.

### Excluding tables from sample

To exclude specific tables from the snapshot see [exclude](docs/04-references/data-operations/03-exclude.md) documentation.

:::note A note on sample precision

Note that the `precent` / `rowLimit` specified in the sample config may not be exact. The actual row count of the data is affected by the relationships between the tables. As such, a 5% sample specified against a specific table may ultimately include slightly more than 5% of the actual database.

:::

:::note Limitations

When sampling we calculate which rows to copy and keep a reference to them in memory. This means that there is a limit to the number of rows that we can store: The more rows you have in your sample, the more memory will be consumed. Currently the CLI is limited to 2GB. This is temporary issue which will be resolved in Q1 2023.

Until then:
- If you are using UUID's as primary keys (foreign keys) you have a row limit of roughly 1 million rows (or one large table of 12 million rows) on a 2GB system. 
- If you are using integers (int/bigint) as primary keys you can have roughly 4 million rows (or one large table of 48 million rows) on a 2GB system.

Lots of assumptions are made here. This will vary drastically on your spesific database design. Chat to us on [Discord](https://app.snaplet.dev/chat) and we will help you figure out what your limit is.

If you see this error: `FATAL ERROR: Reached heap limit Allocation failed - JavaScript heap out of memory ` you have reached your limit. Try and make your sample smaller by reducing the `percent` or `rowLimit` or by setting `keepDisconnectedTables` to false.

:::
