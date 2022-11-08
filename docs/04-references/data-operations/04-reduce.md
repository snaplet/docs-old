# Reduce (Subset) data

:::note Experimental

This is a preview feature. We would love your feedback!

:::


Most of the time you will only need a portion of the data in your database. Snapet let's you capture a subset of your data. This will reduce your snapshot's size and in turn reduce the time spent uploading and downloading snapshots.

You can run `snaplet subset config` which will guide you through the process of capturing a subset of your database. During the first step you can choose which tables to exclude from the snapshot. Then you will decide which table will be the starting point of your subset and how many rows to capture. You can also write a "where" clause to limit the rows being captured. This will create a config file (`.snaplet/subsetting.json`) which you can modify afterwards.

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
      "where": "\"User\".\"lastName\" == Lee"
    },
  ],
  "keep_disconnected_tables": true
}
```
In this example we select 10% of the rows in the Organization, but only where the id is larger than 300. 
* In a use case where we originally have a 100 Organizations and more that 10 of the Organizations has an id larger than 300 we would have a subset of 10 of the Organizations. 
* In the case where we have say only 5 Organizations with id's larger than 300, then we would have only 5 Organizations in the subset.

Things get more complicated with the next target. Say each Organization has an administrator(User) associated with it. Here the Organization table has a foreign key pointing to User. In this case when we selected the Organization's rows we also had to get all the associated User's. So when we move on to the next target(User) we already have users in the subset and we cannot remove them or else we will break the forgein key constraits. Thus we add to the subset all users where the lastName is equal to "Lee".

### Disconnected tables (keep_disconnected_tables: boolean)

In your database there could be tables that don't have a relationship to the specified initial_targets. One can choose to either keep(`keep_disconnected_tables: true`) them in the snapshot or exclude them(`keep_disconnected_tables: false`) from the snapshot. 

### Excluding tables from subset

To exclude specific tables from the snapshot see [exclude](docs/04-references/data-operations/03-exclude.md) documentation.
