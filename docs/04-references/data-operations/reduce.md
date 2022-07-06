# Reduce (Subset) data

:::note Experimental

This is a preview feature. We would love your feedback.

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
  "excluded_tables": [
    "public._prisma_migrations",
  ]
}
```
In this config we limited the table "Organization" in the "public" schema to 100 rows. We also excluded the "_prisma_migrations" table.

To test your new subset configuration locally run `snaplet snapshot capture`.


See below video for a demonstration of the subsetting process:
<iframe src="https://www.loom.com/embed/920a6e1dcea84485b47be16062c968e6" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; modestbranding; showinfo=0" allowfullscreen width="100%" height="400px"></iframe>
