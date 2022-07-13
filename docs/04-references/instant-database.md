# Instant Database

:::caution Work in progress

This is an unreleased feature.

:::


We are currently evaluating the feature to give developers an "instant database" to code, or run PR previews against. Each Snaplet Cloud Project receives a single PostgresQL server instance where multiple databases can be created.

## Overview

```bash
# highlight-next-line
$ snaplet database --help

snaplet database [action]

Commands:
  snaplet database create [database-name]  create an instant database from a snapshot         [aliases: c]
  snaplet database delete [database-name]  delete an instant database                         [aliases: d]
  snaplet database list                    list instant databases                             [aliases: ls]
  snaplet database url [database-name]     show an instant database url                       [aliases: u]
  snaplet database cache [snapshot]        cache a snapshot into the instant database server  [aliases: ca]
```

For the following commands, we will use the convenient alias `db` in place of `database`.

## Creating a database

To create a database from a snapshot, run `snaplet db create`:

```bash
# highlight-next-line
$ snaplet db create instant_db_tutorial
# You will be asked to pick a snapshot if you don't provide one using the --snapshot or --latest option
✔ Snapshot › v1-cassidy-underpass-interface 483 kB  4 days ago
# If you are using the instant database feature for the first time you will have the infrastructure provisioned
✔ Instant database server provisioned [24s]
# The snapshot is restored to the instant database
✔ Database instant_db_tutorial created from snapshot v1-cassidy-underpass-interface [12s]
# You can now use your database!
You can connect to your database at: postgresql://postgres:*********@snaplet-<orgId>-<projectId>.fly.dev:5432/instant_db_tutorial
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
instant_db_tutorial    14 MB    v1-cassidy-underpass-interface
snappy_feature_meow    14 MB    v1-cassidy-underpass-interface
```

You can see the database size and from which snapshot each database was created.

## Deleting a database

To delete a database, run `snaplet db delete`:

```bash
# highlight-next-line
$ snaplet db delete instant_db_tutorial
✔ Deleted database instant_db_tutorial
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
To avoid this problem, you can cache snapshots into the database server for truly instant databases creation!

To cache a snapshot into the database server, run `snaplet db cache`:

```bash
# highlight-next-line
$ snaplet db cache v1-cassidy-underpass-interface
✔ Snapshot v1-cassidy-underpass-interface cached into instant database server [12s]

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

## Deleting a cached snapshot from the database server

To delete a cached snapshot, run `snaplet db cache --clear`:

```bash
# highlight-next-line
$ snaplet db cache v1-cassidy-underpass-interface --clear
Snapshot v1-cassidy-underpass-interface removed from the instant database server cache
```