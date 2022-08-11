# Snapshots

A snapshot is the captured state of a database at a given point in time. (Internally we refer to this snapshot as a "nugget of data 🍗").
It contains all the information required to restore a database back to that point in time: both the schema (database structure) and the actual table data.

## Capturing a snapshot

To capture a snapshot of a database, run:

```bash
snaplet snapshot capture
```

This will capture the database specified in `databaseUrl` in the `.snaplet/config.json` configuration file. This can be overidden with the `SNAPLET_DATABASE_URL` environmental variable.

`pg_dump` is required to capture the schema.

Whilst a snapshot is captured the schema and table data can be modified in stream using [data operations.](/references/data-operations/overview)

### Storage of snapshots

Snapshots are automatically stored in `.snaplet/snapshots`, but you can specify a path:

```bash
snaplet snapshot capture /path/to/stored-snapshot
```

Snaplet will create the directory for you.

In the snapshot directory we store:

- `summary.json`: a bit of metadata that we used during restorations
- `schema.sql`: your database structure (schema)
- `tables/[schema]_[tableName].csv`: your table data in csv format.

The data is uncompressed and unencrypted.

---

## Restoring a snapshot

To restore a snapshot, run:

```bash
snaplet snapshot restore
```

This will search for the latest snapshot, download it, and restore it to the database specified in `databaseUrl` in the `.snaplet/config.json` configuration file.
This can be overidden with the `SNAPLET_DATABASE_URL` environmental variable.

### Searching for snapshots

If you're using Snaplet Cloud, Snaplet will lookup the latest snapshot in the `.snaplet/snapshots` directory.

You can also restore from a specific directory by specifying the path:

```bash
snaplet snapshot restore /path/to/stored-snapshot
```

### Encrypting Snapshots

In order to encrypt your snapshots, you’ll need to have a public key in your config. Run `snaplet config setup` to generate an RSA key-pair, which stores a private key in an `id_rsa` file and a public key in your `config.js`. 

Once your RSA key-pair is setup, snapshots captured via Snaplet Cloud capture are automatically encrypted as part of the capture process, while snapshots captured via the CLI are encrypted when you run a `snapshot share` command.

In order to opt-out of encrypting a snapshot, use the `--no-encrypt` flag.


### Decrypting snapshots

Snapshots that are encrypted with a public key (`publicKey` in `.snaplet/config.json`) are decrypted via the private key in `.snaplet/id_rsa`.

To generate a public and private key pair, run `snaplet config setup`.

The public key can be safely shared with Snaplet Cloud Project (`snaplet config push`) team members; when Snaplet Cloud captures on your behalf we'll encrypt using the public key, and your team will keep the private key.

### Data-only restores

```bash
snaplet snapshot restore --data-only
```

Running the `snaplet snapshot restore` command with the `--data-only` flag ensures that you keep your current database structure and only the data is restored.

### Restore specific tables only

```bash
snaplet snapshot restore --data-only --tables
```

Running the `snaplet snapshot restore` command with the `--data-only` flag, combined with the `--tables` parameter, gives you finer control over which data is restored. This feature is handy for those instances where you want to refresh your data in specific tables only, without affecting anything else you might have changed. Refreshing just some tables can also be a lot faster compared to the entire database!

_Here’s an example:_

`snaplet snapshot restore --data-only --tables=public.user,city`

In the example above, both the user and city table in the public schema would be refreshed, and nothing else.

Note that, the default schema is assumed to be public, so you don’t need to specify a schema for tables that exist in public (i.e: `snaplet snapshot restore --data-only --tables=city`)

---

## Sharing of snapshots

If you have a Snaplet Cloud Project setup (`projectId` is in `.snaplet/config.json`) then you can easily compress, encrypt and upload snapshots to a Snaplet Cloud Project where your team can restore them. The command: 

```bash
snaplet snapshot share
```

will ask you to select the snapshot that you wish to share. You can also specify the unique name or path to the snapshot in order to share it.

---

## List snapshots

```bash
snaplet snapshot list
```

The `list` command shows a list of versioned snapshots, you can restore a specific snapshot by specifying a full or partial name of the snapshot.
