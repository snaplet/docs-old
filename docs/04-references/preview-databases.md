# Preview Databases

:::note Experimental

This is a preview feature. We would love your feedback!

:::


We want to give developers a "preview database" to code, or run pull-request previews against.

Each Snaplet Cloud Project receives a single PostgresQL server instance where multiple preview databases can be created.

The database server is hosted on a [Fly Machine](https://fly.io/docs/reference/machines/) with 1 shared CPU, 1GB of RAM and 10GB of persistent volume.

## Overview

```bash
# highlight-next-line
$ snaplet database --help

snaplet database [action]

manage preview databases

Commands:
  snaplet database cache [snapshot]                   cache a snapshot into the preview database server  [aliases: ca]
  snaplet database create [database-name] [snapshot]  create a preview database from a snapshot  [aliases: c]
  snaplet database destroy                            destroy the database server  [aliases: ds]
  snaplet database drop [database-name]               drop a preview database  [aliases: delete, d]
  snaplet database list                               list preview databases  [aliases: ls]
  snaplet database setup                              create a preview database server  [aliases: s]
  snaplet database url [database-name]                show a preview database url  [aliases: u]
```

For the following commands, we will use the convenient alias `db` in place of `database`.

## Creating a database server

The first step is to create a database server in the region of your choice.

Run `snaplet db setup`

## Creating a database

To create a database from a snapshot, run `snaplet db create`:

```bash
# highlight-next-line
$ snaplet db create preview_db_tutorial
# You will be asked to pick a snapshot if you don't provide one using the --snapshot or --latest option
✔ Snapshot › v1-cassidy-underpass-interface 483 kB  4 days ago
# The snapshot is restored to the preview database
✔ Database preview_db_tutorial created from snapshot v1-cassidy-underpass-interface [12s]
# You can now use your database!
You can connect to your database at: postgresql://postgres:*********@<ipv4>:5432/preview_db_tutorial
```

If you don't want to provide an explicit name for the database, you can use the `--git` option. Your database will be named after your current branch name:

```bash
# highlight-next-line
$ snaplet db create --git --latest
# Assuming that we are on the branch "snappy/feature-meow"
✔ Database snappy_feature_meow created from snapshot v1-cassidy-underpass-interface [11s]
You can connect to your database at: postgresql://postgres:*********@snaplet-<orgId>-<projectId>.fly.dev:5432/snappy_feature_meow
```

The `--git` option is available for database creation, deletion and displaying the database url.

## Listing databases

To list all databases, run `snaplet db list`:

```bash
# highlight-next-line
$ snaplet db list
DATABASES
NAME                   SIZE     SNAPSHOT
preview_db_tutorial    14 MB    v1-cassidy-underpass-interface
snappy_feature_meow    14 MB    v1-cassidy-underpass-interface
```

You can see the database size and from which snapshot each database was created.

## Dropping a database

To drop a database, run `snaplet db drop`:

```bash
# highlight-next-line
$ snaplet db drop preview_db_tutorial
✔ Dropped database preview_db_tutorial
```

## Displaying a database url

To display a database url, run `snaplet db url`:

```bash
# highlight-next-line
$ snaplet db url snappy_feature_meow
postgresql://postgres:*********@snaplet-<orgId>-<projectId>.fly.dev:5432/snappy_feature_meow
```

This command is especially helpful in CI/CD or preview environments: `DATABASE_URL=$(snaplet db url --git) yarn prisma migrate deploy`

## Caching a snapshot into the database server

Waiting for a snapshot to be restored can be long, especially if your snapshot is big.
To avoid this problem, you can cache snapshots into the database server for truly preview databases creation!

To cache a snapshot into the database server, run `snaplet db cache`:

```bash
# highlight-next-line
$ snaplet db cache v1-cassidy-underpass-interface
✔ Snapshot v1-cassidy-underpass-interface cached into preview database server [12s]

# highlight-next-line
$ snaplet db create is_it_fast_enough --snapshot v1-cassidy-underpass-interface
✔ Database is_it_fast_enough created from cached snapshot v1-cassidy-underpass-interface [389ms] # Notice the time here!
You can connect to your database at: postgresql://postgres:*********@snaplet-<orgId>-<projectId>.fly.dev:5432/is_it_fast_enough
```

The cached snapshots will appear in the `snaplet db list` command:

```bash
# highlight-next-line
$ snaplet db list
DATABASES
NAME                   SIZE     SNAPSHOT
is_it_fast_enough      14 MB    v1-cassidy-underpass-interface

CACHED SNAPSHOTS
NAME                              SIZE
v1-cassidy-underpass-interface    14 MB
```

## Clearing a cached snapshot from the database server

To clear a cached snapshot, run `snaplet db cache --clear`:

```bash
# highlight-next-line
$ snaplet db cache v1-cassidy-underpass-interface --clear
Snapshot v1-cassidy-underpass-interface removed from the preview database server cache
```

## Destroying a the database server

If you want to restart from scratch, you can run the `snaplet db destroy` command.

It will delete the database server with all its preview databases.