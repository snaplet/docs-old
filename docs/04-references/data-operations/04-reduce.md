# Subset data

:::note Experimental

This is a preview feature. We would love your [feedback](https://app.snaplet.dev/chat)!

:::


Capturing a snapshot of a large database in its entirety can be lengthy, and ultimately unncessary, as only a representative sample of the data is typically needed to code against. 

Snaplet can be configured to capture a subset of data during the snapshot process, reducing the snapshot's size, and the subsequent time spent uploading and downloading snapshots.

## Getting started

To reduce the size of your next snapshot and get a small, representative sample of your database, add the `subset` object to your `transform.ts file`.

An example of a `transform.ts` file with a basic `subset` config:

```ts
...

export const config: Transform = () => {
  ...
}

export const subset = {
  enabled: true,
  version: "2", // the latest version
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
* The `User` table is subset to roughly 5% of its original size.
* Related rows in related tables connected to the `User` table via foreign key relationships are included in the new snapshot, and are similarly subset.
* As `keepDisconnectedTables` is set to `true`, any tables not connected to the `User` table via foreign key relationships will be included in the new snapshot, but **won't** be subset.  

## Configuring Subsetting

Various commands permit more granular control over subsetting. <!-- Chat to us [on Discord](https://app.snaplet.dev/chat) if your use case isn't supported.-->

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
      orderBy: `"createdAt" desc`,
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

### Excluding tables from subset

To exclude specific tables from the snapshot see [exclude](docs/04-references/data-operations/03-exclude.md) documentation.

:::note A note on subset precision

Note that the `precent` / `rowLimit` specified in the subset config may not be exact. The actual row count of the data is affected by the relationships between the tables. As such, a 5% subset specified against a specific table may ultimately include slightly more than 5% of the actual database.

:::


<!-- 
Subset version 2 dont have the customs forgeinKeys option yet. (Issue: https://linear.app/snaplet/issue/S-288/subset-version-2-custom-forgeinkeys-in-config)
### Foreign keys (foreignKeys: array, optional)

We use the foreign keys to traverse the databse when creating a subet. We use all non-nullable foreign keys and detect nullable forgein keys that will not cause a circular reference. The nullable forgein keys can be manually override with the `forgeinKeys` property.

The foreignKeys property is an array of objects with the following properties:
* `table` - the table name
* `column` - the column name
* `targetTable` - the target table name
* `targetColumn` - the target column name

Here is an example of a transform.ts file with a subset config that uses the foreignKeys property:

```ts



``` -->



---
# Subsetting (version 1) **DEPRECATED**:

:::note A note on this documentation

This reference is provided for legacy Snaplet users who may be using the previous version of subsetting that was configured via the `subsetting.json` file, and is now deprecated. 

:::

Here is a basic example of the `subsetting.json` file:

```json
{
  "enabled": true,
  "initial_targets": [
    {
      "table": "public.Organization",
      "row_limit": 100
    }
  ],
  "keep_disconnected_tables": true,
}
```
In this config we limited the table "Organization" in the "public" schema to 100 rows.

To test your new subset configuration locally run `snaplet snapshot capture`.

## Reference

### Enabled (enabled: boolean)
When set to true subsetting will occur during during `snaplet snapshot capture`

### Initial Targets (initial_targets)
Targets(tables) are used to specify the specifics of the subset. Subsetting will start at the first initial_target entry, thus at least one target needs to be specified. 

The target requires:
* table name (table: string)
* percentage (percent: number) or limit on the rows: (row_limit: number)

Optional:
* where clause (where: string)

Note that for the first target the where clause can be used to reduce the subset. But for the following targets the where cluase will in most cases increase the size of the subset. Lets have a look at an example to showcase this.

Example `subsetting.json` file:
```json
{
  "enabled": true,
  "initial_targets": [
    {
      "table": "public.Organization",
      "percent": 10,
      "where": "\"Organization\".\"id\" > 300"
    },
     {
      "table": "public.User",
       "percent": 10,
      "where": "\"User\".\"lastName\" = 'Lee'"
    },
  ],
  "keep_disconnected_tables": true
}
```
In this example we select 10% of the rows in the Organization, but only where the id is larger than 300. 
* In a use case where we originally have a 100 Organizations and more that 10 of the Organizations has an id larger than 300 we would have a subset of 10 of the Organizations. 
* In the case where we have say only 5 Organizations with id's larger than 300, then we would have only 5 Organizations in the subset.

Things get more complicated with the next target. Say each Organization has an administrator(User) associated with it. Here the Organization table has a foreign key pointing to User. In this case when we selected the Organization's rows we also had to get all the associated Users. So when we move on to the next target(User) we already have users in the subset and we cannot remove them or else we will break the forgein key constraits. Thus we add to the subset all users where the lastName is equal to "Lee".

### Disconnected tables (keep_disconnected_tables: boolean)

In your database there could be tables that don't have a relationship to the specified initial_targets. One can choose to either keep(`keep_disconnected_tables: true`) them in the snapshot or exclude them(`keep_disconnected_tables: false`) from the snapshot. 

