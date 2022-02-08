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

## Learn more about Snaplet CLI

That's it! You're done. You've created and restored a snapshot, but there's a bunch more than Snaplet is capable of, learn more about those features in our [CLI reference](/snaplet-cli/introduction)
