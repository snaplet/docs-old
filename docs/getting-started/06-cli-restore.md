# Restore snapshots

```bash
snaplet restore
```

Will restore the latest snapshot. This will download the snapshot, create the schema, import the data, and create the indexes.

That's it! You've just created and restored your first snapshot.


## Quick tips

### Create a new snapshot

```bash
snaplet restore --new
```

This command kicks off an on demand snapshot, which will poll Snaplet's servers and wait until it's done until restoring it.

### List snapshots

```bash
snaplet list
```

The `list` command shows a list of versioned snapshots, you can restore a specific snapshot by specifying a full or partial name of the snapshot.

```bash
snaplet restore v1
```
 
### Data-only restores
```bash
snaplet restore --data-only
```
 Running the `snaplet restore` command with the `--data-only` flag ensures that you keep your current database structure and only the data is restored.
 
### Restore specific tables only

```bash
snaplet restore —data-only —tables
```

Running the `snaplet restore` command with the `--data-only` flag, combined with the `--tables` parameter, gives you finer control over which data is restored. This feature is handy for those instances where you want to refresh your data in specific tables only, without affecting anything else you might have changed. Refreshing just some tables can also be a lot faster compared to the entire database!

*Here’s an example:*

`snaplet restore --data-only --tables=public.user,city`

In the example above, both the user and city table in the public schema would be refreshed, and nothing else. 

Note that, the default schema is assumed to be public, so you don’t need to specify a schema for tables that exist in public (i.e: `snaplet restore --data-only --tables=city`)



## Learn more about Snaplet CLI

That's it! You're done. You've created and restored a snapshot, but there's a bunch more than Snaplet is capable of, learn more about those features in our [CLI reference](/snaplet-cli/introduction)


